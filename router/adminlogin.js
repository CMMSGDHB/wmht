const express = require('express')
const adminlogin = express.Router()

const db = require('../utils/db')
const getsha1 = require('../utils/getsha1')




// 登录
adminlogin.get('/login', (req, res) => {
	res.render('AdminLogin/adminlogin', { title: '登录' })
})

adminlogin.post('/dologin', (req, res) => {
	let {uname,pwd} = req.body
	pwd = getsha1(pwd)
	let sql = `select * from admin_users where uname = '${uname}'`
	db.query(sql,(err,results,fields)=>{
		if (results.length <= 0) {
			res.send(`<script> alert('用户名错误');location.href="/admin/login"</script>`)
		} else {
			if(pwd !== results[0].pwd){
				res.send(`<script> alert('密码错误');location.href="/admin/login"</script>`)
			}else{
				req.session.uname = uname
				res.send(`<script> alert('登陆成功');location.href="/admin/index"</script>`)
			}
		}
	})
})







// 退出
adminlogin.get('/logout', (req, res) => {
	req.session.uname = ''
	res.redirect('/admin/login')
})

module.exports = adminlogin
