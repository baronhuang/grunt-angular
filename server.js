/**
 * Created by Administrator on 2016/11/15 0015.
 */

/*angular笔记本的服务器端代码*/
var express= require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();
/*解释post请求的body*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var successMsg = {
    statusCode: 200,
    data: null,
    message: 'success'
}
var errorMsg = {
    statusCode: 500,
    data: null,
    message: 'error'
}

/*获取列表*/
app.use('/listNotes', function (req, res) {
    delete require.cache[require.resolve('./dataList.json')];
    var data = require('./dataList.json');
    console.log(data);
    res.send( Object.assign({}, successMsg, {data: data}));
})

/*获取单条*/
app.use('/getNote', function (req, res) {
    var id = req.query.id;
    var data = require('./dataList.json');
    var filters = data.filter(function (item, i) {
        console.log(item, i);
        if(item.id == id){
            return item;
        }
    });

    if(filters.length > 0){
        filters = filters[0];
    }else{
        filters = null;
    }

    res.send( Object.assign({}, successMsg, {data: filters}));
})

/*创建记录*/
app.use('/createNote', function (req, res) {
    var data = require('./dataList.json');
    var note = {
        id: new Date().getTime(),
        title: req.body.title,
        content: req.body.content
    }
    data.push(note);
    fs.writeFile( './dataList.json', JSON.stringify(data, null, 2), 'utf8');
    res.send(successMsg);
})

/*更新记录*/
app.use('/updateNote', function (req, res) {
    var data = require('./dataList.json');
    data.forEach(function (item, i) {
        if(item.id == req.body.id){
            item.title = req.body.title;
            item.content = req.body.content;
        }
    });
    fs.writeFile( './dataList.json', JSON.stringify(data, null, 2), 'utf8');
    res.send(successMsg);
})

/*删除记录*/
app.use('/removeNote', function (req, res) {
    delete require.cache[require.resolve('./dataList.json')];
    var data = require('./dataList.json');
    data = data.filter(function (item, i) {
        if(item.id != req.query.id){
            return item;
        }
    });
    fs.writeFile( './dataList.json', JSON.stringify(data, null, 2), 'utf8');
    res.send(successMsg);
})

app.listen(3000, function (err) {
    if (err) {
        console.error(err);
        return;
    }

    console.log('listening on http://127.0.0.1:3000');
});