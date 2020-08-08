'use strict';

const debug = require( 'debug' )( 'example-server' );
const app = require( '../' );

app.set( 'port', process.env.PORT || 3000 );

const server = app.listen( app.get( 'port' ), function() {
  debug( `Express server listening on port ${server.address().port}` );
});
