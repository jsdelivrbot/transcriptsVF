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

var bearer = "";
var isBotReady = false;
var dialogs = [];
var nowItsTime = Date.now();
var before = (nowItsTime - (1000*60*60*24));
var now = nowItsTime;



function sortDialogs(){
	now = Date.now();
	if(dialogs.length > 0){
		function compare(a,b) {
			if (a.info.startTimeL < b.info.startTimeL)
				return -1;
			if (a.info.startTimeL > b.info.startTimeL)
				return 1;
			return 0;
		}
		dialogs.sort(compare);
		console.log("tengo " + dialogs.filter(element => element.info.startTimeL > (now - (1000*60*60*24))).length + " elementi");
		dialogs = dialogs.filter(element => element.info.startTimeL > (now - (1000*60*60*24)));
		console.log("piu' vecchio timestamp: " + dialogs[0].info.startTimeL);
		console.log("max timestamp: " + (now - (1000*60*60*24)));
	}
	updateDialogs();
	
}



function updateDialogs(){
	
	var request = require('request');
	
	var conversationsToDownload = 0;
	var conversationsPartial = 0;
	var offset = 0;
	
	var body = JSON.parse('{"start":{"from":' + before + ',"to":' + now + '}, "status":["OPEN","CLOSE"]}');
	var oauth = "Bearer " + bearer;
	console.log(body);
		  
	 
	 
	function tryUntilSuccess(offset, callback) {
		var url = "https://lo.msghist.liveperson.net/messaging_history/api/account/13099967/conversations/search?offset=" + offset + "&limit=100";
	 
	 	request.post({
			url: url,
			json: true,
			body: body,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': oauth
			}
		}, function (e, r, b) {
			
			if(e){
				tryUntilSuccess(offset, callback);
			} else{
				if(offset == 0){
					conversationsToDownload = b._metadata.count;
				}
				if (conversationsToDownload > 0){
					conversationsPartial = conversationsPartial + b.conversationHistoryRecords.length;
					if(conversationsPartial < conversationsToDownload){
						offset = conversationsPartial;
						dialogs = dialogs.concat(b.conversationHistoryRecords);
						console.log ("adding conversations...");
						console.log(offset + " of --> " + conversationsToDownload);
						tryUntilSuccess(offset, callback);
					}
					else{
						console.log("last bucket: " + b.conversationHistoryRecords.length);
						dialogs = dialogs.concat(b.conversationHistoryRecords);
						console.log(dialogs.length);
						before = now + 1;
						isBotReady = true;
						dialogs = dialogs.filter(function(item, pos) {
							return dialogs.indexOf(item.info.conversationId) == pos;
						})
						setTimeout(function(){
							sortDialogs();
						}, 60000);
					}

				}
				else{
					console.log(dialogs.length);
					before = now + 1;
					setTimeout(function(){
						sortDialogs();
					}, 60000);
				}
			}
				      
                 });
	}
	 
	tryUntilSuccess(offset, function(err, resp) {
		 // Your code here...
	});
	
	
}


setInterval(function() {
    https.get("https://transcriptvf.herokuapp.com/");
}, 10000); // every 5 minutes (300000)

setInterval(function() {
    https.get("https://git.heroku.com/transcriptvf.git");
}, 600000); // every 5 minutes (300000) every 10 minutes (600000)



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
app.get('/download', function(req, res) {
	if (!isBotReady){
		res.send("errore");
	}  else{
		var ID = req.query.ID;
		var myResult = [];
		myResult = dialogs.filter(element => element.info.conversationId === ID);
		res.send(myResult);
	}
	

	
});


app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});


setTimeout(function(){
	bearer = echoAgent.transport.configuration.token;
	sortDialogs();
}, 10000);

