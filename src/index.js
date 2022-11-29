import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'
import path from 'path'
import session from 'express-session';
import bodyParser from 'body-parser';
import { prisma } from "./services/prisma";
import { compare } from 'bcrypt';


dotenv.config()
const app = express();
app.use(cors());
app.use(express.json());
routes(app);

app.use(session({secret: 'inarcd91921asd'}))
app.use(bodyParser.urlencoded({ extended: true }));

//Static Files
app.engine('html', require('ejs').renderFile);
app.set("view engine", "html");
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/fonts', express.static(__dirname + 'public/fonts'));
app.set("views", path.join(__dirname, "views"));




app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.render('index', {api: process.env.API});
})

app.get('/blog', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.render('blog', {api: process.env.API});
})


app.post('/login', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if(req.body.sair == 'sair'){
        req.session.destroy();
        res.redirect('login', {api: process.env.API})
    }

    async function login(){
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email,
            }
        });
        if(!user){
            res.render('login', {api: process.env.API});
            return null;
        }
        if(user == undefined){
            res.render('login', {api: process.env.API});
            return null;
        }
        

        if(req.body.password == user.password){
            var id = user.id;
            req.session.login = id;
            res.render('postblog',  {id: id, api: process.env.API});
        }else{
            res.render('login');
        }
    }

    if(req.body.email && req.body.password != undefined) {
        login();
    }
})

app.get('/login', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if(req.session.login){  
        var id = req.session.login;
        res.render('postblog',  {id: id, api: process.env.API});
    }else{
        res.render('login', {api: process.env.API});
    }
})

app.get("/userconfig", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.render('user', {api: process.env.API})
})

app.post("/userconfig", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.render('user', {api: process.env.API})
})

let PORT = process.env.PORT || 3334
let API = process.env.API
console.log(API)
app.listen(PORT);
console.log("Server on port", PORT);