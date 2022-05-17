# Nest/React monorepo

1. Nest

- All controller must have /api prefix (see ResourceHandlerMiddleware)
- All DTO should be defined in libs/common because this is a monorepo, backend can share DTO definitions with frontend
- All Entity should be defined in libs/common with same reason

<br>

2. React

- Store structure should not be modified, just add reducers/actions/action types
- You can add more production dependencies in webpack.config.js to reduce load

<br>

Many things will be added later or not.
