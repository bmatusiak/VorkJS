var vork = require('./lib/vork');

vork
.configure(function(config){
    config.basepath = __dirname+'/exampleApp';
})
.listen();