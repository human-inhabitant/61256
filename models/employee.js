'use strict';

const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  team: {
    type: Schema.Types.ObjectID,
    ref: 'Team'
  },
  image: {
    type: String,
    default: 'img/user.png'
  },
  address: {
    lines: {
      type: [String]
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zip: {
      type: Number
    }
  }
});

module.exports = mongoose.model( 'Employee', EmployeeSchema );
