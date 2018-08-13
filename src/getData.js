const axios = require('axios')

export const Seller = () => axios.get('/api/seller')
.then(function (response) {
	return response
})
