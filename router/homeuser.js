const express = require('express')
const homeuser = express.Router()

const db = require('../utils/db')
const getsha1 = require('../utils/getsha1')
const checkLogin = require('../utils/checkLogin')

// 列表
homeuser.get('/homeuserlist',  (req, res) => {
	db.query('select * from users order by id desc', (err, data, fields) => {
		res.render('HomeUser/homeuserlist', { title: '会员列表', data: data,uname:req.session.uname })
	})
})


// 搜索
homeuser.get('/homeusersearch',  (req, res) => {
	let {keywords} = req.query
	let sql = `select * from users where username like "%${keywords}%"`
	db.query(sql,(err,data,fields)=>{
		res.render('HomeUser/homeuserlist', { title: '搜索列表', data: data,uname:req.session.uname })
	})
})

// 详细信息
homeuser.get('/homeuserinfo',  (req, res) => {
	let {id} = req.query
	let sql = `select * from user_info where u_id = ${id}`
	db.query(sql,(err,data,fields)=>{
		res.render('HomeUser/homeuserinfo', { title: '会员详细信息', data: data,uname:req.session.uname })
	})
})


// 地址
homeuser.get('/homeuseraddress',  (req, res) => {
	let {uname} = req.query
	let sql = `select * from address where username = '${uname}'`
	db.query(sql,(err,data,fields)=>{
		res.render('HomeUser/homeuseraddress', { title: '会员收货地址', data: data,uname:req.session.uname })
	})
})



module.exports = homeuser