import { CanActivate, ExecutionContext, Inject, Injectable} from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { Observable } from 'rxjs'
import appConfig from 'src/config/app.config'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'

@Injectable()
export class ApiKeyGuard implements CanActivate{
    constructor(
        @Inject(appConfig.KEY)
        private readonly configService: ConfigType<typeof appConfig>,
        private readonly reflector: Reflector, 
    ) {}
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler())
        if(isPublic) return true
        const request = context.switchToHttp().getRequest<Request>()
        const authHeader = request.header('Authorization')
        return authHeader === this.configService.API_KEY 
    }
}
