var mongo = require('../server/mongo');
module.exports = {
	registerGet:function (req,res) {
		return res.render('register');
	},
	registerPost:function(req,res){
		console.log('----------------------------');
		if (!req.body.username || !req.body.password){
	        return res.json({"errcode": "-1", "errmsg": "用户名或密码不能为空"});
		}
		var oUsername = req.body.username;
		mongo.findOne({username:oUsername},function(err,docs){	
			if(err){
				return res.json({"errcode":" -1", "errmsg": "查询错误"});
			}else if(docs){
				return res.json({"errcode": "-1", "errmsg": "该用户名已被注册"});
			}else{
				var info = {
					'username':req.body.username,
					'password':req.body.password
				};
				mongo.insertOne(info,function(err,result){
					if(err){
						return res.json({"errcode":"-1","errmsg":'注册失败'});
					}else{
						return res.json({"errcode":"0","errmsg":"注册成功"});
					}
				});
			}
		});
	}
}