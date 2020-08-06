'use strict';

/*
process
  .argv
  .forEach( function( value, index, array) {
    console.info( `process.argv[${index}] = ${value}` );
  })
;
*/
/*
console.info( `Currently executing file is ${__filename}` );
console.info( `It is located in ${__dirname}` );
*/
/*
console.info( `Starting in ${process.cwd()}` );
try {
  process.chdir( '/' );
} catch( error ) {
  console.error( 'chdir:', error.message );
}
console.info( `Current working directory is now ${process.cwd()}` );
*/
/*
const fs = require( 'fs' );
let data;
try {
  data = fs.readFileSync( __filename, 'utf8' );
  console.info( data );
} catch( error ) {
  console.error( error.message );
}

fs
  .writeFile( `${__dirname}/foo.txt`, data, { flag: 'wx' }, function( error ) {
    if ( error ) {
     return console.error( error.message );
    }
  })
;
*/

const fs = require( 'fs' );
const stream = fs.createReadStream( 'foo.txt' );

stream
  .on( 'data', function( data ) {
    const chunk = data.toString();
    process.stdout.write( chunk );
  })
;
stream
  .on( 'end', function() {
    console.info();
  })
;
stream
  .on( 'error', function( error ) {
    console.error( error.message );
  })
;