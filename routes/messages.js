var MongoClient = require("mongodb").MongoClient;

module.exports = {
    find: function (req, res) {
        //検索対象のGroupIdをクエリストリングより取得
        var reqQueryGroupId = req.query.groupId;
        //テストしやすさのため、デフォルトのGroupIdはgroup1とする。（後でリファクタする?）
        var mongoQueryGroupId = reqQueryGroupId == undefined ? "group1" : reqQueryGroupId;
        //FromMessageId(起点となるメッセージID）をクエリストリングより取得
        var reqQueryFromMessageId = req.query.fromMessageId;
        var mongoQueryFromMessageId = reqQueryFromMessageId == undefined ? 1000000 : Number(reqQueryFromMessageId);
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
            // TODO sortは作成日付に変える
            collection.find({
                groupId: mongoQueryGroupId,
                messageId: { $lt: mongoQueryFromMessageId }
            }).sort({ 'messageId': -1 }).limit(50).toArray((error, messages) => {
                for (var message of messages) {
                    //MongoDBが勝手に付与する _id のプロパティを削除する（API外部仕様に合わせる対応）
                    delete message._id;
                }
                res.header('Content-Type', 'application/json; charset=utf-8');
                res.send(messages);
            });

            // MongoDB への 接続 を 切断
            db.close();
            console.log("MongoDB から切断しました。");
        });

    },
    findById: function (req, res) {
        var mongoQueryMessageId = Number(req.params.id);
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
            // TODO sortは作成日付に変える
            collection.find({
                messageId: mongoQueryMessageId
            }).toArray((error, messages) => {
                //MongoDBが勝手に付与する _id のプロパティを削除する（API外部仕様に合わせる対応）
                delete messages[0]._id;

                res.header('Content-Type', 'application/json; charset=utf-8');
                res.send(messages[0]);
            });

            // MongoDB への 接続 を 切断
            db.close();
            console.log("MongoDB から切断しました。");
        });
    },
    create: function (req, res) {
        var message = {};
        // TODO: insert 実装する。インクリメンタルでシーケンスっぽいのをmessageIdカラムに対応。
        res.send(message);
    },

};