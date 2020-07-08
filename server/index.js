//dependencies
const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');

const app = express();
app.use(cors());

app.get('/', (req, res) => res.send('This is the Youtube Downloader ServerSideAPI 1.0'));

//Endpoint to download MP3 Files
app.get('/downloadmp3', async (req, res, next) => {
	try {
		var url = req.query.url;
		let quality = req.query.qual;
		let title = 'audio';
		await ytdl.getBasicInfo(url, {
			format: 'mp4'
		}, (err, info) => {
			title = info.player_response.videoDetails.title.replace(/[\u{0080}-\u{FFFF}]/gu,"");
		});

		res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);
		
		ytdl(url, {
			format: 'mp3',
			filter: 'audioonly',
			quality: quality,
		}).pipe(res);
	} catch (err) {
		console.error(err);
	}
});

//Endpoint to download MP4 files
app.get('/downloadmp4', async (req, res, next) => {
	try {
		let URL = req.query.url;
		let quality = req.query.qual;
		let title = 'video';

		await ytdl.getBasicInfo(URL, {
			format: 'mp4',
			quality: quality,			
		}, (err, info) => {
			title = info.player_response.videoDetails.title.replace(/[\u{0080}-\u{FFFF}]/gu,"");
		});

		res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
		ytdl(URL, {
			format: 'mp4',
		}).pipe(res);
	} catch (err) {
		console.error(err);
	}
});

//Listen at port 4000
app.listen(4000, () => {
	console.log('Youtube Downloader Server Initiated at port 4000');
});