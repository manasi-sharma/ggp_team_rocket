//==============================================================================
// player.js
//==============================================================================
// Start-up:
//   /usr/local/bin/node /Library/WebServer/Documents/gamemaster/javascript/player.js
//==============================================================================

var http = require("http");
var url = require("url");
var querystring = require("querystring");
var fs = require('fs');

eval(fs.readFileSync('NodeFiles/epilog.js') + '');

//==============================================================================
// Global Variables
//==============================================================================

indexing = false;
dataindexing = false;
ruleindexing = true;

var player='team_rocket';
var role = 'robot';
var startclock = 10;
var playclock = 10;

var library = [];
var roles = [];
var state = [];
var phase = 'offline';

//==============================================================================
// Server
//==============================================================================

function onRequest(request,response)
 {if (request.method === 'OPTIONS')
     {var headers = {};
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400';
      headers["Access-Control-Allow-Headers"] = "Sender, Receiver, Content-Type, Accept";
      response.writeHead(200, headers);
      response.end()}
  else {response.writeHead(200,
         {"Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Age": "86400",
          "Content-Type": "text/plain"});
       var query = url.parse(request.url).query;
       if (query) {route(query,response)}};
  return true}

function route (query,response)
 {var parameters = getparameters(query);
  var request = parameters['request'];
  console.log('Request: ' +  request);
  var result = false;
  try {result = eval(request).toString()} catch(err) {result = 'error'};
  response.write(result);
  console.log('Response: ' + result);
  response.end()}

function getparameters (query)
 {var pairs = query.split('&');
  var params = {};
  for (var i=0; i<pairs.length; i++)
      {var args = pairs[i].split('=');
       if (args.length===2 && args[0].length>0 && args[1].length>0)
          {var attr = args[0];
           var value = args[1];
           params[attr] = value}};
  return params}

http.createServer(onRequest).listen(9002);
console.log("Player has started.");

//==============================================================================

function doclear ()
 {receive(player,console.log);
  return true}

function doconnect ()
 {phase='online';
  setTimeout(listen,1000);
  return true}

function dodisconnect ()
 {phase = 'offline';
  return true}

function dolook ()
 {getdata('tictactoe',console.log);
  return true}

//==============================================================================

function listen ()
 {if (phase==='offline') {return false};
  receive(player,handlemessages);
  return true}

function handlemessages (messages)
 {messages = readdata(messages);
  for (var i=0; i<messages.length; i++)
      {console.log(grind(messages[i]));
       var timestamp = messages[i][1];
       var sender = messages[i][2];
       var receiver = messages[i][3];
       var message = messages[i][4];
       var result = ggpeval(message);
       if (result) {send(player,sender,grind(result),console.log)}};
  setTimeout(listen,1000);
  return true}

//==============================================================================

function ggpeval (msg)
 {if (symbolp(msg)) {return 'sorry'};
  if (msg[0]==='ping') {return ggpping(msg[1])};
  if (msg[0]==='start') {return ggpstart(msg[1],msg[2],msg[3],msg[4],msg[5])};
  if (msg[0]==='play') {return ggpplay(msg[1],msg[2])};
  if (msg[0]==='stop') {return ggpstop(msg[1],msg[2])};
  if (msg[0]==='abort') {return ggpabort(msg[1])};
  return 'sorry'}

function ggpping (id)
 {return seq('reply',id,'ready')}

function ggpstart (id,r,rs,sc,pc)
 {start(r,rs,sc,pc);
  return seq('reply',id,'ready')}

function ggpplay (id,move)
 {var response = play(move);
  if (response) {return seq('reply',id,response)};
  return false}

function ggpstop (id,move)
 {return stop(role)}

function ggpabort (id)
 {return abort()}

//==============================================================================
// Player
//==============================================================================

function ping ()
 {return 'ready'}

function start (r,rs,sc,pc)
 {role = r;
  library = definemorerules([],rs.slice(1));
  roles = findroles(library);
  state = findinits(library);
  startclock = sc;
  playclock = pc;
  return 'ready'}

function play (move)
 {if (move!==nil) {state = simulate(move,state,library)};
  if (findcontrol(state,library)!==role) {return false};
  var actions=findlegals(state,library);
  var ind = randomindex(actions.length);
  return actions[ind]}

function stop (move)
 {return false}

function abort ()
 {return false}

function randomindex (n)
 {return Math.floor(Math.random()*n)}

//==============================================================================
// Basics
//==============================================================================

function findroles (rules)
 {return compfinds('R',seq('role','R'),seq(),rules)}

function findbases (rules)
 {return compfinds('P',seq('base','P'),seq(),rules)}

function findactions (rules)
 {return compfinds('A',seq('action','A'),seq(),rules)}

function findinits (rules)
 {return compfinds('P',seq('init','P'),seq(),rules)}

function findcontrol (facts,rules)
 {return compfindx('X',seq('control','X'),facts,rules)}

function findlegalp (move,facts,rules)
 {return compfindp(seq('legal',move),facts,rules)}

function findlegalx (facts,rules)
 {return compfindx('X',seq('legal','X'),facts,rules)}

function findlegals (facts,rules)
 {return compfinds('X',seq('legal','X'),facts,rules)}

function findreward (role,facts,rules)
 {var value = compfindx('R',seq('goal',role,'R'),facts,rules);
  if (value) {return value};
  return 0}

function findterminalp (facts,rules)
 {return compfindp('terminal',facts,rules)}

//------------------------------------------------------------------------------

function simulate (move,state,rules)
 {var deltas = compexpand(move,state,rules);
  var additions = [];
  var deletions = [];
  for (var i=0; i<deltas.length; i++)
      {if (symbolp(deltas[i])) {additions.push(deltas[i]); continue};
       if (deltas[i][0]==='not') {deletions.push(deltas[i][1]); continue};
       additions.push(deltas[i])};
  var newstate = [];
  for (i = 0; i<state.length; i++)
      {if (find(state[i],additions)) {continue};
       if (find(state[i],deletions)) {continue};
       newstate.push(state[i])};
  return newstate.concat(additions)}

//==============================================================================
// Communication
//==============================================================================

function send (sender,receiver,msg,callback)
 {var host = "minimal.stanford.edu";
  var path = "/worksheets/homepage/putmessage.php?sender=" + sender + "&receiver=" + receiver;
  postrequest(host,path,msg,callback);
  return true}

function receive (receiver,callback)
 {var host = "minimal.stanford.edu";
  var path = "/worksheets/homepage/getmessages.php?receiver=" + receiver;
  getrequest(host,path,callback);
  return true}

function getdata (room,callback)
 {var host = "minimal.stanford.edu";
  var path = "/worksheets/homepage/loaddata.php?room=" + room;
  getrequest(host,path,callback);
  return true}

//==============================================================================

function getrequest (host,path,callback)
 {console.log('GET http://' + host + path);
  var options = {hostname: host, path: path, method: 'GET'};
  var req = http.request(options,
             function (res)
              {console.log('STATUS: ' + res.statusCode);
               var response = "";
               res.on("data",function (data) {response += data});
               res.on("end",function () {callback(response)})});
  req.on('timeout',function () {req.abort()});
  req.on('error',function (err) {callback('error')});
  req.end();
  return true}

function postrequest (host,path,msg,callback)
 {console.log('POST http://' + host + path);
  console.log(msg);
  var options = {hostname: host, path: path, method: 'POST'};
  var req = http.request(options,
             function (res)
              {console.log('STATUS: ' + res.statusCode);
               var response = "";
               res.on("data",function (data) {response += data});
               res.on("end",function () {callback(response)})});
  req.on('timeout',function () {req.abort()});
  req.on('error',function (err) {callback('error')});
  req.write(msg);
  req.end();
  return true}

//==============================================================================
// End
//==============================================================================