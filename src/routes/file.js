const path = require('path'),
		fs = require('fs');

module.exports = (app) => {

	app.get('/files', (reg, res) => {
		res.setHeader('Content-Type', 'application/json');

		fs.readdir('.', (err, filenames) => {
			const files = (filenames || [])
				.map( filename => ({
					filename,
					stat: fs.statSync(path.join(upload_dir, filename))
				}) );

			res.send(JSON.stringify({
				files
			}));
		});
	});

	app.get('/files/:file', (reg, res) => {
		res.sendFile(reg.params.file);
	});
}
