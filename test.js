'use strict';

/*
const m = require( 'mmm' );

console.info( 'Time after first require', m.now );

console.info( m.add( 3, 5 ) );
console.info( m.multiply( 4, 5 ) );
console.info( m.factorial( 4 ) );
*/
/*
const fs = require( 'fs' );
try {
  const d = fs.readFileSync( 'README.md', 'utf8' );
  console.info( d );
} catch( e ) {
  console.error( e );
}
*/
/*
const util = require( 'util' );
const EventEmitter = require( 'events' ).EventEmitter;

function Counter() {
  const self = this;

  EventEmitter.call( this );

  let count = 0;

  this.start = function() {
    this.emit( 'start' );
    setInterval( function() {
      self.emit( 'count', count );
      ++count;
    }, 1e3 );
  };
}

util.inherits( Counter, EventEmitter );

const  counter = new Counter();

counter.on( 'start', function() {
  console.info( 'start event' );
});

counter.once( 'count', function( count ) {
  console.info( 'count =', count );
});

counter.start();

const emitter = new EventEmitter();

process.on('uncaughtException', function( error ) {
  console.error( error.message );
  process.exit( -1 );
});

emitter.emit( 'error', new Error( 'our error is bad and we feel bad' ) );
*/

const fs = require( 'fs' );
const promise = new Promise( function( resolve, reject ) {
  fs.readFile('README.md', 'utf8', function( error, data ) {
    if ( error ) {
      return reject( error );
    }
    resolve( data );
  });
});
promise
  .then( function( result ) {
      console.info( result );
      return 'It\'s over...';
  })
  .catch( function( error ) {
      console.error( error.message );
  })
  .then( function( result) {
    console.info( result );
  })
;