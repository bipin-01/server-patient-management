import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino'
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter'
import { WrapResponseInterceptor } from './common/interceptors/wrap-response/wrap-response.interceptor'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true })
    app.useGlobalPipes(
        new ValidationPipe({
            // removes non white listed field from payload
            whitelist: true,
            // disable passing non white listed fields in payload
            forbidNonWhitelisted: true,
            // converts payload json to respective dto class instance
            transform: true,
            // no need of Type(() => Number) in dtos with this
            transformOptions: {
                enableImplicitConversion: true
            }
        }),
    )
    app.useGlobalFilters(new HttpExceptionFilter())
    app.useLogger(app.get(Logger))
    app.useGlobalInterceptors(
        new LoggerErrorInterceptor(), 
        new WrapResponseInterceptor()
    )
    const options = new DocumentBuilder()
        .setTitle('widget')
        .setDescription('widget description')
        .setVersion('1.0')
        .build()
    const document = SwaggerModule.createDocument(app, options)

    SwaggerModule.setup('api', app, document)

    await app.listen(3000)
}
bootstrap()
