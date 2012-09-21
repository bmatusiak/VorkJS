console.log("server.js Started");

var vork = require('vork');

vork
.configure(function(config){
    config.basepath = __dirname+'/mvc';
})
.listen();