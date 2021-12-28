'use strict';

function attachListeners() {
  const operatorRE = /^([+]|[-]|[x]|[÷])$/g;


    function factorialize(num) {
      if (num < 0) 
            return -1;
      else if (num == 0) 
          return 1;
      else {
          return (num * factorialize(num - 1));
      }
    }
    
    function ncr(n, r) {
        r = Math.min(r, n-r);
        var numerator = factorialize(n);
        var denominator = factorialize(r) * factorialize(n-r);
        return numerator/denominator;
    }
    
    function sim () {
        var strength = parseInt(document.getElementById("strength").value);
        var attacks = parseInt(document.getElementById("attacks").value);
        var toughness = parseInt(document.getElementById("toughness").value);
        var hitpoints = parseInt(document.getElementById("hitpoints").value);
        var damage = parseInt(document.getElementById("damage").value);
        var crit_damage = parseInt(document.getElementById("crit_damage").value);
        var s_attacks = parseInt(document.getElementById("s_attacks").value);
        var s_hit = parseInt(document.getElementById("s_hit").value);
        var s_crit = parseInt(document.getElementById("s_crit").value);
        var s_damage = parseInt(document.getElementById("s_damage").value);
        var s_crit_damage = parseInt(document.getElementById("s_crit_damage").value);
        
        var kills = 0;
        
        for (var i = 0; i <= attacks; i++){
            for (var j = 0; j <= s_attacks; j++) {
                for (var k = 0; k <= attacks - i; k++) {
                    for (var l = 0; l <= s_attacks - j; l ++){
                        if (i*crit_damage + j*s_crit_damage + k*damage + l*s_damage >= hitpoints) {
                            var n = ncr(attacks, i);
                            n = n * ncr(s_attacks, j) * ((7-s_crit)**j);
                            n = n * ncr(attacks - i, k) * ((6 - Math.max(3, Math.min(5, 4 + toughness - strength))) ** k);
                            n = n * ncr(s_attacks - j, l) * ((s_crit - s_hit) ** l);
                            n = n * ((5-(6 - Math.max(3, Math.min(5, 4 + toughness - strength)))) ** (attacks - i -k));
                            n = n * ((6 - (7-s_crit) - (s_crit - s_hit)) ** (s_attacks-j-l));
                            kills += n
                        }
                    }
                }
            }
        }
        var avg = (1/6*crit_damage + (6-(Math.max(3, Math.min(5, 4 + toughness - strength))))/6*damage) * attacks;
        avg += ((7-s_crit)/6 * s_crit_damage + (s_crit - s_hit)/6 * s_damage) * s_attacks;
        var out = "Average dmg:\n" + avg + "\n";
        out += "Chance to kill:\n"+(kills/(Math.pow(6, (attacks+s_attacks))))*100 +"%";
        document.getElementById("output").value = out;
    }
    
    document.querySelector('.simBtn')
        .addEventListener('click', sim);
}
// call attach event listeners function
attachListeners();
