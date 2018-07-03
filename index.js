// We use a Node plugin called Express to act as a web server
var express = require('express');
var https = require('https');

const Agent = require('node-agent-sdk').Agent;
var echoAgent = new Agent({
	accountId: '13099967',
	username: 'vftranscripts',
	appKey: '3cd846fcdfaf4a7fa40ce6082b0b0456',
	secret: '11ab78c76ac74000',
	accessToken: 'c598d91bf5184acba1dd5750782d557b',
	accessTokenSecret: '7b861610c4e51db0'
});
var isBotReady = 0;
var bearer = "";
var dialogs = [];
var before = (Date.now() - (1000*60*60*24*30));
var now = Date.now();



function updateDialogs(){
	var now = Date.now();
	var request = require('request');
	
	var conversationsToDownload = 0;
	var conversationsPartial = 0;
	var offset = 0;
	
	var body = '{"start":{"from":' + before + ',"to":' + now + '}, "status":["OPEN","CLOSE"]}';	
		  
	 
	 
	function tryUntilSuccess(offset, callback) {
	 
	 	$.ajax({
                              url: "https://lo.msghist.liveperson.net/messaging_history/api/account/13099967/conversations/search?offset=" + offset + "&limit=100",
                              method: "POST",
                              jsonp: "cb",
                              jsonpCallback: "domainCallback",
                              cache: true,
                              contentType: "application/json",
                              data: body,
                              success: function success(data) {
				      
				      if(offset == 0){
					      conversationsToDownload = data._metadata.count;    
				      }
				      
				      conversationsPartial = conversationsPartial + data.conversationHistoryRecords.length;
				      if(conversationsPartial < conversationsToDownload){
					      offset = conversationsPartial;
					      dialogs = dialogs.concat(data.conversationHistoryRecords);
					      console.log ("adding conversations...");
					      console.log(offset + " of --> " + conversationsToDownload);
					      tryUntilSuccess(offset, callback);
				      }
				      else{
					      console.log("last bucket: " + data.conversationHistoryRecords.length);
					      dialogs = dialogs.concat(data.conversationHistoryRecords);
					      console.log(answer.length);
					      before = now + 1;
					      setInterval(function(){
						      updateDialogs();
					      }, 60000);
 
				      }
				      
     
				      
                              },
                              error: function error(e, text) {
				      document.getElementById("reportMSG").innerHTML = "System error. Please try again!";
				      document.getElementById("reportMSG").style = "color : red";  
                              },
                              beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + bearer); }
		});
	}
	var now = Date.now();
	 
	tryUntilSuccess(offset, function(err, resp) {
		 // Your code here...
	});
	
	
}


// setInterval(function() {
//     https.get("https://marco-oauthserver.herokuapp.com/");
// }, 10000); // every 5 minutes (300000)



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
	
	
	
	
	res.send({'result': token});
});


app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});


setTimeout(function(){
	bearer = echoAgent.transport.configuration.token;
	updateDialogs();
}, 10000);

