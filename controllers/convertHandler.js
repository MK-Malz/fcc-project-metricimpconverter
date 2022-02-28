function ConvertHandler() {

  this.validateInputNumber = function(input) {


    let numeralString = '';
    // Split input at the unit part
    let charRegex = /[a-z]+$/i;
    let indexOfChar = input.search(charRegex);
    if (indexOfChar >= 0) {
      numeralString += input.slice(0, indexOfChar);
    } else {
      numeralString += input;
    }
    // Look for valid numbers
    let numRegex = /^([0-9]+(\.[0-9]+)?)(\/([0-9]+\.[0-9]+|[1-9]+))?$/;
    let found = numRegex.exec(numeralString);
    if (found !== null) {
      return true
    } else {
      // If nothing found, check for non-number input
      let nonRegex = /[^0-9]+/;
      if (nonRegex.test(numeralString)) { return false; }
      else { return true }
    }

  }
  this.validateInputUnit = function(input) {

    let charRegex = /[a-z]+$/i;
    let charString = '';
    let indexOfChar = input.search(charRegex);
    if (indexOfChar >= 0) {
      charString += input.slice(indexOfChar);
    } else {
      return false
    }
    let unitRegex = /^(gal|l|mi|km|lbs|kg)$/i;
    let found = unitRegex.exec(charString);
    if (found === null) { return false }
    else { return true }
  }

  this.getNum = function(input) {
    let result = '';
    let charRegex = /[a-z]+$/i;
    let beginOfUnit = input.search(charRegex);
    if (beginOfUnit >= 0) {
      result += input.slice(0, beginOfUnit);
      result = this.convertDivision(result)
    } else {
      result = '1';
    }
    return result;
  };

  this.convertDivision = function(initNum) {
    let result = 1
    let numRegex = /^([0-9]+(\.[0-9]+)?)(\/([0-9]+\.[0-9]+|[1-9]+))?$/;
    let found = numRegex.exec(initNum);
    if (found !== null) {
      let a = Number(found[1]);
      let b = found[4] ? Number(found[4]) : 1;
      result = a / b;
    }
    return result
  }

  this.getUnit = function(input) {
    input = input.toLowerCase()
    if (this.validateInputUnit(input)) {
      if (input.includes("gal")) {
        return "gal"
      } else if (input.includes("lbs")) {
        return "lbs"
      } else if (input.includes("mi")) {
        return "mi"
      } else if (input.includes("km")) {
        return "km"
      } else if (input.includes("l")) {
        return "L"
      } else if (input.includes("kg")) {
        return "kg"
      } else {
        console.log("getUnit: wrong input")
        return input
      }
    } else {
      return 'invalid unit'
    }
  };

  this.getReturnUnit = function(initUnit) {
    initUnit = initUnit.toLowerCase()
    if (initUnit.includes("gal")) {
      return "L"
    } else if (initUnit.includes("lbs")) {
      return "kg"
    } else if (initUnit.includes("mi")) {
      return "km"
    } else if (initUnit.includes("km")) {
      return "mi"
    } else if (initUnit.includes("l")) {
      return "gal"
    } else if (initUnit.includes("kg")) {
      return "lbs"
    } else {
      console.log("getReturnUnit: wrong input")
      return initUnit
    }
  };

  this.spellOutUnit = function(unit) {
    unit = unit.toLowerCase()
    if (unit.includes("gal")) {
      return "gallons"
    } else if (unit.includes("lbs")) {
      return "pounds"
    } else if (unit.includes("mi")) {
      return "miles"
    } else if (unit.includes("km")) {
      return "kilometers"
    } else if (unit.includes("l")) {
      return "liters"
    } else if (unit.includes("kg")) {
      return "kilograms"
    } else {
      console.log("spellOutUnit: wrong input")
      return unit
    }
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    initUnit = initUnit.toLowerCase()
    if (initUnit.includes("gal")) {
      result = initNum * galToL
    } else if (initUnit.includes("lbs")) {
      result = initNum * lbsToKg
    } else if (initUnit.includes("mi")) {
      result = initNum * miToKm
    } else if (initUnit.includes("km")) {
      result = initNum / miToKm
    } else if (initUnit.includes("l")) {
      result = initNum / galToL
    } else if (initUnit.includes("kg")) {
      result = initNum / lbsToKg
    } else {
      console.log("convert: wrong input")
      result = initNum
    }
    return parseFloat(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = ""
    result += initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit)
    return result;
  };

}

module.exports = ConvertHandler;
