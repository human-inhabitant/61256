'use strict';

const colors = require( 'colors' );

exports.add = function( num1, num2 ) {
  return parseInt( num1, 10 ) + parseInt( num2, 10 );
};

exports.multiply = function( num1, num2 ) {
  return parseInt( num1, 10 ) * parseInt( num2, 10 );
};

exports.factorial = function( num ) {
  //console.info( `${num}`.red );
  if ( num === 0 ) {
    return 1;
  } else {
    return num * this.factorial( num - 1 );
  }
};

exports.now = Date.now();
