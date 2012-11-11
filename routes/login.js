
app.get('/login/', function(req, res){
  res.send("do passport login");
});

app.get('/loginComplete/', function(req, res){
  res.send("done login yayyy");
});

