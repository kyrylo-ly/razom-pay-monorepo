import { initTracing, type TracingOptions } from '@razom-pay/common'

import { serviceName } from '@/shared/consts'

const tracingOptions: TracingOptions = {
	serviceName: serviceName,
	otlpEndpoint: process.env.OTLP_ENDPOINT,
	instrumentations: {
		'@opentelemetry/instrumentation-grpc': { enabled: true },
		'@opentelemetry/instrumentation-http': { enabled: false },
		'@opentelemetry/instrumentation-nestjs-core': {
			enabled: true
		},
		'@opentelemetry/instrumentation-redis': { enabled: true },
		'@opentelemetry/instrumentation-pg': { enabled: true }
	}
}

initTracing(tracingOptions)
