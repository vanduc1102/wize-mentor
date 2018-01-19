'use strict';

const MongoClient = require('mongodb').MongoClient;
const config = require('../../config');
const mongdbUri = 'mongodb://' + config.db.username + ':' + encodeURIComponent(config.db.password) + '@' + config.db.uri;

MongoClient.connect(mongdbUri, {
  native_parser: true
}, function (err, db) {
  console.log(db, err);
});

