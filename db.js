/**
 * Created by tom on 10/4/14.
 */
module.exports = function(){
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var userSchema = new Schema({
    displayName: String,
    created: {type: Date, default: Date.now()},
    lastLogin: Date,
    oauth: [{
      provider: String,
      id: String,
      name: {
        familyName: String,
        givenName: String,
        middleName: String
      },
      displayName: String,
      gender: String,
      emails: [{value: String}],
      profileUrl: String,
      token: String
    }]
  });



  return {};
}();