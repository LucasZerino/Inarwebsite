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
    res.render('index');
})

app.get('/blog', (req, res) => {
    res.render('blog');
})


app.post('/login', (req, res) => {
    console.log(req.body.email);
    console.log(req.body.password);
    console.log(req.body.sair);
    if(req.body.sair == 'sair'){
        req.session.destroy();
        res.redirect('login')
    }

    async function login(){
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email,
            }
        });
        if(!user){
            res.render('login');
            return null;
        }
        if(user == undefined){
            res.render('login');
            return null;
        }
        

        if(req.body.password == user.password){
            console.log("senhas iguais!")
            var id = user.id;
            req.session.login = id;
            console.log(req.session.login);
            res.render('postblog',  {id: id});
        }else{
            console.log("senhas diferentes!")
            res.render('login');
        }
    }

    if(req.body.email && req.body.password != undefined) {
        login();
    }
})

app.get('/login', (req, res) => {
    if(req.session.login){  
        var id = req.session.login;
        res.render('postblog',  {id: id});
    }else{
        res.render('login');
    }
})

app.get("/userconfig", (req, res) => {
    res.render('user')
})

app.post("/userconfig", (req, res) => {
    res.render('user')
})



app.use(cors());
app.use(express.json());
routes(app);

app.listen(3334);
console.log("Server on port", 3334);