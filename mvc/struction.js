var struction = {};
//after Server config
struction.initConfig = function(vork){
};

//When Server Starts
struction.init = function(vork){
};


//request construct
struction.construct = function(vork,start,end){
    if(vork.load.helper("user").isUser && vork.req.session.user.fb && !vork.req.session.user.fb.data){
        if(vork.load.helper("user").isUser){
            var fb = vork.load.helper("facebook");
            fb.me('GET', '/', {}, function(error, response, body){
                if(!error){
                    vork.req.session.user.fb.data = body;
                    fb.app('GET', "/"+vork.globals.facebook.fb_app_id+'/roles', {}, function(error, response, body){
                        if(!error){
                            var usersRoles = {}
                            for(var i in body.data){
                                   usersRoles[body.data[i].user] = body.data[i].role;
                            }
                            vork.req.session.isAdmin = usersRoles[vork.req.session.user.fb.data.id] == "administrators" ? true : false;
                            start()
                        }else
                            start();
                    });
                }
                else
                    start();
            });
        }
    }else{
        start();
    }
};

//request destruct
struction.destruct = function(vork,end){
    end();
};

module.exports = struction;