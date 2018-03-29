'use strict';
var shell = require("shelljs");
var copyfile = require("../lib/copyfile.js")
var config = require("../config.js")


exports.StartMvnCmd = function (ws, req) {
	var stdout = '';
	var stderr = '';

	console.log('get route websocket');

	ws.on('message', function(msg) {
		shell.cd(config.projectPath);
		var c = shell.exec("mvn test", {silent: true}, function(err, stdout, stderr) {
			if (err) throw err;
		});

		c.stdout.on('data', function (data) {
			stdout += data;
			console.log(data);
			ws.send(stdout);
		});

		c.stdout.on('close', function (data) {
			ws.close();
			console.log('shell exec close');
			copyfile.CopyDir(config.projectPath + '/target/surefire-reports', __dirname + '/../public/surefire-reports');
		});

		c.stderr.on('data', function (data) {
			stderr += data;
			console.log(data);
		});

	});
};


exports.renderstarttest = function(req, res, next) {
	res.render('start_test');
};