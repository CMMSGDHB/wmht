const express = require('express')
const admingoods = express.Router()
const fs = require('fs')
const formidable = require('formidable')



const co = require('co')
const OSS = require('ali-oss')
const client = new OSS({
	region: "xxxxxxxxxx",
	accessKeyId: "xxxxxx",
	accessKeySecret: "xxxxxx",
	bucket: "xxxxxx"
})

const ali_oss = {
	bucket: "xxxxxx",
	endPoint: "xxxxxxxxxx"
}


const db = require('../utils/db')
const getsha1 = require('../utils/getsha1')
const checkLogin = require('../utils/checkLogin')



admingoods.get('/goodslist', (req, res) => {
	db.query(`select goods.id,goods.foodname,goods.descr,goods.price,goods.foodpic,shoplists.shopname from goods,shoplists where goods.shoplist_id = shoplists.id`, (err, data, fields) => {
		res.render('AdminGoods/admingoodslist', { title: '商家食品列表', data: data, uname: req.session.uname })
	})
})



admingoods.get('/goodssearch',  (req, res) => {
	let { keywords } = req.query
	let sql = `select goods.id,goods.foodname,goods.descr,goods.price,goods.foodpic,shoplists.shopname from goods,shoplists where foodname like "%${keywords}%" and goods.shoplist_id = shoplists.id`
	db.query(sql, (err, data, fields) => {
		res.render('AdminGoods/admingoodslist', { title: '搜索列表', data: data, uname: req.session.uname })
	})
})




admingoods.get('/goodsdel',  (req, res) => {
	let { id } = req.query
	let sql = `delete from goods where  id = ${id}`
	db.query(sql, (err, results, fields) => {
		if (results.affectedRows > 0) {
			res.redirect('/admin/goodslist')
		} else {
			res.redirect('/admin/goodslist')
		}
	})
})



admingoods.get('/goodsadd',  (req, res) => {
	let sql = `select id,shopname from shoplists`
	db.query(sql, (err, data, fields) => {
		res.render('AdminGoods/admingoodsadd', {title: '商家食品添加',data: data,uname: req.session.uname
		})
	})
})

admingoods.post('/goodsdoadd',  (req, res) => {
	const form = formidable({
		keepExtensions: true,
		uploadDir: './uploads',
		multiples: true
	})

	form.parse(req, (err, fields, files) => {
		let { foodname, descr, price,shoplist_id } = fields
		let { newFilename, filepath } = files.foodpic

		co(function* () {
			client.useBucket(ali_oss.bucket);
			var result = yield client.put(newFilename, filepath);
			fs.unlinkSync(filepath);

			return res.end(JSON.stringify({ status: '100', msg: '上传成功' }));
		}).catch(function (err) {
			res.end(JSON.stringify({ status: '101', msg: '上传失败', error: JSON.stringify(err) }))
		});



		let sql = `insert into goods(foodname,foodpic,descr,price,shoplist_id) values('${foodname}','${newFilename}','${descr}','${price}',${shoplist_id})`
		db.query(sql, (err, results, fields) => {
			if (results.affectedRows > 0) {
				res.redirect('/admin/goodslist')
			} else {
				res.redirect('/admin/goodsadd')
			}
		})
	})

})





admingoods.get('/goodsupdate',checkLogin,  (req, res) => {
	let {id} = req.query
	let sql = `select * from goods where id = ${id}`
	db.query(sql, (err, data, fields) => {
		res.render('AdminGoods/admingoodsupdate', {title: '商家食品更新',data: data[0],uname: req.session.uname
		})
	})
})


admingoods.post('/goodsdoupdate',checkLogin,  (req, res) => {
	const form = formidable({
		keepExtensions: true,
		uploadDir: './uploads',
		multiples: true
	})


	form.parse(req, (err, fields, files) => {
		let { foodname, descr, price, id } = fields
		let { newFilename, filepath, size } = files.foodpic
		
		if (size > 0) {
			co(function* () {
				client.useBucket(ali_oss.bucket);
				var result = yield client.put(newFilename, filepath);
				fs.unlinkSync(filepath);

				return res.end(JSON.stringify({ status: '100', msg: '上传成功' }));
			}).catch(function (err) {
				res.end(JSON.stringify({ status: '101', msg: '上传失败', error: JSON.stringify(err) }))
			});


			let sql = `update goods set foodname='${foodname}',foodpic='${newFilename}',descr='${descr}',price='${price}' where id = '${id}'`
			db.query(sql, (err, results, fields) => {
				if (results.affectedRows > 0) {
					res.redirect('/admin/goodslist')
				} else {
					res.redirect('/admin/goodslist')
				}
			})
		} else {
			let sql = `update goods set foodname='${foodname}',descr='${descr}',price='${price}' where id = '${id}'`
			db.query(sql, (err, results, fields) => {
				if (results.affectedRows > 0) {
					res.redirect('/admin/goodslist')
				} else {
					res.redirect('/admin/goodslist')
				}
			})
		}
	})

})




module.exports = admingoods