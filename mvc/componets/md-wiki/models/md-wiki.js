module.exports = function(db) { //calld when vork loads model every time
    var model = {};
    
    var Schema = db.Schema
    
    var mdFile = new Schema({
        location: String,
        content: String,
        date: Date,
        author: String
    });
    
    model.getFile = function(location,callback){
        var mdFile = db.model('mdFiles', mdFile);
        
        mdFile.find({location: location}, callback);
    }
    
    model.addFile = function(location,content,callback){
        var mdFiles = db.model('mdFiles', mdFile);
        
        var new_mdFile = new mdFiles();
        
        new_mdFile.location = location;
        new_mdFile.content = content;
        new_mdFile.date = new Date();
        new_mdFile.author = "";
        
        new_mdFile.save(callback);
    };
    return model;
};