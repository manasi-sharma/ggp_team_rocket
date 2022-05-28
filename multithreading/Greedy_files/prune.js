//==============================================================================
// pruning code
//==============================================================================

var library;
dataindexing = false
ruleindexing = true

//==============================================================================
// compchangers
// rules should be relationally indexed
//==============================================================================

function compchangers (p,results,rules)
 {if (symbolp(p)) {return compchangersdb(p,results,rules)};
  //if (p[0]==='control') {return results};
  if (p[0]==='not') {return compchangersdb(p[1],results,rules)};
  if (p[0]==='and')
     {for (var i=1; i<p.length; i++)
          {results = compchangersdb(p[i],results,rules)};
      return results};
  return compchangersdb(p,results,rules)}

function compchangersdb (p,results,rules)
 {for (var i=0; i<rules.length; i++)
      {if (symbolp(rules[i])) {continue};
       if (rules[i][0]==='rule' && equalp(rules[i][1],p))
          {for (var j=2; j<rules[i].length; j++)
               {results = compchangers(rules[i][j],results,rules)}};
       if (rules[i][0]==='handler' && symbolp(rules[i][2]))
          {if (rules[i][2]===p) {results = adjoinit(rules[i][1],results)};
           continue};
       if (rules[i][0]==='handler' && rules[i][2][0]==='transition')
          {if (mentions(rules[i][2][2],p))
              {if (findp(rules[i][1],results)) {continue};
               results.push(rules[i][1]);
               results = compchangers(rules[i][2][1],results,rules)}
           continue};
       if (rules[i][0]==='handler' && mentions(rules[i][2],p))
          {results = adjoinit(rules[i][1],results)}};
  return results}

function mentions (item,factoid)
 {if (symbolp(item)) {return (item===factoid)};
  if (item[0]==='not') {return equalp(item[1],factoid)};
  if (item[0]==='and')
     {for (var i=1; i<item.length; i++)
          {if (mentions(item[i],factoid)) {return true}};
      return false};
  if (item[0]==='rule')
     {for (var i=1; i<item.length; i++)
          {if (mentions(item[i],factoid)) {return true}};
      return false};
  if (item[0]==='handler')
     {if (equalp(item[1],factoid)) {return true};
      if (mentions(item[2],factoid)) {return true}};
  if (item[0]==='transition')
     {if (mentions(item[1],factoid)) {return true};
      if (mentions(item[2],factoid)) {return true}};
  return equalp(item,factoid)}

//==============================================================================
// compmodifiers
//==============================================================================

function compmodifiers (rules)
 {//var definitions = getproprules(read('goal(robot,100)'),rules);
  //var subgoals = definitions[0];
  var subgoals = read('done(1) & done(2) & done(3) & terminal');
  var factors = [];
  for (var i=1; i<subgoals.length; i++)
      {console.log(subgoals[i]);
       var result = compchangers(subgoals[i],[],rules);
       console.log(result);
       factors.push(result)};
  return factors}

function getproprules (p,rules)
 {var results = [];
  for (var i=0; i<rules.length; i++)
      {if (equalp(rulehead(rules[i]),p)) {results.push(rules[i])}};
  return results}

//==============================================================================
// compupdaters
//==============================================================================

function compupdaters (rules)
 {var goals = read('done(1) | done(2) | done(3) | done(4) | done(5) | done(6) | done(7) | done(8) | done(9)');
  var factors = [];
  for (var i=1; i<goals.length; i++)
      {console.log(goals[i]);
       var result = compchangers(goals[i],[],rules);
       console.log(result);
       factors.push(result)};
  return factors}

//==============================================================================
// End
//==============================================================================
