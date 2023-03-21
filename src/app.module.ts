import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import appConfig from './config/app.config'
import { LoggerModule } from 'nestjs-pino'
import { CommonModule } from './common/common.module'
@Module({
    imports: [
        CommonModule,
        ConfigModule.forFeature(appConfig),
        LoggerModule.forRoot({
            pinoHttp: {
                customProps: (req, res) => ({
                    context: 'HTTP',
                }),
                transport: {
                    target: 'pino-pretty',
                    options: {
                        singleLine: true,
                        colorize: true
                    },
                },
            },
        })],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
