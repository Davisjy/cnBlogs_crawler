const https = require('https');

module.exports = (url, callback)=> {
	https.get(url, res=> {
		var html = '';
		res.on('data', chunk=> {
			html += chunk.toString();
		});
		res.on('end', ()=> {
			callback(null, html);
		});
		res.on('error', error=> {
			callback(error);
		})
	})
}