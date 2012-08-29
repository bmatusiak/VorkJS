module.exports = function(vork){
    var self = this;
    self.vork = vork;
    
    self.checkLogin = function(type,id,callback){
        switch(type){
            case 0:// by email
            var email = null;
                if(id.isFacebook){
                    email = id.email;
                }else{
                     email = id;  
                }
                var userModel = vork.load.model("users");
                    userModel.getUser(email,function(error,rows){
                            if( rows.length === 0){
                                 userModel.addUser(email,function(error){
                                        if(!error){
                                            vork.req.session.user.id = id;
                                        }
                                        callback();
                                });  
                            }else{
                                vork.req.session.user.id = id;
                                callback();
                            }
                    });
                break;
            case 1:// get facebook info and recheck
                var fb = vork.load.helper("facebook");
                fb.me('GET', '/' + vork.params.join("/"), {}, function(error, response, body){
                    if(!error){
                        body.isFacebook = true;
                        self.checkLogin(0,body,callback);
                    }else{
                        callback(error);
                    }
                });
                break;
            case 2:// get email google and recheck
                break;
                
            default:
                //callback(true);
                break;
        }
    };
    
    /*
    self.login = function(callback){
        vork.req.session.user = {};
        callback();
    };
    */
    
    self.logout = function(redirect_url,callback){
        //var redirect_url = "http://"+vork.req.headers.host+"/";
        if(vork.req.session.user.id){
            redirect_url = vork.load.helper("facebook").logoutUrl();
        }
        vork.req.session.user = null;
        vork.res.redirect(redirect_url);
        callback();
    };
    
    self.isUser = vork.req.session.user ? true : false;
    
    self.thisUser = function(callback){
        if(!vork.req.session.user || vork.req.session.user.email){
            callback("Not logged in!");
        }else{
            callback(null,vork.req.session.user);
        }
    };
    
    self.setUserData = function(callback){
        callback(vork.req.session.user);
    };
    
    return self;   
};