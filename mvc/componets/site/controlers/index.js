//controler
module.exports = function(vork){
    var controler = {};
    
    controler.index = function(callback){
        var allowEdit = vork.req.session.isAdmin;
        vork.load.helper("md-wiki").control(allowEdit,callback);
    };

return controler;
};