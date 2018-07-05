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
var before = (nowItsTime - (1000*60*60*6));
var now = nowItsTime;





/***************

function exportData(exportObject){
		 testTypes = {
    			"start": "String",
    			"end": "String",
			"durationinseconds": "String",
			"efforttimegeneral": "String",
			"efforttimeoutbound": "String",
			"inactivetime": "String",
    			"agentgeneral": "String",
			"agentoutbound": "String",
			"teamgeneral": "String",
			"teamoutbound": "String",
			"skill": "String",
			"channel": "String",
			"night": "String",
			"outbound": "String",
			"telefono": "String",
			"ricontatto": "String",
			"cfiscale": "String",
			"tags": "String",
			"triplettauno": "String",
			"triplettadue": "String",
			"triplettatre": "String",
			"limbo": "String",
			"limboGeneral": "String",
			"limboOutbound": "String",
			"limboaveragetime": "String",
			"risvegliata": "String",
			"risvegliataGeneral": "String",
			"risvegliataOutbound": "String",
			"freeze": "String",
			"freezeGeneral": "String",
			"freezeOutbound": "String",
			"risvFreeze": "String",
			"risvFreezeGeneral": "String",
			"risvFreezeOutbound": "String",
			"numeroagentigeneral": "String",
			"numeroagentioutbound": "String",
			"numerogruppigeneral": "String",
			"numerogruppioutbound": "String",
			"yesno": "String",
			"comments": "String",
			"endReason": "String",
			"timeToAccept": "String",
			"firstTimeAnswer": "String",
			"timestampFacebook_priv": "String",
			"timestampOutbound": "String",
			"timeInFacebook_bot": "String",
			"timestampLastActGen": "String",
			"timestampLastActOut": "String",
			"timestampNextUnfreeze": "String",
			"lastActivityAgent": "String",
			"lastTypeActivityAgent": "String",
			"customerName": "String",
			"phoneNumber": "String",
			"imeiNumber": "String",
    			"conversation": "String",
    			"transcript": "String",
			"campo1": "String",
			"campo2": "String",
			"campo3": "String"
		 };
		 
		 emitXmlHeader = function () {
    			var headerRow =  '<ss:Row>\n';
    			for (var colName in testTypes) {
        			headerRow += '  <ss:Cell>\n';
        			headerRow += '    <ss:Data ss:Type="String">';
        			headerRow += colName + '</ss:Data>\n';
        			headerRow += '  </ss:Cell>\n';        
    			}
    			headerRow += '</ss:Row>\n';    
    			return '<?xml version="1.0"?>\n' +
           			'<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n' +
           			'<ss:Worksheet ss:Name="Sheet1">\n' +
           			'<ss:Table>\n\n' + headerRow;
		};
		 
		 emitXmlFooter = function() {
    			return '\n</ss:Table>\n' +
           			'</ss:Worksheet>\n' +
           			'</ss:Workbook>\n';
		};
		 
		 jsonToSsXml = function (jsonObject) {
			var myLength = jsonObject.length
    			var row;
    			var col;
    			var xml;
    			var data = typeof jsonObject != "object" ? JSON.parse(jsonObject) : jsonObject;
    
    			xml = emitXmlHeader();
    			for (row = 0; row < myLength; row++) {
        			xml += '<ss:Row>\n';
      
        			for (col in data[0]) {
            				xml += '  <ss:Cell>\n';
            				xml += '    <ss:Data ss:Type="' + testTypes[col]  + '">';
            				xml += data[0][col] + '</ss:Data>\n';
            				xml += '  </ss:Cell>\n';
        			}
        			xml += '</ss:Row>\n';
				data.splice(0, 1);
    			}
    
    			xml += emitXmlFooter();
    			return xml;  
		};
		 

		download(jsonToSsXml(exportObject), 'transcripts.xls', 'application/vnd.ms-excel');
		
		 
}





function tryAnalysisUntilSuccess(generalCounter, answer) {
		var i = generalCounter;
		var totalLength = answer.length;
		if (i === totalLength){
			answer = [];
			exportData(exportObject);
			
		} else{
		
		
							var messages = "";
							var thismessage = "";
							var thisactor = "";
							var endReason = "";
							var length = answer[i].messageRecords.length;
							for (var m = 0; m < length; m++){
							      var type = answer[i].messageRecords[m].type;
							      if(type === "TEXT_PLAIN"){
								   thismessage = answer[i].messageRecords[m].messageData.msg.text;
								   // thismessage = thismessage.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/, '**emoticon**');
								   // thismessage = thismessage.replace(/www./, '**link**');
								   // thismessage = thismessage.replace(/http/, '**link**');
								   thismessage = thismessage.replace(/[&\/\\#+$~%<>{}]/g,'%d');
							      }
							      else{
								   thismessage = "-structured content-";
							      }
							      thisactor = answer[i].messageRecords[m].sentBy;
							      messages = messages + "     " + thisactor + ": " + thismessage;
						      }
						      if(answer[i].info.endTimeL === -1){
							      endReason = "IN_PROGRESS";
						      }
						      else{
							      if(answer[i].info.latestSkillName === "Limbo"){
								      endReason = "AUTO_CLOSURE";
      
							      }else{
								      endReason = answer[i].info.closeReason;
							      }
						      }
						      
						      
						      
						      
						      var TimeAnswer = 0;
						      var whatTime = 0;
						      var firstTimeAnswer = "";
						      var isAnswered = 0;
						      var lastMessageAgent = 0;
						      var howManyMessages = answer[i].messageRecords.length;
						      if(howManyMessages){
							      for (var nh = (howManyMessages-1); nh >= 0; nh--){
								      if ((answer[i].messageRecords[nh].sentBy === "Agent") && (answer[i].messageRecords[nh].participantId !== "1089636032")){
									      lastMessageAgent = answer[i].messageRecords[nh].timeL;
									      nh = 0;
								      }
							      }
							      if (answer[i].messageRecords[0].sentBy === "Consumer"){
								      whatTime = answer[i].messageRecords[0].timeL;
								      isAnswered = 0;
								      for (var n = 1; n < howManyMessages; n++){
									      if(answer[i].messageRecords[n].sentBy === "Agent" && answer[i].messageRecords[n].participantId !== FacebookBotID){
										      TimeAnswer = (answer[i].messageRecords[n].timeL - whatTime)/1000;
										      isAnswered = 1;
										      n = howManyMessages;
									      }
								      }
								      
								      if (isAnswered){
									      firstTimeAnswer = Math.floor(parseInt(TimeAnswer));
								      }
								      else{
									      firstTimeAnswer = "NOT_ANSWERED"
								      }
							      }
						      }
						      var phoneNumber = "";
						      var imeiNumber = "";
						      var customerName = "";
						      var channel = "Web";
						      if(answer[i].hasOwnProperty('sdes')){
							      if(answer[i].sdes.events[0].hasOwnProperty('customerInfo')){
								      imeiNumber = answer[i].sdes.events[0].customerInfo.customerInfo.imei;
								      if(answer[i].sdes.events[0].customerInfo.customerInfo.customerId.indexOf("facebook") > -1){
									      channel = "FaceBook";
								      }
							      }
							      if(answer[i].sdes.events[1].hasOwnProperty('customerInfo')){
								      imeiNumber = answer[i].sdes.events[1].customerInfo.customerInfo.imei;
								      if(answer[i].sdes.events[1].customerInfo.customerInfo.customerId.indexOf("facebook") > -1){
									      channel = "FaceBook";
								      }
							      }
							      if(answer[i].sdes.events[0].hasOwnProperty('personalInfo')){
								      if(answer[i].sdes.events[0].personalInfo.personalInfo.contacts.length){
									      phoneNumber = answer[i].sdes.events[0].personalInfo.personalInfo.contacts[0].personalContact.phone;
									      if(answer[i].sdes.events[0].personalInfo.personalInfo.hasOwnProperty('name')){
										      var sdesName = answer[i].sdes.events[0].personalInfo.personalInfo.name;
									      }
									      else{
										      var sdesName = "";
									      }
									      if(answer[i].sdes.events[0].personalInfo.personalInfo.hasOwnProperty('surname')){
										      var sdesSurname = answer[i].sdes.events[0].personalInfo.personalInfo.surname;
									      }
									      else{
										      var sdesSurname = "";
									      }
									      customerName = sdesName + " " + sdesSurname;
								      }
							      }
							      
							      

							      
							   
							      var timestampFacebook_priv;
							      var timestampOutbound = 0;
							      var timestampNight = 0;
							      var timeSpentInFacebook_bot = 0;
							      var startingTime = 0;
							      var timeToAcceptFacebook = "-";
							      var firstTimeAnswerFacebook =  "-";
							      var participantID = 0;
							      var controlOB = 0;
							      var night = "No";
							      var campo1 = "";
							      if((channel === "FaceBook") || (channel === "Web")){
								      if(answer[i].hasOwnProperty('transfers')){
									      if (typeof answer[i].transfers !== 'undefined' && answer[i].transfers.length > 0) {
										      var arraylength = answer[i].transfers.length;
										      for (var z = 0; z < arraylength; z++){
											     if((answer[i].transfers[z].targetSkillName === "Facebook_priv") || (answer[i].transfers[z].targetSkillName === "Facebook_priv_night") || (answer[i].transfers[z].targetSkillName === "Fixed") || (answer[i].transfers[z].targetSkillName === "Fixed_risvegliata") || (answer[i].transfers[z].targetSkillName === "human") || (answer[i].transfers[z].targetSkillName === "human_night")){
												     startingTime = answer[i].transfers[z].timeL;
												     z = arraylength;
											     }
										      }
										      for (var p = 0; p < arraylength; p++){
											     if(answer[i].transfers[p].targetSkillName.indexOf("utbound") > -1){
												     timestampOutbound = new Date(answer[i].transfers[p].timeL);
												     p = arraylength;
												     controlOB = 1;
											     }
										      }
										      for (var t = 0; t < arraylength; t++){
											     if(answer[i].transfers[t].targetSkillName === "Facebook_priv_night"){
												     night = "Yes";
												     t = arraylength;
											     }
										      }
										      for (var tz = 0; tz < arraylength; tz++){
											     if(answer[i].transfers[tz].targetSkillName === "human_night"){
												     night = "Yes";
												     tz = arraylength;
											     }
										      }
										      if(controlOB === 0){
											      timestampOutbound = "-";
										      }
									      }
								      }
								      
								      if(channel === "FaceBook"){
									      
									      
									      if(answer[i].hasOwnProperty('sdes')){
										      if(answer[i].sdes.hasOwnProperty('events')){
											      var searchCustomerInfo = answer[i].sdes.events.length;
											      for (var wq = 0; wq  < searchCustomerInfo; wq ++){
												      if(answer[i].sdes.events[wq].hasOwnProperty('customerInfo')){
													      campo1 = answer[i].sdes.events[wq].customerInfo.customerInfo.customerId.replace('facebook_13099967_','');
													      wq = searchCustomerInfo;
												      }
											      }
										      }
									      }
									      
									 
									 if(answer[i].hasOwnProperty('agentParticipants') && answer[i].agentParticipants.length){
									      for (var b = 0; b < answer[i].agentParticipants.length; b++){
										      if((answer[i].agentParticipants[b].userTypeName === "Human") && (answer[i].agentParticipants[b].permission === "ASSIGNED_AGENT")){
											      participantID = answer[i].agentParticipants[b].agentId;
											      timeToAcceptFacebook = Math.floor((answer[i].agentParticipants[b].timeL - startingTime)/1000);
											      
											      b = answer[i].agentParticipants.length;
										      }
									      }
										
								      	}
									      
									if((startingTime === 0) || (timeToAcceptFacebook < 0)){
									      timeToAcceptFacebook = "-";
									      firstTimeAnswerFacebook = "-";
									      timestampFacebook_priv = "-";
									      timeSpentInFacebook_bot = "-";
								      } else{
									      timeToAcceptFacebook = timeToAcceptFacebook.toString();
									      firstTimeAnswerFacebook = firstTimeAnswer.toString();
									      timestampFacebook_priv = new Date(startingTime);
									      timeSpentInFacebook_bot = Math.floor((startingTime - answer[i].info.startTimeL)/1000);
								      }
									      
								      }
							      
							      	      if(channel === "Web"){
									      
									      if(answer[i].hasOwnProperty('agentParticipants') && answer[i].agentParticipants.length){
									      	for (var b = 0; b < answer[i].agentParticipants.length; b++){
										      if((answer[i].agentParticipants[b].userTypeName === "Human") && (answer[i].agentParticipants[b].permission === "ASSIGNED_AGENT")){
											      participantID = answer[i].agentParticipants[b].agentId;
											      timeToAcceptFacebook = Math.floor((answer[i].agentParticipants[b].timeL - answer[i].info.startTimeL)/1000);
											      
											      b = answer[i].agentParticipants.length;
										      }
									      	}
										
									      }
									      
									      timeSpentInFacebook_bot = "-";
									      
									     if(timeToAcceptFacebook < 0){
									      timeToAcceptFacebook = "-";
									      firstTimeAnswerFacebook = "-";
									      timestampFacebook_priv = "-";
									      
								      } else{
									      timeToAcceptFacebook = timeToAcceptFacebook.toString();
									      firstTimeAnswerFacebook = firstTimeAnswer.toString();
									      timestampFacebook_priv = new Date(answer[i].info.startTimeL);
									      
								      }
									 
									 
									      
								      }
								      
								      
								      
								      
								      
								      
								  
							      }
							      
							      
							      if(answer[i].sdes.events[1].hasOwnProperty('personalInfo')){
								      if(answer[i].sdes.events[1].personalInfo.personalInfo.contacts.length){
									      phoneNumber = answer[i].sdes.events[1].personalInfo.personalInfo.contacts[0].personalContact.phone;
									      if(answer[i].sdes.events[1].personalInfo.personalInfo.hasOwnProperty('name')){
										      var sdesName = answer[i].sdes.events[1].personalInfo.personalInfo.name;
									      }
									      else{
										      var sdesName = "";
									      }
									      if(answer[i].sdes.events[1].personalInfo.personalInfo.hasOwnProperty('surname')){
										      var sdesSurname = answer[i].sdes.events[1].personalInfo.personalInfo.surname;
									      }
									      else{
										      var sdesSurname = "";
									      }
									      customerName = sdesName + " " + sdesSurname;
								      }
							      }
						      }
						      
						      var yesno = "-";
						      var comments = "-";
						      var facebook_out = "No";
						      if(answer[i].hasOwnProperty('transfers')){
							      if (typeof answer[i].transfers !== 'undefined' && answer[i].transfers.length > 0) {
								      var arraylength = answer[i].transfers.length;
								      for (var z = 0; z < arraylength; z++){
									      if((answer[i].transfers[z].targetSkillName.indexOf("utbound")) > -1){
										      facebook_out = "Yes";
									      }
								      }
								      for (var z = (arraylength -1); z > -1; z--){
									      if(answer[i].transfers[z].hasOwnProperty('contextData')){
										      if(answer[i].transfers[z].contextData.hasOwnProperty('structuredMetadata')){
											      if(answer[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[0].id === "yesno"){
												      yesno = answer[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[0].name;
												      if (yesno !== undefined || yesno !== "---"){
													      comments = answer[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[1].name;
													      z = 0;
												      }
											      }
											      
										      }
									      }
								      }
							      }
						      }
						      if(yesno === undefined || yesno ==="-"){
							      yesno = "---";
						      }
						      var skill = answer[i].info.latestSkillName;
						      var limbo = 0;
						      var freeze = 0;
						      var risvegliata = 0;
						      var risvegliataFreeze = 0;
						      var risvegliataOutbound = 0;
						      var risvegliataGeneral = 0;
						      var risvegliataFreezeOutbound = 0;
						      var risvegliataFreezeGeneral = 0;
						      var limboOutbound = 0;
						      var limboGeneral = 0;
						      var freezeOutbound = 0;
						      var freezeGeneral = 0;
						      var isRisvegliataOutbound = false;
						      var limboaveragetime = 0;
						      var wasInLimbo = 0;
						      var startLimbo = 0;
						      var totalLimbo = 0;
						      var numero_telefono = "---";
						      var numero_ricontatto = "---";
						      var numero_cfiscale = "---";
						      var vfTag = "---";
						      var triplettauno = "---";
						      var triplettadue = "---";
						      var triplettatre = "---";
						      var lastTagFromAgent = 0;
						      if(answer[i].hasOwnProperty('transfers')){
							      if (typeof answer[i].transfers !== 'undefined' && answer[i].transfers.length > 0) {
								      
								      var arraylength = answer[i].transfers.length;
								      for (var z = (arraylength -1); z > -1; z--){
									      if(answer[i].transfers[z].hasOwnProperty('contextData')){
										      if(answer[i].transfers[z].contextData.hasOwnProperty('structuredMetadata')){
											      if(answer[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[0].id === "telefono"){
												      lastTagFromAgent = answer[i].transfers[z].timeL;
												      numero_telefono = answer[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[0].name;
												      numero_ricontatto = answer[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[1].name;
												      numero_cfiscale = answer[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[2].name;
												      vfTag = answer[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[3].name;
												      triplettauno = answer[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[4].name;
												      triplettadue = answer[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[5].name;
												      triplettatre = answer[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[6].name;
												      if(vfTag === "undefined"){
													      vfTag = "---";
												      }
												      if(triplettauno === "undefined"){
													     triplettauno = "---"; 
												      }
												      if(triplettadue === "undefined"){
													     triplettadue = "---"; 
												      }
												      if(triplettatre === "undefined"){
													     triplettatre = "---"; 
												      }
												      z = 0;
											      }
										      }
									      }
								      }
   
								      for (var z = 0; z < arraylength; z++){
									      if (answer[i].transfers[z].targetSkillName.indexOf("utbound") > -1){
										      isRisvegliataOutbound = true;
									      } else if (answer[i].transfers[z].targetSkillName.indexOf("acebook") > -1){
										      isRisvegliataOutbound = false;
									      } else if (answer[i].transfers[z].targetSkillName.indexOf("uman") > -1){
										      isRisvegliataOutbound = false;
									      } else if (answer[i].transfers[z].targetSkillName.indexOf("Fixed") > -1){
										      isRisvegliataOutbound = false;
									      }
									      if ((answer[i].transfers[z].targetSkillName === "Limbo") && (answer[i].transfers[z].sourceSkillName !== "Limbo")){
										      limbo = limbo +1;
										      if (isRisvegliataOutbound){
											      limboOutbound = limboOutbound + 1;
										      } else{
											      limboGeneral = limboGeneral + 1;
										      }
										      wasInLimbo = 1;
										      startLimbo = answer[i].transfers[z].timeL;
									      }
									      if ((answer[i].transfers[z].targetSkillName === "Freeze") && (answer[i].transfers[z].sourceSkillName !== "Freeze")){
										      freeze = freeze +1;
										      if (isRisvegliataOutbound){
											      freezeOutbound = freezeOutbound + 1;
										      } else{
											      freezeGeneral = freezeGeneral + 1;
										      }
									      }
									      if ((answer[i].transfers[z].targetSkillName !== "Limbo") && (answer[i].transfers[z].sourceSkillName === "Limbo")){
										      risvegliata = risvegliata +1;
										      if (isRisvegliataOutbound){
											      risvegliataOutbound = risvegliataOutbound + 1;
										      } else{
											      risvegliataGeneral = risvegliataGeneral + 1;
										      }
										      totalLimbo = totalLimbo + ((answer[i].transfers[z].timeL - startLimbo)/1000);
									      }
									      if ((answer[i].transfers[z].targetSkillName !== "Freeze") && (answer[i].transfers[z].sourceSkillName === "Freeze")){
										      risvegliataFreeze = risvegliataFreeze +1;
										      if (isRisvegliataOutbound){
											      risvegliataFreezeOutbound = risvegliataFreezeOutbound + 1;
										      } else{
											      risvegliataFreezeGeneral = risvegliataFreezeGeneral + 1;
										      }
									      }
								      }
							      }
						      }
						      if(wasInLimbo == 1){
							      if (totalLimbo > 0){
								     limboaveragetime = Math.floor(totalLimbo/limbo); 
							      }
							      else{
								     limboaveragetime = "non svegliata"; 
							      }
						      }
						      else{
							      limboaveragetime = "niente Limbo";
						      }
						      
						      var timeToAccept = 0;
						      TimeAnswer = 0;
						      whatTime = 0;
						      isAnswered = 0;
						      
						      
						      var effortTimeGeneral = 0;
						      var effortTimeOutbound = 0;
						      var lastAgentGeneral = "";
						      var lastAgentOutbound = "";
						      var lastTeamGeneral = "";
						      var lastTeamOutbound = "";
						      var lastProperTeamGeneral = "";
						      var lastProperTeamOutbound = "";
						      
						      var numberAgentsGeneral = 0;
						      var numberAgentsOutbound = 0;
						      var numberTeamsGeneral = 0;
						      var numberTeamsOutbound = 0;
						      
						      var arrayAgentsGeneral = [];
						      var arrayAgentsOutbound = [];
						      var arrayTeamsGeneral = [];
						      var arrayTeamsOutbound = [];
						      var arrayProperTeamsGeneral = [];
						      var arrayProperTeamsOutbound = [];
						      howManyMessages = answer[i].messageRecords.length;
						      var partialTime = 0;
						      if(howManyMessages){
						      		if(answer[i].hasOwnProperty('agentParticipants') && answer[i].agentParticipants.length){
									if(answer[i].hasOwnProperty('transfers')){
										var agentParticipantsLength = answer[i].agentParticipants.length;
										var transferLength = answer[i].transfers.length;
										var isGeneral = 0;
										var isOutbound = 0;
										var agentLoginName = "";
										var agentSkill = "";
										var sourceSkillName = "";
										var jumpInTimestamp = 0;
										
										for (var f = 0; f < transferLength; f++){
											if(answer[i].transfers[f].sourceSkillName.indexOf("bound") > -1){
												isGeneral = 0;
												isOutbound = 1;
												f = transferLength;
											} else if((answer[i].transfers[f].sourceSkillName.indexOf("acebook") > -1) || (answer[i].transfers[f].sourceSkillName.indexOf("uman") > -1) || (answer[i].transfers[f].sourceSkillName.indexOf("Fixed") > -1)){
												isGeneral = 1;
												isOutbound = 0;
												f = transferLength;
											}
										}
												
										for (var z = 0; z < agentParticipantsLength; z++){
											if((answer[i].agentParticipants[z].userTypeName === "Human") && (answer[i].agentParticipants[z].permission === "ASSIGNED_AGENT")){
												agentLoginName = answer[i].agentParticipants[z].agentLoginName;
												jumpInTimestamp = answer[i].agentParticipants[z].timeL;
												if(transferLength === 0){
													effortTimeGeneral = (answer[i].info.endTimeL - jumpInTimestamp)/1000;
													lastAgentGeneral = answer[i].agentParticipants[z].agentFullName;
													lastTeamGeneral = answer[i].agentParticipants[z].agentGroupName;
													lastProperTeamGeneral = answer[i].agentParticipants[z].agentGroupName;
													if(!arrayProperTeamsGeneral.includes(lastTeamGeneral)){
														arrayProperTeamsGeneral.push(lastTeamGeneral);
													}
													if(!arrayAgentsGeneral.includes(lastAgentGeneral)){
														arrayAgentsGeneral.push(lastAgentGeneral);
													}
													var agentAlberoLength = alberoArray.length;
													for(var counter = 0; counter < agentAlberoLength; counter++){
														if (alberoArray[counter].son === lastTeamGeneral){
															lastTeamGeneral = alberoArray[counter].father;
															counter = agentAlberoLength;
														}
													}
													if(!arrayTeamsGeneral.includes(lastTeamGeneral)){
														arrayTeamsGeneral.push(lastTeamGeneral);
													}
													z = agentParticipantsLength;
												}
												for (var f = 0; f < transferLength; f++){
													if(answer[i].transfers[f].timeL > jumpInTimestamp){
														if(answer[i].transfers[f].targetSkillName === "Limbo" || answer[i].transfers[f].targetSkillName === "Freeze" ){
															partialTime = (answer[i].transfers[f].timeL - jumpInTimestamp)/1000;
															if(isGeneral){
																effortTimeGeneral = effortTimeGeneral + partialTime;
																lastAgentGeneral = answer[i].agentParticipants[z].agentFullName;
																lastTeamGeneral = answer[i].agentParticipants[z].agentGroupName;
																lastProperTeamGeneral = answer[i].agentParticipants[z].agentGroupName;
																if(!arrayProperTeamsGeneral.includes(lastTeamGeneral)){
																	arrayProperTeamsGeneral.push(lastTeamGeneral);
																}
																if(!arrayAgentsGeneral.includes(lastAgentGeneral)){
																	arrayAgentsGeneral.push(lastAgentGeneral);
																}
																var agentAlberoLength = alberoArray.length;
																for(var counter = 0; counter < agentAlberoLength; counter++){
																	if (alberoArray[counter].son === lastTeamGeneral){
																		lastTeamGeneral = alberoArray[counter].father;
																		counter = agentAlberoLength;
																	}
																}
																if(!arrayTeamsGeneral.includes(lastTeamGeneral)){
																	arrayTeamsGeneral.push(lastTeamGeneral);
																}
															}
															if(isOutbound){
																effortTimeOutbound = effortTimeOutbound + partialTime;
																lastAgentOutbound = answer[i].agentParticipants[z].agentFullName;
																lastTeamOutbound = answer[i].agentParticipants[z].agentGroupName;
																lastProperTeamOutbound = answer[i].agentParticipants[z].agentGroupName;
																if(!arrayProperTeamsOutbound.includes(lastTeamOutbound)){
																	arrayProperTeamsOutbound.push(lastTeamOutbound);
																}
																if(!arrayAgentsOutbound.includes(lastAgentOutbound)){
																	arrayAgentsOutbound.push(lastAgentOutbound);
																}
																var agentAlberoLength = alberoArray.length;
																for(var counter = 0; counter < agentAlberoLength; counter++){
																	if (alberoArray[counter].son === lastTeamOutbound){
																		lastTeamOutbound = alberoArray[counter].father;
																		counter = agentAlberoLength;
																	}
																}
																if(!arrayTeamsOutbound.includes(lastTeamOutbound)){
																	arrayTeamsOutbound.push(lastTeamOutbound);
																}
															}
															f = transferLength;
														}
														else if((answer[i].transfers[f].targetSkillName.indexOf("acebook") > -1) || (answer[i].transfers[f].targetSkillName.indexOf("uman") > -1) || (answer[i].transfers[f].targetSkillName.indexOf("Fixed") > -1)){
															
															if(isOutbound){
																isGeneral = 1;
																isOutbound = 0;
																partialTime = (answer[i].transfers[f].timeL - jumpInTimestamp)/1000;
																effortTimeOutbound = effortTimeOutbound + partialTime;
																lastAgentOutbound = answer[i].agentParticipants[z].agentFullName;
																lastTeamOutbound = answer[i].agentParticipants[z].agentGroupName;
																lastProperTeamOutbound = answer[i].agentParticipants[z].agentGroupName;
																if(!arrayProperTeamsOutbound.includes(lastTeamOutbound)){
																	arrayProperTeamsOutbound.push(lastTeamOutbound);
																}
																if(!arrayAgentsOutbound.includes(lastAgentOutbound)){
																	arrayAgentsOutbound.push(lastAgentOutbound);
																}
																var agentAlberoLength = alberoArray.length;
																for(var counter = 0; counter < agentAlberoLength; counter++){
																	if (alberoArray[counter].son === lastTeamOutbound){
																		lastTeamOutbound = alberoArray[counter].father;
																		counter = agentAlberoLength;
																	}
																}
																if(!arrayTeamsOutbound.includes(lastTeamOutbound)){
																	arrayTeamsOutbound.push(lastTeamOutbound);
																}
																f = transferLength;
															}
														}
														else if(answer[i].transfers[f].targetSkillName.indexOf("utbound") > -1){
															
															if(isGeneral){
																isGeneral = 0;
																isOutbound = 1;
																partialTime = (answer[i].transfers[f].timeL - jumpInTimestamp)/1000;
																effortTimeGeneral = effortTimeGeneral + partialTime;
																lastAgentGeneral = answer[i].agentParticipants[z].agentFullName;
																lastTeamGeneral = answer[i].agentParticipants[z].agentGroupName;
																lastProperTeamGeneral = answer[i].agentParticipants[z].agentGroupName;
																if(!arrayProperTeamsGeneral.includes(lastTeamGeneral)){
																	arrayProperTeamsGeneral.push(lastTeamGeneral);
																}
																
																if(!arrayAgentsGeneral.includes(lastAgentGeneral)){
																	arrayAgentsGeneral.push(lastAgentGeneral);
																}
																var agentAlberoLength = alberoArray.length;
																for(var counter = 0; counter < agentAlberoLength; counter++){
																	if (alberoArray[counter].son === lastTeamGeneral){
																		lastTeamGeneral = alberoArray[counter].father;
																		counter = agentAlberoLength;
																	}
																}
																if(!arrayTeamsGeneral.includes(lastTeamGeneral)){
																	arrayTeamsGeneral.push(lastTeamGeneral);
																}
																f = transferLength;
															}
															
															
															
														}
													}
													if (f === (transferLength - 1)){
														if(answer[i].info.endTimeL > 0){
															partialTime = (answer[i].info.endTimeL - jumpInTimestamp)/1000;
														}
														
														if(isGeneral){
															effortTimeGeneral = effortTimeGeneral + partialTime;
															lastAgentGeneral = answer[i].agentParticipants[z].agentFullName;
															lastTeamGeneral = answer[i].agentParticipants[z].agentGroupName;
															lastProperTeamGeneral = answer[i].agentParticipants[z].agentGroupName;
															if(!arrayProperTeamsGeneral.includes(lastTeamGeneral)){
																arrayProperTeamsGeneral.push(lastTeamGeneral);
															}
															if(!arrayAgentsGeneral.includes(lastAgentGeneral)){
																arrayAgentsGeneral.push(lastAgentGeneral);
															}
															var agentAlberoLength = alberoArray.length;
															for(var counter = 0; counter < agentAlberoLength; counter++){
																if (alberoArray[counter].son === lastTeamGeneral){
																	lastTeamGeneral = alberoArray[counter].father;
																	counter = agentAlberoLength;
																}
															}
															if(!arrayTeamsGeneral.includes(lastTeamGeneral)){
																arrayTeamsGeneral.push(lastTeamGeneral);
															}
														}
														if(isOutbound){
															effortTimeOutbound = effortTimeOutbound + partialTime;
															lastAgentOutbound = answer[i].agentParticipants[z].agentFullName;
															lastTeamOutbound = answer[i].agentParticipants[z].agentGroupName;
															lastProperTeamOutbound = answer[i].agentParticipants[z].agentGroupName;
															if(!arrayProperTeamsOutbound.includes(lastTeamOutbound)){
																arrayProperTeamsOutbound.push(lastTeamOutbound);
															}
															if(!arrayAgentsOutbound.includes(lastAgentOutbound)){
																arrayAgentsOutbound.push(lastAgentOutbound);
															}
															var agentAlberoLength = alberoArray.length;
															for(var counter = 0; counter < agentAlberoLength; counter++){
																if (alberoArray[counter].son === lastTeamOutbound){
																	lastTeamOutbound = alberoArray[counter].father;
																	counter = agentAlberoLength;
																}
															}
															if(!arrayTeamsOutbound.includes(lastTeamOutbound)){
																arrayTeamsOutbound.push(lastTeamOutbound);
															}
														}
															
														
													}
												}
											}
										}
									}
								}
							}
							effortTimeGeneral = Math.floor(effortTimeGeneral);
						        effortTimeOutbound = Math.floor(effortTimeOutbound);
							// console.log("effortTimeGeneral: " + effortTimeGeneral + " ******** effortTimeOutbound: " + effortTimeOutbound);
						        // console.log("convID: " + answer[i].info.conversationId);
						      	numberAgentsGeneral = arrayAgentsGeneral.length;
						        numberAgentsOutbound = arrayAgentsOutbound.length;
						        numberTeamsGeneral = arrayTeamsGeneral.length;
						        numberTeamsOutbound = arrayTeamsOutbound.length;
						      
								      
						      
						      
						      
						      
						      
						      
						      
						      
						      
						      
						      
						      howManyMessages = answer[i].messageRecords.length;
						      if(howManyMessages){
							      if (answer[i].messageRecords[0].sentBy === "Consumer"){
								      whatTime = answer[i].messageRecords[0].timeL;
								      if(answer[i].hasOwnProperty('agentParticipants') && answer[i].agentParticipants.length){
									      for (var b = 0; b < answer[i].agentParticipants.length; b++){
										      if(answer[i].agentParticipants[b].userTypeName === "Human"){
											      TimeAnswer = (answer[i].agentParticipants[b].timeL - whatTime)/1000;
											      isAnswered = 1;
											      b = answer[i].agentParticipants.length;
										      }
									      }
										
								      }
								      if (isAnswered){
									      timeToAccept = parseInt(TimeAnswer);
								      }
								      else{
									      timeToAccept = "NOT_ACCEPTED"
								      }
							      }
						      }
						      
						      var efforttime = 0;
						      var startTimestamp = 0;
						      var managedByAgent = 0;
						      howManyMessages = answer[i].messageRecords.length;
						      if(howManyMessages && answer[i].hasOwnProperty('agentParticipants') && (answer[i].info.status) === "CLOSE"){
							      var howManyPartecipants = answer[i].agentParticipants.length;
							      if ((howManyPartecipants == 1) && (answer[i].agentParticipants[0].agentLoginName !== "facebookbot") && (answer[i].agentParticipants[0].permission === "ASSIGNED_AGENT") && !((answer[i].agentParticipants[0].agentLoginName).indexOf("@") > -1)){
								      efforttime = ((answer[i].messageRecords[(howManyMessages - 1)].timeL - answer[i].agentParticipants[0].timeL)/1000);
							      }
							      else{
								      for (var z = 0; z < howManyPartecipants; z++){
									      if ((answer[i].agentParticipants[z].agentLoginName !== "facebookbot") && (answer[i].agentParticipants[z].permission === "ASSIGNED_AGENT") && !((answer[i].agentParticipants[z].agentLoginName).indexOf("@") > -1) && !managedByAgent){
										      startTimestamp = answer[i].agentParticipants[z].timeL;
										      managedByAgent = 1;
									      } else if(managedByAgent && (answer[i].agentParticipants[z].agentLoginName === "facebookbot")){
										      efforttime = efforttime + ((answer[i].agentParticipants[z].timeL - startTimestamp)/1000);
										      managedByAgent = 0;
									      }
								      }
								      if(managedByAgent){
									      efforttime = efforttime + ((answer[i].messageRecords[(howManyMessages - 1)].timeL - startTimestamp)/1000);
								      }
							      }
						      }
						      if (efforttime < 0){
							     efforttime = "---"; 
						      }
						      if (efforttime == 0){
							    efforttime = "---";  
						      }
						      else{
							    efforttime = Math.floor(efforttime)  
						      }
						      
						      if(answer[i].hasOwnProperty('agentParticipants')){
							      var arrayPartecipantAgents = [];
							      var arrayPartecipantGroups = [];
							      var howManyPartecipants = answer[i].agentParticipants.length;
							      for (var z = 0; z < howManyPartecipants; z++){
								      if((answer[i].agentParticipants[z].agentLoginName !== "facebookbot") && (answer[i].agentParticipants[z].permission === "ASSIGNED_AGENT") && !((answer[i].agentParticipants[z].agentLoginName).indexOf("@") > -1)){
									      if(!arrayPartecipantAgents.includes(answer[i].agentParticipants[z].agentLoginName)){
										      arrayPartecipantAgents.push(answer[i].agentParticipants[z].agentLoginName);
									      }
									      if(!arrayPartecipantGroups.includes(answer[i].agentParticipants[z].agentGroupName)){
										      arrayPartecipantGroups.push(answer[i].agentParticipants[z].agentGroupName);
									      }
								      }
							      }
							      var numeroagenti = arrayPartecipantAgents.length;
							      var numerogruppi = arrayPartecipantGroups.length;
							      // console.log(arrayPartecipantAgents);
							      // console.log(arrayPartecipantGroups);
						      }
						      
						      var endDateEngagement = "";
						      var durationinseconds = "";
						      var startDateEngagement = new Date(answer[i].info.startTimeL);
						      if (answer[i].info.endTimeL != -1){
							      endDateEngagement = new Date(answer[i].info.endTimeL);
							      durationinseconds = Math.floor((answer[i].info.endTimeL - answer[i].info.startTimeL)/1000);
						      }
						      else{
							      endDateEngagement = "---";
							      durationinseconds = "---";
						      }
						      
						      var lastActivityAgent = 0;
						      var lastTypeActivityAgent = 0;
						      if((lastMessageAgent !== 0) || (lastTagFromAgent !== 0)){
							      if(lastMessageAgent > lastTagFromAgent){
								      lastActivityAgent = new Date(lastMessageAgent);
								      lastTypeActivityAgent = "Message";
							      } else{
								      lastActivityAgent = new Date(lastTagFromAgent);
								      lastTypeActivityAgent = "Tag";
							      }
						      }
						      
						      var inactivetime = durationinseconds - effortTimeGeneral - effortTimeOutbound;
						      
						      
						      
						      var timestampLastActGen = 0;
						      var timestampLastActOut = 0;
						      
						      // if(answer[i].info.conversationId === "0a0c7e37-467b-4de9-bf36-8c2ea0e7c2d3"){
								// console.log("hoooray!!");
						       // }
						      
						      howManyMessages = answer[i].messageRecords.length;
						      if(howManyMessages){
						      		
									var transferLength = answer[i].transfers.length;
									var thisIsGeneral = false;
									var thisIsOutbound = false;
									var startThisPeriod = 0;
									var endThisPeriod = 0;
									var lastMessageSentGeneral = 0;
									var lastMessageSentOutbound = 0;
									for (var z = 0; z < transferLength; z++){
										if((answer[i].transfers[z].targetSkillName.indexOf("acebook") > -1) || (answer[i].transfers[z].targetSkillName.indexOf("uman") > -1) || (answer[i].transfers[z].targetSkillName.indexOf("Fixed") > -1)){
											if(!thisIsGeneral){
												thisIsGeneral = true;
												startThisPeriod = answer[i].transfers[z].timeL;
											}
										}
										if(answer[i].transfers[z].targetSkillName.indexOf("utbound") > -1){
											if(thisIsGeneral){
												thisIsGeneral = false;
												endThisPeriod = answer[i].transfers[z].timeL;
												for (var m = (howManyMessages - 1); m > -1 ; m--){
													if((answer[i].messageRecords[m].timeL < endThisPeriod) && (answer[i].messageRecords[m].timeL > startThisPeriod) && (answer[i].messageRecords[m].sentBy === "Agent") && (answer[i].messageRecords[m].participantId !== "1089636032")){
														lastMessageSentGeneral = answer[i].messageRecords[m].timeL;
														m = 0;
													}
												}
											}
										}
										if(thisIsGeneral){
											if(answer[i].transfers[z].hasOwnProperty('contextData')){
												if(answer[i].transfers[z].contextData.hasOwnProperty('structuredMetadata')){
													if(answer[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[0].id === "telefono"){
														timestampLastActGen = answer[i].transfers[z].timeL;
													}
													if(answer[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[0].id === "awakeLater"){
														timestampLastActGen = answer[i].transfers[z].timeL;
													}
												}
											}
											if((transferLength - z) === 1){
												endThisPeriod = Date.now();
												for (var m = (howManyMessages - 1); m > -1 ; m--){
													if((answer[i].messageRecords[m].timeL < endThisPeriod) && (answer[i].messageRecords[m].timeL > startThisPeriod) && (answer[i].messageRecords[m].sentBy === "Agent") && (answer[i].messageRecords[m].participantId !== "1089636032")){
														lastMessageSentGeneral = answer[i].messageRecords[m].timeL;
														m = 0;
													}
												}
											}
										}
										
										
									}
									if(lastMessageSentGeneral > timestampLastActGen){
										timestampLastActGen = lastMessageSentGeneral;
									}
									
									thisIsGeneral = false;
									thisIsOutbound = false;
									
									for (var z = 0; z < transferLength; z++){
										if(answer[i].transfers[z].targetSkillName.indexOf("utbound") > -1){
											if(!thisIsOutbound){
												thisIsOutbound = true;
												startThisPeriod = answer[i].transfers[z].timeL;
											}
										}
										if((answer[i].transfers[z].targetSkillName.indexOf("acebook") > -1) || (answer[i].transfers[z].targetSkillName.indexOf("uman") > -1) || (answer[i].transfers[z].targetSkillName.indexOf("Fixed") > -1)){
											if(thisIsOutbound){
												thisIsOutbound = false;
												endThisPeriod = answer[i].transfers[z].timeL;
												for (var m = (howManyMessages - 1); m > -1 ; m--){
													if((answer[i].messageRecords[m].timeL < endThisPeriod) && (answer[i].messageRecords[m].timeL > startThisPeriod) && (answer[i].messageRecords[m].sentBy === "Agent") && (answer[i].messageRecords[m].participantId !== "1089636032")){
														lastMessageSentOutbound = answer[i].messageRecords[m].timeL;
														m = 0;
													}
												}
											}
										}
										if(thisIsOutbound){
											if(answer[i].transfers[z].hasOwnProperty('contextData')){
												if(answer[i].transfers[z].contextData.hasOwnProperty('structuredMetadata')){
													if(answer[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[0].id === "telefono"){
														timestampLastActOut = answer[i].transfers[z].timeL;
													}
													if(answer[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[0].id === "awakeLater"){
														timestampLastActOut = answer[i].transfers[z].timeL;
													}
												}
											}
											if((transferLength - z) === 1){
												endThisPeriod = Date.now();
												for (var m = (howManyMessages - 1); m > -1 ; m--){
													if((answer[i].messageRecords[m].timeL < endThisPeriod) && (answer[i].messageRecords[m].timeL > startThisPeriod) && (answer[i].messageRecords[m].sentBy === "Agent") && (answer[i].messageRecords[m].participantId !== "1089636032")){
														lastMessageSentOutbound = answer[i].messageRecords[m].timeL;
														m = 0;
													}
												}
											}
										}
										
									}
									if(lastMessageSentOutbound > timestampLastActOut){
										timestampLastActOut = lastMessageSentOutbound;
									}
									
								
						      		
							      
						      }
						      
						      if(timestampLastActGen === 0){
						      		timestampLastActGen = "-";
						      } else{
						      		timestampLastActGen = new Date(timestampLastActGen);
						      }
						      
						      if(timestampLastActOut === 0){
						      		timestampLastActOut = "-";
						      } else{
						      		timestampLastActOut = new Date(timestampLastActOut);
						      }
						      
						      
						      
						      var timestampNextUnfreeze = "-";
						      if (answer[i].hasOwnProperty('transfers')){
						      		var transferlength = answer[i].transfers.length;
								if (transferlength > 1){
									if(answer[i].transfers[(transferlength - 2)].hasOwnProperty('contextData')){
										if(answer[i].transfers[(transferlength - 2)].contextData.hasOwnProperty('structuredMetadata')){
											if(answer[i].transfers[(transferlength - 2)].contextData.structuredMetadata[0].botResponse.intents[0].id === "awakeLater"){
												timestampNextUnfreeze = new Date(parseInt(answer[i].transfers[(transferlength - 2)].contextData.structuredMetadata[0].botResponse.intents[0].name));
											}
										}
									}
								}
						      }
						      
						      
						      var campo2 = "";
						      var campo3 = "";
	
						     
						      
						      var pieceToAdd = {"start": startDateEngagement,
									"end": endDateEngagement,
									"durationinseconds": durationinseconds,
									"efforttimegeneral": effortTimeGeneral,
									"efforttimeoutbound": effortTimeOutbound,
									"inactivetime": inactivetime,
									"agentgeneral": lastAgentGeneral,
									"agentoutbound": lastAgentOutbound,
									"teamgeneral": lastProperTeamGeneral,
									"teamoutbound": lastProperTeamOutbound,
									"skill": skill,
									"channel": channel,
									"night": night,
									"outbound": facebook_out,
									"telefono": numero_telefono,
									"ricontatto": numero_ricontatto,
									"cfiscale": numero_cfiscale,
									"tags": vfTag,
									"triplettauno": triplettauno,
									"triplettadue": triplettadue,
									"triplettatre": triplettatre,
									"limbo": limbo,
									"limboGeneral": limboGeneral,
									"limboOutbound": limboOutbound,
									"limboaveragetime": limboaveragetime,
									"risvegliata": risvegliata,
									"risvegliataGeneral": risvegliataGeneral,
									"risvegliataOutbound": risvegliataOutbound,
									"freeze": freeze,
									"freezeGeneral": freezeGeneral,
									"freezeOutbound": freezeOutbound,
									"risvFreeze": risvegliataFreeze,
									"risvFreezeGeneral": risvegliataFreezeGeneral,
									"risvFreezeOutbound": risvegliataFreezeOutbound,
									"numeroagentigeneral": numberAgentsGeneral,
									"numeroagentioutbound": numberAgentsOutbound,
									"numerogruppigeneral": numberTeamsGeneral,
									"numerogruppioutbound": numberTeamsOutbound,
									"yesno": yesno,
									"comments": comments,
									"endReason": endReason,
									"timeToAccept": timeToAcceptFacebook,
									"firstTimeAnswer": firstTimeAnswerFacebook,
									"timestampFacebook_priv": timestampFacebook_priv,
									"timestampOutbound": timestampOutbound,
									"timeInFacebook_bot": timeSpentInFacebook_bot,
									"timestampLastActGen": timestampLastActGen,
									"timestampLastActOut": timestampLastActOut,
									"timestampNextUnfreeze": timestampNextUnfreeze,
									"lastActivityAgent": lastActivityAgent,
									"lastTypeActivityAgent": lastTypeActivityAgent,
									"customerName": customerName,
									"phoneNumber": phoneNumber,
									"imeiNumber": imeiNumber,
									"conversation": answer[i].info.conversationId,
									"transcript": messages,
									"campo1": campo1,
									"campo2": campo2,
									"campo3": campo3
								       };
						      exportObject = exportObject.concat(pieceToAdd);
		}
		
		
	}






function analysis(answer){
	var myAnswerLength = answer.length;
	if(myAnswerLength === 0){
		return "empty"; 
	} else{
		for (var mz = 0; mz <= myAnswerLength; mz++) {
			setTimeout(function(mz) {
				tryAnalysisUntilSuccess(mz, answer);
			}, 0, mz);
		}	
	}
}




***************/




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
		console.log("tengo " + dialogs.filter(element => element.info.startTimeL > (now - (1000*60*60*24*3))).length + " elementi");
		dialogs = dialogs.filter(element => element.info.startTimeL > (now - (1000*60*60*6)));
		console.log("piu' vecchio timestamp: " + dialogs[0].info.startTimeL);
		console.log("max timestamp: " + (now - (1000*60*60*6)));
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
						var piecetoadd = b.conversationHistoryRecords;
						piecetoadd = piecetoadd.filter(element => element.info.startTimeL >= before);
						console.log("piecetoadd: " + piecetoadd.length);
						dialogs = dialogs.concat(piecetoadd);
						console.log("dialogs: " + dialogs.length);
						console.log ("adding conversations...");
						console.log(offset + " of --> " + conversationsToDownload);
						tryUntilSuccess(offset, callback);
					}
					else{
						console.log("last bucket: " + b.conversationHistoryRecords.length);
						var piecetoadd = b.conversationHistoryRecords;
						piecetoadd = piecetoadd.filter(element => element.info.startTimeL >= before);
						console.log("piecetoadd: " + piecetoadd.length);
						dialogs = dialogs.concat(piecetoadd);
						console.log("dialogs: " + dialogs.length);
						before = now + 1;
						isBotReady = true;
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
		var startQuery = req.query.start;
		var endQuery = req.query.end;
		var optionsQuery = req.query.options;
		var myResult = [];
		myResult = dialogs.filter(element => element.info.startTimeL >= startQuery);
		console.log("step1");
		myResult = myResult.filter(element => element.info.startTimeL <= endQuery);
		console.log("step2");
		if(optionsQuery === "Open"){
			myResult = myResult.filter(element => element.info.endTimeL === -1);
			console.log("step3a");
		}
		if(optionsQuery === "Close"){
			myResult = myResult.filter(element => element.info.endTimeL !== -1);
			console.log("step3b");
		}
		console.log("finish!");
		// var myURL = download (myResult, 'download.xls', 'application/vnd.ms-excel')
/******
		var fs = require('fs');
		var writeStream = fs.createWriteStream("https://github.com/marcodagolini/transcriptsVF/blob/master/file.xls", {flags: 'w', encoding: 'utf-8',mode: 0666});
		var header="Sl No"+"\t"+" Age"+"\t"+"Name"+"\n";
		var row1 = "0"+"\t"+" 21"+"\t"+"Rob"+"\n";
		var row2 = "1"+"\t"+" 22"+"\t"+"bob"+"\n";

		writeStream.write(header);
		writeStream.write(row1);
		writeStream.write(row2);
		
		writeStream.end();
		
		
		
		var fs = require('fs');
		var wstream = fs.createWriteStream('myOutput.txt');
		wstream.write('Hello world!\n');
		wstream.write('Another line\n');
		wstream.end();
		
		
		*****/
		
		
		import json2xlsx from 'json2xlsx-export';
 
			const config = {
			  filename: 'AwesomeFile',
			  sheets: [
			    {
			      name: 'Sheet1',
			      data: [
				[{
				  value: 'Text1',
				  type: 'string'
				},{
				  value: 'Text2',
				  type: 'string'
				}, {
				  value: 1000,
				  type: 'number'
				}]
			      ]
			    }
			  ]
			};

			var xlsx = json2xlsx(config);

		
		  var Stream = require('stream')
		  var stream = new Stream();

		  	res.setHeader('Content-disposition', 'attachment; filename=Transcripts.xlsx');
			res.setHeader('Content-type', 'application/vnd.ms-excel');
			// res.charset = 'UTF-8';
			res.write(xlsx, function(err) { res.end(); });
		

		 stream.pipe = function(dest) {
		 	dest.write('Hello Dolly')
		 }

		 stream.pipe(res)

	}
	
	
});


app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});


setTimeout(function(){
	bearer = echoAgent.transport.configuration.token;
	sortDialogs();
}, 10000);

