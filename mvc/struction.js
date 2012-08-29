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
                }
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