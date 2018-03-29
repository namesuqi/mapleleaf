'use strict';

var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var router = express.Router();
// var router = require('express').Router();

var starttest = require('../controller/teststart.js');
var index = require('../controller/index.js');

// router.get('/starttest/start_mvn_test', starttest.startmaventest);
// router.get('/starttest/start_mvn_test', function(req, res, next) {
// 	res.end();
// });

router.get('/starttest', starttest.renderstarttest);
router.get('/', index.renderIndex);


router.ws('/starttest', starttest.StartMvnCmd);

// function (ws, req) {
// 	console.log('get route websocket');
// 	ws.on('message', function(msg) {
// 		for (var i=0; i<5; i++){
// 			console.log(msg);
// 			ws.send('server send back: ' + msg + i);
// 		}
// 	});
// }


module.exports = router;