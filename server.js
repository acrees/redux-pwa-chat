var path = require('path');
var express = require('express');
var webpack = require('webpack');

function run(app) {
  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });

  app.listen(8080, function () {
    console.log('Listening on port 8080!');
  });
}

var webpackConf = {
  module: {
    loaders: [{
      test: /.jsx?$/,
      include: path.resolve(__dirname, 'src/js'),
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  },
  context: path.resolve(__dirname, 'src/js'),
  entry: './entry.js',
  output: { path: '/', filename: 'bundle.js' }
};
var compiler = webpack(webpackConf);

var app = express();

if(app.get('env') !== 'production') {
  var webpackMiddleware = require('webpack-dev-middleware');
  var lrserver = require('tiny-lr')();
  var lrMiddleware = require('connect-livereload');
  var lrport = 8081;

  var triggerLiveReloadChanges = function() {
      lrserver.changed({
          body: {
              files: [webpackConf.output.filename]
          }
      });
  };

  lrserver.listen(lrport, triggerLiveReloadChanges);
  compiler.plugin('done', triggerLiveReloadChanges);

  app.use(lrMiddleware({ port: lrport }));
  app.use(webpackMiddleware(compiler, { watchOptions: { poll: true }}));

  run(app);
} else {
  var MemoryFS = require('memory-fs');
  var fs = new MemoryFS();
  compiler.outputFileSystem = fs;
  compiler.run(function (err, stats) {
    if (err) throw err;
    if (stats.hasErrors()) {
      console.log('WebPack compiler error!');
      console.log(stats.toString({colors: true}));
      process.exit();
    }

    var fileContent = fs.readFileSync('/bundle.js');

    app.get('/bundle.js', function (req, res) {
      res.writeHead(200, {'Content-Type': 'application/javascript'});
      res.write(fileContent);
      res.end();
    });

    run(app);
  });
}
