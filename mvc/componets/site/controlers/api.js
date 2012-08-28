//controler
module.exports = function(vork){
    var controler = {};
    
    //vork.view = "_markdown"
    controler.index = function(){
      /*  
        var output = {};
        
        var pathToElement ="mdPages/"+vork.action+"/"+vork.params.join("/");
        
        if(pathToElement.charAt(pathToElement.length-1) == "/"){
            pathToElement = pathToElement.slice(0, -1);
        }
        if(pathToElement == "mdPages/"){
            pathToElement += "index";
        }
        var MD_STRING = vork.load.element(pathToElement);
        
        if(MD_STRING == null){
            MD_STRING = vork.load.element("mdPages/notFound");
        }
            
        console.log(pathToElement);
        
        output.markdown_string = MD_STRING;
        
        return output; */
        return vork.load.helper("md-wiki")
    };

return controler;
};