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

eval(fs.readFileSync('NodeFiles/autoplayer.js') + '');
eval(fs.readFileSync('NodeFiles/epilog.js') + '');
eval(fs.readFileSync('NodeFiles/grounder.js') + '');
eval(fs.readFileSync('NodeFiles/parametric.js') + '');
eval(fs.readFileSync('NodeFiles/prune.js') + '');
eval(fs.readFileSync('depthcharger_worker.js') + '');

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

var num_workers = 100; // Number of depth charges to be done simultaneously
var count = 5; // Total number of depth charges / workers
var worker_instances = [];
var worker_outputs = [];
const sharedArrayBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * num_workers);
const sharedArr = new Int32Array(sharedArrayBuffer);  

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
    library = definemorerules([], doprune(library));
    // library = definemorerules([], groundrules(library));
    roles = findroles(library);
    state = findinits(library);
    startclock = sc;
    playclock = pc;
    startgreedy(role);
    console.log(state);

    // Defining workers
    for (var i=0; i<num_workers; i++){
      worker_outputs.push(-1);
      worker_instances.push(new Worker('depthcharger_worker.js'));
      worker_instances[i].addEventListener('message', function(e) {
          // console.log("DATA COMING BACK");
          // console.log('worker data: ', e.data);
      }, false);
    }
    //
    return 'ready'}

  function play (move)
   {if (move!==nil) {state = updategreedy(move)};
    console.log(state);
    if (findcontrol(state,library)!==role) {return false};
    return playgreedy(role)}

  function stop (move)
   {return false}

  function abort ()
   {return false}

  //==============================================================================
  // dochangers
  //==============================================================================

  function dosimplify (library, role)
  {
    var grounds = groundrules(library);
    var actions = compchangers(read('goal(' + role + ',100) & terminal'),[],grounds);
    var newrules = adjustlegalities(actions,library,grounds)
    var result = grindem(newrules);
    console.log(result);
    return newrules}

  function doprune (library, role)
 {
  var roles = compfinds('R',seq('role','R'),[],library);
  var grounds = groundrules(library);
  var grounds_original = JSON.parse(JSON.stringify(grounds));
  var props = getgoalprops (roles[0],grounds);
  var actions = [];
  for (var i=0; i<props.length; i++)
      {actions = compchangers(props[i],actions,grounds)};
  var actions = compchangers('terminal',actions,grounds);
  for (var i=0; i<actions.length; i++)
      {actions = compchangers(seq('legal',actions[i]),actions,grounds)};
  var newrules = adjustlegalities(actions,grounds_original,grounds);
  var result = grindem(newrules);
  return newrules}

  function adjustlegalities (actions,oldrules,newrules)
  {var oldlegals = indexees('legal',oldrules);
    var newlegals = getlegalities(actions,newrules);
    return difference(oldrules,oldlegals).concat(newlegals)}

  function getlegalities (actions,rules)
  {var legals = [];
    for (var i=0; i<rules.length; i++)
        {var head = rulehead(rules[i]);
        if (!symbolp(head) & head[0]==='legal' && findp(head[1],actions))
        legals.push(rules[i])};
    return legals}
  
  function getgoalprops (role,grounds)
 {var props = [];
  for (var i=0; i<grounds.length; i++)
      {if (symbolp(grounds[i])) {continue};
       if (symbolp(grounds[i][1])) {continue};
       if (grounds[i][1][0]==='goal' && grounds[i][1][1]===role)
          {props = adjoinit(grounds[i][1],props)}}
  return props}

  //==============================================================================
  // End
  //==============================================================================

  //==============================================================================
  // greedy
  //==============================================================================

  var tree = {};

  function startgreedy (role)
   {tree = makenode(state,parseInt(findreward(role,state,library)));
    return 'ready'}


  function updategreedy (move)
   {if (move!=='nil') {tree = updatetree(move,tree)};
    return tree.state}

  function updatetree (move,tree)
   {if (tree.children.length===0)
       {var newstate = simulate(move,tree.state,library);
        var newscore = parseInt(findreward(role,newstate,library));
        return makenode(newstate,newscore)};
    for (var i=0; i<tree.actions.length; i++)
        {if (equalp(move,tree.actions[i])) {return tree.children[i]}}
    return tree}


  function playgreedy (role)
   {var deadline = Date.now()+(playclock-3)*1000; console.log(deadline);
    while (Date.now()<deadline) {process(role, tree, deadline)}; console.log(Date.now());
    return selectaction(tree)}

  // function playgreedy (role)
  //  {for (var i=0; i<expansions; i++) {process(role,tree)};
  //   return selectaction(tree)}

  function process (role,node, deadline)
   {var newscore = 0;
    if (findterminalp(node.state,library)) {
        newscore = node.utility / node.visits;
        // if (newscore > 100) {
        //    alert("NEW SCORE ABOVE 100 in if")
        //  }
      }
       else if (node.children.length===0) {
         newscore = expand(role,node, deadline);
        //  if (newscore > 100) {
        //    alert("NEW SCORE ABOVE 100 in elseif")
        //  }
        }
       else {
         newscore = process(role,selectstate(node, role), deadline);
        //  if (newscore > 100) {
        //    alert("NEW SCORE ABOVE 100 in else")
        //  }
        };
    node.utility = newscore * 1 + node.utility * 1;
    node.visits = node.visits+1;
    return newscore}

  function selectstate (node, role)
   {var best = node.children[0];
    var score = 0;
    var active = findcontrol(state,library);
    for (var i=0; i<node.children.length; i++)
        {
         var exploitation = node.children[i].utility / node.children[i].visits;
         var exploration = Math.sqrt(Math.log(node.visits)/node.children[i].visits);
         var newscore;
         if (active===role) {
           newscore = exploitation + 5 * exploration;
          } else {
            newscore = -1 * exploitation + 5 * exploration;
          }
          // newscore = exploration + 100 * exploration;
          // console.log("Exploitation score : " + exploration + " Exploration score: " + exploration + " Utility = " + node.children[i].utility + " Visits = " + node.children[i].visits);
          // if (exploration > 500) {alert()}
          // console.log("Actions = " + node.children[i].actions);
         if (newscore>score) {best = node.children[i]; score = newscore}};
    return best}

  function selectaction (node)
   {var action = node.actions[0];
    var score = node.children[0].utility / node.children[0].visits;
    console.log('###################');
    console.log(action + ' ' + score);
    for (var i=1; i<node.children.length; i++)
        {var newscore = node.children[i].utility / node.children[i].visits;
         console.log(node.actions[i] + ' ' + newscore);
         if (newscore>score) {action = node.actions[i]; score = newscore}};
    return action}

  function expand(role,node, deadline)
   {node.actions = findlegals(node.state,library);
    var score = 0;
    for (var i=0; i<node.actions.length; i++)
        {var newstate = simulate(node.actions[i],node.state,library);
         var newscore = parseInt(montecarlo(role, newstate, deadline));
         console.log("Newscore = " + newscore);
         var newnode = makenode(newstate,newscore);
         node.children[i]=newnode;
         if (newscore>score) {score = newscore}};
    return score}

  function makenode (state,reward)
   {return {state:state, actions:[], children:[], visits:1, utility:reward}}

   function montecarlo (role, state, deadline)
   {
    // Return prematurely if this is the terminal state.
    if (findterminalp(state,library))
    {return findreward(role,state,library)*1};

    var total = 0;
    var i = 0;
    while (Date.now() < deadline && (i < count)) {
      
      // Call all workers to do a depth charge
      for (var i = 0; i < num_workers; i++) {
        // console.log("CALLING WORKER " + i);
        sharedArr[i] = -1;
        worker_instances[i].postMessage([role, state, 200, i, library, sharedArr]);
      }
      
      let done = false;
      let depthchargetotal = 0;
      // Wait for them to finish
      while (!done) {
        // console.log(sharedArr);
        // console.log(worker_outputs);
        done = true;
        depthchargetotal = 0;
        for (var i = 0; i < num_workers; i++) {
          if (sharedArr[i] == -1) {
            done = false;
          } else {
            depthchargetotal += sharedArr[i];
          }
        }
      }


      total = total + depthchargetotal;
      // console.log(sharedArr);
      // console.log("depthcharge total:"+total);
      i += num_workers;

    }
    if (Date.now() < deadline && (i==0)) {return 0;}
    console.log("TOTAL DEPTH CHARGES = " + i);
    return total/i;}

  function depthcharge (role,state, limit)
  {if (findterminalp(state,library))
    { console.log("depthcharge get terminal with remainning depth :"+limit);
      return findreward(role,state,library)*1};
    if (limit<=0){
      return findreward(role,state,library)*1;
    };
    var active = findcontrol(state,library);
    var actions = findlegals(state,library);
    var best = randomindex(actions.length);
    var newstate = simulate(actions[best],state,library);
    if (active===role) {
      return depthcharge(role, newstate, limit-1);
    } else {
      return depthcharge(role, newstate, limit-1);
    }}

  function randomindex (n)
   {return Math.floor(Math.random()*n)}



//==============================================================================
// ground.js
//==============================================================================
//==============================================================================
// Initialization
//==============================================================================

indexing = false;
dataindexing = false;
ruleindexing = true;

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
 {return grounditem('control',facts,rules)}

function findlegalp (move,facts,rules)
 {return groundfindp(seq('legal',move),facts,rules)}

function findlegalx (facts,rules)
 {return grounditem('legal',facts,rules)}

function findlegals (facts,rules)
 {return grounditems('legal',facts,rules)}

function findreward (role,facts,rules)
 {var value = groundvalue('goal',role,facts,rules);
  if (value) {return value};
  return 0}

function findterminalp (facts,rules)
 {return groundfindp('terminal',facts,rules)}

//------------------------------------------------------------------------------

function simulate (move,state,rules)
 {var deltas = groundexpand(move,state,rules);
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
// groundfindp
// grounditem
// grounditems
// groundvalue
// groundvalues
// groundexpand
//==============================================================================

function groundfindp (p,facts,rules)
 {inferences = inferences + 1;
  if (symbolp(p)) {return groundfindatom(p,facts,rules)};
  if (p[0]==='same') {return equalp(p[1],p[2])};
  if (p[0]==='distinct') {return !equalp(p[1],p[2])};
  if (p[0]==='not') {return !groundfindp(p[1],facts,rules)};
  if (p[0]==='and') {return groundfindand(p,facts,rules)};
  if (groundfindbackground(p,facts,rules)) {return true};
  return groundfindrs(p,facts,rules)}

function groundcompute (rel,facts,rules)
 {var answers = seq();
  var data = facts;
  for (var i=0; i<data.length; i++)
      {if (operator(data[i])===rel) {answers.push(data[i])}};
  data = indexees(rel,rules);
  for (var i=0; i<data.length; i++)
      {if (symbolp(data[i])) {if (equalp(data[i],rel)) {answers.push(rel)}}
       else if (data[i][0]!=='rule')
               {if (equalp(operator(data[i]),rel)) {answers.push(data[i])}}
       else {if (equalp(operator(data[i]),rel) &&
                 groundfindsubs(data[i],facts,rules))
                {answers.push(data[i][1])}}};
  return uniquify(answers)}

function groundfindatom (p,facts,rules)
 {if (p==='true') {return true};
  if (p==='false') {return false};
  if (groundfindbackground(p,facts,rules)) {return true};
  return groundfindrs(p,facts,rules)}

function groundfindand (p,facts,rules)
 {for (var i=1; i<p.length; i++)
      {if (!groundfindp(p[i],facts,rules)) {return false}};
  return true}

function groundfindbackground (p,facts,rules)
 {//var data = factindexps(p,facts);
  data = facts;
  for (var i=0; i<data.length; i++)
      {if (equalp(data[i],p)) {return true}};
  return false}

function groundfindrs (p,facts,rules)
 {var data = viewindexps(p,rules);
  for (var i=0; i<data.length; i++)
      {if (symbolp(data[i])) {if (equalp(data[i],p)) {return true}}
       else if (data[i][0]!=='rule') {if (equalp(data[i],p)) {return true}}
       else {if (equalp(data[i][1],p) && groundfindsubs(data[i],facts,rules))
                {return true}}};
  return false}

function groundfindsubs (rule,facts,rules)
 {for (var j=2; j<rule.length; j++)
      {if (!groundfindp(rule[j],facts,rules)) {return false}};
  return true}

function factindexps (p,theory)
 {if (symbolp(p)) {return indexees(p,theory)};
  var best = indexees(p[0],theory);
  for (var i=1; i<p.length; i++)
      {var dum = factindexps(p[i],theory);
       if (dum.length<best.length) {best = dum}};
  return best}

//------------------------------------------------------------------------------

function grounditem (rel,facts,rules)
 {var data = facts;
  for (var i=0; i<data.length; i++)
      {if (symbolp(data[i])) {continue}
       else if (data[i][0]===rel) {return data[i][1]}};
  data = indexees(rel,rules);
  for (var i=0; i<data.length; i++)
      {if (symbolp(data[i])) {continue}
       else if (data[i][0]!=='rule')
               {if (data[i][0]===rel) {return data[i][1]}}
       else {var head = data[i][1];
             if (operator(head)===rel &&
                 groundfindsubs(data[i],facts,rules))
                {return (head[1])}}};
  return false}

function grounditems (rel,facts,rules)
 {var answers=seq();
  var data = facts;
  for (var i=0; i<data.length; i++)
      {if (symbolp(data[i])) {continue}
       else if (data[i][0]===rel)
               {answers.push(data[i][1])}};
  data = indexees(rel,rules);
  for (var i=0; i<data.length; i++)
      {if (symbolp(data[i])) {continue}
       else if (data[i][0]!=='rule')
               {if (data[i][0]===rel)
                   {answers.push(data[i][1])}}
       else {var head=data[i][1];
             if (operator(head)===rel &&
                 groundfindsubs(data[i],facts,rules))
                {answers.push(head[1])}}};
  return uniquify(answers)}

function groundvalue (rel,obj,facts,rules)
 {var data = facts;
  for (var i=0; i<data.length; i++)
      {if (symbolp(data[i])) {continue}
       else if (data[i][0]===rel && data[i][1]===obj) {return data[i][2]}};
  data = indexees(rel,rules);
  for (var i=0; i<data.length; i++)
      {if (symbolp(data[i])) {continue}
       else if (data[i][0]!=='rule')
               {if (data[i][0]===rel && data[i][1]===obj) {return data[i][2]}}
       else {var head=data[i][1];
             if (operator(head)===rel && equalp(head[1],obj) &&
                 groundfindsubs(data[i],facts,rules))
                {return data[i][1][2]}}};
  return false}

function groundvalues (rel,obj,facts,rules)
 {var answers=seq();
  var data = facts;
  for (var i=0; i<data.length; i++)
      {if (symbolp(data[i])) {continue}
       else if (data[i][0]===rel && data[i][1]===obj)
               {answers.push(data[i][2])}};
  data = indexees(rel,rules);
  for (var i=0; i<data.length; i++)
      {if (symbolp(data[i])) {continue}
       else if (data[i][0]!=='rule')
               {if (data[i][0]===rel && data[i][1]===obj)
                   {answers.push(data[i][2])}}
       else {var head=data[i][1];
             if (operator(head)===rel && equalp(head[1],obj) &&
                 groundfindsubs(data[i],facts,rules))
                {answers.push(head[2])}}};
  return uniquify(answers)}

//------------------------------------------------------------------------------

function groundexpand (seed,facts,rules)
 {return zniquify(groundexpanddepth(seed,facts,rules,0))}

function groundexpanddepth (seed,facts,rules,depth)
 {if (symbolp(seed)) {return groundexpanddepthrs(seed,facts,rules,depth)};
  if (seed[0]==='not') {return [seed]};
  if (seed[0]==='and') {return groundexpanddepthand(seed,facts,rules,depth)};
  if (seed[0]==='transition') {return groundexpanddepthtransition(seed,facts,rules,depth)};
  if (depth>expanddepth) {return []};
  return groundexpanddepthrs(seed,facts,rules,depth)}

function groundexpanddepthand (seed,facts,rules,depth)
 {var updates = [];
  for (var i=1; i<seed.length; i++)
      {updates = updates.concat(groundexpanddepth(seed[i],facts,rules,depth))};
  return updates}

function groundexpanddepthtransition (seed,facts,rules,depth)
 {var updates = [];
  if (groundfindp(seed[1],facts,rules))
     {updates = updates.concat(groundexpanddepth(seed[2],facts,rules,depth))};
  return updates}

function groundexpanddepthrs (seed,facts,rules,depth)
 {var data = lookuprules(seed,rules);
  var flag = false;
  var updates = [];
  for (var i=0; i<data.length; i++)
      {if (symbolp(data[i])) {continue};
       if (data[i][0]!=='handler') {continue};
       if (equalp(data[i][1],seed))
          {flag = true;
           var rule = data[i][2];
           updates = updates.concat(groundexpanddepth(rule,facts,rules,depth+1))}};
  if (flag) {return updates};
  return [seed]}

//==============================================================================
// Epilog tweaks
//==============================================================================

function ruleindex (x,p,theory)
 {if (varp(x)) {return p};
  if (symbolp(x)) {return indexsymbol(x,p,theory)};
  if (x[0]==='rule') {return ruleindex(x[1],p,theory)};
  if (x[0]==='handler') {return ruleindex(x[1],p,theory)};
  return ruleindex(x[0],p,theory)}

//==============================================================================
//==============================================================================
//==============================================================================

//==============================================================================
// End of player code
//==============================================================================

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