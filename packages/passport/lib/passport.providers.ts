import { PASSWORD_OPTIONS } from './contants'
import type { PassportAsyncOptions, PassportOptions } from './interfaces'

export function createPassportOptionsProvider(options: PassportOptions) {
	return {
		provide: PASSWORD_OPTIONS,
		useValue: Object.freeze({ ...options })
	}
}

export function createPassportAsyncOptionsProvider(
	options: PassportAsyncOptions
) {
	return {
		provide: PASSWORD_OPTIONS,
		useFactory: async (...args: any[]) => {
			const resoulved = await options.useFactory(...args)

			if (!resoulved || typeof resoulved.secretKey !== 'string')
				throw new Error(
					'[PassportModule] "secretKey" is required and must be a string'
				)

			return Object.freeze({ ...resoulved })
		},
		inject: options.inject ?? []
	}
}
