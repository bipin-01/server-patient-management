import { Module } from '@nestjs/common'
import { ConfigModule, ConfigType } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import appConfig from 'src/config/app.config'
import { ApiKeyGuard } from './guards/api-key.guard'

@Module({
    imports: [ConfigModule.forFeature(appConfig)], 
    providers: [
        {
            provide: APP_GUARD, 
            useClass: ApiKeyGuard, 
        }],
    exports: []
})
export class CommonModule {}
