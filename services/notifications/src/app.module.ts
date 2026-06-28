import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'

import configuration from './config/configuration'
import { MailModule } from './infra/mail/mail.module'
import { RmqModule } from './infra/rmq/rmq.module'
import { SmsModule } from './infra/sms/sms.module'
import { NotificationsModule } from './modules/notifications/notifications.module'
import { MetricsModule } from './observability/metrics/metrics.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [
				`.env.${process.env.NODE_ENV}.local`,
				`.env.${process.env.NODE_ENV}`,
				'.env'
			],
			load: [configuration],
			expandVariables: true
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
								? '/var/log/services/notifications/notifications.log'
								: '.logs/notifications/notifications.log',
						mkdir: true
					}
				},
				messageKey: 'msg',
				customProps: () => ({
					service: 'notification-service'
				})
			}
		}),
		RmqModule,
		MetricsModule,
		NotificationsModule,
		MailModule,
		SmsModule
	]
})
export class AppModule {}
