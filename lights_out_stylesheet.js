//==============================================================================
// lightsout
//==============================================================================

function renderstate (state)
 {var table = document.createElement('table');
  table.setAttribute('cellspacing','0');
  table.setAttribute('bgcolor','#f4f6f8');
  table.setAttribute('border','2');
  for (var i=0; i<4; i++) {makerow(table,i,state)};
  return table}

function makerow (table,rownum,state)
 {var row =table.insertRow(rownum);
  for (var j=0; j<4; j++) {makecell(row,rownum,j,state)};
  return row}

function makecell (row,rownum,colnum,state)
 {var cell = row.insertCell(row.cells.length);
  cell.setAttribute('width','40');
  cell.setAttribute('height','40');
  cell.setAttribute('align','center');
  cell.setAttribute('valign','center');
  if (compfindp(seq('on',(rownum+1).toString(),(colnum+1).toString()),state,seq()))
     {cell.innerHTML = '<img src="http://www.clker.com/cliparts/4/u/l/C/i/P/lime-square-md.png" width="50" height="50"/>'}
     else {cell.innerHTML = '<img src="http://www.clker.com/cliparts/w/x/m/w/d/D/green-square-md.png" width="50" height="50"/>'};
  if (compfindp('terminal',state,library))
    {cell.innerHTML = 'Game over'}
  return cell}

//==============================================================================
//==============================================================================
//==============================================================================
