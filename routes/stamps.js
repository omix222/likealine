var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;

/* GET users listing. */
router.get('/', function (req, res, next) {
  
  //mongo initialize
  // 接続文字列
  var url = "mongodb://localhost:27017/likealine";
  // MongoDB へ 接続
  MongoClient.connect(url, (error, db) => {
    // 接続メッセージを表示
    console.log("MongoDB へ 接続中...");
    var collection;
    // コレクションの取得
    collection = db.collection("stamps");
    // コレクションに含まれるドキュメントをすべて取得
    collection.find().toArray((error, stamps) => {
      for (var stamp of stamps) {
        //MongoDBが勝手に付与する _id のプロパティを削除する（API外部仕様に合わせる対応）
        delete stamp._id;
      }
      res.header('Content-Type', 'application/json; charset=utf-8');
      res.send(stamps);
    });
    // MongoDB への 接続 を 切断
    db.close();
    console.log("MongoDB から切断しました。");
  });
});

module.exports = router;
