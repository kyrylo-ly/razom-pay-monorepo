import { initTracing, type TracingOptions } from '@razom-pay/common'

import { serviceName } from '../shared/consts'

const tracingOptions: TracingOptions = {
	serviceName: serviceName,
	// TODO: Check working with 4317 istead of 4318/v1/traces
	// Use 4318/v1/traces for Jaeger and OTEL Collector, 4317 is for OTEL Collector gRPC
	otlpEndpoint: process.env.OTLP_ENDPOINT,
	instrumentations: {
		'@opentelemetry/instrumentation-http': { enabled: true },
		'@opentelemetry/instrumentation-express': { enabled: true },
		'@opentelemetry/instrumentation-nestjs-core': {
			enabled: true
		},
		'@opentelemetry/instrumentation-grpc': { enabled: true }
	}
}

initTracing(tracingOptions)
