'use strict';

const express = require( 'express' );
const path = require( 'path' );
const favicon = require( 'serve-favicon' );
const logger = require( 'morgan' );
const cookieParser = require( 'cookie-parser' );
const bodyParser = require( 'body-parser' );

require( './lib/connection' );
const employees = require( './routes/employees' );
const teams = require( './routes/teams' );

const app = express();

app.use( favicon( __dirname + '/public/favicon.ico' ) );
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( employees );
app.use( teams );

app
  .use( function( req, res, next ) {
    const err = new Error( 'Not Found' );
    err.status = 404;
    next( err );
  })
;

if ( app.get( 'env' ) === 'development' ) {
  app
    .use( function( err, req, res, next ) {
      res.status( err.status || 500 );
      res.send({
        message: err.message,
        error: err
      });
    })
  ;
}

app.use( function( err, req, res, next ) {
  res.status( err.status || 500 );
});

module.exports = app;