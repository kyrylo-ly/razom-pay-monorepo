import { initTracing, type TracingOptions } from '@razom-pay/common'

import { serviceName } from '../shared/consts'

const tracingOptions: TracingOptions = {
	serviceName: serviceName,
	otlpEndpoint: process.env.OTLP_ENDPOINT,
	instrumentations: {
		'@opentelemetry/instrumentation-http': { enabled: true },
		'@opentelemetry/instrumentation-nestjs-core': {
			enabled: true
		}
	}
}

initTracing(tracingOptions)
