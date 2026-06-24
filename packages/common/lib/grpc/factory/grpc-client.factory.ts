import { Injectable } from '@nestjs/common'
import {
	ClientGrpc,
	ClientProxyFactory,
	Transport
} from '@nestjs/microservices'

@Injectable()
export class GrpcClientFactory {
	private clients = new Map<string, ClientGrpc>()

	createClient(options: { package: string; protoPath: string; url: string }) {
		return ClientProxyFactory.create({
			transport: Transport.GRPC,
			options: {
				...options,
				loader: {
					longs: Number,
					enums: Number,
					defaults: true,
					arrays: true,
					objects: true,
					oneofs: true
				}
			}
		}) as ClientGrpc
	}

	register(token: string, client: ClientGrpc) {
		this.clients.set(token, client)
	}

	getClient<T extends ClientGrpc = ClientGrpc>(token: string) {
		const client = this.clients.get(token)
		if (!client) {
			throw new Error(`gRPC client with token "${token}" not found`)
		}

		return client as T
	}
}
