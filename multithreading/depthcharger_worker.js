eval(fs.readFileSync('Greedy_files/epilog.js') + '');
eval(fs.readFileSync('Greedy_files/autoplayer.js') + '');
eval(fs.readFileSync('Greedy_files/grounder.js') + '');
eval(fs.readFileSync('Greedy_files/prune.js') + '');

self.addEventListener('message', function(e) {    
    var doDepthCharge = function (role,state, limit)
    { 
      if (findterminalp(state,library))
      { console.log("depthcharge get terminal with remainning depth :"+limit);
        return findreward(role,state,library)*1};
      if (limit<=0){
        return findreward(role,state,library)*1;
      };
      var actions = findlegals(state,library);
      var best = randomindex(actions.length);
      var newstate = simulate(actions[best],state,library);
      return depthcharge(role, newstate, limit-1);
    };

    let depthchargeval = doDepthCharge(e.data[0], e.data[1], e.data[2]);
    self.postMessage([depthchargeval, e.data[3]]);
  
}, false);

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
