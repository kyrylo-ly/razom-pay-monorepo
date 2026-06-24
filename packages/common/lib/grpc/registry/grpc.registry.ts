import { PROTO_PATHS } from '@razom-pay/contracts'

export const GRPC_CLIENTS = {
	AUTH_PACKAGE: {
		package: 'auth.v1',
		protoPath: PROTO_PATHS.AUTH,
		env: 'AUTH_GRPC_URL'
	},
	ACCOUNT_PACKAGE: {
		package: 'account.v1',
		protoPath: PROTO_PATHS.ACCOUNT,
		env: 'AUTH_GRPC_URL'
	},
	USERS_PACKAGE: {
		package: 'users.v1',
		protoPath: PROTO_PATHS.USERS,
		env: 'USERS_GRPC_URL'
	},
	COMMUNITIES_PACKAGE: {
		package: 'communities.v1',
		protoPath: PROTO_PATHS.COMMUNITIES,
		env: 'COMMUNITIES_GRPC_URL'
	},
	ESCROW_PACKAGE: {
		package: 'escrow.v1',
		protoPath: PROTO_PATHS.ESCROW,
		env: 'ESCROW_GRPC_URL'
	}
} as const
