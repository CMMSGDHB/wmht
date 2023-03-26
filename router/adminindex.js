const express = require('express')
const adminindex = express.Router()

const db = require('../utils/db')
const getsha1 = require('../utils/getsha1')
const checkLogin = require('../utils/checkLogin')


adminindex.all('/index', async (req, res) => {
    const dataArr = []
    let sql = `select count(*) as admin_users from admin_users`
    let res1 = await getData(sql)
    dataArr.push(res1[0].admin_users)

    let sql2 = `select count(*) as goods from goods`
    let res2 = await getData(sql2)
    dataArr.push(res2[0].goods)

    let sql3 = `select count(*) as shops from shoplists`
    let res3 = await getData(sql3)
    dataArr.push(res3[0].shops)

    let sql4 = `select count(*) as users from users`
    let res4 = await getData(sql4)
    dataArr.push(res4[0].users)

    res.render('AdminIndex/adminindex', {
        title: '后台数据',uname: req.session.uname,data: dataArr
    })


function getData(sql) {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, data, fields) => {
            if (data.length > 0) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}

})


module.exports = adminindex
