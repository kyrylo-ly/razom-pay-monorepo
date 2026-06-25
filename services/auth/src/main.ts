import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import EventEmitter from 'node:events'

import { AppModule } from './app.module'
import { AllConfigs } from './config'
import { createGrpcServer } from './infra/grpc/grpc.server'
import './observability/tracing'

async function bootstrap() {
	EventEmitter.defaultMaxListeners = 25
	const app = await NestFactory.create(AppModule)

	const configService = app.get(ConfigService<AllConfigs>)

	createGrpcServer(app, configService)

	await app.startAllMicroservices()
	await app.listen(9101)
}

bootstrap()
