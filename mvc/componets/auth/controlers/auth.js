//controler
module.exports = function(vork) {

    var controler = {};

    //vork.layout = null;

    var fb = vork.load.helper("facebook");

    controler.index = function(callback) {
        controler.login(callback);
    };
    controler.logout = function(callback){
          var user = vork.load.helper("user");
          user.logout("http://vorkjs.bmatusiak.c9.io/",function(error){
                callback(null,{});
          });
    };

    controler.login = function(callback) {
        var loginUrl = fb.authUrl("http://vorkjs.bmatusiak.c9.io/auth/callback", "email", callback);
        vork.res.redirect(loginUrl);
    };
    controler.callback = function(cb) {
        //fb.getAccessToken("http://" + vork.req.headers.host + "/auth/fb", function() {
        fb.getAccessToken("http://vorkjs.bmatusiak.c9.io/auth/callback", function() {
            var user = vork.load.helper("user");
            user.checkLogin(1, null, function(err, obj) {
                //vork.res.redirect("http://" + vork.req.headers.host + "/");
                vork.res.redirect("http://vorkjs.bmatusiak.c9.io/");
                cb();
            })
        });
    };
    return controler;
};