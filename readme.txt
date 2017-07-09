事前準備
mongpoDBの起動とデータ準備

#mongo 起動
mongo

＃アプリ用のDBに切り替え
use likealine

＃事前データのインサート１(group1)
db.messeges.insert({ messageID: "messegeID:1", type:"text", messegeDetail: "Hello", fromUserId: "Takahashi", groupId: "group1" });
＃事前データのインサート２(group1)
db.messeges.insert({ messageID: "messegeID:2", type:"text", messegeDetail: "Hello again!", fromUserId: "Kuchiki", groupId: "group1" });
＃事前データのインサート3(group2)
db.messeges.insert({ messageID: "messegeID:3", type:"text", messegeDetail: "Another Group!", fromUserId: "Ozaki", groupId: "group2" });
＃事前データのインサート4(group2,スタンプ)
db.messeges.insert({ messageID: "messegeID:4", type:"stamp", messegeDetail: "stamp.png", fromUserId: "Ozaki", groupId: "group2" });

＃インサートしたデータの確認
db.messeges.find()


# collectionを削除したい場合
db.messeges.drop();

アプリ起動
DEBUG=run:* npm start


http://localhost:3000/messeges

各Group内のメッセージ表示用のAPIサンプル
request sample
HTTP method : GET
http://localhost:3000/messeges?groupId=group2

response sample
[
  {
    "messageID": "messegeID:3",
    "type": "text",
    "messegeDetail": "Another Group!",
    "fromUserId": "Ozaki",
    "groupId": "group2"
  },
  {
    "messageID": "messegeID:4",
    "type": "stamp",
    "messegeDetail": "stamp.png",
    "fromUserId": "Ozaki",
    "groupId": "group2"
  }
]

http://localhost:3000/messeges/aa?groupId=group2

スタンプ取得API (GETのみサポート)
http://localhost:3000/stamps