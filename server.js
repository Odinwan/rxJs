const express = require('express');

const app = express();
const server = require('http').Server(app);

let news = [
    {
        id: '1q2w3e',
        rate: 5,
        title: 'Джуманджи',
        image: 'https://www.kino-teatr.ru/movie/posters/big/4/135034.jpg'
    },{
        id: '1f2f12f',
        rate: 5,
        title: 'Дулилт',
        image: 'https://kino-teatr.ua/public/main/films/2019-12/x4_poster_5e046530df98d.jpg'
    },{
        id: 'asdh12f',
        rate: 1000,
        title: 'Дом 2',
        image: 'https://www.vokrug.tv/pic/product/3/7/4/a/374ae9e90f4a55a53d88d1d5d24e61ab.jpg'
    },
]

app.use(express.json())
app.use(express.urlencoded({extended: true})) //парсинг ссылки

app.get('/post', (req, res) => {
    res.json(news)
});

app.post('/post', (req, res) => {
    const temp = [];
    news.map((item) => {
        if (item.id === req.body.id) {
            temp.push(req.body);
        } else {
            temp.push(item);
        }
    });
    news = temp
    res.json(temp)
});

server.listen(9999, (error) => {
    if (error) {
        throw Error(error)
    }
    console.log('server listening')
})

