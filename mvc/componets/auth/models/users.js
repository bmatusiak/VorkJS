module.exports = function(db) { //calld when vork loads model every time
    var model = {};
    
    var Schema = db.Schema
    
    var user = new Schema({
        email: String,
        password: String
    });
    
    model.getUser = function(email,callback){
        var users = db.model('users', user);
        
        users.find({email: email}, callback);
    }
    model.addUser = function(email,callback){
        var users = db.model('users', user);
        
        var new_user = new users();
        
        new_user.email = email
        
        new_user.save(callback);
    }
    return model;
};