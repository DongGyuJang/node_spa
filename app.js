const express = require('express');
const app = express();
const port = 3000;

const connect = require('./schemas/index');
connect();


app.use(express.urlencoded({ extended: false })); //url 파싱 
//extended 옵션을 반드시 줘야한다 false로 주면 node.js에 기본으로 내장된 querystring 모듈 사용 / true일때는 qs모듈을 별도 추가로 설치필요
app.use(express.json()); // json 파싱
//body데이터를 해석하기 위해 app.use(2문장)와 같이 처리가 필요!

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const basicBoardRouter = require('./views/basicBoard/basicBoard');
app.use('/api', basicBoardRouter)

app.get('/', (req, res) => {
    res.render('./basicBoard/basicBoard');
})

app.get('/readBoard', (req, res) => {
    let boardId = req.query.boardId;
    res.render('./basicBoard/readBoard', { boardId });
})


app.get('/writeBoard', (req, res) => {
    res.render('./basicBoard/writeBoard');
})

app.get('/updateBoard', (req, res) => {
    res.render('./basicBoard/updateBoard');
})


app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
})