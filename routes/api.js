'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {

  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req, res) => {

    console.log(req.query.input)  
    //validate input
    if(!convertHandler.validateInputNumber(req.query.input) && !convertHandler.validateInputUnit(req.query.input)) {
        res.json("invalid number and unit")   
 
    } else if(!convertHandler.validateInputNumber(req.query.input)) {
      res.json("invalid number")

    } else if(!convertHandler.validateInputUnit(req.query.input)) {
      res.json("invalid unit")

    } else {
    //get units
    let initUnit = convertHandler.getUnit(req.query.input)
    let returnUnit = convertHandler.getReturnUnit(initUnit)
    //get number
    let initNum = convertHandler.getNum(req.query.input)
    //convert units
    let returnNum = convertHandler.convert(initNum, initUnit)
    //create string
    let returnString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)

    let returnObject = {
      "initNum": initNum,
      "initUnit": initUnit,
      "returnNum": returnNum,
      "returnUnit": returnUnit,
      "string": returnString
    }
    console.log(returnObject)
    res.json(returnObject)
    }
  });

};

