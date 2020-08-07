'use strict';

const http = require( 'http' );
const employeeService = require( './lib/employees' );
const responder = require( './lib/responseGenerator' );
const staticFile = responder.staticFile( '/public' );

http
  .createServer( function( req, res ) {
    // A parsed url to work with in case there are parameters
    let _url;

    // In case the client uses lower case for methods.
    req.method = req.method.toUpperCase();
    console.info( req.method, req.url );

    if ( req.method !== 'GET' ) {
      res.writeHead( 501, { 'Content-Type': 'text/plain' } );
      return res.end( `${req.method} is not implemented by this server.` );
    }

    if ( _url = /^\/employees$/i.exec( req.url ) ) {
      employeeService
        .getEmployees( function( error, data ) {
          if ( error ) {
            return responder.send500( error, res );
          }
          return responder.sendJson( data, res );
        })
      ;
      //return res.end( 'Employee list...' );
    } else if ( _url = /^\/employees\/(\d+)$/i.exec( req.url ) ) {
      employeeService
        .getEmployee( _url[1], function( error, data ) {
        if ( error ) {
          return responder.send500( error, res );
        }
        if ( !data ) {
          return responder.send404( res );
        }
        return responder.sendJson( data, res );
      });
      //return res.end( 'A single employee...' );
    } else {
      // Try to send the static file
      res.writeHead( 200 );
      staticFile( req.url, res );
      //res.end( 'Static file maybe...' );
    }
  })
  .listen( 1337, '192.168.2.101' )
;
console.info( 'Server running at http://192.168.2.101:1337/' );
