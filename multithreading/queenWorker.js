self.addEventListener('message', function(e) {
    let count = 0;
    var findSolutions = function(ld, cols, rd, all) {
      let poss = ~(ld | cols | rd) & all;
      if (cols === all) {
        count++;
      }
      while (poss) {
        let negPoss = poss * -1;
        let bit = poss & negPoss;
        //let bit = poss & -poss;
        poss = poss - bit;
        findSolutions((ld | bit) << 1, cols | bit, (rd | bit) >> 1, all);
      }
    };
    findSolutions(e.data[0], e.data[1], e.data[2], e.data[3]);
    self.postMessage(count);
  }, false);