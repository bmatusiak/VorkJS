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
        var mdFiles = db.model('mdFiles', mdFile);
        
        mdFiles.find({location: location}).exec(function(error,rows){
            
                callback(error,rows[rows.length-1]);
            });
    }
    
    model.addFile = function(location,content,author,callback){
        var mdFiles = db.model('mdFiles', mdFile);
        
        var new_mdFile = new mdFiles();
        
        new_mdFile.location = location;
        new_mdFile.content = content;
        new_mdFile.date = new Date();
        new_mdFile.author = author;
        
        new_mdFile.save(callback);
    };
    return model;
};