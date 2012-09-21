//controler
module.exports = function(vork){
    var controler = {};
    
    controler.index = function(callback){
      
        var output = vork.load.helper("md-wiki").control(vork.load.helper("user").isUser,callback);
        
        //callback(null,output);
    };
    
    controler.post = function(callback){
      
        if( vork.req.session.user &&
            vork.req.session.user.fb &&
            vork.req.session.user.fb.data &&
            vork.req.session.user.fb.data.id &&
            vork.req.body.content &&
            vork.req.body.pathToElement){
        
            //var output = vork.load.helper("md-wiki").view;
            var content = vork.req.body.content;
            var mdLocation = vork.req.body.pathToElement;
            
            var mdWikiModel = vork.load.model("md-wiki");
            mdWikiModel.addFile(mdLocation,content,vork.req.session.user.fb.data.id,function(err,res){
                callback(null,"");
            });
        }
       
    };
return controler;
};