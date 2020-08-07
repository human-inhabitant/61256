'use strict';

const mongoose = require( 'mongoose' );
require( '../models/employee' );
const Employee = mongoose.model( 'Employee' );

exports.getEmployees = function( callback ) {
  Employee.find().sort( 'name.last' ).exec( callback );
}

exports.getEmployee = function( employeeId, callback ) {
  Employee.findOne({ id: employeeId }).populate( 'team' ).exec( callback );
}
