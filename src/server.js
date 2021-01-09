const express = require('express'),
		webpack = require('webpack'),
		webpackConfig = require('../webpack.config.js'),
		middleware = require('webpack-dev-middleware');

const compiler = webpack(webpackConfig),
		app = express(),
		port = 3000;

var devMiddleware = middleware(compiler, {
	publicPath: '/',
	hot: true,
});

app.use(devMiddleware);
app.use(require('webpack-hot-middleware')(compiler));

var normalizedPath = require("path").join(__dirname, "routes");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
	require("./routes/" + file)(app);
});

app.listen(port, () => {
	console.log('App listening on http://localhost:' + port)

	if(process.argv.filter( arg => arg === '--open' ).length > 0) {
		const open = require("open");
		open("http://localhost:" + port);
	}
});
