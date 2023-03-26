
// 检查是否登录
function checkLogin(req,res,next){
	if(!req.session.uname){
		res.send(`<script> alert('请先登录后再操作');location.href="/admin/login"</script>`)
	}else{
		next()
	}
}

module.exports = checkLogin