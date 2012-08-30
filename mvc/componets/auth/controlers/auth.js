//controler
module.exports = function(vork) {

    
    
    var controler = {};

    //vork.layout = null;

    var fb = vork.load.helper("facebook");
    var callbackURL = fb.cb_url;
    controler.index = function(callback) {
        controler.login(callback);
    };
    controler.logout = function(callback){
          var user = vork.load.helper("user");
          user.logout(callbackURL+"/",function(error){
                callback(null,{});
          });
    };

    controler.login = function(callback) {
        var loginUrl = fb.authUrl(callbackURL+"/auth/callback", "email", callback);
        vork.res.redirect(loginUrl);
    };
    controler.callback = function(cb) {
        //fb.getAccessToken("http://" + vork.req.headers.host + "/auth/fb", function() {
        fb.getAccessToken(callbackURL+"/auth/callback", function() {
            var user = vork.load.helper("user");
            user.checkLogin(1, null, function(err, obj) {
                //vork.res.redirect("http://" + vork.req.headers.host + "/");
                vork.res.redirect(callbackURL+"/");
                cb();
            })
        });
    };
    return controler;
};