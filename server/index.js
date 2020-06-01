const express = require('express')
const app = express()
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'element-admin'
})

//跨域设置
app.use(require('cors')())

app.use(express.json())

connection.connect((err, result) => {
    if (err) {
        console.log(err);
        console.log("连接失败");
        return;
    }
    console.log(result);
    console.log("连接成功");
})

/* const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/element-admin', {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true
})
const Article = mongoose.model('Article', new mongoose.Schema({
    title: { type: String },
    body: { type: String }
})) */


app.get('/', async(req, res) => {
        res.send('index')
    })
    //新增文章
app.post('/api/articles', async(req, res) => {
        let addSql = 'INSERT INTO articles(title,body) VALUES(?,?)'
        let addSqlParams = [req.body.title, req.body.body]
        connection.query(addSql, addSqlParams, (err, result) => {
                if (err) {
                    console.log('[增加失败] - ', err.message);
                    return;
                }
                res.send(result)
            })
            /* const article = await Article.create(req.body)
            res.send(article) */
            //console.log(req.body)
    })
    //文章列表
app.get('/api/articles', async(req, res) => {
        var sql = 'SELECT * FROM articles'
        connection.query(sql, function(err, rows) {
            if (err) res.send(err)
            res.send(rows)
        })
    })
    //删除文章
app.delete('/api/articles/:id', async(req, res) => {
        var id = req.params.id
        var sql = `DELETE FROM articles WHERE id=${id}`
        await connection.query(sql, function(err, rows) {
            if (err) {
                res.send(err)
            }
        })
        res.end()
    })
    //文章详情
app.get('/api/articles/:id', async(req, res) => {
        var id = req.params.id
        var sql = `SELECT * FROM articles WHERE id=${id}`
        connection.query(sql, function(err, rows) {
            if (err) res.send(err)
            res.send(rows)
        })
    })
    //修改文章
app.put('/api/articles/:id', async(req, res) => {
        var id = req.params.id
        var sql = `UPDATE articles SET title = ?,body = ? WHERE id=${id}`
        var addSqlParams = [req.body.title, req.body.body]
        connection.query(sql, addSqlParams, (err, result) => {
            if (err) {
                console.log('[修改失败] - ', err.message);
                return;
            }
            res.send(result)
        })

    })
    //connection.end()
app.listen(3001, () => {
    console.log('http://localhost:3001/')
})