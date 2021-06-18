'use strict';

function attachListeners() {
  const operatorRE = /^([+]|[-]|[x]|[÷])$/g;

  function digitBtn(clickEvent) {
    const userInputScreen = document.querySelector('.userInputScreen');
    const inputArr = userInputScreen.value.split(' ');
    const lastValue = inputArr[inputArr.length - 1];
    const btnValue = clickEvent.currentTarget.textContent;

    if (userInputScreen.value === '0') {
      userInputScreen.value = '';
    }

    //  if the last inputArr item is an operator, add a space
    if (lastValue.match(operatorRE) !== null) {
      userInputScreen.value += ` ${btnValue}`;
    } else {
      userInputScreen.value += btnValue;
    }

    userInputScreen.focus();
  }

  function operatorBtn(clickEvent) {
    const userInputScreen = document.querySelector('.userInputScreen');
    const inputArr = userInputScreen.value.split(' ');
    const lastValue = inputArr[inputArr.length - 1];

    if (userInputScreen.value === '' || lastValue.match(operatorRE) !== null || lastValue[lastValue.length - 1] === '.') {
      return;
    }

    userInputScreen.value += ` ${clickEvent.currentTarget.textContent}`;
    userInputScreen.focus();
  }

  function decimalPntBtn() {
    const userInputScreen = document.querySelector('.userInputScreen');
    const inputArr = userInputScreen.value.split(' ');
    const lastValue = inputArr[inputArr.length - 1];
    const btnValue = '.';
    const tailoredRE = /^([+]|[-]|[x]|[÷])$|[.]/g;

    if (userInputScreen.value === '' || lastValue.match(tailoredRE) !== null) return;

    userInputScreen.value += btnValue;
    userInputScreen.focus();
  }

  function calculate() {
    const userInputScreen = document.querySelector('.userInputScreen');
    let inputArr = userInputScreen.value.split(' ');
    const lastValue = inputArr[inputArr.length - 1];
    let nxtValue;

    // return true if the bodmas rule needs to be implemented
    function bodmasNeeded(arr) {
      if ((arr.indexOf('x') !== -1 || arr.indexOf('÷') !== -1) &&
        (arr.indexOf('+') !== -1 || arr.indexOf('-') !== -1)) {
        return true;
      }
      return false;
    }

    // handle any precision errors
    function handlePrecisionErr(val) {
      const cleanedVal = Math.round(val * 1000000000) / 1000000000;
      return cleanedVal;
    }

    // implement BODMAS rules
    function orderOperations(arr) {
      const cleanedArr = arr.map(val => val);

      for (let i = 0; i < cleanedArr.length; i += 1) {
        let newVal;
        let cleanedVal;

        if (!bodmasNeeded(cleanedArr)) return cleanedArr;

        const val = cleanedArr[i];

        if (i % 2 !== 0 && (val === 'x' || val === '÷')) {
        // if the current value is a multiplication or division operator,
        // perform that calcuation, and replace it in the array with the
        // return value - i.e. replace 3 values with a single value
          switch (val) {
            case 'x':
              newVal = +cleanedArr[i - 1] * +cleanedArr[i + 1];
              cleanedVal = handlePrecisionErr(newVal);
              cleanedArr.splice(i - 1, 3, cleanedVal);
              break;
            case '÷':
              newVal = +cleanedArr[i - 1] / +cleanedArr[i + 1];
              cleanedVal = handlePrecisionErr(newVal);
              cleanedArr.splice(i - 1, 3, cleanedVal);
              break;
            default: userInputScreen.value = 'Sorry, an error has occured';
          }
          // restart loop from the beginning of the altered array
          i = -1;
        }
      }

      return cleanedArr;
    }

    if (lastValue.match(operatorRE) || lastValue[lastValue.length - 1] === '.') return;

    // if the bodmas rule needs to be implemented, call a function which will
    // return an array which conforms to the rule
    if (bodmasNeeded(inputArr)) {
      inputArr = orderOperations(inputArr);
    }

    // the odd index numbers will be operators
    // calculate in groups of 3 (accumulator, operator & val following operator)
    const result = inputArr.reduce((accumulator, operator, index) => {
      let val;
      let cleanedVal;

      // value following the operator
      nxtValue = inputArr[index + 1];

      // check if index is odd, if so value will be an operator,
      // and calculation can be performed
      if (index % 2 !== 0) {
        switch (operator) {
          case '+':
            val = +accumulator + +nxtValue;
            cleanedVal = handlePrecisionErr(val);
            return cleanedVal;
          case '-':
            val = +accumulator - +nxtValue;
            cleanedVal = handlePrecisionErr(val);
            return cleanedVal;
          case 'x':
            val = +accumulator * +nxtValue;
            cleanedVal = handlePrecisionErr(val);
            return cleanedVal;
          case '÷':
            val = +accumulator / +nxtValue;
            cleanedVal = handlePrecisionErr(val);
            return cleanedVal;
          default: return accumulator;
        }
      } else return accumulator;
    });

    // display result on calculator screen
    userInputScreen.value = result;
  }

  // clears calculator screen
  function cancel() {
    const userInputScreen = document.querySelector('.userInputScreen');

    userInputScreen.value = '';
    userInputScreen.placeholder = 0;
  }

  // clears last user entry
  function clearEntry() {
    const userInputScreen = document.querySelector('.userInputScreen');
    const inputArr = userInputScreen.value.split(' ');

    if (userInputScreen.value === '') return;

    // remove the last element in the array of values entered by the user
    inputArr.splice(inputArr.length - 1, 1);
    // update the calculator screen
    userInputScreen.value = inputArr.join(' ');

    userInputScreen.focus();
  }

  // switch the last value entered on calculator screen to either negative,
  // or positive
  function convert() {
    const userInputScreen = document.querySelector('.userInputScreen');
    const inputArr = userInputScreen.value.split(' ');
    let lastValue = inputArr[inputArr.length - 1];

    if (userInputScreen.value === '' || lastValue.match(operatorRE)) return;

    // check if last value is neg or pos, change accordingly
    if (lastValue > 0) {
      // add "-"
      lastValue = `-${lastValue}`;
    } else {
      // remove "-"
      lastValue = lastValue.substr(1);
    }

    // replace the last element in the array of values entered by the user
    // with the newly converted value
    inputArr.splice(inputArr.length - 1, 1, lastValue);
    // update the calculator screen
    userInputScreen.value = inputArr.join(' ');

    userInputScreen.focus();
  }

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
