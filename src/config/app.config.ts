import { registerAs } from '@nestjs/config'

export default registerAs('appEnv', ()  => ({
    API_KEY: process.env.API_KEY || 'local'
}))
