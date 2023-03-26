const express = require('express')
const adminshop = express.Router()
const fs = require('fs')
const formidable = require('formidable')


// 阿里云服务
const co = require('co')
const OSS = require('ali-oss')
const client = new OSS({
	region: "xxxxxxxxxx",
	accessKeyId: "XXXXXXXXx",
	accessKeySecret: "XXXXXXXXx",
	bucket: "XXXXXXXXx"
})

const ali_oss = {
	bucket: "XXXXXXXXx",
	endPoint: "xxxxxxxxxx"
}


const db = require('../utils/db')
const getsha1 = require('../utils/getsha1')
const checkLogin = require('../utils/checkLogin')


adminshop.get('/shoplist',  (req, res) => {
    let page = (req.query.page == undefined) ? 0 : req.query.page
    let pages = parseInt(page) + 1
    let dataCount = 3 
    let startPage = page * dataCount

    let count = 'select count(*) as count from shoplists'
    let sql = `select * from shoplists limit ${startPage},${dataCount}`

    db.query(count, function (error, results, fields) {
        if (error) throw error
        let countNum = results[0].count
        db.query(sql, function (error, results, fields) {
            res.render('adminShop/adminshoplist', {
                title: '商家列表',
                datas: results,
                count: countNum,
                page: page,
                pages: pages,
                uname: req.session.uname
            })
        })
    })
})



adminshop.get('/shopsearch',  (req, res) => {
	let page = (req.query.page == undefined) ? 0 : req.query.page;
	let pages = parseInt(page) + 1;
	let startPage = page * 2;
	let { keywords } = req.query
	let count = `select count(*) as count from shoplists where shopname like "%${keywords}%"`
	let sql = `select * from shoplists where shopname like "%${keywords}%"`
	db.query(count, function (error, results, fields) {
		if (error) throw error;

		let countNum = results[0].count;
		db.query(sql, function (error, data, fields) {

			res.render('./AdminShop/adminshoplist', {
				title: '商家搜索列表',datas: data,count: countNum,page: page,pages: pages,uname: req.session.uname
			})
		})
	})
})




adminshop.get('/shopdel', (req, res) => {
	let { id } = req.query
	let sql = `delete from shoplists where  id = ${id}`
	db.query(sql, (err, results, fields) => {
		if (results.affectedRows > 0) {
			res.redirect('/admin/shoplist')
		} else {
			res.redirect('/admin/shoplist')
		}
	})
})



adminshop.get('/shopadd', (req, res) => {
	res.render('AdminShop/adminshopadd', { title: '商家入驻', uname: req.session.uname })
})

adminshop.post('/shopdoadd', (req, res) => {
	const form = formidable({
		keepExtensions: true,
		uploadDir: './uploads',
		multiples: true
	})

	form.parse(req, (err, fields, files) => {
		let { shopname, content, fee } = fields
		let { newFilename, filepath } = files.logo

		co(function* () {
			client.useBucket(ali_oss.bucket);
			var result = yield client.put(newFilename, filepath);
			fs.unlinkSync(filepath);

			return res.end(JSON.stringify({ status: '100', msg: '上传成功' }));
		}).catch(function (err) {
			res.end(JSON.stringify({ status: '101', msg: '上传失败', error: JSON.stringify(err) }))
		});




		let sql = `insert into shoplists(shopname,logo,content,fee) values('${shopname}','${newFilename}','${content}','${fee}')`
		db.query(sql, (err, results, fields) => {
			if (results.affectedRows > 0) {
				res.send(`<script>window.location.href='/admin/shoplist'</script>`)
			} else {
				res.redirect('/admin/shopadd')
			}
		})
	})

})





adminshop.get('/shopupdate',  (req, res) => {
	let { id } = req.query
	db.query(`select * from shoplists where id = ${id}`, (err, data, fields) => {
		res.render('AdminShop/adminshopupdate', { title: '店铺更新', data: data[0], uname: req.session.uname })
	})
})


adminshop.post('/shopdoupdate',  (req, res) => {
	const form = formidable({
		keepExtensions: true,
		uploadDir: './uploads',
		multiples: true
	})


	form.parse(req, (err, fields, files) => {
		let { shopname, content, fee, id } = fields
		let { newFilename, filepath, size } = files.logo

		if (size > 0) {

			co(function* () {
				client.useBucket(ali_oss.bucket);
				var result = yield client.put(newFilename, filepath);
				fs.unlinkSync(filepath);

				return res.end(JSON.stringify({ status: '100', msg: '上传成功' }));
			}).catch(function (err) {
				res.end(JSON.stringify({ status: '101', msg: '上传失败', error: JSON.stringify(err) }))
			});


			let sql = `update shoplists set shopname='${shopname}',logo='${newFilename}',content='${content}',fee='${fee}' where id = '${id}'`
			db.query(sql, (err, results, fields) => {
				if (results.affectedRows > 0) {
					res.redirect('/admin/shoplist')
				} else {
					res.redirect('/admin/shopadd')
				}
			})
		} else {
			let sql = `update shoplists set shopname='${shopname}',content='${content}',fee='${fee}' where id = '${id}'`
			db.query(sql, (err, results, fields) => {
				if (results.affectedRows > 0) {
					res.redirect('/admin/shoplist')
				} else {
					res.redirect('/admin/shopadd')
				}
			})
		}
	})

})




module.exports = adminshop