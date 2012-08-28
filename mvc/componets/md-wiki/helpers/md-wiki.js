//helper
module.exports = function(vork){
     
        vork.view = "_markdown";
    
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
        
        output.markdown_string = MD_STRING;
        
        return output; 
};