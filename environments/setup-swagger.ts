import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { name, version } from '../package.json';

/**
 * Swagger address
 */
const SWAGGER_URN = String(process.env.SWAGGER_URN);
/**
 * Login and password to access swagger UI
 */
const SWAGGER_AUTH_LOGIN = String(process.env.SWAGGER_AUTH_LOGIN);
const SWAGGER_AUTH_PASSWORD = String(process.env.SWAGGER_AUTH_PASSWORD);

/**
 * Setup swagger UI
 *
 * @param app - app instance
 * @param appPort - what port is the application running on
 * @param urn - place of swagger ui
 */
export function setupSwagger(app: INestApplication, appPort: number): string {
  /**
   * Protect the swagger documentation with basic auth.
   * @see https://www.npmjs.com/package/express-basic-auth
   */
  app.use(
    [SWAGGER_URN, `${SWAGGER_URN}-json`],
    basicAuth({
      challenge: true,
      users: {
        [SWAGGER_AUTH_LOGIN]: SWAGGER_AUTH_PASSWORD,
      },
    }),
  );

  /**
   * Metadata for documentation
   */
  const options = new DocumentBuilder()
    .setTitle(name)
    .setVersion(version)
    .addBearerAuth(
      {
        name: 'Authorization',
        description: 'Please enter token in following format: Bearer <JWT>',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      /**
       * This name here is important for matching up with @ApiBearerAuth() in your controller
       */
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_URN, app, document);

  return `Documentation: http://localhost:${appPort}${SWAGGER_URN}`;
}
