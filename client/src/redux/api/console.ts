import axios, { AxiosPromise } from 'axios'

export const sendRequest = async ({ url, method, headers, data }) => {
	let newHeaders
	if (headers) {
		newHeaders = JSON.parse(headers)
	} else {
		newHeaders = null
	}

	let newData
	if (data) {
		newData = JSON.parse(data)
	} else {
		newData = null
	}

	const res = await axios.request<AxiosPromise>({
		url,
		method,
		headers: newHeaders,
		data: newData,
	})

	return res.data
}
