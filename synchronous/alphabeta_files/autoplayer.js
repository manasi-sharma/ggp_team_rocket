//==============================================================================
// autoplayer.js
//==============================================================================
//==============================================================================
// Initialization
//==============================================================================

indexing = false;
dataindexing = false;
ruleindexing = true;

var player='anonymous';
var strategy='random';

var game = 'buttonsandlights';
var role = 'robot';
var startclock = 10;
var playclock = 10;

var library = [];
var roles = [];
var state = [];
var phase = 'offline';

//==============================================================================
// Operations
//==============================================================================

function doclear ()
 {var messages = receive(player);
  var transcript = document.getElementById('transcript');
  transcript.value = transcript.value + messages;
  return true}

function doconnect ()
 {document.getElementById('clearer').disabled = true;
  document.getElementById('connector').disabled = true;
  document.getElementById('disconnector').disabled = false;
  phase='online';
  setTimeout(listen,1000);
  return true}

function dodisconnect ()
 {document.getElementById('clearer').disabled = false;
  document.getElementById('connector').disabled = false;
  document.getElementById('disconnector').disabled = true;
  phase = 'offline';
  return true}

//==============================================================================

function listen ()
 {if (phase==='offline') {return false};
  doreceive();
  setTimeout(listen,1000);
  return true}

function doreceive ()
 {var messages = receive(player);
  var transcript = document.getElementById('transcript');
  messages = readdata(messages);
  for (var i=0; i<messages.length; i++)
      {transcript.value = transcript.value + grind(messages[i]) + "\r";
       var timestamp = messages[i][1];
       var sender = messages[i][2];
       var receiver = messages[i][3];
       var message = messages[i][4];
       var response = ggpeval(message);
       if (response)
          {var msg = seq('reply',message[1],response);
           var record = send(player,sender,grind(msg));
           transcript.value = transcript.value + record + "\r"}};
  return true}

function ggpeval (msg)
 {if (symbolp(msg)) {return false};
  if (msg[0]==='ping') {return ping()};
  if (msg[0]==='start') {return start(msg[2],msg[3],msg[4],msg[5])};
  if (msg[0]==='play') {return play(msg[2])};
  if (msg[0]==='stop') {return stop(msg[2])};
  if (msg[0]==='abort') {return abort()};
  return false}

//==============================================================================

function start (role)
 {if (strategy==='greedy') {return startgreedy(role)};
  return true}

function update (move) 
 {if (strategy==='greedy') {state = updategreedy(move)}
     else {compexecute(move,state,library)};
  return true}

function play (role)
 {if (strategy==='legal') {return playlegal(role)};
  if (strategy==='random') {return playrandom(role)};
  if (strategy==='onestep') {return playonestep(role)};
  if (strategy==='minimax') {return playminimax(role)};
  if (strategy==='minimaxdepth') {return playminimaxdepth(role)};
  if (strategy==='minimaxid') {return playminimaxid(role)};
  if (strategy==='mcs') {return playmcs(role)};
  if (strategy==='greedy') {return playgreedy(role)};
  return false}

function stop (role)
 {return true}

function abort ()
 {return true}

//==============================================================================
// Communication
//==============================================================================

function send (sender,receiver,msg)
 {var url = "http://127.0.0.1/worksheets/homepage/putmessage.php?sender=" + sender + "&receiver=" + receiver;
  return rpc(url,msg)}

function send (sender,receiver,msg)
 {var url = "http://minimal.stanford.edu/worksheets/homepage/putmessage.php?sender=" + sender + "&receiver=" + receiver;
  return rpc(url,msg)}

function receive (receiver)
 {return rpc("http://127.0.0.1/worksheets/homepage/getmessages.php?receiver=" + receiver,"")}

function receive (receiver)
 {return rpc("http://minimal.stanford.edu/worksheets/homepage/getmessages.php?receiver=" + receiver,"")}

function rpc (url,msg)
 {var request = new XMLHttpRequest();
  if (request.overrideMimeType) {request.overrideMimeType('text/xml')};
  request.open('POST', url, false);
  request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  request.send(msg);
  //console.log(request.responseText);
  return request.responseText}

//==============================================================================
// End
//==============================================================================
