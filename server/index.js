

const bodyParser = require('koa-bodyparser');
const Koa = require('koa');
const router = require('./routes');



	const app = new Koa();
	app.use(bodyParser());
	app.use(router.routes());
	app.use(router.allowedMethods());
	if (!module.parent) {
		app.listen(8000);
	  }
	  const io = require('socket.io')();
	  const port = 3001;
	  io.listen(port);
	  console.log('Sockets listening on port ', port);
	  