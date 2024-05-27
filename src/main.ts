import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { setupSwagger } from '../environments/setup-swagger';

/**
 * On which port to run the application
 */
const APP_PORT = Number(process.env.APP_PORT);

/**
 * Is swagger enabled
 */
const SWAGGER = Boolean(process.env.SWAGGER);

const globalPrefix = 'api';

export async function bootstrap(): Promise<NestExpressApplication> {
  /**
   * We create an application instance.
   * And we limit the output of logs that are used during development.
   */
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  /**
   * Setting a prefix for each route
   * @see https://docs.nestjs.com/faq/global-prefix
   */
  app.setGlobalPrefix(globalPrefix);

  /**
   * Allows you to have different versions of routes
   * @see https://docs.nestjs.com/techniques/versioning
   */
  app.enableVersioning();

  /**
   * Automatic validation at the application level, endpoints are protected from receiving incorrect data.
   * @see https://docs.nestjs.com/techniques/validation
   */
  app.useGlobalPipes(
    new ValidationPipe({
      /**
       * Property not included in the whitelist is automatically stripped from the resulting object
       */
      whitelist: true,
      /**
       * Automatically transform payloads to be objects types according to their DTO classes
       */
      transform: true,
    }),
  );

  /**
   * Add a web ui for swagger
   */
  if (SWAGGER) {
    const swagger = setupSwagger(app, APP_PORT);
    Logger.log(swagger);
  }

  // Gracefully shutdown the server.
  app.enableShutdownHooks();

  app.listen(APP_PORT);

  return app;
}

/**
 * Start app
 */
void bootstrap().then(() => {
  Logger.log(
    `🚀 Api server is running on: http://localhost:${APP_PORT}/${globalPrefix}`,
  );
});
