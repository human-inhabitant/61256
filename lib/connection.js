'use strict';

const mongoose = require( 'mongoose' );
const dbUrl = 'mongodb://localhost/employees';

mongoose
  .connect(
    dbUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function() { console.info( 'mongodb connected' ); });

process.on( 'SIGINT', function() {
  mongoose.connection.close( function() {
    console.info( 'Mongoose default connection disconnected' );
    process.exit( 0 );
  });
});

require( '../models/employee' );
require( '../models/team' );
