//==============================================================================
// grounder.js
// requires epilog.js//==============================================================================
//==============================================================================
// groundrules
//==============================================================================

function dogroundrules ()
 {var input = document.getElementById('input');  var output = document.getElementById('output');
  var rules = groundrules(definemorerules([],readdata(input.value)));
  output.value = grindem(rules);
  return true}

function groundrules (library) {var facts = groundfacts(library);
  var rules = [];
  for (var i=0; i<library.length; i++)
      {rules = groundrule(library[i],facts,rules)};
  return zniquify(rules)}

function groundrule (rule,facts,rules)
 {if (symbolp(rule)) {rules[rules.length] = rule; return rules};
  if (rule[0]==='rule') {return groundviewrule(rule,facts,rules)};
  if (rule[0]==='handler') {return groundhandler(rule,facts,rules)};
  rules[rules.length] = rule;
  return rules}

function groundviewrule (rule,facts,rules)
 {return rules.concat(findall(rule,maksand(rule.slice(2)),facts))}

function groundhandler (rule,facts,rules)
 {var condition = rule[1];
  if (!symbolp(rule[2]) && rule[2][0]==='transition')
     {condition = makeconjunction(condition,rule[2][1])};
  return rules.concat(findall(rule,condition,facts))}

//==============================================================================
// groundfacts
//==============================================================================

function groundfacts (library)
 {var bases = compbases(library);
  var actions = compactions(library);
  var tables = comptables(library);
  var facts = definemorerules(seq(),bases.concat(actions));
  var n = -1;
  while (facts.length>n)
   {n = facts.length;
    for (var i=0; i<tables.length; i++)
        {compview(tables[i],facts,library)};};
  return facts}

function compview (r,facts,library)
 {if (r==='next') {return true};
  var data = indexees(r,library);  for (var i=0; i<data.length; i++)
      {if (operator(data[i])===r) {comprule(data[i],facts)}};
  return true}

function comprule (rule,facts)
 {if (symbolp(rule)) {compsave(rule,facts); return true};
  if (rule[0]!=='rule') {compsave(rule,facts); return true};
  return compsubgoals(2,rule,nil,facts)}

function compsubgoals (n,rule,al,facts)
 {if (n>=rule.length) {compsave(plug(rulehead(rule),al),facts); return true};
  if (!symbolp(rule[n]) && rule[n][0]==='distinct')
     {if (!equalp(plug(rule[n][1],al),plug(rule[n][2],al)))
         {compsubgoals(n+1,rule,al,facts)};
      return true};
  if (!symbolp(rule[n]) && rule[n][0]==='not')
     {compsubgoals(n+1,rule,al,facts); return true};
  var data = indexees(operator(rule[n]),facts);
  for (var i=0; i<data.length; i++)
      {var bl = match(rule[n],data[i],al);
       if (bl) {compsubgoals(n+1,rule,bl,facts)}};
  return true}

function compsave (fact,facts)
 {var rel = operator(fact);
  if (find(fact,indexees(rel,facts))) {return fact};
  facts.push(fact);
  indexsymbol(rel,fact,facts);
  return fact}

function rulehead (p)
 {if (symbolp(p)) {return p};
  if (p[0]==='rule') {return p[1]};
  return p}

//==============================================================================

function compbases (rules)
 {return basefinds('P',seq('base','P'),seq(),rules)}

//==============================================================================

function compactions (rules)
 {return basefinds('A',seq('action','A'),seq(),rules).sort()}

//==============================================================================

function comptables (rules)
 {return ordering(dependencies(rules))}

function comptables (rules)
 {return getviews(rules)}

function dependencies (rules)
 {var ds = {};
  for (var i=0; i<rules.length; i++)
      {ds = getdependencies(rules[i],ds)};
  return ds}

function getdependencies (rule,ds)
 {if (symbolp(rule)) {return setrelation(rule,ds)};
  var rel = operator(rule);
  if (rule[0]!=='rule') {return setrelation(rel,ds)};
  for (var j=2; j<rule.length; j++) {setdepends(rel,operator(rule[j]),ds)};
  return ds}

function setrelation (r,ds)
 {var dum = ds[r];
  if (dum) {return ds};
  ds[r] = seq();
  return ds}

function setdepends (r,p,ds)
 {var dum = ds[r];
  if (dum) {return adjoin(p,dum)};
  ds[r] = seq(p);
  return ds}

function ordering (ds)
 {var rs = seq('distinct');
  var flag = true;
  while (flag)
    {flag = false;
     for (r in ds)
         {if (ds[r]!==0 && subset(ds[r],rs))
             {rs[rs.length] = r; ds[r] = 0; flag = true}}};
  return rs}

//==============================================================================

function findall (x,p,facts)
 {return findallexp(x,p,[],nil,[],facts)}

function findallexp (x,p,pl,al,results,facts)
 {if (symbolp(p))  {return findallbase(x,p,pl,al,results,facts)};
  if (p[0]==='distinct') {return findalldistinct(x,p,pl,al,results,facts)};
  if (p[0]==='not') {return findallexp(x,p[1],pl,al,results,facts)};
  if (p[0]==='and') {return findalland(x,p,pl,al,results,facts)};
  return findallbase(x,p,pl,al,results,facts)}

function findallatom (x,p,pl,al,results,facts)
 {if (findq(p,facts)) {return findallexit(x,pl,al,results,facts)};
  return results}

function findalldistinct (x,p,pl,al,results,facts)
 {p = plug(p,al);
  if (equalp(p[1],p[2])) {return results};
  return findallexit(x,pl,al,results,facts)}

function findalland (x,p,pl,al,results,facts)
 {return findallexp(x,p[1],p.slice(2).concat(pl),al,results,facts)}

function findallbase (x,p,pl,al,results,facts)
 {for (var i=0; i<facts.length; i++)
      {var bl = match(p,facts[i],al);
       if (bl) {results = findallexit(x,pl,bl,results,facts)}};
  return results}

function findallexit (x,pl,al,results,facts)
 {if (pl.length===0) {results.push(plug(x,al)); return results};
  return findallexp(x,pl[0],pl.slice(1),al,results,facts)}

//==============================================================================
// End//==============================================================================
