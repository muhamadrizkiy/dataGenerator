var mongojs = require('mongojs');
var db = mongojs('mapReduceDB', ['time']);
var fs = require('fs');
var dummyjson = require('dummy-json');
var _ = require("lodash");
var moment = require('moment');

var helpers = {
  accountId: function() {
    return ""+ Math.random() > 0.5 ? 'Ben' : 'Gerald';
  },
  albumId: 'Bintang di Surga',
  artistId: 'Peterpan',
  contentId: function() {
    return dummyjson.utils.randomArrayItem([
      'Ada Apa Denganmu',
      'Mungkin Nanti',
      'Khayalan Tingkat Tinggi',
      'Di Belakangku',
      'Kukatakan dengan Indah',
      '2DSD (Dua Dalam Satu Dunia)',
      'Di Atas Normal',
      'Aku',
      'Bintang di Surga',     
      'Masa Lalu Tertinggal']);
  },
};
 
console.log("Begin Parsing >>");
 
var template = fs.readFileSync('schema.hbs', {encoding: 'utf8'});
var result = dummyjson.parse(template, {helpers: helpers});

newResult = _.map(JSON.parse(result), function(item, i) {
  var date = moment.unix(item.ts).format();
  item.ts = new Date(date);
  return item;
})
console.log(newResult)
console.log("Begin Database Insert >>");

// clear database
// db.sourceData.remove(function (argument) {
//   console.log("DB Cleanup Completd");
// });
 
db.time.insert(newResult, function (err, docs) {
  console.log("DB Insert Completed");
});