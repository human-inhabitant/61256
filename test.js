'use strict';

const m = require( 'mmm' );

console.info( 'Time after first require', m.now );

console.info( m.add( 3, 5 ) );
console.info( m.multiply( 4, 5 ) );
console.info( m.factorial( 4 ) );
