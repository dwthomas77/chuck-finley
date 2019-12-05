import express from 'express';
import es6Renderer from 'express-es6-template-engine';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import path from 'path';

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
const port = 3000;

app.engine('html', es6Renderer);
app.set('views', './views');
app.set('view engine', 'html');

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));


app.get('/', (req, res) => {
  res.render('index', {locals: {}});
});

app.use('/static', express.static(path.join(__dirname, 'dist')))
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
