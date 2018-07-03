// We use a Node plugin called Express to act as a web server
var express = require('express');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var https = require('https');


var cert_priv = fs.readFileSync('private.key');
var cert_pub = fs.readFileSync('publickey.crt');



setInterval(function() {
    https.get("https://marco-oauthserver.herokuapp.com/");
}, 10000); // every 5 minutes (300000)



var app = express();


app.listen();


app.set('port', (process.env.PORT || 5000));


// Required to allow access to the service across different domains
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Content-Type', 'text/plain');
  next();
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// If the user provides the URL "..../add"
app.get('/add', function(req, res) {



     var sub = req.query.sub;
     var cstatus = req.query.cstatus;
     var ctype = req.query.ctype;
     var customerID = req.query.customerID;
     var balance = req.query.balance;
     var socialId = req.query.socialId;
     var imei = req.query.imei;
     var userName = req.query.userName;
     var companySize = req.query.companySize;
     var accountName = req.query.accountName;
     var role = req.query.role;
     var lastPaymentDateDay = req.query.lastPaymentDateDay;
     var lastPaymentDateMonth = req.query.lastPaymentDateMonth;
     var lastPaymentDateYear = req.query.lastPaymentDateYear;
     var registrationDateDay = req.query.registrationDateDay;
     var registrationDateMonth = req.query.registrationDateMonth;
     var registrationDateYear = req.query.registrationDateYear;
     var firstname = req.query.firstname;
     var lastname = req.query.lastname;
     var visitorAgeAge = req.query.visitorAgeAge;
     var visitorAgeAgeYear = req.query.visitorAgeAgeYear;
     var visitorAgeAgeMonth = req.query.visitorAgeAgeMonth;
     var visitorAgeAgeDay = req.query.visitorAgeAgeDay;
     var email = req.query.email;
     var phone = req.query.phone;
     var gender = req.query.gender;
     var company = req.query.company;
     var expiresInMinutes = req.query.expiresInMinutes+"m";
    
     console.log(req.query.sub);
     console.log(req.query.phone);

     var token = jwt.sign({ 
        "iss": "https://something.it",
        "sub": sub, //becomes customer id in Customer Info SDE
        "preferred_username" : "JohnDoe", //becomes username in Customer Info SDE
        "phone_number" : "+1-10-344-3765333", //becomes imei in Customer Info SDE
        "given_name" : "Test", //becomes first part of name in Personal Info SDE
        "family_name" : "Test2", //becomnes second part of name in Personal Info SDE
        "email" : "email@email.com", //becomes Email adress in Peresonal Info SDE
        "gender" : "Male", //becomes gender in Personal Info SDE 
        "lp_sdes":[
            {
             "type":"ctmrinfo",
             "info":{
                 "cstatus":cstatus,
                 "ctype":ctype,
                 "customerId":sub, //workaround
                 "balance":balance,
                 "socialId":socialId,
                 "imei":imei,
                 "userName":userName,
                 "companySize":companySize,
                 "accountName":accountName,
                 "role":role,
                 "lastPaymentDate":{
                     "day":lastPaymentDateDay,
                     "month":lastPaymentDateMonth,
                     "year":lastPaymentDateYear
                 },
                 "registrationDate":{
                     "day":registrationDateDay,
                     "month":registrationDateMonth,
                     "year":registrationDateYear
                 }
             }
         },
          {
            "type": "personal",
                "personal": {
                "firstname":firstname,
                "lastname":lastname,
                "age": {
                   "age":visitorAgeAge,
                   "year":visitorAgeAgeYear,
                   "month":visitorAgeAgeMonth,
                   "day":visitorAgeAgeDay
               },
                "contacts": [{
                   "email":email,
                   "phone":phone
               }],
                "gender":gender,
                "company":company
            }
        }
    ]
    }, cert_priv, { algorithm: 'RS256', expiresIn:expiresInMinutes});


    
    
    console.log(token);
    console.log("*****");



    res.send({'result': token});
  
 
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


