var mongo = require('../server/mongo');
module.exports = {
	updateGet:function (req,res) {
		return res.render('update');
	},
	updatePost:function(req,res){
		if (!req.body.username || !req.body.password)
	        return res.send({errcode: -1, errmsg: '用户名或密码不能为空'});
	    //判断是否登录
	    // if (!req.session.username){
	    //     return res.send({errcode: -1, errmsg: '用户未登录'});
	    // }
	    mongo.findOne({username: req.body.username}, function (err, docs) {
	        if (err){
	            return res.send({errcode: -1, errmsg: '查询错误'});
	        }
	        if (docs) {//用户存在
	            if (docs.username !== req.body.username || docs.password !== req.body.password) {
	                return res.send({errcode: -1, errmsg: '原始用户名或密码错误！'});
	            } else {
	                mongo.updateOne(req.body, function (err, result) {
	                    if (err)
	                        return res.send({errcode: -1, errmsg: '更新错误'});
	                    // console.log('-----更新成功', result);
	                    return res.send({errcode: 0, errmsg: '更新成功'});
	                })
	            }
	        } else {//用户不存在
	            return res.redirect('/register') //重定向到另一个路由地址
	        }
	    })
	}
}