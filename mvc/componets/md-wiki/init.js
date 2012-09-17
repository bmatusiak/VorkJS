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
                    }
                }
            }
            return doc.innerHTML;
        }catch(e){
            return require("node-markdown").Markdown(markdown);
        }
    }

    return init;
}