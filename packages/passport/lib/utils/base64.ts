export function base64UrlEncode(buf: Buffer | string) {
	const s = typeof buf === 'string' ? Buffer.from(buf) : buf

	return s
		.toString('base64')
		.replace(/=+$/, '')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
}

export function base64UrlDecode(str: string) {
	str.replace(/-/g, '+').replace(/_/g, '/')

	while (str.length % 4) str += '='

	return Buffer.from(str, 'base64').toString()
}
