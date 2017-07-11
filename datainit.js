var fs = require('fs');
var path = require('path');
var mongodb = require('mongodb');
var BSON = mongodb.BSON;

var DB_HOST = 'localhost';
var DB_PORT = 27017
var DB_OPTION = {};
var DB_NAME = 'likealine';

// 以前は「safe: true」などと指定していたが、最新版では
// オプションの「w」プロパティで書き込み時の通知処理を指定する。
// 後方互換性の維持のため、「safe: true」といった指定もまだ許可されている
var CONN_OPTION = {w:1};

// メイン処理を実行する関数
function main() {
  if (process.argv.length < 3) {
    console.log('usage: %s <filepath>', process.argv[1]);
    process.exit(-1);
  }
  var targetFile = process.argv[2]
  fs.readFile(targetFile, function (err, data) {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log('cannot open "%s".', err.path);
        process.exit(-1);
      }
      throw err;
    }
    // path.basename関数でファイルパスからファイル名だけを抜き出す
    storeToDB(path.basename(targetFile), data);
  });
}

// データをDBに保存する
function storeToDB(filename, data) {
  var server = new mongodb.Server(DB_HOST, DB_PORT, DB_OPTION);
  var connector = new mongodb.Db(DB_NAME, server, CONN_OPTION);
  connector.open(function (err, db) {
    db.collection('stamps', function(err, collection) {
      bson = {
        'filename': filename,
        'data': data
      };
      collection.insert(bson, function(err, doc) {
        if (err) {
          throw err;
        }
        console.log('insert succeeded.');
        db.close();
      });
    });
  });  
}

// 直接このモジュールがnodeコマンドで実行されているならmain関数を実行する
if (require.main == module) {
  main();
}