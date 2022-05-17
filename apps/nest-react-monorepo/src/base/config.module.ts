import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

export type Schema = {
  port: number;
  isDev: boolean;
  isViewCached: boolean;
};

function load(): Schema {
  const env = ['development', 'production'].indexOf(process.env.ENVIRONMENT);

  return {
    port: Number(process.env.PORT),
    isDev: env === 0,
    isViewCached: process.env.VIEW_CACHE === 'true' ? true : false,
  };
}

const schema = Joi.object({
  PORT: Joi.number().min(1).max(65535).required(),
  ENVIRONMENT: Joi.string()
    .valid('development', 'production')
    .default('production'),
  VIEW_CACHE: Joi.string().valid('true', 'false').default('false'),
});

export enum ConfigKeys {
  SERVER_PORT = 'port',
  IS_DEV = 'isDev',
  IS_VIEW_CACHED = 'isViewCached',
}

export default ConfigModule.forRoot({
  envFilePath: ['.env', '.default.env'],
  load: [load],
  validationSchema: schema,
  validationOptions: {
    abortEarly: true,
  },
  cache: true,
  isGlobal: true,
});
