const express = require('express')
const app = express()

// 加载静态资源
app.use(express.static('node_modules'))
app.use(express.static('public'))
app.use(express.static('uploads'))

// 加载视图
app.set('view engine', 'pug')
app.set('views', './views')

// 引入总路由
const ruter = require('./router/router')
app.use(ruter)

app.listen(8081, () => {
	console.log('ok');
})