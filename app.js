'use strict';

const express = require( 'express' );
const app = express();

// Route One
app
  .get( '/teams/:teamName/employees/:employeeId', function( req, res, next ) {
    console.info( 'teamName =', req.params.teamName );
    console.info( 'employeeId =', req.params.employeeId );
    res.send( 'path one' );
  })
;

// Route Two
app
  .get( '/teams/:teamName/employees', function( req, res, next ) {
      console.info( 'setting content type' );
      res.set( 'Content-Type', 'application/json' );
      res.locals.data = 100 ;
      next();
    }, function( req, res, next ) {
      console.info( 'teamName =', req.params.teamName );
      console.info( res.locals.data );
      res.send( 'path two' );
  })
;

// Route Three
app
  .get( /^\/groups\/(\w+)\/(\d+)$/, function( req, res, next ) {
    console.info('groupname =', req.params[0] );
    console.info('groupId =', req.params[1]);
    res.send( 'path three' );
  })
;

const server = app.listen(1337, function() {
  console.info('Server started on port 1337');
});
