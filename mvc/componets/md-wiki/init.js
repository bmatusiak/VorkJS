module.exports = function(globals){
    var init = {};
    
    init.ready = false;
    
    init.basepath = __dirname;
     
    
    globals.md = function(markdown){
        try{
            var jsdom = require('jsdom').jsdom;
            var html = require("./showdown.js").Showdown.converter().makeHtml(markdown);
            var doc   = jsdom(html)
            
            for(var i in doc._ids){
                var elements = doc._ids[i];
                for(var j in elements){
                    var element = elements[j];
                    if(element.attributes.markdown){
                        element.innerHTML = require("./showdown.js").Showdown.converter().makeHtml(element.innerHTML)
                        //console.log(element.innerHTML);
                        //console.log("--------")
                    }
                    /*for(var k in elementAttributes){
                        var attribute = elementAttributes[k];
                        //if(elementAttributes[k].id._tagName == "markdown"){
                               console.log(k)
                        //}
                    }*/
                }
            }
            return doc.innerHTML;
        }catch(e){
            return require("node-markdown").Markdown(markdown);
        }
    }

    return init;
}