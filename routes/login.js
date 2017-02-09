var mongo = require('../server/mongo');
module.exports = {
	loginGet: function(req,res){
		return res.render('login');
	},
	loginPost : function (req, res) {
	    if (!req.body.username || !req.body.password){
	        return res.send({errcode: -1, errmsg: '用户名或密码不能为空'});
	    }
	    // if (req.session.username && req.session.username == req.body.username){
	    //     return res.send({errcode: -1, errmsg: '该用户已登录'});
	    // }
	    mongo.findOne({username: req.body.username}, function (err, docs) {
	        if (err){
	            return res.send({errcode: -1, errmsg: '查询错误'});
	        }
	        if (docs) {
	            //登录
	            if (docs.username == req.body.username && docs.password == req.body.password) {
	                //登录成功，保存session
	                // req.session.username = req.body.username;
	                // return res.send({errcode: 0, errmsg: '登录成功'});
	                return res.redirect('/person/'+req.body.username);
	            } else {
	                return res.send({errcode: -1, errmsg: '用户名或者密码错误'});
	            }
	        } else {
	            //注册
	            return res.redirect('/register');
	        }
	    });
	    console.log(req.body);
	}
}

