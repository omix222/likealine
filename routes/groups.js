var MongoClient = require("mongodb").MongoClient;

module.exports = {
    find: function (req, res) {
        //mongo initialize
        // 接続文字列
        var url = "mongodb://localhost:27017/likealine";
        // MongoDB へ 接続
        MongoClient.connect(url, (error, db) => {
            if (error) throw error;
            // 接続メッセージを表示
            console.log("MongoDB へ 接続中...");
            var collection;
            // コレクションの取得
            collection = db.collection("groups");
            // コレクションに含まれるドキュメントをすべて取得
            // TODO sortは作成日付に変える
            collection.find().toArray((error, groups) => {
                if (error) throw error;
                for (var group of groups) {
                    //MongoDBが勝手に付与する _id のプロパティを削除する（API外部仕様に合わせる対応）
                    delete group._id;
                }
                res.header('Content-Type', 'application/json; charset=utf-8');
                res.send(groups);
            });
            // MongoDB への 接続 を 切断
            db.close();
            console.log("MongoDB から切断しました。");
        });

    },
    findById: function (req, res) {
        var mongoQueryGroupId = req.params.id;
        //mongo initialize
        // 接続文字列
        var url = "mongodb://localhost:27017/likealine";
        // MongoDB へ 接続
        MongoClient.connect(url, (error, db) => {
            if (error) throw error;
            // 接続メッセージを表示
            console.log("MongoDB へ 接続中...");
            var collection;
            // コレクションの取得
            collection = db.collection("groups");
            // コレクションに含まれるドキュメントをすべて取得
            collection.find({
                groupId: mongoQueryGroupId
            }).toArray((error, groups) => {
                if (error) throw error;
                //MongoDBが勝手に付与する _id のプロパティを削除する（API外部仕様に合わせる対応）
                delete groups[0]._id;
                res.header('Content-Type', 'application/json; charset=utf-8');
                res.send(groups[0]);
            });
            // MongoDB への 接続 を 切断
            db.close();
            console.log("MongoDB から切断しました。");
        });
    }
};