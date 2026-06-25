import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'

import { DatabaseModule } from './infra/db/db.module'
import { UsersModule } from './modules/users/users.module'
import { MetricsModule } from './observability/metrics/metrics.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [
				`.env.${process.env.NODE_ENV}.local`,
				`.env.${process.env.NODE_ENV}`,
				'.env'
			]
		}),
		LoggerModule.forRoot({
			pinoHttp: {
				level: process.env.LOG_LEVEL,
				autoLogging: false,
				transport: {
					target: 'pino/file',
					options: {
						destination:
							process.platform === 'linux'
								? '/var/log/services/users/users.log'
								: '../../.logs/users/users.log',
						mkdir: true
					}
				},
				messageKey: 'msg',
				customProps: () => ({
					service: 'users-service'
				})
			}
		}),
		MetricsModule,
		DatabaseModule,
		UsersModule
	]
})
export class AppModule {}
