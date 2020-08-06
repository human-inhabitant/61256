'use strict';

const http = require( 'http' );

http
  .createServer( function( req, res ) {
    if ( req.url === '/' && req.method === 'GET' ) {
      res.writeHead( 200, { 'Content-Type': 'text/html' } );
      res.end( 'Hello <strong>home page</strong><br/>' + ' Your user agent is ' + req.headers['user-agent'] );
    } else if ( req.url === '/account' && req.method === 'GET' ) {
      res.writeHead( 200, { 'Content-Type': 'text/html' } );
      res.end('Hello <strong>account page</strong>' );
    } else {
      res.writeHead( 404, { 'Content-Type': 'text/html' } );
      res.end();
    }
  })
  .listen( 1337 )
;
console.info( 'Server running at http://127.0.0.1:1337/' );

