module.exports = {
	AlbumsList :function (req,res) {
		console.log(req.params.name);
		return res.render('person',{person:req.params.name});
	}
}