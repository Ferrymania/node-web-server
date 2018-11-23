const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();
app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})

app.use(express.static(__dirname+'/public'));
// app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next)=>{
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}` ;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err) throw err;
        console.log('The log was appended to file' );
    });
    next();
});

app.use((req,res,next)=>{
    res.render('maintenence.hbs');
});


app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'Home',
        welcomeMessage:'Welcome to my website'
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About page'
    });
});

app.get('/bad',(req,res)=>{
    res.send('<h1>It seems you get bad url</h1>');
});

app.listen(3000,()=>{
    console.log('app listening on port 3000');
});
