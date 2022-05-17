import { NextFunction, Request, Response } from 'express';
import { existsSync, statSync } from 'fs';
import { join, resolve } from 'path';
import { Cache } from 'cache-manager';

import {
  CACHE_MANAGER,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NestMiddleware,
  Scope,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigKeys } from '../base/config.module';
import { readdir, readFile } from 'fs/promises';

const viewDistributionDir = resolve(__dirname, '..', 'view');
const viewIndex = join(viewDistributionDir, 'index.html');

@Injectable({
  scope: Scope.DEFAULT,
})
export class ResourceHandlerMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger('ResourceHandlerMiddleware');
  private readonly cacheEnabled: boolean;
  private readonly availableFiles: Set<string>;

  public constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    configService: ConfigService,
  ) {
    this.cacheEnabled = configService.get<boolean>(ConfigKeys.IS_VIEW_CACHED);
    this.availableFiles = new Set<string>();

    if (this.cacheEnabled) this.scanAvailableFiles(viewDistributionDir);
  }

  private async scanAvailableFiles(root: string): Promise<void> {
    const files = await readdir(root, { withFileTypes: true });

    for (const file of files) {
      if (file.isFile()) this.availableFiles.add(join(root, file.name));
      if (file.isDirectory())
        await this.scanAvailableFiles(join(root, file.name));
    }

    this.logger.log('All distribution files indexed');
  }

  private async isPathAvailable(path: string): Promise<boolean> {
    if (!this.cacheEnabled) return existsSync(path) && statSync(path).isFile();

    return this.availableFiles.has(path);
  }

  private async loadFile(res: Response, path: string): Promise<void> {
    const result = await this.cacheManager.get<string>(path);

    if (result !== null && result !== undefined) {
      res.send(result);
      return;
    }

    const file = await readFile(path, 'utf8');

    if (this.cacheEnabled) this.cacheManager.set(path, file);

    res.send(file);
  }

  public async use(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { path } = req;

    if (path.startsWith('/api/')) return next();

    const filePath = join(viewDistributionDir, path);

    if (!(await this.isPathAvailable(filePath)))
      return this.loadFile(res.status(HttpStatus.OK), viewIndex);

    return this.loadFile(res.status(HttpStatus.OK), filePath);
  }
}
