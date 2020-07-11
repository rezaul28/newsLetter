const express = require('express');
const bodyParsa = require('body-parser')
const http = require ('https');


const app = express();

app.use(bodyParsa.urlencoded({extended : true}));
app.use(express.static('public'));

app.get("/", function(req, res){
  res.sendFile(__dirname+'/index.html');
})

app.post("/", function(req, res){
  var fname=req.body.fName;
  var lname=req.body.lName;
  var email=req.body.email;
  var data = {
  members : [
    {
      email_address : email,
      status: 'subscribed',
      merge_fields : {
        FNAME : fname,
        LNAME : lname
      }
    }
  ]

  }
  var json=JSON.stringify(data);
  console.log(json);
  const url ="https://us10.api.mailchimp.com/3.0/lists/bac64b0895";
  const options = {
    method : 'POST',
    auth : 'rezaul:api'
  }

  const request=http.request(url, options, function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname+'/success.html');
    }
    else{
      res.sendFile(__dirname+'/failed.html');
    }
    response.on('data', function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(json);
  request.end();
})

app.listen(process.env.PORT || 3000, function(){})

// api
// 53640a1ae43e4f9c11fefb5fc6b7e6b4-us10

// listId
// bac64b0895
