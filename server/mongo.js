var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/myProject';

var conn = function (cb) {
    mongoClient.connect(url, function (err, db) {
        if(err){
        	console.log('数据库连接错误');
            return cb(err, null);
        }
        else{
        	console.log('数据库连接成功');
        	return cb(null, db);
        }	
    });
};

var insertOne = function (options, cb) {//options: 是需要插入的文档json
    conn(function (err, db) { // 连接数据库
        if(err){
        	console.log('错误')
            return cb(err, null);
        }
        else{
        	var col = db.collection('users');
	        col.insertOne(options, function (err, result) {
	            if(err){
	                console.log('插入错误');
	                return cb(err, null);
	            }else{
	                console.log('插入成功');
	                return cb(null);
	            }    
	        })
    	}
    });
}

var findOne=function(options,cb){
    conn(function(err,db){
        if(err){
            return cb(err,null);
        }else{
            var col = db.collection('users');
            col.findOne(options,function(err,docs){
                if(err){
                    return cb(err,null);
                }if(docs){
                    return cb(null,docs);
                }else{
                    return cb(null,null);
                }
            })
        }
    })
}
var updateOne = function(options,cb){
    var oldParam = {
        password: options.password//旧密码
    }
    var newParam = {
        $set:{
            password:options.passwordNew//新密码
        }
    }
    conn(function (err, db) {
        if(err)
            return cb(err, null);
        var col = db.collection('users');
        col.updateOne(oldParam, newParam, function (err, result) {
            if(err)
                return cb(err, null);
            console.log('更新成功');
            return cb(null, result);
        })
    })
}
module.exports={
    insertOne:insertOne,//插入数据
    findOne:findOne,//查询数据
    updateOne:updateOne//更新数据
}