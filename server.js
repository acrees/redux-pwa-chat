var path = require('path');
var express = require('express');
var webpack = require('webpack');
var socket = require('socket.io');
var uuid = require('node-uuid');

function run(app) {
  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });

  var users = {};

  var io = socket.listen(app.listen(8080));

  io.sockets.on('connection', function (s) {
    s.on('register', function (m) {
      var code = uuid.v4();
      users[code] = m.name;
      s.emit('set-code', { code: code });
    });
    s.on('send-message', function (m) {
      var author = users[m.authorCode];
      if (!author) return; // user not found
      s.broadcast.emit('recieve-message', { id: m.id, content: m.content, author })
      s.emit('sent-message', { id: m.id });
    });
  });
}

var webpackConf = {
  module: {
    loaders: [
    {
      test: /.jsx?$/,
      include: path.resolve(__dirname, 'src'),
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    },
    {
      test: /\.styl$/,
      loader: 'style-loader!css-loader!stylus-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  context: path.resolve(__dirname, 'src'),
  entry: './entry.js',
  output: { path: '/', filename: 'bundle.js' },
  devtool: '#source-map'
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
