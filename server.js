const express = require('express');
var conn = require('./connection');
var session = require('express-session');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;
conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
// test connection

 
const app = express();
app.use(express.urlencoded());
app.use(session({ resave: true ,secret: '123456' , saveUninitialized: true}));
const server = app.listen(8000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });
  
  app.get('/inscrit', (req, res) => {
         
   app.set('view engine','ejs');
   res.render('inscrit');
 });


  app.get('/home', (req, res) => {
   
     conn.query("SELECT q.idQuestion as id ,c.idchoix as idchoix ,texte, GROUP_CONCAT(choix) as choix FROM question q, choix c,choixquestion x where q.idQuestion=x.idQuestion and c.idChoix=x.idChoix group by texte  ", function (err, result, fields) {
      if (err) throw err;
      
      sersRows = JSON.parse(JSON.stringify(result));
       
      app.set('view engine','ejs');
      res.render('index2',{message:sersRows})
    });     
   
  });

  app.get('/', (req, res) => {
    
      
     app.set('view engine','ejs');
     res.render('login')
     


 });
  app.post('/server', (req, res) => {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'projetnodeing1@gmail.com',
        pass: 'ing12020'
      }
    });
    
    var mailOptions = {
      from: 'projetnodeing1@gmail.com',
      to: 'intissar.chrigui@gmail.com',
      subject: 'mise a jours du questionnaire',
      text: 'That was easy!'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log("error");
         
      } else {
         
        console.log('Email sent: ' + info.response);
      }
    });
    
   var idUser=req.session.idUser;
   
    const input = req.body.q1;
    var sql = "INSERT INTO reponce (idquestion, reponce,idUtilisateur) VALUES ("+1+",'"+input+"',"+idUser+"');"; 
  

    conn.query(sql, function (err, result) {
     
    }); 
    var sql =   "UPDATE utilisateur SET var = 1 WHERE utilisateur.id="+idUser+";"; 
    conn.query(sql);
    for(const row of sersRows) {
  
      const radioname="radio"+row.id;
     const q1 = req.body[radioname];
     var sql = "INSERT INTO reponce (idquestion, reponce,idUtilisateur) VALUES ("+row.id+",'"+q1+"','"+idUser+"')";
     conn.query(sql, function (err, result) {
   console.log(sql);
       
     });
    }
    rep="merci pour votre collaboration ";  
    res.render("valider",{message:rep});

    
  });

  app.post('/inscrit', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
/*     
    var salt = bcrypt.genSaltSync(saltRounds); 
    var hash = bcrypt.hash(password, salt); */
 
        var sql = "INSERT INTO utilisateur (username,email,var,mdp) VALUES ('"+username+"','"+email+"','"+0+"','"+password+"')";
        conn.query(sql, function (err, result) {
      console.log(sql);
        });
       
  
    res.render('login');
  });

  /* app.post('/login', function(request, response) {
    var username = request.body.username;
    var pass = request.body.password;
    var salt = bcrypt.genSaltSync(10);
    var myhash = bcrypt.hashSync(pass, salt);

    if (username && pass) {
      var sql="SELECT username,mdp FROM utilisateur WHERE username ='"+username+"';";
      conn.query(sql, function(error, results, fields) {
        if (results.length > 0) {
        
          if(bcrypt.compare(pass,results[0].mdp)){
            request.session.loggedin = true;
            request.session.username = username;
            response.redirect('/home');
          } 
        } else {
          response.send('Incorrect Username and/or Password!');
        }		
        	console.log("test2");
        response.render('login');
      });
    } else {
      console.log("test3");
      response.send('Please enter Username and Password!');
      response.render('login');
    }
  });
 */
 
 

  app.post('/auth', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
      var sql="SELECT id,username,mdp,var FROM utilisateur WHERE username ='"+username+"' and mdp ='"+password+"';";
      conn.query(sql, function(error, results, fields) {
       
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;
          request.session.idUser = results[0].id;
          console.log(results[0].var);
          if(results[0].var==0){
            response.redirect('/home');
          }else{
            response.render("valider",{message:"vous avez deja remplit le questionnaire"})
          }
          
        } else {
          response.render('login');
        }			
      });
    } else {
      response.render('login');
    }
  });
  
  app.get('/home', function(request, response) {
    if (request.session.loggedin) {
      response.send('Welcome back, ' + request.session.username + '!');
    } else {
      response.send('Please login to view this page!');
    }
    response.end();
  });

app.post('/deco', (request, res) => {
  if (request.session){
    request.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        res.render('login');
      }
    });
  }else{
    console.log("undefined");
  }
    
});