// TODO: need typify
export function callUnary<T>(method, request) {
	return new Promise<T>((resolve, reject) => {
		method(request, (error, response) => {
			if (error) {
				reject(error)
			} else {
				resolve(response)
			}
		})
	})
}
