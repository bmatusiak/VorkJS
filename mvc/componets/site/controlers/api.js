//controler
module.exports = function(vork){
    var controler = {};
    
    controler.index = function(callback){
      
        var output = vork.load.helper("md-wiki");
        
        callback(null,output);
    };

return controler;
};