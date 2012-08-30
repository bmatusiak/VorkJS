var fb = require('facebook-js');
module.exports = function(vork){
    return new FacebookAPI(vork);   
};

function FacebookAPI(vork){
    var self = this;
    self.vork = vork;
    
    self.url = "http://vorkjs.herokuapp.com";
    
    
    if(!vork.req.session.user)
        vork.req.session.user = {};
        
    self.authUrl = function(callback_url,scope) {
       return fb.getAuthorizeUrl({
            client_id: vork.globals.facebook.fb_app_id,
            redirect_uri: callback_url,
            scope: scope
        });
    };
    
    self.logoutUrl = function(url,callback) {
        var fb_logoutURL = "https://www.facebook.com/logout.php?";
        if(!url){
            url = "http://"+vork.req.headers.host+"/";
        }
        var querystring = require("querystring");
        
        var query = {};
        query.access_token = vork.req.session.user.fb.access_token;
        query.confirm = 1;
        query.next = url;
        
        var out = fb_logoutURL+querystring.stringify(query);
        console.log(vork.req.session.user)
        if(callback){
            callback(out);
        }else{
            return out;
        }
       
    };
    
    self.getAccessToken = function(callback_url,next) {
        fb.getAccessToken(
            vork.globals.facebook.fb_app_id,
            vork.globals.facebook.fb_app_secret,
            vork.req.param('code'),
            callback_url,
            function(error, access_token, refresh_token) {
                if(!error){
                    vork.req.session.user.fb = {};
                    vork.req.session.user.fb.access_token = access_token;
                    vork.req.session.user.fb.refresh_token = refresh_token;
                }
                next();
        });
    };
    
    self.graph = function(method,connector,data,callback) {
        fb.apiCall(method, connector,data, callback);
    };

    self.app = function(method,connector,data,callback) {
        data.access_token = vork.globals.facebook.fb_app_token;
        fb.apiCall(method, connector,data, function(error, response, body){
            callback(error, response, body);
        });
    };
    
    self.me = function(method,connector,data,callback) {
        if(vork.req.session.user && vork.req.session.user.fb && vork.req.session.user.fb.access_token){
            data.access_token = vork.req.session.user.fb.access_token;
            fb.apiCall(method, '/me' + connector,data, callback);
        }else
            callback("must be logged in via facebook");
    };

return self;
};