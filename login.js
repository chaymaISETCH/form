app.post('/login', (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    var sql = "INSERT INTO utilisateur (username,email,mdp) VALUES ("+username+","+email+","+password+")";
    conn.query(sql, function (err, result) {
      console.log(sql);
    });

    res.render('view/login');
  })