var MongoClient = require("mongodb").MongoClient;

module.exports = {
    find: function (req, res) {
        //検索対象のGroupIdをクエリストリングより取得
        var reqQueryGroupId = req.query.groupId;
        if (reqQueryGroupId == undefined) {
            //mongo initialize
            // 接続文字列
            var url = "mongodb://localhost:27017/likealine";
            // MongoDB へ 接続
            MongoClient.connect(url, (error, db) => {
                // 接続メッセージを表示
                console.log("MongoDB へ 接続中...");
                var collection;
                // コレクションの取得
                collection = db.collection("groupmembers");
                // コレクションに含まれるドキュメントをすべて取得
                // TODO sortは作成日付に変える
                collection.find().toArray((error, groupmenbers) => {
                    for (var groupmenber of groupmenbers) {
                        //MongoDBが勝手に付与する _id のプロパティを削除する（API外部仕様に合わせる対応）
                        delete groupmenber._id;
                    }
                    res.header('Content-Type', 'application/json; charset=utf-8');
                    res.send(groupmenbers);
                });
                // MongoDB への 接続 を 切断
                db.close();
                console.log("MongoDB から切断しました。");
            });

        } else {
            //mongo initialize
            // 接続文字列
            var url = "mongodb://localhost:27017/likealine";
            // MongoDB へ 接続
            MongoClient.connect(url, (error, db) => {
                // 接続メッセージを表示
                console.log("MongoDB へ 接続中...");
                var collection;
                // コレクションの取得
                collection = db.collection("groupmembers");
                // コレクションに含まれるドキュメントをすべて取得
                // TODO sortは作成日付に変える
                collection.find({
                    groupId: reqQueryGroupId
                }).toArray((error, groupmenbers) => {
                    for (var groupmenber of groupmenbers) {
                        //MongoDBが勝手に付与する _id のプロパティを削除する（API外部仕様に合わせる対応）
                        delete groupmenber._id;
                    }
                    res.header('Content-Type', 'application/json; charset=utf-8');
                    res.send(groupmenbers);
                });
                // MongoDB への 接続 を 切断
                db.close();
                console.log("MongoDB から切断しました。");
            });
        }
    }
};