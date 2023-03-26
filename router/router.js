const express = require('express')
const router = express.Router()



// bodyparser
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: false})); 
router.use(bodyParser.json()); 



// session
const session = require('express-session')
router.use(session({
	secret:'keyboard cat',
	saveUninitialized:false,
	resave:true,
	cookie:{maxAge:86400000}
}))



// 引入子路由
const adminuser = require('../router/adminuser')
const adminlogin = require('../router/adminlogin')
const adminhomeuser = require('../router/homeuser')
const adminshop = require('../router/adminshop')
const admingoods = require('../router/admingoods')
const adminorders = require('../router/adminorders')
const adminindex = require('../router/adminindex')
const api = require('../router/api')


router.use('/admin', adminuser)
router.use('/admin', adminlogin)
router.use('/admin', adminhomeuser)
router.use('/admin', adminshop)
router.use('/admin', admingoods)
router.use('/admin', adminorders)
router.use('/admin', adminindex)
router.use('/admin', api) // 后台api模块 用于和前端对接

module.exports = router