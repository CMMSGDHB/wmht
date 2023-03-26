const express = require('express')
const adminuser = express.Router()

const db = require('../utils/db')
const getsha1 = require('../utils/getsha1')
const checkLogin = require('../utils/checkLogin')

// 列表
adminuser.get('/userlist', (req, res) => {
	db.query('select * from admin_users order by id desc', (err, data, fields) => {
		res.render('AdminUser/adminuserlist', { title: '管理员列表', data: data,uname:req.session.uname })
	})
})


// 搜索
adminuser.get('/usersearch',  (req, res) => {
	let {keywords} = req.query
	// console.log(req.query);
	let sql = `select * from admin_users where uname like "%${keywords}%"`
	db.query(sql,(err,data,fields)=>{
		res.render('AdminUser/adminuserlist', { title: '搜索列表', data: data,uname:req.session.uname })
	})
})

// 添加
adminuser.get('/useradd', (req, res) => {
	res.render('AdminUser/adminuseradd', { title: '管理员添加',uname:req.session.uname })
})

adminuser.post('/userdoadd', (req, res) => {
	let {uname, pwd} = req.body
	pwd = getsha1(pwd)
	let sql = `insert into admin_users(uname,pwd) values('${uname}','${pwd}')`
	db.query(sql,(err,results,fields)=>{
		if (results.affectedRows > 0) {
			res.redirect('/admin/userlist')
		} else {
			res.redirect('/admin/useradd')
		}
	})
	
})




// 删除
adminuser.get('/userdel', (req,res)=>{
	let {id} = req.query
	let sql = `delete from admin_users where  id = ${id}`
	db.query(sql,(err,results,fields)=>{
		if (results.affectedRows > 0) {
			res.redirect('/admin/userlist')
		} else {
			res.redirect('/admin/userlist')
		}
	})
})



// 更新
adminuser.get('/userupdate', (req,res)=>{
	let {id} = req.query
	let sql = `select * from admin_users where  id = ${id}`
	db.query(sql,(err,results,fields)=>{
		let [data] = results
		res.render('AdminUser/adminuserupdate', { title: '管理员修改',data:data,uname:req.session.uname})
	})
})

adminuser.post('/userdoupdate', (req, res) => {
	let {uname, pwd,id} = req.body
	pwd = getsha1(pwd)
	let sql = `update admin_users set uname='${uname}', pwd='${pwd}' where id=${id}`
	db.query(sql,(err,results,fields)=>{
		if (results.affectedRows > 0) {
			res.redirect('/admin/userlist')
		} else {
			res.redirect('/admin/useradd')
		}
	})
	
})



module.exports = adminuser