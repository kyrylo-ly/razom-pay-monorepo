import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { resourceFromAttributes } from '@opentelemetry/resources'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions'

export interface TracingOptions {
	serviceName: string
	otlpEndpoint?: string
	instrumentations?: Parameters<typeof getNodeAutoInstrumentations>[0]
}

export function initTracing(options: TracingOptions) {
	const traceExporter = new OTLPTraceExporter({
		url: options.otlpEndpoint
	})

	const otelSdk = new NodeSDK({
		traceExporter,
		resource: resourceFromAttributes({
			[ATTR_SERVICE_NAME]: options.serviceName
		}),
		instrumentations: [
			getNodeAutoInstrumentations(options.instrumentations ?? {})
		]
	})

	otelSdk.start()

	return otelSdk
}
