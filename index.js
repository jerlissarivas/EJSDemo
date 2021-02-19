const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json')

// MIDDLEWARE

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))


// ROUTES

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/dogs', (req, res) => {
    const dogs = ['Toby', 'Madden', 'Otis'];
    res.render('dogs', { dogs })
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if(data){
        res.render('subreddit', { ...data })
    } else {
        res.render('notfound', { subreddit })
    }
})

app.get('/random', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('random', { num }) 
})

app.listen(3000, () => {
    console.log("Listening on 3000")
})