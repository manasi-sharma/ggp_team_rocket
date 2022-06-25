//==============================================================================
// Epilog
// Copyright (c) 2020 The Board of Trustees of the Leland Stanford Junior
// University.  All nonprofit research institutions may use this Software for
// any non-profit purpose, including sponsored research and collaboration.  All
// nonprofit research institutions may publish any information included in the
// Software.  This Software may not be redistributed.  It may not be used for
// commercial purposes.  For any questions regarding commercial use or
// redistribution, please contact the Office of Technology Licensing at Stanford
// University (info@otlmail.stanford.edu).
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS";
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
//==============================================================================
// Sentential Representation

          (x.charCodeAt(0)===95 || x[0]!==x[0].toLowerCase()))}


function arg1 (p)

function arg2 (p)

function head (p)

function tail (l)

function makerule (head,body)

function makeuniversal (variable,scope)

function adjoinit (x,s)
function newadjoin (x,s)
 {if (!findq(x,s)) {return s.concat(seq(x))};

function unjoin (x,s)
 {for (var i=0; i<s.length; i++)

function nconc (l1,l2)

function freevarsexp (x,al,vs)

function pseudogroundp (exp,al)
     {var dum = al[exp];
// Linked Lists


function cons (x,y)

function car (l)

function rplaca(l,x)
 {l.car = x; return l}
function rplacd(l,m)
 {l.cdr = m; return l}


function amongp (x,y)
 {if (symbolp(y)) {return x==y};
  for (var i=0; i<y.length; i++) {if (amongp(x,y[i])) {return true}}
  return false}

// Matching and Unification
//==============================================================================
//------------------------------------------------------------------------------
// unifier
// plug
// standardize
//------------------------------------------------------------------------------
 {if (varp(y))
     {if (x===y) {return true};
      if (dum!==false) {return occurs(x,cdr(dum),al)};
      return false};
  if (symbolp(y)) {return false};
  for (var i=0; i<y.length; i++)
  return false}
  return false}

//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// vnifier
 {if (maatchify(x,al,y,bl,ol)) {return true};


function vident (x,al,y,bl)
 {if (x===y && al===bl) {return true};
     {var dum = bl[y];
  return false}

 {if (varp(y))
     {if (x===y && al===bl) {return true};
      return false};
  if (symbolp(y)) {return false};
  for (var i=0; i<y.length; i++)
  return false}
  //if (x[0]==='setofall') {return pluugquantifier(x,al,bl)};
  //if (x[0]==='countofall') {return pluugquantifier(x,al,bl)};
  return pluugexp(x,al,bl)}

function pluugquantifier (x,al,bl)
 {var result = seq('setofall',x[1]);
  for (var i=2; i<x.length; i++)
      {result.push(pluug(x[i],al,bl))};
  return result}

// Deduplication
//==============================================================================

function uniquify (ins)
 {var pairlist = [];
  var base = 1000000000;
  for (var i=0; i<original.length; i++)
      {pairlist[i] = [original[i],base+i]};
  pairlist = pairlist.sort();
  var newlist = [];
  for (var i=pairlist.length-1; i>0; i--)
      {if (equalp(pairlist[i-1][0],pairlist[i][0])) {continue};
       newlist.push(pairlist[i])};
  newlist.push(pairlist[0]);
  newlist = newlist.sort(function(x,y){return x[1]-y[1]});
  return newlist.map(first)}

function first (x)
 {return x[0]}

function zniquify (original)
 {if (original.length<=10) {return uniquify(original)};
  if (original.length<=1000000000) {return wniquify(original)};
  return original}
// Indexes
//==============================================================================

var indexing = true
// unindex, flatunindex, fullunindex, ruleunindex
// indexps, flatindexps, fullindexps, fullvndexps, ruleunindexps
//------------------------------------------------------------------------------
  for (var i=0; i<x.length; i++)
          {indexsymbol(x,p,theory)}};
  return p}

  if (data===undefined) {theory[x] = [p]; return p};
  data.push(p);
  return p}

  for (var i=0; i<x.length; i++)
          {unindexsymbol(x,p,theory)}};
  return p}

function flatindexps (p,theory)
  var best = indexees(p[0],theory);
          {var dum = indexees(p[i],theory);
  return best}

  var best = indexees(p[0],theory);

function fullvndexps (p,al,facts)
     {var dum = al[p];
      return facts};
  var best = indexees(p[0],facts);

function ruleindexps (p,theory)
  return indexees(p[0],theory)}
  if (!isNaN(Number(x))) {return theory};
  var data = theory[x];

// baseindex
// baseunindex
 {var ds = {};
  for (var i=0; i<data.length; i++)
      {baseindex(data[i],data[i],ds)};
  return ds}

//------------------------------------------------------------------------------
function baseindexsymbol (x,p,theory)
  if (data===undefined) {theory[x] = [p]; return p};
  data.push(p);
  return p}

//------------------------------------------------------------------------------
function baseunindex (x,p,theory)
function baseindexps (p,theory)
  var best = baseindexees(p[0],theory);

function basevndexps (p,al,theory)
     {var dum = al[p];
      return false};
  var best = baseindexees(p[0],theory);

function baseindexees (x,theory)

//==============================================================================
// Theories
//==============================================================================
//------------------------------------------------------------------------------
// emptytheory
 {for (var i=0; i<data.length; i++) {insertfact(data[i],theory)};
  return theory}

function definemorerules (theory,data)
 {for (var i=0; i<data.length; i++) {insertrule(data[i],theory)};
  return theory}

function emptytheory (theory)
// drop, dropfact, droprule
// eliminate, eliminatefacts, eliminaterules
       if (equalp(datum,p)) {uninsert(datum,theory); return datum}};
       if (equalp(datum,p)) {uninsertfact(datum,theory); return datum}};
       if (equalp(datum,p)) {uninsertrule(datum,theory); return datum}};

function insertrule (p,theory)

//------------------------------------------------------------------------------
function uninsert (p,theory)

function uninsertfact (p,theory)

function uninsertrule (p,theory)

//------------------------------------------------------------------------------

function envvndexps (p,al,theory)

function viewindexps (p,theory)

//------------------------------------------------------------------------------

function envlookupfacts (p,al,theory)

function lookuprules (p,theory)

//------------------------------------------------------------------------------
// miscellaneous
//------------------------------------------------------------------------------

function basep (r,rules)
 {return !viewp(r,rules)}

function viewp (r,rules)
 {if (ruleindexing) {return (indexees(r,rules).length!==0)};
  for (var i=0; i<rules.length; i++)
      {if (operator(rules[i])===r) {return true}};
  return false}

function getbases (data)
 {var tables = seq();
  for (var i=0; i<data.length; i++)
      {tables = adjoin(operator(data[i]),tables)};
  return tables}

function getviews (data)
 {var tables = seq();
  for (var i=0; i<data.length; i++)
      {if (symbolp(data[i])) {tables = adjoin(operator(data[i]),tables)};
       if (data[i][0]==='handler') {continue};
       tables = adjoin(operator(data[i]),tables)};
  return tables}

function makepattern (relation,arity)
 {var pattern = seq(relation);
  for (var j=1; j<=arity; j++)
      {pattern[j] = 'X' + j};
  return pattern}

function getfactarity (relation,facts)

function getrulearity (relation,rules)
       if (symbolp(rules[i])) {continue};
       if (rules[i][0]===relation) {return rules[i].length-1};
       if (rules[i][0]==='rule' && !symbolp(rules[i][1]) && rules[i][1][0]===relation)
          {return rules[i][1].length-1}};

//------------------------------------------------------------------------------

function sentences (relation,data)

function sentencen (m,n,relation,data)
  if (results.length>=n) {return results.slice(m,n)};
  if (results.length>=m) {return results.slice(m)};
  return seq()}

function viewfacts (relation,facts,rules)
  return sortfinds(pattern,pattern,facts,rules)}

//==============================================================================
// Accessing datasets without inference
// base always indexed
// data depends on dataindexing

function baseanswerx (query,al,facts,rules)
 {var data = basevndexps(query,al,facts);
  var answers = [];
  for (var i=0; i<data.length; i++)
      {var bl = {};
       var ol = seq();
       if (maatchifyp(query,al,data[i],bl,ol))
          {backup(ol); return data[i]}};
  return false}

function baseanswers (query,al,facts,rules)
 {var data = basevndexps(query,al,facts);
  var answers = [];
  for (var i=0; i<data.length; i++)
      {var bl = {};
       var ol = seq();
       if (maatchifyp(query,al,data[i],bl,ol))
          {answers.push(data[i]);
           backup(ol)}};
  return answers}

//------------------------------------------------------------------------------
function dataanswerx (query,al,facts,rules)
 {var data = dataindexing ? fullvndexps(query,al,facts) : facts;
  var answers = [];
  for (var i=0; i<data.length; i++)
      {var bl = {};
       var ol = seq();
       if (maatchifyp(query,al,data[i],bl,ol))
          {backup(ol); return data[i]}};
  return false}

function dataanswers (query,al,facts,rules)
 {var data = dataindexing ? fullvndexps(query,al,facts) : facts;
  var answers = [];
  for (var i=0; i<data.length; i++)
      {var bl = {};
       var ol = seq();
       if (maatchifyp(query,al,data[i],bl,ol))
          {answers.push(data[i]);
           backup(ol)}};
  return answers}

//------------------------------------------------------------------------------
function companswerx (query,al,facts,rules)
 {var arg = pluug(query[1],al,al);
  var val = compvalue(arg,facts,rules);
  var ol = seq();
  if (maatchify(query[2],al,val,al,ol))
     {var answer = ['evaluate',arg,val];
      backup(ol);
      return answer};
  return false}

function companswers (query,al,facts,rules)
 {var arg = pluug(query[1],al,al);
  var val = compvalue(arg,facts,rules);
  var ol = seq();
  if (maatchify(query[2],al,val,al,ol))
     {var answer = ['evaluate',arg,val];
      backup(ol);
      return [answer]};
  return false}

//==============================================================================
// Inference without built-in relations
//------------------------------------------------------------------------------
  if (answers.length>0) {return answers[0]};
  return false}
function basefinds (result,query,facts,rules)

function basefindn (n,result,query,facts,rules)
 {var results = [];
  if (n<=0) {return results};
  basesome(n,result,query,seq(),{},nil,results,facts,rules);
  return results}

function basefindg (result,query,facts,rules)
 {return compgen(result,query,facts,rules)}

//------------------------------------------------------------------------------
     {return basesomeatom(n,x,p,pl,al,cont,results,facts,rules)}
     {return basesomesame(n,x,p,pl,al,cont,results,facts,rules)}
     {return basesomedistinct(n,x,p,pl,al,cont,results,facts,rules)}
     {return basesomenot(n,x,p,pl,al,cont,results,facts,rules)}
     {return basesomeand(n,x,p,pl,al,cont,results,facts,rules)}
     {return basesomeor(n,x,p,pl,al,cont,results,facts,rules)};
  if (basep(p[0],rules))
     {return basesomebase(n,x,p,pl,al,cont,results,facts,rules)};

  if (basep(p,rules))
     {return basesomebase(n,x,p,pl,al,cont,results,facts,rules)};

  if (vnifyp(p[1],al,p[2],al,ol))
      backup(ol);
      return answer};
  return false}
     {return basesomeexit(n,x,pl,al,cont,results,facts,rules)};
  return false}
  for (var i=1; i<p.length; i++)
          {return answer}};

  for (var i=0; i<data.length; i++)
           if (answer) {return answer}}};
  return false}

function basesomeground (n,x,p,pl,al,cont,results,facts,rules)
     {return basesomeexit(n,x,pl,al,cont,results,facts,rules)};
  return false}
               if (answer) {return answer}}}
                 if (answer) {return answer}}}}
  return false}
     {return basesome(n,x,pl[0],tail(pl),al,cont,results,facts,rules)};
     {results.push(pluug(x,al,al));
      if (typeof(n)==='number' && results.length>=n) {return results};
      return false};

//------------------------------------------------------------------------------

function basevalue (p,facts,rules)
 {if (varp(p)) {return false};
  if (symbolp(p)) {return p};
  if (p[0]==='choose') {return basevaluechoose(p,facts,rules)};
  if (p[0]==='if') {return basevalueif(p,facts,rules)};
  var args = seq();
  for (var i=1; i<p.length; i++)
      {var arg = basevalue(p[i],facts,rules);
       if (arg!==false) {args[i-1] = arg} else {return false}};
  return baseapply(p[0],args,facts,rules)}

function basevaluesetofall (p,facts,rules)
  
function basevaluecountofall (p,facts,rules)

function basevaluechoose (p,facts,rules)
  var n = Math.floor(Math.random()*possibilities.length);
  return possibilities[n]}

function basevalueif (p,facts,rules)
 {for (var i=1; i<p.length; i=i+2)
      {if (basefindp(p[i],facts,rules))
          {return basevalue(p[i+1],facts,rules)}};
  return false}

function baseapply (fun,args,facts,rules)
 {return baseapplyrs (fun,args,facts,rules)}

function baseapplybuiltin (fun,args,facts,rules)
 {return eval(fun).apply(null,args)}

function baseapplymath (fun,args,facts,rules)

function baseapplylist (fun,args,facts,rules)
  return stringize(eval(fun).call(null,args))}

function baseapplyrs (fun,args,facts,rules)
 {var result = seq(fun).concat(args);
  var data = indexees('definition',rules);
  var flag = false;
  for (var i=0; i<data.length; i++)
       if (data[i][0]==='definition')
           if (vnifyp(data[i][1],bl,result,bl,ol))
               var answer = basevalue(term,facts,rules);
               backup(ol);
               if (answer) {return answer}}}}
  if (flag) {return false};
  return result}

//==============================================================================
// Full inference
//==============================================================================
//------------------------------------------------------------------------------
  if (answers.length>0) {return answers[0]};
  return false}
function compfinds (result,query,facts,rules)

function compfindn (n,result,query,facts,rules)
 {var results = [];
  if (typeof(n)==='number' && n<=0) {return results};
  compsome(n,result,query,seq(),{},nil,results,facts,rules);
  return results}

function compfindg (result,query,facts,rules)
 {return compgen(result,query,facts,rules)}

function sortfinds (result,query,facts,rules)

//------------------------------------------------------------------------------
  if (symbolp(p))
     {return compsomeatom(n,x,p,pl,al,cont,results,facts,rules)}
     {return compsomesame(n,x,p,pl,al,cont,results,facts,rules)}
     {return compsomedistinct(n,x,p,pl,al,cont,results,facts,rules)}
     {return compsomeeval(n,x,p,pl,al,cont,results,facts,rules)}
     {return compsomematches(n,x,p,pl,al,cont,results,facts,rules)}
     {return compsomesubmatches(n,x,p,pl,al,cont,results,facts,rules)}
  if (builtinp(p[0]))
     {return compsomecall(n,x,p,pl,al,cont,results,facts,rules)}
     {return compsomemath(n,x,p,pl,al,cont,results,facts,rules)}
  if (listop(p[0]))
     {return compsomelist(n,x,p,pl,al,cont,results,facts,rules)}
     {return compsomemap(n,x,p,pl,al,cont,results,facts,rules)}
     {return compsomesetofall(n,x,p,pl,al,cont,results,facts,rules)}
     {return compsomecountofall(n,x,p,pl,al,cont,results,facts,rules)}
     {return compsomeevaluate(n,x,p,pl,al,cont,results,facts,rules)}
     {return compsomemember(n,x,p,pl,al,cont,results,facts,rules)}
     {return compsomenot(n,x,p,pl,al,cont,results,facts,rules)}
     {return compsomeand(n,x,p,pl,al,cont,results,facts,rules)}
     {return compsomeor(n,x,p,pl,al,cont,results,facts,rules)}
     {return compsometrue(n,x,p,pl,al,cont,results,facts,rules)}
  if (basep(p[0],rules))
     {return compsomebase(n,x,p,pl,al,cont,results,facts,rules)};
  return compsomeview(n,x,p,pl,al,cont,results,facts,rules)}

function compsomeatom (n,x,p,pl,al,cont,results,facts,rules)
     {return compsomeexit(n,x,pl,al,cont,results,facts,rules)};
     {return false};
  if (basep(p,rules))
     {return compsomebase(n,x,p,pl,al,cont,results,facts,rules)};
  return compsomeground(n,x,p,pl,al,cont,results,facts,rules)}
     {var answer = compsomeexit(n,x,pl,al,cont,results,facts,rules);
      backup(ol);
      return answer};
  return false}

function compsomematches (n,x,p,pl,al,cont,results,facts,rules)
  if (!stringp(str)) {return false};
  str = str.substring(1,str.length-1);
  var pat = pluug(p[2],al,al);
  if (!stringp(pat)) {return false};
  pat = pat.substring(1,pat.length-1);
  var re=new RegExp(pat,'g');
  var fragments = re.exec(str);
  if (fragments!=null)
      for (var i=3; i<p.length; i++)
              {backup(ol); return false}};
      var answer = compsomeexit(n,x,pl,al,cont,results,facts,rules);
      backup(ol)
      return answer};
function compsomesubmatches (n,x,p,pl,al,cont,results,facts,rules)
  str = str.substring(1,str.length-1);
  var pat = pluug(p[2],al,al);
  pat = pat.substring(1,pat.length-1);
  if (symbolp(str))
      var matches = str.match(re);
      if (matches!=null)
               var result = '"' + matches[i] + '"';
                   if (answer) {return answer}}}}};
  for (var i=1; i<p.length; i++)
      {var arg = pluug(p[i],al,al);
       if (varp(arg)) {return false} else {args[args.length] = arg}};
  var val = eval(p[0]).apply(null,args);
  if (!val) {return false};
  return compsomeexit(n,x,pl,al,cont,results,facts,rules)}

function compsomecall (n,x,p,pl,al,cont,results,facts,rules)
  for (var i=1; i<p.length-1; i++)
      {var arg = pluug(p[i],al,al);
       if (varp(arg)) {return false} else {args[args.length] = arg}};
  var val = eval(p[0]).apply(null,args);
  if (!val) {return false};
  var ol = seq();
  if (vnifyp(p[p.length-1],al,val,al,ol))
     {var answer = compsomeexit(n,x,pl,al,cont,results,facts,rules);
      backup(ol);
      return answer};
  return false}

function compsomemath (n,x,p,pl,al,cont,results,facts,rules)
  for (var i=1; i<p.length-1; i++)
      {var arg = numberize(pluug(p[i],al,al));
       if (isNaN(arg)) {return false};
       args[args.length] = arg};
  var val = stringize(Math[p[0]].apply(null,args));
  var ol = seq();
  if (vnifyp(p[p.length-1],al,val,al,ol))
     {var answer = compsomeexit(n,x,pl,al,cont,results,facts,rules);
      backup(ol);
      return answer};
  return false}

function compsomelist (n,x,p,pl,al,cont,results,facts,rules)
  var s = numlistify(c);
  if (s===false) {return false};
  var val = stringize(eval(p[0]).call(null,s));
  var ol = seq();
  if (vnifyp(p[2],al,val,al,ol))
     {var answer = compsomeexit(n,x,pl,al,cont,results,facts,rules);
      backup(ol);
      return answer};
  return false}

function compsomemap (n,x,p,pl,al,cont,results,facts,rules)
  var val = map(p[1],pluug(p[2],al,al),facts,rules);
  if (val===false) {return false};
  var ol = seq();
     {var answer = compsomeexit(n,x,pl,al,cont,results,facts,rules);
      backup(ol);
      return answer};
  return false}

function compsomesetofall (n,x,p,pl,al,cont,results,facts,rules)
  var ol = seq();
  var result = listify(compfinds(p[1],p[2],facts,rules));
  if (vnifyp(p[3],al,result,al,ol))
     {var answer = compsomeexit(n,x,pl,al,cont,results,facts,rules);
      backup(ol);
      return answer};
  return false}

function compsomecountofall (n,x,p,pl,al,cont,results,facts,rules)
  var answers = seq();
  compsome(true,p[1],p[2],seq(),al,nil,answers,facts,rules);
  answers = vniquify(answers);
  var ol = seq();
  if (vnifyp(p[3],al,answers.length.toString(),al,ol))
     {var answer = compsomeexit(n,x,pl,al,cont,results,facts,rules);
      backup(ol);
      return answer};
  return false}

function compsomeevaluate (n,x,p,pl,al,cont,results,facts,rules)
  var ol = seq();
  if (val && vnifyp(p[2],al,val,al,ol))
     {var answer = compsomeexit(n,x,pl,al,cont,results,facts,rules);
      backup(ol);
      return answer};
  return false}

function compsomemember (n,x,p,pl,al,cont,results,facts,rules)
  var list = pluug(p[2],al,al);
  var ol = [];
  while (!symbolp(list) && list[0]==='cons')
   {if (vnifyp(item,al,list[1],al,ol))
       {answer = compsomeexit(n,x,pl,al,cont,results,facts,rules);
        if (answer) {return answer}};
    list = list[2]};

function compsometrue (n,x,p,pl,al,cont,results,facts,rules)
  var data = envlookupfacts(p[1],al,ds);
  for (var i=0; i<data.length; i++)
           backup(ol);
           if (answer) {return answer}}};
  return false}

function compsomenot (n,x,p,pl,al,cont,results,facts,rules)
     {return compsomeexit(n,x,pl,al,cont,results,facts,rules)};
  return false}
  for (var i=1; i<p.length; i++)
          {return answer}};

function compsomebase (n,x,p,pl,al,cont,results,facts,rules)
  for (var i=0; i<data.length; i++)
       if (vnifyp(data[i],bl,p,al,ol))
           backup(ol);
           if (answer) {return answer}}};
     {return compsomeexit(n,x,pl,al,cont,results,facts,rules)};
  return false}

function compsomeview (n,x,p,pl,al,cont,results,facts,rules)
       var bl = {};
       if (data[i][0]==='rule')
               var answer = compsomeexit(n,x,ql,bl,nc,results,facts,rules);
               backup(ol);
               if (answer) {return answer}}}
                {var answer = compsomeexit(n,x,pl,al,cont,results,facts,rules);
                 backup(ol);
                 if (answer) {return answer}}}}
     {return compsome(n,x,pl[0],tail(pl),al,cont,results,facts,rules)};
     {results.push(pluug(x,al,al));
      if (typeof(n)==='number' && results.length>=n) {return results};
      return false};
// call
//------------------------------------------------------------------------------
function compgen (x,p,facts,rules)
 {var type = gettype(p,rules);
  var al = {};
  var toplevel = {};
  toplevel.type = 'toplevel';
  toplevel.aspect = x;
  toplevel.alist = al;
  return makeframe(type,p,al,facts,rules,'call',toplevel)}

function gettype (p,rules)
 {if (symbolp(p)) {return 'atom'};
  if (p[0]==='same') {return 'same'};
  if (p[0]==='distinct') {return 'distinct'};
  if (p[0]==='mutex') {return 'mutex'};
  if (p[0]==='evaluate') {return 'evaluation'};
  if (p[0]==='member') {return 'member'};
  if (p[0]==='not') {return 'negation'};
  if (p[0]==='and') {return 'conjunction'};
  if (p[0]==='or') {return 'disjunction'};
  if (p[0]==='rule') {return 'rule'};
  if (p[0]==='true') {return 'true'};
  if (basep(p[0],rules)) {return 'base'};
  return 'view'}

function makeframe (type,p,al,facts,rules,task,caller)
 {var frame = {};
  frame.type = type;
  frame.query = p;
  frame.alist = al;
  frame.facts = facts;
  frame.rules = rules;
  frame.task = task;
  frame.caller = caller;
  return frame}

//------------------------------------------------------------------------------

function callx (gen)
 {return call(gen)}

function calln (n,gen)
 {if (typeof(n)==='number' && n<=0) {return []};
  var i = 0;
  var answer;
  var results = [];
  var resultmap = {};
  while (i<n && (answer = call(gen)))
   {var ind = grindem(answer);
    if (!(ind in resultmap))
       {results.push(answer); resultmap[ind] = 1; i++}} 
  return results}

function calls (gen)
 {var answer;
  var results = [];
  var resultmap = {};
  while (answer = call(gen))
   {var ind = grindem(answer);
    if (!(ind in resultmap))
       {results.push(answer); resultmap[ind] = 1}} 
  return results}

function call (frame)
 {if (frame.caller.task) {frame.task = 'redo'};
  return loop(frame)}

function loop (frame)
 {while (true)
   {//console.log(frame.task + ': '); console.log(frame);
    if (instantiations + inferences >= framelimit) {return false};
    if (frame.type==='toplevel')
       {if (frame.task==='next')
           {return pluug(frame.aspect,frame.alist,frame.alist)};
        if (frame.task==='back') {return false};
        return false};
    frame = processframe(frame)}}

function processframe (frame)
 {var task = frame.task;
  if (task==='call') {return callframe(frame)};
  if (task==='redo') {return redoframe(frame)};
  if (task==='next') {return nextframe(frame)};
  if (task==='back') {return backframe(frame)};
  return false}

function callframe (frame)
 {if (frame.type==='atom') {return callatom(frame)};
  if (frame.type==='same') {return callsame(frame)};
  if (frame.type==='distinct') {return calldistinct(frame)};
  if (frame.type==='mutex') {return calleval(frame)};
  if (frame.type==='evaluation') {return callevaluation(frame)};
  if (frame.type==='member') {return callmember(frame)};
  if (frame.type==='negation') {return callnegation(frame)};
  if (frame.type==='conjunction') {return callconjunction(frame)};
  if (frame.type==='disjunction') {return calldisjunction(frame)};
  if (frame.type==='true') {return calltrue(frame)};
  if (frame.type==='base') {return callbase(frame)};
  if (frame.type==='view') {return callview(frame)};
  if (frame.type==='rule') {return callrule(frame)};
  return false}

function redoframe (frame)
 {if (frame.type==='atom') {return redoatom(frame)};
  if (frame.type==='same') {return redosame(frame)};
  if (frame.type==='distinct') {return redodistinct(frame)};
  if (frame.type==='mutex') {return redoeval(frame)};
  if (frame.type==='evaluation') {return redoevaluation(frame)};
  if (frame.type==='member') {return redomember(frame)};
  if (frame.type==='negation') {return redonegation(frame)};
  if (frame.type==='conjunction') {return redoconjunction(frame)};
  if (frame.type==='disjunction') {return redodisjunction(frame)};
  if (frame.type==='true') {return redotrue(frame)};
  if (frame.type==='base') {return redobase(frame)};
  if (frame.type==='view') {return redoview(frame)};
  if (frame.type==='rule') {return redorule(frame)};
  return false}

function nextframe (frame)
 {if (frame.type==='atom') {return nextatom(frame)};
  if (frame.type==='negation') {return nextnegation(frame)};
  if (frame.type==='conjunction') {return nextconjunction(frame)};
  if (frame.type==='disjunction') {return nextdisjunction(frame)};
  if (frame.type==='view') {return nextview(frame)};
  if (frame.type==='rule') {return nextrule(frame)};
  return false}

function backframe (frame)
 {if (frame.type==='atom') {return backatom(frame)};
  if (frame.type==='negation') {return backnegation(frame)};
  if (frame.type==='conjunction') {return backconjunction(frame)};
  if (frame.type==='disjunction') {return backdisjunction(frame)};
  if (frame.type==='view') {return backview(frame)};
  if (frame.type==='rule') {return backrule(frame)};
  return false}

//------------------------------------------------------------------------------

function callatom (frame)
 {var query = frame.query;
  var alist = frame.alist;
  var facts = frame.facts;
  var rules = frame.rules;
  if (query==='true') {frame.caller.task = 'next'; return frame.caller};
  if (query==='false') {frame.caller.task = 'back'; return frame.caller};
  if (basep(query,rules))
     {return makeframe('base',query,alist,facts,rules,'call',frame)};
  return makeframe('view',query,alist,facts,rules,'call',frame)}

function redoatom (frame)
 {frame.caller.task = 'back';
  return frame.caller}

function nextatom (frame)
 {frame.caller.task = 'next';
  return frame.caller}

function backatom (frame)
 {frame.caller.task = 'back';
  return frame.caller}

//------------------------------------------------------------------------------

function callsame (frame)
 {var query = frame.query;
  var alist = frame.alist;
  if (vnifyp(query[1],alist,query[2],alist,[]))
     {frame.caller.task = 'next';
      return frame.caller};
  frame.caller.task = 'back';
  return frame.caller}

function redosame (frame)
 {frame.caller.task = 'back';
  return frame.caller}

//------------------------------------------------------------------------------

function calldistinct (frame)
 {var query = frame.query;
  var alist = frame.alist;
  if (vnifyp(query[1],alist,query[2],alist,[]))
     {frame.caller.task = 'back';
      return frame.caller};
  frame.caller.task = 'next';
  return frame.caller}

function redodistinct (frame)
 {frame.caller.task = 'back';
  return frame.caller}

//------------------------------------------------------------------------------

function calleval (frame)
 {var query = frame.query;
  var alist = frame.alist;
  var args = seq();
  for (var i=1; i<query.length; i++)
      {var arg = pluug(query[i],alist,alist);
       if (varp(arg)) {frame.caller.task = 'back'; return frame.caller}
          else {args[args.length] = arg}};
  if (eval(query[0]).apply(null,args))
     {frame.caller.task = 'next';
      return frame.caller};
  frame.caller.task = 'back';
  return frame.caller}

function redoeval (frame)
 {frame.caller.task = 'back';
  return frame.caller}

//------------------------------------------------------------------------------

function callevaluation (frame)
 {var query = frame.query;
  var alist = frame.alist;
  var facts = frame.facts;
  var rules = frame.rules;
  var val = compvalue(pluug(query[1],alist,alist),facts,rules);
  var ol = [];
  frame.ol = ol;
  if (vnifyp(query[2],alist,val,alist,ol))
     {frame.caller.task = 'next';
      return frame.caller};
  frame.caller.task = 'back';
  return frame.caller}

function redoevaluation (frame)
 {var ol = frame.ol;
  backup(ol);
  frame.caller.task = 'back';
  return frame.caller}

//------------------------------------------------------------------------------

function callmember (frame)
 {var query = frame.query;
  var alist = frame.alist;
  frame.list = pluug(query[2],alist,alist);
  frame.ol = [];
  return redomember(frame)}

function redomember (frame)
 {var query = frame.query;
  var alist = frame.alist;
  var item = query[1];
  var list = frame.list;
  var ol = frame.ol;
  backup(ol);
  while (!symbolp(list) && list[0]==='cons')
   {if (vnifyp(item,alist,list[1],alist,ol))
       {list = list[2];
        frame.list = list;
        frame.caller.task = 'next';
        return frame.caller};
    list = list[2]};
  frame.list = list;
  return frame.caller}

//------------------------------------------------------------------------------

function callnegation (frame)
 {var query = frame.query;
  var alist = frame.alist;
  var facts = frame.facts;
  var rules = frame.rules;
  var subgoal = query[1];
  var type = gettype(subgoal,rules);
  return makeframe(type,query[1],alist,facts,rules,'call',frame)}

function redonegation (frame)
 {frame.caller.task = 'back';
  return frame.caller}

function nextnegation (frame)
 {frame.caller.task = 'back';
  return frame.caller}

function backnegation (frame)
 {frame.caller.task = 'next';
  return frame.caller}

//------------------------------------------------------------------------------

function callconjunction (frame)
 {frame.index = 0;
  frame.generators = [];
  frame.task = 'next';
  return nextconjunction(frame)}

function redoconjunction (frame)
 {var query = frame.query;
  var index = frame.index;
  if (frame.generators)
     {frame.generators[index].task = 'redo';
      return frame.generators[index]};
  return backconjunction(frame)}

function nextconjunction (frame)
 {var query = frame.query;
  var alist = frame.alist;
  var facts = frame.facts;
  var rules = frame.rules;
  var index = frame.index;
  if (index===query.length-1)
     {frame.caller.task = 'next';
      return frame.caller};
  index++;
  frame.index = index;
  var subgoal = query[index];
  var type = gettype(subgoal,rules);
  var subframe = makeframe(type,subgoal,alist,facts,rules,'call',frame);
  frame.generators[index] = subframe;
  return subframe}

function backconjunction (frame)
 {var index = frame.index;
  if (index===1)
     {frame.caller.task = 'back';
      return frame.caller};
  index--;
  frame.index = index;
  frame.generators[index].task = 'redo';
  return frame.generators[index]}

//------------------------------------------------------------------------------

function calldisjunction (frame)
 {var query = frame.query;
  if (query.length===1)
     {frame.caller.task = 'back';
      return frame.caller};
  frame.index = 0;
  return backdisjunction(frame)}

function redodisjunction (frame)
 {var query = frame.query;
  var index = frame.index;
  if (query.length===1)
     {frame.caller.task = 'back';
      return frame.caller};
  var subframe = frame.generator;
  subframe.task = 'redo';
  return subframe}

function nextdisjunction (frame)
 {frame.caller.task = 'next';
  return frame.caller}

function backdisjunction (frame)
 {var query = frame.query;
  var alist = frame.alist;
  var facts = frame.facts;
  var rules = frame.rules;
  var index = frame.index;
  index++;
  frame.index = index;
  if (index>=query.length)
     {frame.caller.task = 'back';
      return frame.caller};
  var subgoal = query[index];
  var type = gettype(subgoal,rules);
  var subframe = makeframe(type,subgoal,alist,facts,rules,'call',frame);
  frame.generator = subframe;
  return subframe}

//------------------------------------------------------------------------------

function callbase (frame)
 {var query = frame.query;
  var alist = frame.alist;
  var facts = frame.facts;
  frame.data = envlookupfacts(query,alist,facts)
  frame.index = 0;
  frame.ol = [];
  return redobase(frame)}

function redobase (frame)
 {var p = frame.query;
  var al = frame.alist;
  var data = frame.data;
  var index = frame.index;
  var ol = frame.ol;
  backup(ol);
  while (index<data.length)
    if (vnifyp(p,al,data[index],al,ol))
        frame.index = index;
        frame.caller.task = 'next';
        return frame.caller};
    index++};
  frame.index = index;
  frame.caller.task = 'back';
  return frame.caller}

//------------------------------------------------------------------------------

function calltrue (frame)
 {var query = frame.query;
  var alist = frame.alist;
  var ds = getdataset(query[2]);
  var data = envlookupfacts(query[1],alist,ds);
  frame.data = data;
  frame.index = 0;
  frame.ol = [];
  return redotrue(frame)}

function redotrue (frame)
 {var query = frame.query;
  var alist = frame.alist;
  var data = frame.data;
  var index = frame.index;
  var ol = frame.ol;
  backup(ol);
  while (index<data.length)
    if (vnifyp(query[1],alist,data[index],alist,ol))
        frame.index = index;
        frame.caller.task = 'next';
        return frame.caller};
    index++};
  frame.index = index;
  frame.caller.task = 'back';
  return frame.caller}

//------------------------------------------------------------------------------

function callview (frame)
 {frame.data = lookuprules(frame.query,frame.rules);
  frame.index = 0;
  frame.blist = {};
  frame.ol = [];
  frame.task = 'redo';
  return backview(frame)}

function redoview (frame)
 {var subframe = frame.generator;
  if (subframe)
     {subframe.task = 'redo';
      return subframe};
  return backview(frame)}

function nextview (frame)
 {frame.caller.task = 'next';
  return frame.caller}

function backview (frame)
 {var p = frame.query;
  var al = frame.alist;
  var bl = frame.blist;
  var facts = frame.facts;
  var rules = frame.rules;
  var data = frame.data;
  var index = frame.index;
  var ol = frame.ol;
  backup(ol);
  while (index<data.length)
    var datum = data[index];
    index++;
    if (datum[0]==='rule')
       {if (vnifyp(datum[1],bl,p,al,ol))
           {frame.index = index;
            var subframe = makeframe('rule',datum,bl,facts,rules,'call',frame);
            frame.generator = subframe;
            return subframe}}
    else if (vnifyp(p,al,datum,bl,ol))
             frame.caller.task = 'next';
             return frame.caller}};
  frame.index = index;
  frame.caller.task = 'back';
  return frame.caller}

//------------------------------------------------------------------------------

function callrule (frame)
 {frame.index = 1;
  frame.generators = [];
  frame.task = 'next';
  return nextrule(frame)}

function redorule (frame)
 {var query = frame.query;
  var index = frame.index;
  if (frame.generators)
     {frame.generators[index].task = 'redo';
      return frame.generators[index]};
  return backrule(frame)}

function nextrule (frame)
 {var rule = frame.query;
  var alist = frame.alist;
  var facts = frame.facts;
  var rules = frame.rules;
  var index = frame.index;
  if (index===rule.length-1)
     {frame.caller.task = 'next';
      return frame.caller};
  index++;
  frame.index = index;
  var subgoal = rule[index];
  var type = gettype(subgoal,rules);
  var subframe = makeframe(type,subgoal,alist,facts,rules,'call',frame);
  frame.generators[index] = subframe;
  return subframe}

function backrule (frame)
 {var index = frame.index;
  if (index===2)
     {frame.caller.task = 'back';
      return frame.caller};
  index--;
  frame.index = index;
  frame.generators[index].task = 'redo';
  return frame.generators[index]}

//------------------------------------------------------------------------------

function compvalue (p,facts,rules)
 {if (varp(p)) {return false};
  if (symbolp(p)) {return p};
  if (p[0]==='map') {return compvaluemap(p,facts,rules)};
  if (p[0]==='setofall') {return compvaluesetofall(p,facts,rules)};
  if (p[0]==='countofall') {return compvaluecountofall(p,facts,rules)};
  if (p[0]==='choose') {return compvaluechoose(p,facts,rules)};
  if (p[0]==='if') {return compvalueif(p,facts,rules)};
  var args = seq();
  for (var i=1; i<p.length; i++)
      {var arg = compvalue(p[i],facts,rules);
       if (arg!==false) {args[i-1] = arg} else {return false}};
  return compapply(p[0],args,facts,rules)}

function compvaluemap (p,facts,rules)
  var arglist = compvalue(p[2],facts,rules);
  return compval(fun,arglist,facts,rules)}

function compval (fun,arglist,facts,rules)
 {if (arglist===nil) {return nil};
  if (symbolp(arglist) || arglist[0]!=='cons') {return false};
  var result = compapply(fun,seq(arglist[1]),facts,rules);
  if (result===false) {return false};
  var results = compval(fun,arglist[2],facts,rules);
  if (results===false) {return false};
  return seq('cons',result,results)}

function compvaluesetofall (p,facts,rules)
  
function compvaluecountofall (p,facts,rules)

function compvaluechoose (p,facts,rules)
  if (possibilities.length===0) {return false};
  var n = Math.floor(Math.random()*possibilities.length);
  return possibilities[n]}

function compvalueif (p,facts,rules)
 {for (var i=1; i<p.length; i=i+2)
      {if (compfindp(p[i],facts,rules))
          {return compvalue(p[i+1],facts,rules)}};
  return false}

function compapply (fun,args,facts,rules)
 {if (builtinp(fun)) {return compapplybuiltin(fun,args,facts,rules)};
  if (mathp(fun)) {return compapplymath(fun,args,facts,rules)};
  if (listop(fun)) {return compapplylist(fun,args,facts,rules)};
  return compapplyrs (fun,args,facts,rules)}

function compapplybuiltin (fun,args,facts,rules)
 {return eval(fun).apply(null,args)}

function compapplymath (fun,args,facts,rules)

function compapplylist (fun,args,facts,rules)
  return stringize(eval(fun).call(null,args))}

function compapplyrs (fun,args,facts,rules)
 {var result = seq(fun).concat(args);
  var data = indexees('definition',rules);
  var flag = false;
  for (var i=0; i<data.length; i++)
       if (data[i][0]==='definition')
           if (vnifyp(data[i][1],bl,result,bl,ol))
               var answer = compvalue(term,facts,rules);
               backup(ol);
               if (answer) {return answer}}}}
  if (flag) {return false};
  return result}

//------------------------------------------------------------------------------

var exportables = [];

function compexecute (seed,facts,rules)
 {var updates = compexpand(seed,facts,rules);
  var outputs = [];
  for (var i=0; i<updates.length; i++)
      {var update = updates[i];
       if (symbolp(update)) {continue};
       if (update[0]==='delete') {compdrop(update[1],facts)};
       if (update[0]==='not') {compdrop(update[1],facts)}};
  for (var i=0; i<updates.length; i++)
      {var update = updates[i];
       if (symbolp(update)) {compsave(update,facts); continue};
       if (update[0]==='insert') {compsave(update[1],facts); continue};
       if (update[0]==='enqueue') {outputs.push(update[1]); continue};
       if (findq(update[0],exportables)) {outputs.push(update); continue};
       if (update[0]==='not') {continue};
       compsave(update,facts)};
  return outputs}

function compexpand (seed,facts,rules)
 {if (symbolp(seed)) {return compexpandrs(seed,facts,rules)};
  if (seed[0]==='not') {return [seed]};
  if (seed[0]==='and')
     {var updates = [];
      for (var i=1; i<seed.length; i++)
          {updates = updates.concat(compexpand(seed[i],facts,rules))}
      return updates};
  if (seed[0]==='transition') {return compexpandtransition(seed,facts,rules)};
  return compexpandrs(seed,facts,rules)}

function compexpandtransition (seed,facts,rules)
 {var updates = [];
  var changes = compfinds(seed[2],seed[1],facts,rules);
  for (j=0; j<changes.length; j++)
      {updates = updates.concat(compexpand(changes[j],facts,rules))};
  return updates}

function compexpandrs (seed,facts,rules)
 {var updates = [];
  var data = indexees('handler',rules);
  var flag = false;
  for (var i=0; i<data.length; i++)
       if (data[i][0]!=='handler') {continue};
       var bl;
       if (bl = matcher(data[i][1],seed))
          {flag = true;
           var rule = plug(data[i][2],bl);
           updates = updates.concat(compexpand(rule,facts,rules))}};
  if (flag) {return updates};
  return [seed]}

var expanddepth = 100;

function compexpand (seed,facts,rules)
 {return zniquify(compexpanddepth(seed,facts,rules,0))}

function compexpanddepth (seed,facts,rules,depth)
 {if (symbolp(seed)) {return compexpanddepthrs(seed,facts,rules,depth)};
  if (seed[0]==='not') {return [seed]};
  if (seed[0]==='and') {return compexpanddepthand(seed,facts,rules,depth)};
  if (seed[0]==='transition') {return compexpanddepthtransition(seed,facts,rules,depth)};
  if (depth>expanddepth) {return []};
  return compexpanddepthrs(seed,facts,rules,depth)}

function compexpanddepthand (seed,facts,rules,depth)
 {var updates = [];
  for (var i=1; i<seed.length; i++)
      {updates = updates.concat(compexpanddepth(seed[i],facts,rules,depth))};
  return updates}

function compexpanddepthtransition (seed,facts,rules,depth)
 {var updates = [];
  var changes = compfinds(seed[2],seed[1],facts,rules);
  for (var i=0; i<changes.length; i++)
      {updates = updates.concat(compexpanddepth(changes[i],facts,rules,depth))};
  return updates}

function compexpanddepthrs (seed,facts,rules,depth)
 {var data = indexees('handler',rules);
  var flag = false;
  var updates = [];
  for (var i=0; i<data.length; i++)
       if (data[i][0]!=='handler') {continue};
       var bl;
       if (bl = matcher(data[i][1],seed))
          {flag = true;
           var rule = plug(data[i][2],bl);
           updates = updates.concat(compexpanddepth(rule,facts,rules,depth+1))}};
  if (flag) {return updates};
  return [seed]}

function compsave (p,facts)
 {if (symbolp(p)) {return savefact(p,facts)};
  if (p[0]==='true') {return putfact(p[1],p[2])};
  return savefact(p,facts)}

function compdrop (p,facts)
 {if (symbolp(p)) {return dropfact(p,facts)};
  if (p[0]==='true') {return remfact(p[1],p[2])};
  return dropfact(p,facts)}

//------------------------------------------------------------------------------

function compupdate (facts,rules)
 {var updates = compupdates(facts,rules);
  for (var i=0; i<updates.length; i++)
      {var update = updates[i];
       if (symbolp(update)) {continue};
       if (update[0]==='not') {compdrop(update[1],facts)}};
  for (var i=0; i<updates.length; i++)
      {var update = updates[i];
       if (symbolp(update)) {compsave(update,facts)};
       if (update[0]==='not') {continue};
       compsave(update,facts)};
  return true}

function compupdates (facts,rules)
 {var updates = [];
  var data = rules; // indexees('transition',rules);
  for (var i=0; i<data.length; i++)
      {if (!symbolp(data[i]) && data[i][0]==='transition')
          {updates = updates.concat(compexpand(data[i],facts,rules))}};
  return updates}

//------------------------------------------------------------------------------

function comptransform (condition,action,facts,rules)
 {return compexecute(seq('transition',condition,action),facts,rules)}

function comptransform (condition,action,facts,rules)
 {var updates = [];
  var changes = compfinds(action,condition,facts,rules);
  for (i=0; i<changes.length; i++)
      {updates = updates.concat(compexpand(changes[i],facts,rules))};
  for (var i=0; i<updates.length; i++)
      {var update = updates[i];
       if (symbolp(update)) {continue};
       if (update[0]==='not') {compdrop(update[1],facts)}};
  for (var i=0; i<updates.length; i++)
      {var update = updates[i];
       if (symbolp(update)) {compsave(update,facts)};
       if (update[0]==='not') {continue};
       compsave(update,facts)};
  return true}

//==============================================================================
// Hypothetical reasoning
//==============================================================================
//------------------------------------------------------------------------------

function hypofindp (query,adds,dels,facts,rules)
  if (answers.length>0) {return answers[0]};
  return false}
function hypofinds (result,query,adds,dels,facts,rules)

function hypofindn (n,result,query,adds,dels,facts,rules)
 {var results = [];
  if (typeof(n)==='number' && n<=0) {return results};
  hyposome(n,result,query,seq(),{},nil,results,adds,dels,facts,rules);
  return results}

//------------------------------------------------------------------------------
  if (symbolp(p))
     {return hyposomeatom(n,x,p,pl,al,cont,results,adds,dels,facts,rules)}
     {return hyposomesame(n,x,p,pl,al,cont,results,adds,dels,facts,rules)}
     {return hyposomedistinct(n,x,p,pl,al,cont,results,adds,dels,facts,rules)}
     {return hyposomematches(n,x,p,pl,al,cont,results,adds,dels,facts,rules)}
     {return hyposomesubmatches(n,x,p,pl,al,cont,results,adds,dels,facts,rules)}
  if (builtinp(p[0]))
     {return hyposomecall(n,x,p,pl,al,cont,results,adds,dels,facts,rules)}
     {return hyposomemath(n,x,p,pl,al,cont,results,adds,dels,facts,rules)}
  if (listop(p[0]))
     {return hyposomelist(n,x,p,pl,al,cont,results,adds,dels,facts,rules)}
     {return hyposomemap(n,x,p,pl,al,cont,results,adds,dels,facts,rules)}
     {return hyposomesetofall(n,x,p,pl,al,cont,results,adds,dels,facts,rules)}
     {return hyposomecountofall(n,x,p,pl,al,cont,results,adds,dels,facts,rules)}
     {return hyposomeevaluate(n,x,p,pl,al,cont,results,adds,dels,facts,rules)}
     {return hyposomemember(n,x,p,pl,al,cont,results,adds,dels,facts,rules)}
     {return hyposomenot(n,x,p,pl,al,cont,results,adds,dels,facts,rules)}
     {return hyposomeand(n,x,p,pl,al,cont,results,adds,dels,facts,rules)}
     {return hyposomeor(n,x,p,pl,al,cont,results,adds,dels,facts,rules)}
     {return hyposometrue(n,x,p,pl,al,cont,results,adds,dels,facts,rules)}
  if (basep(p[0],rules))
     {return hyposomebase(n,x,p,pl,al,cont,results,adds,dels,facts,rules)};
  return hyposomeview(n,x,p,pl,al,cont,results,adds,dels,facts,rules)}

function hyposomeatom (n,x,p,pl,al,cont,results,adds,dels,facts,rules)
     {return hyposomeexit(n,x,pl,al,cont,results,adds,dels,facts,rules)};
     {return false};
  if (basep(p,rules))
     {return hyposomebase(n,x,p,pl,al,cont,results,adds,dels,facts,rules)};
  return hyposomeground(n,x,p,pl,al,cont,results,adds,dels,facts,rules)}
     {var answer = hyposomeexit(n,x,pl,al,cont,results,adds,dels,facts,rules);
      backup(ol);
      return answer};
  return false}

function hyposomematches (n,x,p,pl,al,cont,results,adds,dels,facts,rules)
  if (!stringp(str)) {return false};
  str = str.substring(1,str.length-1);
  var pat = pluug(p[2],al,al);
  if (!stringp(pat)) {return false};
  pat = pat.substring(1,pat.length-1);
  var re=new RegExp(pat,'g');
  var fragments = re.exec(str);
  if (fragments!=null)
      for (var i=3; i<p.length; i++)
              {backup(ol); return false}};
      var answer = hyposomeexit(n,x,pl,al,cont,results,adds,dels,facts,rules);
      backup(ol)
      return answer};
function hyposomesubmatches (n,x,p,pl,al,cont,results,adds,dels,facts,rules)
  str = str.substring(1,str.length-1);
  var pat = pluug(p[2],al,al);
  pat = pat.substring(1,pat.length-1);
  if (symbolp(str))
      var matches = str.match(re);
      if (matches!=null)
               var result = '"' + matches[i] + '"';
                   if (answer) {return answer}}}}};
function hyposomecall (n,x,p,pl,al,cont,results,adds,dels,facts,rules)
  for (var i=1; i<p.length-1; i++)
      {var arg = pluug(p[i],al,al);
       if (varp(arg)) {return false} else {args[args.length] = arg}};
  var val = eval(p[0]).apply(null,args);
  if (!val) {return false};
  var ol = seq();
  if (vnifyp(p[p.length-1],al,val,al,ol))
     {var answer = hyposomeexit(n,x,pl,al,cont,results,adds,dels,facts,rules);
      backup(ol);
      return answer};
  return false}

function hyposomemath (n,x,p,pl,al,cont,results,adds,dels,facts,rules)
  for (var i=1; i<p.length-1; i++)
      {var arg = numberize(pluug(p[i],al,al));
       if (isNaN(arg)) {return false};
       args[args.length] = arg};
  var val = stringize(Math[p[0]].apply(null,args));
  var ol = seq();
  if (vnifyp(p[p.length-1],al,val,al,ol))
     {var answer = hyposomeexit(n,x,pl,al,cont,results,adds,dels,facts,rules);
      backup(ol);
      return answer};
  return false}

function hyposomelist (n,x,p,pl,al,cont,results,adds,dels,facts,rules)
  var s = numlistify(c);
  if (s===false) {return false};
  var val = stringize(eval(p[0]).call(null,s));
  var ol = seq();
  if (vnifyp(p[2],al,val,al,ol))
     {var answer = hyposomeexit(n,x,pl,al,cont,results,adds,dels,facts,rules);
      backup(ol);
      return answer};
  return false}

function hyposomemap (n,x,p,pl,al,cont,results,adds,dels,facts,rules)
  var val = map(p[1],pluug(p[2],al,al),adds,dels,facts,rules);
  if (val===false) {return false};
  var ol = seq();
     {var answer = hyposomeexit(n,x,pl,al,cont,results,adds,dels,facts,rules);
      backup(ol);
      return answer};
  return false}

function hyposomesetofall (n,x,p,pl,al,cont,results,adds,dels,facts,rules)
  var ol = seq();
  var result = listify(hypofinds(p[1],p[2],adds,dels,facts,rules));
  if (vnifyp(p[3],al,result,al,ol))
     {var answer = hyposomeexit(n,x,pl,al,cont,results,adds,dels,facts,rules);
      backup(ol);
      return answer};
  return false}

function hyposomecountofall (n,x,p,pl,al,cont,results,adds,dels,facts,rules)
  var answers = seq();
  hyposome(true,p[1],p[2],seq(),al,nil,answers,adds,dels,facts,rules);
  answers = vniquify(answers);
  var ol = seq();
  if (vnifyp(p[3],al,answers.length.toString(),al,ol))
     {var answer = hyposomeexit(n,x,pl,al,cont,results,adds,dels,facts,rules);
      backup(ol);
      return answer};
  return false}

function hyposomeevaluate (n,x,p,pl,al,cont,results,adds,dels,facts,rules)
  var ol = seq();
  if (val && vnifyp(p[2],al,val,al,ol))
     {var answer = hyposomeexit(n,x,pl,al,cont,results,adds,dels,facts,rules);
      backup(ol);
      return answer};
  return false}

function hyposomemember (n,x,p,pl,al,cont,results,adds,dels,facts,rules)
  var list = pluug(p[2],al,al);
  var ol = [];
  while (!symbolp(list) && list[0]==='cons')
   {if (vnifyp(item,al,list[1],al,ol))
       {answer = hyposomeexit(n,x,pl,al,cont,results,adds,dels,facts,rules);
        if (answer) {return answer}};
    list = list[2]};

function hyposometrue (n,x,p,pl,al,cont,results,adds,dels,facts,rules)
  var data = envlookupfacts(p[1],al,ds);
  for (var i=0; i<data.length; i++)
           backup(ol);
           if (answer) {return answer}}};
  return false}

function hyposomenot (n,x,p,pl,al,cont,results,adds,dels,facts,rules)
     {return hyposomeexit(n,x,pl,al,cont,results,adds,dels,facts,rules)};
  return false}
  for (var i=1; i<p.length; i++)
          {return answer}};

function hyposomebase (n,x,p,pl,al,cont,results,adds,dels,facts,rules)
           if (answer) {return answer}}};
  var data = envlookupfacts(p,al,facts);
  for (var i=0; i<data.length; i++)
       if (vnifyp(data[i],bl,p,al,ol))
              {var answer = hyposomeexit(n,x,pl,al,cont,results,adds,dels,facts,rules);
               backup(ol);
               if (answer) {return answer}};
           backup(ol)}};
     {return hyposomeexit(n,x,pl,al,cont,results,adds,dels,facts,rules)};
  return false}

function hyposomeview (n,x,p,pl,al,cont,results,adds,dels,facts,rules)
       if (data[i][0]==='rule')
               var answer = hyposomeexit(n,x,ql,bl,nc,results,adds,dels,facts,rules);
               backup(ol);
               if (answer) {return answer}}}
                {var answer = hyposomeexit(n,x,pl,al,cont,results,adds,dels,facts,rules);
                 backup(ol);
                 if (answer) {return answer}}}}
     {return hyposome(n,x,pl[0],tail(pl),al,cont,results,adds,dels,facts,rules)};
     {results.push(pluug(x,al,al));
      if (typeof(n)==='number' && results.length>=n) {return results};
      return false};

function hypovalue (p,adds,dels,facts,rules)
 {if (varp(p)) {return false};
  if (symbolp(p)) {return p};
  if (p[0]==='map') {return hypovaluemap(p,adds,dels,facts,rules)};
  if (p[0]==='setofall') {return hypovaluesetofall(p,adds,dels,facts,rules)};
  if (p[0]==='countofall') {return hypovaluecountofall(p,adds,dels,facts,rules)};
  if (p[0]==='choose') {return hypovaluechoose(p,adds,dels,facts,rules)};
  if (p[0]==='if') {return hypovalueif(p,adds,dels,facts,rules)};
  var args = seq();
  for (var i=1; i<p.length; i++)
      {var arg = hypovalue(p[i],adds,dels,facts,rules);
       if (arg!==false) {args[i-1] = arg} else {return false}};
  return hypoapply(p[0],args,adds,dels,facts,rules)}

function hypovaluemap (p,adds,dels,facts,rules)
  var arglist = hypovalue(p[2],adds,dels,facts,rules);
  return hypoval(fun,arglist,adds,dels,facts,rules)}

function hypoval (fun,arglist,adds,dels,facts,rules)
 {if (arglist===nil) {return nil};
  if (symbolp(arglist) || arglist[0]!=='cons') {return false};
  var result = hypoapply(fun,seq(arglist[1]),adds,dels,facts,rules);
  if (result===false) {return false};
  var results = hypoval(fun,arglist[2],adds,dels,facts,rules);
  if (results===false) {return false};
  return seq('cons',result,results)}

function hypovaluesetofall (p,adds,dels,facts,rules)
  
function hypovaluecountofall (p,adds,dels,facts,rules)

function hypovaluechoose(p,adds,dels,facts,rules)
 {var possibilities = hypofinds(p[1],p[2],adds,dels,facts,rules);
  if (possibilities.length===0) {return false};
  var n = Math.floor(Math.random()*possibilities.length);
  return possibilities[n]}

function hypovalueif (p,adds,dels,facts,rules)
 {for (var i=1; i<p.length; i=i+2)
      {if (hypofindp(p[i],adds,dels,facts,rules))
          {return hypovalue(p[i+1],adds,dels,facts,rules)}};
  return false}

function hypoapply (fun,args,adds,dels,facts,rules)
 {if (builtinp(fun)) {return hypoapplybuiltin(fun,args,adds,dels,facts,rules)};
  if (mathp(fun)) {return hypoapplymath(fun,args,adds,dels,facts,rules)};
  if (listop(fun)) {return hypoapplylist(fun,args,adds,dels,facts,rules)};
  return hypoapplyrs (fun,args,adds,dels,facts,rules)}

function hypoapplybuiltin (fun,args,adds,dels,facts,rules)
 {return eval(fun).apply(null,args)}

function hypoapplymath (fun,args,adds,dels,facts,rules)

function hypoapplylist (fun,args,adds,dels,facts,rules)
  return stringize(eval(fun).call(null,args))}

function hypoapplyrs (fun,args,adds,dels,facts,rules)
 {var result = seq(fun).concat(args);
  var data = indexees('definition',rules);
  var flag = false;
  for (var i=0; i<data.length; i++)
       if (data[i][0]==='definition')
           if (vnifyp(data[i][1],bl,result,bl,ol))
               var answer = hypovalue(term,adds,dels,facts,rules);
               backup(ol);
               if (answer) {return answer}}}}
  if (flag) {return false};
  return result}

//------------------------------------------------------------------------------

function hypoexecute (seed,adds,dels,facts,rules)
 {var updates = hypoexpand(seed,adds,dels,facts,rules);
  for (var i=0; i<updates.length; i++)
      {var update = updates[i];
       if (symbolp(update)) {continue};
       if (update[0]==='not') {compdrop(update[1],facts)}};
  for (var i=0; i<updates.length; i++)
      {var update = updates[i];
       if (symbolp(update)) {compsave(update,facts)};
       if (update[0]==='not') {continue};
       compsave(update,facts)};
  return true}

function hypoexpand (seed,adds,dels,facts,rules)
 {if (symbolp(seed)) {return [seed]};
  if (seed[0]==='not') {return [seed]};
  if (seed[0]==='and')
     {var updates = [];
      for (var i=1; i<seed.length; i++)
          {updates = updates.concat(hypoexpand(seed[i],adds,dels,facts,rules))}
      return updates};
  if (seed[0]==='transition')
     {return hypoexpandtransition(seed,adds,dels,facts,rules)};
  return hypoexpandrs(seed,adds,dels,facts,rules)}

function hypoexpandtransition (seed,adds,dels,facts,rules)
 {var updates = [];
  var changes = hypofinds(seed[2],seed[1],adds,dels,facts,rules);
  for (j=0; j<changes.length; j++)
      {updates = updates.concat(hypoexpand(changes[j],adds,dels,facts,rules))};
  return updates}

function hypoexpandrs (seed,adds,dels,facts,rules)
 {var updates = [];
  var data = indexees('handler',rules);
  var flag = false;
  for (var i=0; i<data.length; i++)
       if (data[i][0]!=='handler') {continue};
       var bl;
       if (bl = matcher(data[i][1],seed))
          {flag = true;
           var rule = plug(data[i][2],bl);
           updates = updates.concat(hypoexpand(rule,adds,dels,facts,rules))}};
  if (flag) {return updates};
  return [seed]}

function hypoexpand (seed,adds,dels,facts,rules)
 {return hypoexpanddepth (seed,adds,dels,facts,rules,0)}

function hypoexpanddepth (seed,adds,dels,facts,rules,depth)
 {if (symbolp(seed)) {return [seed]};
  if (seed[0]==='not') {return [seed]};
  if (seed[0]==='and')
     {return hypoexpanddepthand(seed,adds,dels,facts,rules,depth)};
  if (seed[0]==='transition')
     {return hypoexpanddepthtransition(seed,adds,dels,facts,rules,depth)};
  if (depth>expanddepth) {return []};
  return hypoexpanddepthrs(seed,adds,dels,facts,rules,depth)}

function hypoexpanddepthand (seed,adds,dels,facts,rules,depth)
 {var updates = [];
  for (var i=1; i<seed.length; i++)
      {updates = updates.concat(hypoexpanddepth(seed[i],adds,dels,facts,rules,depth))};
  return updates}

function hypoexpanddepthtransition (seed,adds,dels,facts,rules,depth)
 {var updates = [];
  var changes = hypofinds(seed[2],seed[1],adds,dels,facts,rules);
  for (var i=0; i<changes.length; i++)
      {updates = updates.concat(hypoexpanddepth(changes[i],adds,dels,facts,rules,depth))};
  return updates}

function hypoexpanddepthrs (seed,adds,dels,facts,rules,depth)
 {var updates = [];
  var data = indexees('handler',rules);
  var flag = false;
  for (var i=0; i<data.length; i++)
       if (data[i][0]!=='handler') {continue};
       var bl;
       if (bl = matcher(data[i][1],seed))
          {flag = true;
           var rule = plug(data[i][2],bl);
           updates = updates.concat(hypoexpanddepth(rule,adds,dels,facts,rules,depth+1))}};
  if (flag) {return updates};
  return [seed]}

//------------------------------------------------------------------------------

 {var updates = hypoupdates(adds,dels,facts,rules);
  for (var i=0; i<updates.length; i++)
      {var update = updates[i];
       if (symbolp(update)) {continue};
       if (update[0]==='not') {compdrop(update[1],facts)}};
  for (var i=0; i<updates.length; i++)
      {var update = updates[i];
       if (symbolp(update)) {compsave(update,facts)};
       if (update[0]==='not') {continue};
       compsave(update,facts)};
  return true}

function hypoupdates (adds,dels,facts,rules)
 {var updates = [];
  var data = rules; // indexees('transition',rules);
  for (var i=0; i<data.length; i++)
      {var rule = data[i];
       if (!symbolp(rule) && rule[0]==='transition')
          {var changes = hypofinds(rule[2],rule[1],adds,dels,facts,rules);
           for (j=0; j<changes.length; j++)
               {var change = changes[j];
                if (symbolp(change)) {updates.push(change); continue};
                if (change[0]==='and')
                   {updates = updates.concat(change.slice(1)); continue};
                updates.push(change)}}};
  return updates}

//------------------------------------------------------------------------------

 {var updates = hypofinds(action,condition,adds,dels,facts,rules);
  for (i=0; i<updates.length; i++)
      {updates = updates.concat(hypoexpand(updates[i],adds,dels,facts,rules))};
  for (var i=0; i<updates.length; i++)
      {var update = updates[i];
       if (symbolp(update)) {continue};
       if (update[0]==='not') {compdrop(update[1],facts)}};
  for (var i=0; i<updates.length; i++)
      {var update = updates[i];
       if (symbolp(update)) {compsave(update,facts)};
       if (update[0]==='not') {continue};
       compsave(update,facts)};
  return true}

//==============================================================================
// Inference with temporary rules
//==============================================================================
//------------------------------------------------------------------------------

  var dum = compfindx(result,query,facts,rules);
  for (var i=0; i<temprules.length; i++) {uninsertrule(temprules[i],rules)};
  return dum}
  var answers = compfinds(result,query,facts,rules);
  return answers}

//==============================================================================
// trace routines
//==============================================================================
//------------------------------------------------------------------------------
// trace
// untrace
// traces
// tracefindp
//------------------------------------------------------------------------------

var traces = true;

function trace ()
 {if (arguments.length===0) {traces = true; return true};
  if (typeof(traces)!=='object') {traces = []};
  for (var i=0; i<arguments.length; i++)
      {traces = adjoin(arguments[i],traces)};
  return true}

function untrace ()
 {if (arguments.length===0) {traces = []; return true};
  if (typeof(traces)!=='object') {traces = []; return true};
  for (var i=0; i<arguments.length; i++)
      {traces = unjoin(arguments[i],traces)};
  return true}

function tracep (r)
 {if (traces===true) {return true};
  if (typeof(traces)==='object' && find(r,traces)) {return true};
  return false}

function tracedepth (cont)
  if (tracep(operator(cont[0]))) {return (tracedepth(cont[3])+1)};
  return tracedepth(cont[3])}

function tracecall (p,cont)
 {if (!tracep(operator(p))) {return false};
  console.log("%c%s","font-family:courier",
              grindspaces(tracedepth(cont)) + 'Call: ' + grind(p))}

function traceexit (p,cont)
 {if (!tracep(operator(p))) {return false};
  console.log("%c%s","font-family:courier",
              grindspaces(tracedepth(cont)) + 'Exit: ' + grind(p));}

function traceredo (p,cont)
 {if (!tracep(operator(p))) {return false};
  console.log("%c%s","font-family:courier",
              grindspaces(tracedepth(cont)) + 'Redo: ' + grind(p))}

function tracefail (p,cont)
 {if (!tracep(operator(p))) {return false};
  console.log("%c%s","font-family:courier",
              grindspaces(tracedepth(cont)) + 'Fail: ' + grind(p))}

function grindspaces (n)
 {if (n===0) {return ''};
  return grindspaces(n-1) + '| '}

//------------------------------------------------------------------------------

function tracefindn (n,result,query,facts,rules)

//==============================================================================
// debug routines
//==============================================================================
//------------------------------------------------------------------------------

  if (answers.length>0) {return answers[0]};
  return false}
function debugfinds (result,query,facts,rules)

function debugfindn (n,result,query,facts,rules)
 {var xl = {};
  var answers = [];
  if (typeof(n)==='number' && n<=0) {return answers};
  debugsome(n,result,xl,query,seq(),xl,nil,answers,facts,rules);
  return answers}

function debugdepth (cont)

//------------------------------------------------------------------------------

function debugsome (n,x,xl,p,pl,al,cont,results,facts,rules)
  if (symbolp(p))
     {return debugsomeatom(n,x,xl,p,pl,al,cont,results,facts,rules)}
     {return debugsomesame(n,x,xl,p,pl,al,cont,results,facts,rules)}
     {return debugsomedistinct(n,x,xl,p,pl,al,cont,results,facts,rules)}
     {return debugsomematches(n,x,xl,p,pl,al,cont,results,facts,rules)}
     {return debugsomesubmatches(n,x,xl,p,pl,al,cont,results,facts,rules)}
     {return debugsomecall(n,x,xl,p,pl,al,cont,results,facts,rules)}
     {return debugsomemath(n,x,xl,p,pl,al,cont,results,facts,rules)}
     {return debugsomelist(n,x,xl,p,pl,al,cont,results,facts,rules)}
     {return debugsomemap(n,x,xl,p,pl,al,cont,results,facts,rules)}
     {return debugsomesetofall(n,x,xl,p,pl,al,cont,results,facts,rules)}
     {return debugsomecountofall(n,x,xl,p,pl,al,cont,results,facts,rules)}
     {return debugsomeevaluate(n,x,xl,p,pl,al,cont,results,facts,rules)}
     {return debugsomemember(n,x,xl,p,pl,al,cont,results,facts,rules)}
     {return debugsomenot(n,x,xl,p,pl,al,cont,results,facts,rules)}
     {return debugsomeand(n,x,xl,p,pl,al,cont,results,facts,rules)}
     {return debugsomeor(n,x,xl,p,pl,al,cont,results,facts,rules)}
  if (p[0]==='true')
     {return debugsometrue(n,x,xl,p,pl,al,cont,results,facts,rules)}
  if (basep(p[0],rules))
     {return debugsomebase(n,x,xl,p,pl,al,cont,results,facts,rules)};
  return debugsomeview(n,x,xl,p,pl,al,cont,results,facts,rules)}

function debugsomeatom (n,x,xl,p,pl,al,cont,results,facts,rules)
     {tracecall(p,cont);
      traceexit(p,cont);
      return debugsomeexit(n,x,xl,p,pl,al,cont,results,facts,rules)};
     {tracecall(p,cont);
      tracefail(p,cont);
      return false};
  if (basep(p,rules))
     {return debugsomebase(n,x,xl,p,pl,al,cont,results,facts,rules)};
  return debugsomeview(n,x,xl,p,pl,al,cont,results,facts,rules)}

function debugsomesame (n,x,xl,p,pl,al,cont,results,facts,rules)
  tracecall(goal,cont);
  var ol = seq();
      var answer = debugsomeexit(n,x,xl,goal,pl,al,cont,results,facts,rules);
      backup(ol);
      return answer};
  tracefail(goal,cont);
  return false}
  tracecall(goal,cont);
  var ol = seq();
     {backup(ol);
      tracefail(p,cont);
      return false};
  return debugsomeexit(n,x,xl,goal,pl,al,cont,results,facts,rules)}

function debugsomematches (n,x,xl,p,pl,al,cont,results,facts,rules)
  tracecall(goal,cont);
  var str = pluug(p[1],al,al);
  if (!stringp(str)) {return false};
  str = str.substring(1,str.length-1);
  var pat = pluug(p[2],al,al);
  if (!stringp(pat)) {return false};
  pat = pat.substring(1,pat.length-1);
  var re=new RegExp(pat,'g');
  var fragments = re.exec(str);
  if (fragments!=null)
      for (var i=3; i<p.length; i++)
              {backup(ol); return false}};
      traceexit(pluug(p,al,xl),cont);
      var answer = debugsomeexit(n,x,xl,goal,pl,al,cont,results,facts,rules);
      backup(ol);
      return answer};
  return false}

function debugsomesubmatches (n,x,xl,p,pl,al,cont,results,facts,rules)
  tracecall(goal,cont);
  var str = pluug(p[1],al,al)
  str = str.substring(1,str.length-1);
  if (symbolp(str))
      var matches = str.match(re);
      if (matches!=null)
                   var answer = debugsomeexit(n,x,xl,goal,pl,al,cont,results,facts,rules);
                   backup(ol);
                   if (answer) {return answer};
                   traceredo(goal,cont)}}}};
  return false}
  tracecall(goal,cont);
  var args = seq();
  for (var i=1; i<p.length-1; i++)
      {var arg = pluug(p[i],al,al);
       if (varp(arg)) {return false} else {args[args.length] = arg}};
  var val = eval(p[0]).apply(null,args);
  if (!val) {return false};
  var ol = seq();
     {traceexit(pluug(p,al,xl),cont);
      var answer = debugsomeexit(n,x,xl,goal,pl,al,cont,results,facts,rules);
      backup(ol);
      return answer};
  tracefail(goal,cont);
  return false}

function debugsomemath (n,x,xl,p,pl,al,cont,results,facts,rules)
  tracecall(goal,cont);
  var args = seq();
  for (var i=1; i<p.length-1; i++)
      {var arg = numberize(pluug(p[i],al,al));
       if (isNaN(arg)) {return false};
       args[args.length] = arg};
  var val = stringize(Math[p[0]].apply(null,args));
  var ol = seq();
     {traceexit(pluug(p,al,xl),cont);
      var answer = debugsomeexit(n,x,xl,goal,pl,al,cont,results,facts,rules);;
      backup(ol);
      return answer};
  tracefail(goal,cont);
  return false}

function debugsomelist (n,x,xl,p,pl,al,cont,results,facts,rules)
  tracecall(goal,cont);
  var c = pluug(p[1],al,al);
  var s = numlistify(c);
  if (s===false) {return false};
  var val = stringize(eval(p[0]).call(null,s));
  var ol = seq();
     {traceexit(pluug(p,al,xl),cont);
      var answer = debugsomeexit(n,x,xl,goal,pl,al,cont,results,facts,rules);;
      backup(ol);
      return answer};
  tracefail(goal,cont);
  return false}

function debugsomemap (n,x,xl,p,pl,al,cont,results,facts,rules)
  tracecall(goal,cont);
  if (!symbolp(p[1]) || varp(p[1])) {return false};
  var val = map(p[1],pluug(p[2],al,al),facts,rules);
  if (val===false) {return false};
  var ol = seq();
     {traceexit(pluug(p,al,xl),cont);
      var answer = debugsomeexit(n,x,xl,goal,pl,al,cont,results,facts,rules);
      backup(ol);
      return answer};
  tracefail(goal,cont);
  return false}

function debugsomesetofall (n,x,xl,p,pl,al,cont,results,facts,rules)
  tracecall(goal,cont);
  p = pluug(p,al,al);
  var ol = seq();
  var result = listify(debugfinds(p[1],p[2],facts,rules));
  if (vnifyp(p[3],al,result,al,ol))
     {traceexit(pluug(p,al,xl),cont);
      var answer = debugsomeexit(n,x,xl,goal,pl,al,cont,results,facts,rules);
      backup(ol);
      return answer};
  return false}

function debugsomecountofall (n,x,xl,p,pl,al,cont,results,facts,rules)
  tracecall(goal,cont);
  p = pluug(p,al,al);
  var ol = seq();
  var result = compfinds(p[1],p[2],facts,rules).length.toString();
  if (vnifyp(p[3],al,result,al,ol))
     {traceexit(pluug(p,al,xl),cont);
      var answer = debugsomeexit(n,x,xl,goal,pl,al,cont,results,facts,rules);
      backup(ol);
      return answer};
  return false}

function debugsomeevaluate (n,x,xl,p,pl,al,cont,results,facts,rules)
  tracecall(goal,cont);
  var val = compvalue(pluug(p[1],al,al),facts,rules);
  var ol = seq();
  if (val && vnifyp(p[2],al,val,al,ol))
     {traceexit(pluug(p,al,xl),cont);
      var answer = debugsomeexit(n,x,xl,goal,pl,al,cont,results,facts,rules);
      backup(ol);
      return answer};
  tracefail(goal,cont);

function debugsomemember (n,x,xl,p,pl,al,cont,results,facts,rules)
  tracecall(goal,cont);
  var item = p[1];
  var list = pluug(p[2],al,al);
  var ol = [];
  while (!symbolp(list) && list[0]==='cons')
   {if (vnifyp(item,al,list[1],al,ol))
       {traceexit(pluug(p,al,xl),cont);
        answer = debugsomeexit(n,x,xl,goal,pl,al,cont,results,facts,rules);
        if (answer) {return answer};
        traceredo(goal,cont)};
    list = list[2]};
  return false}

function debugsomenot (n,x,xl,p,pl,al,cont,results,facts,rules)
  tracecall(goal,cont);
  if (debugsome(1,x,xl,p[1],seq(),al,nil,[],facts,rules)===false)
     {traceexit(pluug(p,al,xl),cont);
      return debugsomeexit(n,x,xl,goal,pl,al,cont,results,facts,rules)};
  tracefail(goal,cont);
  return false}
      {var answer = debugsome(n,x,xl,p[i],pl,al,cont,results,facts,rules);
       if (answer) {return answer}};
  return false}

function debugsometrue (n,x,xl,p,pl,al,cont,results,facts,rules)
  tracecall(goal,cont);
  var ds = getdataset(p[2]);
  var data = envlookupfacts(p[1],al,ds);
  for (var i=0; i<data.length; i++)
           var answer = debugsomeexit(n,x,xl,goal,pl,al,cont,results,facts,rules);
           if (answer) {return answer};
           traceredo(goal,cont)}};
  tracefail(goal,cont);

function debugsomebase (n,x,xl,p,pl,al,cont,results,facts,rules)
  tracecall(goal,cont);
  var data = envlookupfacts(p,al,facts);
  for (var i=0; i<data.length; i++)
           var answer = debugsomeexit(n,x,xl,goal,pl,al,cont,results,facts,rules);
           if (answer) {return answer};
           traceredo(goal,cont)}};
  tracefail(goal,cont);

function debugsomeview (n,x,xl,p,pl,al,cont,results,facts,rules)
  tracecall(goal,cont);
  var data = lookuprules(p,rules);
               backup(ol);
               if (answer) {return answer}}}
                 var answer = debugsomeexit(n,x,xl,goal,pl,al,cont,results,facts,rules);
                 if (answer) {return answer};
                 traceredo(goal,cont)}}}
  tracefail(goal,cont);

function debugsomegoals (n,x,xl,p,pl,al,cont,results,facts,rules)
  var answer = debugsomeexit(n,x,xl,p,pl,al,cont,results,facts,rules);
  if (answer) {return answer};
  traceredo(p,cont);
  return false}
function debugsomeexit (n,x,xl,p,pl,al,cont,results,facts,rules)
     {return debugsome(n,x,xl,pl[0],tail(pl),al,cont,results,facts,rules)};
  if (nullp(cont))
     {results.push(pluug(x,al,al));
      if (typeof(n)==='number' && results.length>=n) {return results};
      return false};

//==============================================================================
// special relations and operators
//==============================================================================

var builtins = 
 ["hastype","plus","minus","times","quotient","remainder",
  "symbolize","newsymbolize",
  "readstring","stringify","readstringall","stringifyall",
  "matches","submatches","stringappend","stringmin", "stringjoin",
  "timestamp","maketimestamp",
  "getyear","getmonth","getdate","gethour","getminute","getsecond",
  "append","reverse","revappend","length","listify","delistify"];

var listoperators = 
 ["maximum","minimum","range","midrange","sum","median","mean","variance","stddev"];

var aggregates = ["countofall", "setofall"];

function updateop (x) {return findq(x,["pos", "neg"])}
function builtinp (x) {return findq(x,builtins)}
function mathp (x) {return (typeof Math[x]==='function')}
function listop (x) {return findq(x,listoperators)}

//------------------------------------------------------------------------------
 {return savefact(p,getdataset(d))}

function remfact (p,d)
 {return dropfact(p,getdataset(d))}

function getdataset (id)
 {var dum = datasets[id];
  if (dum) {return dum};
  return seq()}

//------------------------------------------------------------------------------
 {var exp=new Array(arguments.length);
  return mutexp(0,exp)}

function mutexp (n,l)
 {if (n>=l.length) {return true};
  for (var i=n+1; i<l.length; i++)
      {if (equalp(l[n],l[i])) {return false}};
  return mutexp(n+1,l)}

//------------------------------------------------------------------------------

function plus ()
 {var result = 0;
      {var arg = numberize(arguments[i]);
       if (isNaN(arg)) {return false};
       result = result + arg};
  return stringize(result)}

function minus ()
 {if (arguments.length===0) {return 0};
  var result = numberize(arguments[0]);
      {var arg = numberize(arguments[i]);
       if (isNaN(arg)) {return false};
       result = result - arg};
  return stringize(result)}

function times ()
 {var result = 1;
      {var arg = numberize(arguments[i]);
       if (isNaN(arg)) {return false};
       result = result * arg};
  return stringize(result)}

function quotient ()
 {var result = numberize(arguments[0]);
      {var arg = numberize(arguments[i]);
       if (isNaN(arg)) {return false};
       result = result / arg};
  return stringize(result)}

function remainder ()
 {var result = numberize(arguments[0]);
      {var arg = numberize(arguments[i]);
       if (isNaN(arg)) {return false};
       result = result % arg};
  return stringize(result)}

//------------------------------------------------------------------------------
function maximum (s)
 {return Math.max.apply(null,s)}

function minimum (s)
 {return Math.min.apply(null,s)}

function range (s)
 {return maximum(s)-minimum(s)}

function midrange (s)
 {return (maximum(s)+minimum(s))/2}

function sum (s) 
 {var num = 0;
  for (var i=0; i<s.length; i++) {num += s[i]};
  return num}

function median (s)
 {s.sort(function(a, b) {return a - b});
  var mid = s.length/2;
  return mid%1 ? s[mid-0.5] : (s[mid-1] + s[mid])/2}

function mean (s)
 {return sum(s)/s.length}

function variance (s)
 {var avg = mean(s);
  return mean(s.map(function(num) {return Math.pow(num-avg,2)}))}

function stddev (s)
 {return Math.sqrt(variance(s))}

//------------------------------------------------------------------------------

function hastype (x)
 {if (symbolp(x)) {return 'symbol'};
  return 'funterm'}

function numberize (s)
 {if (s==='blank') {return 0};
  if (s==='false') {return 0};
  if (s==='true') {return 1};
  if (s==='infinity') {return Infinity};
  if (s==='neginfinity') {return -Infinity};
  return parseFloat(s)}

function stringize (s)
 {if (s===Infinity) {return 'infinity'};
  if (s===-Infinity) {return 'neginfinity'};
  return s + ''}

function symbolize (s)
 {s = s.replace(/[^a-z0-9]/gi,'');
  return s.toLowerCase()}

function newsymbolize (s)
 {s = replacediacritics(s);
  s = s.replace(/ /gi,'_');
  s = s.replace(/[^a-z_0-9]/gi,'');
  return s.toLowerCase()}

function replacediacritics(s)
 {var s;
  var diacritics = [
        /[\300-\306]/g, /[\340-\346]/g,  // A, a
        /[\310-\313]/g, /[\350-\353]/g,  // E, e
        /[\314-\317]/g, /[\354-\357]/g,  // I, i
        /[\322-\330]/g, /[\362-\370]/g,  // O, o
        /[\331-\334]/g, /[\371-\374]/g,  // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
  var chars = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
  for (var i = 0; i < diacritics.length; i++)
      {s = s.replace(diacritics[i],chars[i])};
  return s}

function stringmatchp (str,pat)
 {if (!stringp(str)) {return false};
  if (!stringp(pat)) {return false};
  str = str.slice(1,-1);
  pat = new RegExp(pat.slice(1,-1),'g');
  return pat.test(str)}

function matches (str,pat)
 {if (!stringp(str)) {return false};
  if (!stringp(pat)) {return false};
  str = str.slice(1,-1);
  pat = pat.slice(1,-1);
  var re=new RegExp(pat,'g');
  var fragments = re.exec(str);
  if (fragments!=null) {return quotelistify(fragments)};
  return false}

function submatches (str,pat)
 {if (!stringp(str)) {return false};
  if (!stringp(pat)) {return false};
  str = str.slice(1,-1);
  pat = pat.slice(1,-1);
  var re=new RegExp(pat,'g');
  var matches = str.match(re);     
  if (matches!=null)
     {var matches = str.match(re)
      return quotelistify(matches)};
  return false}

function quotelistify (s)
 {var exp = nil;
  for (var i=s.length-1; i>=0; i--)
      {exp = seq('cons',quotify(s[i]),exp)};
  return exp}

function stringappend ()
 {var exp='';
 {return '"' + grind(x) + '"'}

function stringifyall (x)
 {return '"' + stringifyallexp(x) + '"'}

function stringifyallexp (x)
 {if (x===nil) {return ''};
  if (symbolp(x)) {return ''};
  if (x[0]==='cons')
     {return grind(x[1]) + '\n' + stringifyallexp(x[2])};
  return ''}

function readstring (x)
 {return read(stripquotes(x))}

function readstringall (x)
 {return listify(readdata(stripquotes(x)))}

function stripquotes (x)
 {if (x[0]==='"' && x[x.length-1]==='"') {return x.slice(1,-1)};
  return x}

function quotify (x)
 {return ('"' + x + '"')}

function stringmin (x,y)
 {if (y<x) {return y} else {return x}}

//------------------------------------------------------------------------------

function stringjoin (c)
 {var s = seq();
  while (true)
   {if (c===nil) {return '"' + s + '"'};
    if (symbolp(c)) {return false};
    if (c[0]!=='cons') {return false};
    s = s + stripquotes(c[1]);
    if (c[2]!==nil) {s = s + " "};
    c = c[2]};
  return false}

//------------------------------------------------------------------------------
 {if (x===nil) {return true};
  if (symbolp(x)) {return false};
  if (x[0]==='cons') {return listp(x[2])};
  return false}

function append (l1,l2)
  if (symbolp(l1)) {return false};
  if (l1[0]!=='cons') {return false};
  return seq('cons',l1[1],append(l1[2],l2))}

function reverse (l)
 {return revappend(l,nil)}

function revappend (l,m)
  if (symbolp(l)) {return false};
  if (l[0]!=='cons') {return false};
  return revappend(l[2],seq('cons',l[1],m))}

function length (l)
 {return stringize(getlength(l))}

function getlength (l)
 {if (l===nil) {return 0};
  if (symbolp(l)) {return false};
  if (l[0]!=='cons') {return false};
  return getlength(l[2])+1}

function map (f,l,facts,rules)
 {if (l===nil) {return nil};
  if (symbolp(l) || l[0]!=='cons') {return false};
  var result = compfindx('Y',seq(f,l[1],'Y'),facts,rules);
  if (result===false) {return false};
  var results = map(f,l[2],facts,rules);
  if (results===false) {return false};
  return seq('cons',result,results)}

function listify (s)
 {var exp = nil;
  for (var i=s.length-1; i>=0; i--)
      {exp = seq('cons',s[i],exp)};
  return exp}
 {var s = seq();
  while (true)
   {if (c===nil) {return s};
    if (symbolp(c)) {return false};
    if (c[0]!=='cons') {return false};
    var arg = numberize(c[1]);
    if (isNaN(arg)) {return false};
    s[s.length] = arg;
    c = c[2]};
  return false}
 {var s = seq();
  while (true)
   {if (c===nil) {return s};
    if (symbolp(c)) {return false};
    if (c[0]!=='cons') {return false};
    s[s.length] = c[1];
    c = c[2]};
  return false}
//------------------------------------------------------------------------------

function timestamp ()
 {return stringize(Date.now())}

function maketimestamp (y,m,d,h,n,s)
 {var y = numberize(y);
  var m = numberize(m-1);
  var d = numberize(d);
  var h = numberize(h);
  var n = numberize(n);
  var s = numberize(s);
  return stringize(new Date(y,m,d,h,n,s).getTime())}

function getyear (stamp)
 {return stringize(new Date(numberize(stamp)).getFullYear())}

function getmonth (stamp)
 {return stringize(new Date(numberize(stamp)).getMonth()+1)}

function getdate (stamp)
 {return stringize(new Date(numberize(stamp)).getDate())}

function gethour (stamp)
 {return stringize(new Date(numberize(stamp)).getHours())}

function getminute (stamp)
 {return stringize(new Date(numberize(stamp)).getMinutes())}

function getsecond (stamp)
 {return stringize(new Date(numberize(stamp)).getSeconds())}

//==============================================================================
// reading



    else if (charcode===93) {output[output.length] = ']'; cur++}
    else if (charcode===95) {output[output.length] = '_'; cur++}
    else if (charcode===124) {output[output.length] = '|'; cur++}
  if (input.charCodeAt(cur+1)===45)
     {output[output.length] = ':-'; return cur+2};
  if (input.charCodeAt(cur+1)===58)
     {output[output.length] = '::'; return cur+2};
  if (input.charCodeAt(cur+1)===61)
     {output[output.length] = ':='; return cur+2};   
                         && input.charCodeAt(cur+2)===62)

function scancomment (cur)
         input.charCodeAt(cur)!==10 && input.charCodeAt(cur)!==13)
   {cur++};
       else {exp[exp.length] = parsexp('lparen','rparen')}};
  var left = parseprefix(rop);
    else {throw 'error'}};

  if (left==='_') {current++; counter++; return '_' + counter};
  throw 'error'}

  var arg = parsexp('~',rop);
  if (isNaN(arg)) {return seq('delete',arg)};
 {current++;
  var head = parsexp('comma','comma');
  return seq('cons',head,parselistexp())}

function parselistexp ()
 {if (input[current]===']') {current++; return nil};
  if (input[current]==='comma')  
     {current++;
      return seq('cons',parsexp('comma','comma'),parselistexp())};
  throw 'error'}

function parseparenexp ()
 {current++;
  current++;
  return left}


function parseinfix (left,op,rop)

function parsecons (left,rop)
  var right = parsexp('&',rop);
  var result;
     else {result = left};
  if (symbolp(right) || right[0]!=='and') {result.push(right)}
     else {result = result.concat(right.slice(1))}  
  return result}

  var right = parsexp('|',rop);
  var result;
     else {result = left};
  if (symbolp(right) || right[0]!=='or') {result.push(right)}
     else {result = result.concat(right.slice(1))}  
  return result}


function makehandler (head,body)


var tokens = ['!','#','~','&','|','==>',':=',':-','::','[',']','lparen','rparen','comma','.']

function identifierp (x) {return !find(x,tokens)}


      {if (precedence[i]===rop) {return false};
       if (precedence[i]===lop) {return true}};
  return false}

// writing

function printseq (p)
  if (p===false) {return 'false'};
  if (typeof p==='number') {return p};

function printspaces (n)
 {var exp = '';
  for (var i=0; i<n; i++) {exp += '  '};
  return exp}

//------------------------------------------------------------------------------

  if (p===null) {return ''};

function grindall (data)
  if (typeof(p)==='string' && p.length!==0 && p[0]==='_') {return '_'};
  if (symbolp(p)) {return p};
  if (p[0]==='insert') {return grindinsertion(p,rop)};

function grindcons (p,lop,rop)
 {if (listp(p)) {return grindlist(p)};
  var exp = '';

function grindlist (p)
 {var out = '[' + grind(p[1]);
  p = p[2];
  while (!symbolp(p) && p[0]==='cons')
   {out = out + ',' + grind(p[1]); p = p[2]};
  if (p!=='nil') {out = out + '|' + grind(p)};
  out = out + ']';
  return out}
  var parens = parenp(lop,'&',rop);
  if (parens) {exp = '('};
  if (parens) {exp = exp + ')'};
function grindor (p,lop,rop)
  var parens = parenp(lop,'|',rop);
  if (parens) {exp = '('};
  if (parens) {exp = exp + ')'};


function grinddefinition (p,lop,rop)

function grindrule (p,lop,rop)

function grindalist (al)
 {exp = '';
  for (var i=0; i<rules.length; i++)
      {exp += displayrule(rules[i]) + '\n'};
  return exp}
 {if (symbolp(p)) {return p};
  if (p[0]==='rule') {return disprule(p)};

function disprule (p)

function disptransition (p)
  if (symbolp(p[2]) || p[2][0]!=='and')
     {return grind(p[1]) + ' ==> ' + grind(p[2]) + '\n'};
  if (p[2].length<4)
     {return grind(p[1]) + ' ==>\n  ' + grind(p[2]) + '\n'};
  var exp = grind(p[1]) + ' ==>\n';

function disphandler (p)

//------------------------------------------------------------------------------
// morefacts
// morerules
// loadfacts
// loadrules
// dumpfacts
// dumprules
//------------------------------------------------------------------------------

function morefacts (filename,target)
 {var contents = fs.readFileSync(filename).toString();
  var data = readdata(contents);
  definemorefacts(target,data);
  return true}

function morerules (filename,target)
 {var contents = fs.readFileSync(filename).toString();
  var data = readdata(contents);
  definemorerules(target,data);
  return true}

function loadfacts (filename,target)
 {var contents = fs.readFileSync(filename).toString();
  var data = readdata(contents);
  emptytheory(target);
  definemorefacts(target,data);
  return true}

function loadrules (filename,target)
 {var contents = fs.readFileSync(filename).toString();
  var data = readdata(contents);
  emptytheory(target);
  definemorerules(target,data);
  return true}

function dumpfacts (source,filename)
 {fs.writeFileSync(filename,showfacts(source));
  return true}

function showfacts (source)
 {var bases = getbases(source);
  var output = '';
  for (var i=0; i<bases.length; i++)
      {var facts = sentences(bases[i],source);
       for (j=0; j<facts.length; j++)
           {output += grind(facts[j]) + '\n'};
       output += '\n'};
  return output}

 {fs.writeFileSync(filename,showrules(source));
  return true}

function showrules (source)
 {var views = getviews(source);
  var output = '';
  for (var i=0; i<views.length; i++)
      {var rules = sentences(views[i],source);
       for (j=0; j<rules.length; j++)
           {output += grind(rules[j]) + '\n'};
       output += '\n'};
  return output}

//==============================================================================
// Error checking

function finderrors (data)
 {var errors = findarityerrors(data);
  errors = errors.concat(findsafetyerrors(data));
  errors = errors.concat(findstratificationerrors(data));
  return errors}

//------------------------------------------------------------------------------

function findarityerrors (data)
 {arities = seq();
  for (var i=0; i<data.length; i++)
      {arities = getarities(data[i],arities)};
  var errors = seq();
  for (rel in arities)
      {if (arities[rel]==='mixed')
          {errors[errors.length] = 'Mixed arity: ' + grind(rel)}};
  return errors}

function getarities (p,arities)
 {if (symbolp(p)) {return addarity(p,0,arities)}
  if (findq(p[0],aggregates))
     {return getarities(p[2],arities)};
  if (p[0]==='not') {return getarities(p[1],arities)};
  if (p[0]==='and' || p[0]==='or' || p[0]==='rule')
     {for (var i=1; i<p.length; i++)
          {arities = getarities(p[i],arities)};
      return arities};
  return addarity(p[0],p.length-1,arities)}

function addarity (x,n,arities)
 {if (arities[x]==null) {arities[x] = n; return arities};
  if (arities[x]===n) {return arities};
  arities[x] = 'mixed';
  return arities}

//------------------------------------------------------------------------------

function findsafetyerrors (data)
 {var errors = seq();
  for (var i=0; i<data.length; i++)
      {if (!safep(data[i]))
          {errors[errors.length] = 'Unsafe rule: ' + grind(data[i])}};
  return errors}

function safep (exp)
  for (var i=2; i<rule.length; i++)
      {vs = safegoalp(rule[i],vs)
       if (vs===false) {return false}};
  return safeheadp(rule[1],vs)}

  for (var i=1; i<transition.length-1; i++)
      {vs = safegoalp(transition[i],vs)
       if (vs===false) {return false}};
  return safeheadp(transition[2],vs)}

 {if (symbolp(exp)) {return vs};
  if (exp[0]==='distinct')
     {if (groundedp(exp,vs)) {return vs} else {return false}};
  if (findq(exp[0],builtins))
     {for (var i=1; i<exp.length-1; i++)
          {if (!groundedp(exp[i],vs)) {return false}};
      return varsexp(exp[exp.length-1],vs)};
     {if (!groundedp(exp[1],vars(exp[2]))) {return false};
      if (!safegoalp(exp[2],seq())) {return false};
      //if (!safegoalp(exp[2],vs.concat(vars(exp[1])))) {return false};
      return varsexp(exp[3],vs)};
     {if (groundedp(exp[1],vs)) {return vs} else {return false}};
  if (exp[0]==='and')
     {for (var i=1; i<exp.length; i++)
          {vs = safegoalp(exp[i],vs)
           if (vs===false) {return false}}
      return vs};
  return varsexp(exp,vs)}

 {var hs = vars(exp);
  for (var i=0; i<hs.length; i++)

 {if (symbolp(p)) {return p};
  if (p[0]==='not' || p[0]==='rule' || p[0]==='definition' || p[0]==='handler')
     {return operator(p[1])};
  return p[0]}

function operands (p)
 {if (symbolp(p)) {return seq()};
  if (p[0]==='not' || p[0]==='rule' || p[0]==='definition' || p[0]==='handler')
     {return operands(p[1])};
  return p.slice(1)}

//------------------------------------------------------------------------------

function findstratificationerrors (data)
 {var strata = getstrata(data);
  var errors = seq();
  for (var i=0; i<data.length; i++)
      {if (!checkstratifiedrecursion(data[i],strata))
          {errors[errors.length] = 'Unstratified Recursion: ' + grind(data[i])}};
  for (var i=0; i<data.length; i++)
      {if (!checkstratifiednegation(data[i],strata))
          {errors[errors.length] = 'Unstratified Negation: ' + grind(data[i])}};
  return errors}

function checkstratifiednegation(datum, strata)
 {if (symbolp(datum)) {return true};
  if (datum[0]!=='rule') {return true};
  var stratum = strata[operator(datum[1])];
  for (var j=2; j<datum.length; j++)
      {if (symbolp(datum[j])) {continue};
       if (datum[j][0]==='not')
          {if (strata[operator(datum[j][1])]>=stratum) {return false};
           continue};
       if (aggregatep(datum[j][0]))
          {var rs = getrelations(datum[j],seq());
           for (var k=0; k<rs.length; k++)
               {if (strata[rs[k]]>=stratum) {return false}}}};
   return true}

function checkstratifiedrecursion (datum,strata)
 {if (symbolp(datum)) {return true};
  if (datum[0]!=='rule') {return true};
  var stratum = strata[operator(datum[1])];
  var hs = seq(); //vars(datum[1]);
  var vs = seq();
  for (var j = 2; j<datum.length; j++)
      {if (symbolp(datum[j]) || (datum[j][0]!=='not' && !aggregatep(datum[j])))
          {if (strata[operator(datum[j])]>=stratum)
              {hs = varsexp(datum[j],hs)}
           else {vs = varsexp(datum[j],vs)}}};
  for (var i=0; i<hs.length; i++)
      {if (!findq(hs[i],vs)) {return false}};
  return true}

var succ = {}, stack = [], vertex = {}, _index = 0, scc = [];

function getstrata(data)
 {var scc = getscc(data);
  var stratum = 0;
  var strata = seq();
  for (var i = scc.length-1; i>=0; i--)
      {for (var j=0; j<scc[i].length; j++)
           {strata[scc[i][j]] = stratum};
       stratum++};
  return strata}

function getscc(data)
 {scc = [], _index = 0, stack = [], vertex = {}, succ = {};
  var rs = getallrelations(data)
  for (var i=0; i<rs.length; i++)
      {succ[rs[i]] = [];
       vertex[rs[i]] = {}}
  for (var i=0; i<data.length; i++)
      {if (data[i][0] == "rule")
          {var headrel = operator(data[i][1]);
           var relsucc = getallrelations(data[i].slice(2));
           for (var j = 0; j < relsucc.length; j++)
               {succ[relsucc[j]] = adjoin(headrel, succ[relsucc[j]])}}}
  for (var i=0; i<rs.length; i++)
      {if (typeof vertex[rs[i]].index == 'undefined') {visit(rs[i])}};
  return scc}

function visit(v)
 {vertex[v].index = _index;
  vertex[v].low = _index;
  _index++;
  stack.push(v);
  vertex[v].onstack = true;
  for (var i=0; i<succ[v].length; i++)
      {var w = succ[v][i];
       if (updateop(w)) continue;
          {visit(w);
           vertex[v].low = Math.min(vertex[v].low,vertex[w].low)}
       else if (vertex[w].onstack)
               {vertex[v].low = Math.min(vertex[v].low,vertex[w].low)}}	
  if (vertex[v].low==vertex[v].index)
     {var _scc = [], w = null;
      while (w != v)
       {w = stack.pop();
        vertex[w].onstack = false;
        _scc.push(w)}
      scc.push(_scc)}}

function getallrelations (data)
 {var rs = seq();
  for (var i=0; i<data.length; i++)
      {rs = getrelations(data[i],rs)};
  return rs}

function getrelations (datum,rs)
 {if (symbolp(datum)) {return adjoin(datum,rs)};
  if (datum[0]==='not' || updateop(datum[0]))
     {return getrelations(datum[1],rs)};
  if (datum[0]==='rule' || datum[0]==='and' || datum[0]==='or')
     {for (var j=1; j<datum.length; j++) {rs = getrelations(datum[j],rs)};
      return rs};
  if (builtinp(datum[0])) {return rs};
  if (mathp(datum[0])) {return rs};
  if (listop(datum[0])) {return rs};
  if (aggregatep(datum[0])) {return getrelations(datum[2],rs)};
  return adjoin(datum[0],rs)}

//==============================================================================
// End