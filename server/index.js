

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