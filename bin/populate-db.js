'use strict';

const async = require( 'async' );
const mongoose = require( 'mongoose' );

require( `${process.cwd()}/lib/connection` );

const Employee = mongoose.model( 'Employee' );
const Team = mongoose.model( 'Team'  );

const data = {
  employees: [
    {
      id: '1000003',
      name: {
        first: 'Colin',
        last: 'Ihrig'
      },
      image: 'img/employees/1000003.png',
      address: {
        lines: ['11 Wall Street'],
        city: 'New York',
        state: 'NY',
        zip: 10118
      }
    },  {
      id: '1000021',
      name: {
        first: 'Adam',
        last: 'Bretz'
      },
      address: {
        lines: ['46 18th St', 'St. 210'],
        city: 'Pittsburgh',
        state: 'PA',
        zip: 15222
      }
    },
    {
      id: '1000022',
      name: {
        first: 'Matt',
        last: 'Liegey'
      },
      address: {
        lines: ['2 S Market Square', '(Market Square)'],
        city: 'Pittsburgh',
        state: 'PA',
        zip: 15222
      }
    },
    {
      id: '1000025',
      name: {
        first: 'Aleksey',
        last: 'Smolenchuk'
      },
      image: 'img/employees/1000025.png' /* invalid image */,
      address: {
        lines: ['3803 Forbes Ave'],
        city: 'Pittsburgh',
        state: 'PA',
        zip: 15213
      }
    },
    {
      id: '1000030',
      name: {
        first: 'Sarah',
        last: 'Gay'
      },
      address: {
        lines: ['8651 University Blvd'],
        city: 'Pittsburgh',
        state: 'PA',
        zip: 15108
      }
    },
    {
      id: '1000031',
      name: {
        first: 'Dave',
        last: 'Beshero'
      },
      address: {
        lines: ['1539 Washington Rd'],
        city: 'Mt Lebanon',
        state: 'PA',         zip: 15228
      }
    }
  ],
  teams: [
    {
      name: 'Software and Services Group'
    },
    {
      name: 'Project Development'
    }
  ]
};

const deleteEmployees = function( callback ) {
  console.info( 'Deleting employees' );
  Employee.deleteMany( {}, function( error, response ) {
    if ( error ) {
      console.error( 'Error deleting employees:', error );
    }
    console.info( 'Done deleting employees' );
    callback();
  });
};

const addEmployees = function( callback ) {
  console.info( 'Adding employees' );
  Employee.create( data.employees, function( error ) {
    if ( error ) {
      console.error( 'Error:', error );
    }
    console.info( 'Done adding employees' );
    callback();
  });
};

const deleteTeams = function( callback ) {
  console.info( 'Deleting teams' );
  Team.deleteMany( {}, function( error, response ) {
    if ( error ) {
      console.error( 'Error deleting teams:', error );
    }
    console.info( 'Done deleting teams' );
    callback();
  });
};

const addTeams = function( callback ) {
  console.info( 'Adding teams' );
  Team.create( data.teams, function( error, team1 ) {
    if ( error ) {
      console.error( 'Error:', error );
    } else {
      data.team_id = team1._id;
    }
    console.info( 'Done adding teams' );
    callback();
  });
};

const updateEmployeeTeams = function( callback ) {
  console.info( 'Updating employee teams' );
  const team = data.teams[0];

  // Set everyone to be on the same team to start
  Employee.updateMany( {}, { team: data.team_id }, { multi: true }, function ( error, numberAffected, response ) {
    if ( error ) {
      console.error( 'Error updating employee team:', error );
    }
    console.info( 'Done updating employee teams' );
    callback();
  });
};

async
  .series( [
      deleteEmployees,
      deleteTeams,
      addEmployees,
      addTeams,
      updateEmployeeTeams
    ], function( error, results ) {
      if ( error ) {
        console.error( 'Error:', error );
      }
      mongoose.connection.close();
      console.info( 'Done!' );
  })
;
