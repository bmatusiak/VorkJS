//helper
module.exports = function(vork){
    var helper = {};
    
    vork.view = "_markdown";
    
    helper.control = function(callback){
        var output = {};
        
        output.pathToElement =vork.controler+"/"+vork.action+"/"+vork.params.join("/");
        
        if(output.pathToElement.charAt(output.pathToElement.length-1) == "/"){
            output.pathToElement = output.pathToElement.slice(0, -1);
        }
        if(output.pathToElement == vork.controler+"/"){
            output.pathToElement += "index";
        }
        
        var mdWikiModel = vork.load.model("md-wiki");
        mdWikiModel.getFile( output.pathToElement,function(err,res){
                if(res && res.content){
                    output.markdown_string = res.content;
                    output.markdown_authorID = res.author;
                    output.markdown_date = res.date;
                    var fb = vork.load.helper("facebook");
                    fb.graph('GET', '/'+res.author, {}, function(error, response, body){
                        output.markdown_authorName = body.name;
                        compleate();
                    });
                    //compleate()
                }else{
                    output.markdown_string = vork.load.element("mdPages/notFound");
                    compleate();
                }
            }
        );
        
        function compleate(){
            if(vork.load.helper("user").isUser && vork.req.session.user.fb){
                vork.view = "_markdown-edit";
                //output.toolbar = '<input type="submit" value="Edit" onClick="javascript:  editMdFile();" />';
            }
            
            callback(null,output)
        }
    }
    
    return helper;
};