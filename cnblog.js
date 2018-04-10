const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');
const fetch = require('./fetch');

const savePath = path.join(__dirname, './post');

if (!fs.existsSync(savePath)) {
	fs.mkdirSync(savePath);
}

fetch('https://www.cnblogs.com/', (error, content)=> {
	const $ = cheerio.load(content);

	var aLinks = $('.titlelnk');
	var taskCount = aLinks.length;
	aLinks.each((i, item)=> {
		fetch(item.attribs.href, (error, content)=> {
			taskCount--;
			const $$ = cheerio.load(content);
			var body = $$('#cnblogs_post_body').html();
			var filename = item.children[0].data + '.html';
			fs.writeFileSync(path.join(savePath, filename), body);
			if (taskCount == 0) {
				console.log('最后一次');
			}
		})
	})
})