var MongoClient = require("mongodb").MongoClient;

module.exports = {
    // TODO 単純取得のサンプル。後で消す。
    // index: function (req, res) {
    //     var messeges = { messageID: "messageID:1", messageDetail: "Hello", fromUserId: "Takahashi", groupID: "groupID:1" };
    //     res.header('Content-Type', 'application/json; charset=utf-8');
    //     // TODO: findByAll 実装する
    //     res.send(messeges);
    // },
    index: function (req, res) {
        var reqQueryGroupId = req.query.groupId;
        //テストしやすさのため、デフォルトのGroupIdはgroup1とする。（後でリファクタする?）
        var mongoQueryGroupId = reqQueryGroupId == undefined ? "group1" : reqQueryGroupId;

        // 正しくは以下 + バリデーション対応？
        // var mongoQueryGroupId = req.query.groupId;

        //mongo initialize
        // 接続文字列
        var url = "mongodb://localhost:27017/likealine";
        // MongoDB へ 接続
        MongoClient.connect(url, (error, db) => {
            // 接続メッセージを表示
            console.log("MongoDB へ 接続中...");
            var collection;
            // コレクションの取得
            collection = db.collection("messeges");
            // コレクションに含まれるドキュメントをすべて取得
            // TODO クエリのorder by と　オフセット対応
            collection.find({ groupId: mongoQueryGroupId }).toArray((error, messeges) => {
                for (var messege of messeges) {
                    //MongoDBが勝手に付与する _id のプロパティを削除する（API外部仕様に合わせる対応）
                    delete messege._id;
                }
                res.header('Content-Type', 'application/json; charset=utf-8');
                res.send(messeges);
            });

            // MongoDB への 接続 を 切断
            db.close();
            console.log("MongoDB から切断しました。");
        });

    },
    // 不要で良いか？
    // show: function (req, res) {
    //     var messege = { "messageID": req.params.id, "messageDetail": "Hello", "fromUserId": "Takahashi", "groupID": req.query.groupId };
    //     res.header('Content-Type', 'application/json; charset=utf-8');
    //     // TODO: findById 実装する
    //     res.send(messege);
    // },
    create: function (req, res) {
        var messege = {};
        // TODO: insert 実装する。インクリメンタルでシーケンスっぽいのをmessegeIdカラムに対応。
        res.send(messege);
    },

};