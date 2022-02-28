const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

   suite('Function convertHandler.getReturnUnit(initUnit)', function() {

    test('return unit for each valid input unit', function(done) {
      let input = ['gal','l','mi','km','lbs','kg'];
      let expected = ['L','gal','km','mi','kg','lbs'];

      for(let i = 0; i < input.length; i++) {
        assert.equal(convertHandler.getReturnUnit(input[i]), expected[i]);
      }
      done()
      });
     
    });
    
suite("Function convertHandler.getNum(input)", function () {
    test("Whole number input", function (done) {
      let input = "12L";
      assert.equal(convertHandler.getNum(input), 12);
      done();
    });

    test("Decimal Input", function (done) {
      let input = "12.2L";
      assert.equal(convertHandler.getNum(input), 12.2);
      done();
    });

    test("Fractional Input", function (done) {
      let input = "12/3L";
      assert.equal(convertHandler.getNum(input), 12 / 3);
      done();
    });

    test("Fractional Input w/ Decimal", function (done) {
      let input = "3/2.3L";
      assert.equal(convertHandler.getNum(input), 3 / 2.3);
      done();
      //done();
    });

    test("Invalid Input (double fraction)", function (done) {
      let input = "5/3/7L";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });

    test("No Numerical Input", function (done) {
      let input = "L";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });

   suite('Function convertHandler.getUnit(input)', function() {
    
    test('test valid unit input', function(done) {
      var input  = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      var output = ['gal','L','mi','km','lbs','kg','gal','L','mi','km','lbs','kg']
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getUnit(ele), output[i]);
      });
      done();
    });
    
    test('invalid unit input', function(done) {
      var input = '32xl';
      assert.equal(convertHandler.getUnit(input), 'invalid unit');
      done();
    });  
    
  });
  
  


  

   suite('Function convertHandler.spellOutUnit(unit)', function() {

    test('return the spelled-out string unit for each valid input', function(done) {
      let input = ['gal','l','mi','km','lbs','kg'];
      let expected = ['gallons','liters','miles','kilometers','pounds','kilograms'];
      input.forEach(function(ele, i) {
        let result = convertHandler.spellOutUnit(ele);
        assert.equal(result, expected[i]);
      });
      done();
    });

  });

  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); // 0.1 tolerance
      done()
    });
    
    test('L to Gal', function(done) {
      var input = [5, 'l'];
      var expected = 1.3209;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1)
      done();
    });
    
    test('Mi to Km', function(done) {
      var input = [5, 'mi'];
      var expected = 8.0467;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1)
      done();
    });
    
    test('Km to Mi', function(done) {
      var input = [5, 'km'];
      var expected = 3.1068;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1)
      done();
    });
    
    test('Lbs to Kg', function(done) {
      var input = [5, 'lbs'];
      var expected = 2.268;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1)
      done();
    });
    
    test('Kg to Lbs', function(done) {
      var input = [5, 'kg'];
      var expected = 11.0231;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1)
      done();
    });
    
  });
});