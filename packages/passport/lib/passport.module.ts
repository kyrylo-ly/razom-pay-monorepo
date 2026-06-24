import { type DynamicModule, Global, Module } from '@nestjs/common'

import { PASSWORD_OPTIONS } from './contants'
import type { PassportAsyncOptions, PassportOptions } from './interfaces'
import {
	createPassportAsyncOptionsProvider,
	createPassportOptionsProvider
} from './passport.providers'
import { PassportService } from './passport.service'

@Global()
@Module({})
export class PassportModule {
	static register(options: PassportOptions) {
		const optionsProvider = createPassportOptionsProvider(options)

		return {
			module: PassportModule,
			providers: [optionsProvider, PassportService],
			exports: [PassportService, PASSWORD_OPTIONS]
		}
	}

	static registerAsync(options: PassportAsyncOptions) {
		const optionsProvider = createPassportAsyncOptionsProvider(options)

		return {
			module: PassportModule,
			imports: options.imports ?? [],
			providers: [optionsProvider, PassportService],
			exports: [PassportService, PASSWORD_OPTIONS]
		}
	}
}
