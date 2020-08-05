'use strict';

const http = require( 'http' );
const fs = require( 'fs' );
const colors = require( 'colors' );

http
  .createServer( function( req, res ) {
    if ( req.url === '/favicon.ico' ) {
      return res.end();
    }
    console.info( 'Incoming request to'.green, req.url );

    let i = 2;
    res.writeHead( 200, { 'Content-Type': 'text/plain' } );

    setTimeout( function () {
      fs.readFile( __filename, { encoding: 'utf8' }, function( err, contents ) {
        if ( err ) {
          console.error( err );
          return res.end();
        }
        console.info( 'Sending response for', req.url );
        res.end( contents );
      });
    }, 5e3 );

    while( i-- ) {
      console.info( 'Loop value:', i, '\r' );
    }
  })
  .listen( 1337 )
;
console.info( 'Server running at http://127.0.0.1:1337/' );

