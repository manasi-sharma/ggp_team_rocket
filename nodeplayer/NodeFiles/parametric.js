//==============================================================================
// parametric.js
//==============================================================================
//==============================================================================
// Initialization//==============================================================================

indexing = false;
dataindexing = false;
ruleindexing = true;

var role = 'robot';
var startclock = 10;
var playclock = 10;

var library = [];
var roles = [];
var state = [];

//==============================================================================
// Basics
//==============================================================================

function ping ()
 {return 'ready'}

function start (r,rs,sc,pc)
 {role = r;
  library = definemorerules(seq(),rs.slice(1));
  roles = findroles(library);
  state = findinits(library);
  startclock = sc;
  playclock = pc;
  if (strategy==='greedy') {return startgreedy(role)};
  return 'ready'}

function play (move)
 {if (strategy==='greedy') {state = updategreedy(move)}
     else {compexecute(move,state,library)};
  if (strategy==='legal') {return playlegal(role)};
  if (strategy==='random') {return playrandom(role)};
  if (strategy==='onestep') {return playonestep(role)};
  if (strategy==='minimax') {return playminimax(role)};
  if (strategy==='minimaxdepth') {return playminimaxdepth(role)};
  if (strategy==='minimaxid') {return playminimaxid(role)};
  if (strategy==='mcs') {return playmcs(role)};
  if (strategy==='greedy') {return playgreedy(role)};
  return false}

function stop (move)
 {return false}

function abort ()
 {return false}

//==============================================================================
// legal
//==============================================================================

function playlegal (role)
 {return findlegalx(state,library)}

//==============================================================================
// random
//==============================================================================

function playrandom (role)
 {var actions=findlegals(state,library);
  var ind = randomindex(actions.length);
  return actions[ind]}

function randomindex (n)
 {return Math.floor(Math.random()*n)}

//==============================================================================
// onestep
//==============================================================================

function playonestep (role)
 {//console.log(state);
  var actions = shuffle(findlegals(state,library));
  if (actions.length===0) {return false};
  var action = actions[0];
  var score = 0;
  for (var i=0; i<actions.length; i++)
      {//console.log('  ' + grind(actions[i]));
       var newstate = simulate(actions[i],state,library);
       var newscore = findreward(role,newstate,library)*1;
       //console.log('  ' + newscore);
       if (newscore===100) {return actions[i]};
       if (newscore>score) {action = actions[i]; score = newscore}};
  return action}

function bestonestep (role,state)
 {//console.log(state);
  var actions = shuffle(findlegals(state,library));
  if (actions.length===0) {return false};
  var action = actions[0];
  var terminal = false;
  var score = 0;
  for (var i=0; i<actions.length; i++)
      {//console.log('  ' + grind(actions[i]));
       var newstate = simulate(actions[i],state,library);
       var newterm = findterminalp(newstate,library);
       var newscore = findreward(role,newstate,library)*1;
       //console.log('  ' + newscore);
       if (newterm && newscore===100) {return actions[i]};
       if (newterm===terminal)
          {if (newscore>score) {action = actions[i]; score = newscore}};
       if (newterm && newscore>0)
          {action = actions[i]; terminal = true; score = newscore}};
  return action}

function shuffle (array)
 {for (var i = array.length-1; i>0; i--)
      {var j = Math.floor(Math.random() * (i + 1));
       var temp = array[i];
       array[i] = array[j];
       array[j] = temp};
  return array}

//==============================================================================
// minimax//==============================================================================

var nodes = 0;
var terminals = 0;
var elapsed = 0;

function playminimax (role) {var actions = shuffle(findlegals(state,library));
  if (actions.length===0) {return false};
  if (actions.length===1) {return actions[0]};
  var action = actions[0];
  var score = 0;
  nodes = 0
  for (var i=0; i<actions.length; i++)
      {//console.log(grind(actions[i]));
       var newstate = simulate(actions[i],state,library);
       var newscore = minimax(role,newstate);
       //console.log(newscore);
       if (newscore===100) {return actions[i]};
       if (newscore>score) {action = actions[i]; score = newscore}};
  return action}

function testminimax (role,state)
 {nodes = 0;
  terminals = 0;
  var beg = performance.now();
  var result = minimax(role,state);
  var end = performance.now();
  elapsed = end-beg;
  return result}

function minimax (role,state) {nodes = nodes + 1;
  if (findterminalp(state,library))
     {terminals = terminals + 1; return findreward(role,state,library)*1};
  var active = findcontrol(state,library);
  if (active===role) {return maximize(active,role,state)};
  return minimize(active,role,state)}

function maximize (active,role,state)
 {var actions = findlegals(state,library);
  if (actions.length===0) {return 0};
  var score = 0;
  for (var i=0; i<actions.length; i++)
      {var newstate = simulate(actions[i],state,library);
       var newscore = minimax(role,newstate);
       if (newscore===100) {return 100};
       if (newscore>score) {score = newscore}};
  return score}

function minimize (active,role,state)
 {var actions = findlegals(state,library);
  if (actions.length===0) {return 0};
  var score = 100;
  for (var i=0; i<actions.length; i++)
      {var newstate = simulate(actions[i],state,library);
       var newscore = minimax(role,newstate);
       if (newscore===0) {return 0};
       if (newscore<score) {score = newscore}};
  return score}

//==============================================================================
// minimaxdepth//==============================================================================

function playminimaxdepth (role) {var actions = shuffle(findlegals(state,library));
  if (actions.length===0) {return false};
  if (actions.length===1) {return actions[0]};
  var action = actions[0];
  var score = 0;
  nodes = 0
  for (var i=0; i<actions.length; i++)
      {//console.log(grind(actions[i]));
       var newstate = simulate(actions[i],state,library);
       var newscore = minimaxdepth(role,newstate,depth);
       //console.log(newscore);
       if (newscore===100) {return actions[i]};
       if (newscore>score) {action = actions[i]; score = newscore}};
  return action}

function minimaxdepth (role,state,depth) {nodes = nodes + 1;
  if (findterminalp(state,library))
     {terminals = terminals + 1; return findreward(role,state,library)*1};
  if (depth<=0) {terminals = terminals + 1; return findreward(role,state,library)};  var active = findcontrol(state,library);
  if (active===role) {return maximizedepth(active,role,state,depth)};
  return minimizedepth(active,role,state,depth)}

function maximizedepth (active,role,state,depth)
 {var actions = findlegals(state,library);
  if (actions.length===0) {return 0};
  var score = 0;
  for (var i=0; i<actions.length; i++)
      {var newstate = simulate(actions[i],state,library);
       var newscore = minimaxdepth(role,newstate,depth-1);
       if (newscore===100) {return 100};
       if (newscore>score) {score = newscore}};
  return score}

function minimizedepth (active,role,state,depth)
 {var actions = findlegals(state,library);
  if (actions.length===0) {return 0};
  var score = 100;
  for (var i=0; i<actions.length; i++)
      {var newstate = simulate(actions[i],state,library);
       var newscore = minimaxdepth(role,newstate,depth-1);
       if (newscore===0) {return 0};
       if (newscore<score) {score = newscore}};
  return score}

function betterp (x,y)
 {if (x[0]>y[0]) {return true};
  if (x[0]===y[0]) {return (x[1]>y[1])};
  return false}

function worsep (x,y)
 {if (x[0]<y[0]) {return true};
  if (x[0]===y[0]) {return (x[1]<y[1])};
  return false}

//==============================================================================
// minimaxid//==============================================================================

function playminimaxid (role)
 {var deadline = Date.now()+(playclock-2)*1000;
  var best = findlegalx(state,library);
  for (var k=1; k<25; i=k++)
      {var action = simpleminimaxid(role,state,k,deadline);
       if (action===false) {return best};
       best = action};
  return best}

function simpleminimaxid (role,state,depth,deadline)
 {var actions = shuffle(findlegals(state,library));
  if (actions.length===0) {return false};
  if (actions.length===1) {return actions[0]};
  var best = actions[0];
  var score = 0;
  nodes = 0
  for (var i=0; i<actions.length; i++)
      {//console.log(grind(actions[i]));
       var newstate = simulate(actions[i],state,library);
       var newscore = minimaxid(role,newstate,depth,deadline);
       if (newscore===false) {return false};
       //console.log(newscore);
       if (newscore===100) {return actions[i]};
       if (newscore>score) {best = actions[i]; score = newscore}};
  return best}

function minimaxid (role,state,depth,deadline) {nodes = nodes + 1;
  if (findterminalp(state,library))
     {terminals = terminals + 1; return findreward(role,state,library)*1};
  if (depth<=0) {terminals = terminals + 1; return findreward(role,state,library)};
  if (Date.now()>deadline) {return false};  var active = findcontrol(state,library);
  if (active===role) {return maximizeid(active,role,state,depth,deadline)};
  return minimizeid(active,role,state,depth,deadline)}

function maximizeid (active,role,state,depth,deadline)
 {var actions = findlegals(state,library);
  if (actions.length===0) {return 0};
  var score = 0;
  for (var i=0; i<actions.length; i++)
      {var newstate = simulate(actions[i],state,library);
       var newscore = minimaxid(role,newstate,depth-1,deadline);
       if (newscore===false) {return false};
       if (newscore===100) {return 100};
       if (newscore>score) {score = newscore}};
  return score}

function minimizeid (active,role,state,depth,deadline)
 {var actions = findlegals(state,library);
  if (actions.length===0) {return 0};
  var score = 100;
  for (var i=0; i<actions.length; i++)
      {var newstate = simulate(actions[i],state,library);
       var newscore = minimaxid(role,newstate,depth-1,deadline);
       if (newscore===false) {return false};
       if (newscore===0) {return 0};
       if (newscore<score) {score = newscore}};
  return score}

//==============================================================================
// mcs
//==============================================================================

var depthcharges = 500;

function playmcs (role)
 {var actions = findlegals(state,library);
  if (actions.length===0) {return false};
  if (actions.length===1) {return actions[0]};
  var action = actions[0];
  var score = 0;
  var scores = seq();
  for (var i=0; i<actions.length; i++) {scores[i] = 0};
  var i = 0;
  var probes = 0;
  while (probes<depthcharges)
   {if (i>=actions.length) {i = 0};
    var result = depthcharge(role,state);
    scores[i] = scores[i] + result;
    if (scores[i]>score) {score = scores[i]; action = actions[i]};
    probes = probes + 1;
    i++};
  //console.log(actions);
  //console.log(scores);
  return action}

function bestmcs (role,state)
 {var actions = findlegals(state,library);
  if (actions.length===0) {return false};
  if (actions.length===1) {return actions[0]};
  var action = actions[0];
  var score = 0;
  var scores = seq();
  for (var i=0; i<actions.length; i++) {scores[i] = 0};
  var i = 0;
  while (Date.now()<deadline)
   {if (i>=actions.length) {i = 0};
    var result = depthcharge(role,state);
    scores[i] = scores[i] + result;
    if (scores[i]>score) {score = scores[i]; action = actions[i]};
    i++};
  //console.log(actions);
  //console.log(scores);
  return action}

function depthcharge (role,state)
 {if (findterminalp(state,library))
     {return findreward(role,state,library)*1};
  var active = findcontrol(state,library);
  var actions = findlegals(state,library);
  var best = randomindex(actions.length);
  var newstate = simulate(actions[best],state,library);
  return depthcharge(role,newstate)}

//==============================================================================
// mcstime
//==============================================================================
//==============================================================================
// greedy
//==============================================================================

var tree = {};
var expansions = 1000;

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


function playgreedy (role) {var deadline = Date.now()+(playclock-2)*1000;
  while (Date.now()<deadline) {process(tree)};
  return selectaction(tree)}

function playgreedy (role) {for (var i=0; i<expansions; i++) {process(role,tree)};
  return selectaction(tree)}

function process (role,node)
 {var newscore = 0;
  if (findterminalp(node.state,library)) {newscore = node.utility}
     else if (node.children.length===0) {newscore = expand(role,node)}
     else {newscore = process(role,selectstate(node))};
  node.utility = Math.max(newscore,node.utility);
  node.visits = node.visits+1;
  return node.utility}

function selectstate (node)
 {var best = node.children[0];
  var score = best.utility - Math.floor(best.visits*100/node.visits);
  for (var i=1; i<node.children.length; i++)
      {var exploitatiun = node.children[i].utility;
       var exploration = Math.floor(node.children[i].visits*100/node.visits);
       var newscore = exploitatiun - exploration;
       if (newscore>score) {best = node.children[i]; score = newscore}};
  return best}

function selectaction (node)
 {var action = node.actions[0];
  var score = node.children[0].utility;
  //console.log(action + ' ' + score);
  for (var i=1; i<node.children.length; i++)
      {var newscore = node.children[i].utility;
       //console.log(node.actions[i] + ' ' + newscore);
       if (newscore>score) {action = node.actions[i]; score = newscore}};
  return action}

function expand (role,node)
 {node.actions = findlegals(node.state,library);
  var score = 0;
  for (var i=0; i<node.actions.length; i++)
      {var newstate = simulate(node.actions[i],node.state,library);
       var newscore = parseInt(findreward(role,newstate,library));
       var newnode = makenode(newstate,newscore);
       node.children[i]=newnode;
       if (newscore>score) {score = newscore}};
  return score}

function makenode (state,reward)
 {return {state:state, actions:[], children:[], visits:0, utility:reward}}

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
// End//==============================================================================
