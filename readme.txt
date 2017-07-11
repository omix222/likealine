事前準備
mongpoDBの起動とデータ準備

#mongo 起動
mongo

＃アプリ用のDBに切り替え
use likealine

＃事前データのインサート１(group1)
db.messeges.insert({ messageId: 1, type:"text", messegeDetail: "Hello", fromUserId: "Takahashi", groupId: "group1" ,postDate:new Date()});
＃事前データのインサート２(group1)
db.messeges.insert({ messageId: 2, type:"text", messegeDetail: "Hello again!", fromUserId: "Kuchiki", groupId: "group1" ,postDate:new Date()});
＃事前データのインサート3(group2)
db.messeges.insert({ messageId: 3, type:"text", messegeDetail: "Another Group!", fromUserId: "Ozaki", groupId: "group2" ,postDate:new Date()});
＃事前データのインサート4(group2,スタンプ)
db.messeges.insert({ messageId: 4, type:"stamp", messegeDetail: "stamp.png", fromUserId: "Ozaki", groupId: "group2" ,postDate:new Date()});


＃インサートしたデータの確認
db.messeges.find()


# collectionを削除したい場合
db.messeges.drop();

アプリ起動
DEBUG=run:* npm start


http://localhost:3000/messeges

各Group内のメッセージ表示用のAPIサンプル
request sample1
HTTP method : GET
http://localhost:3000/messeges?groupId=group2

response sample
[
  {
    "messageId": 2,
    "type": "text",
    "messegeDetail": "Hello again!",
    "fromUserId": "Kuchiki",
    "groupId": "group1",
    "postDate": "2017-07-11T13:43:42.596Z"
  },
  {
    "messageId": 1,
    "type": "text",
    "messegeDetail": "Hello",
    "fromUserId": "Takahashi",
    "groupId": "group1",
    "postDate": "2017-07-11T13:43:37.799Z"
  }
]

request sample2
HTTP method : GET
http://localhost:3000/messeges?groupId=group1&fromMessageId=100000

response sample
[
  {
    "messageId": 2,
    "type": "text",
    "messegeDetail": "Hello again!",
    "fromUserId": "Kuchiki",
    "groupId": "group1",
    "postDate": "2017-07-11T13:43:42.596Z"
  },
  {
    "messageId": 1,
    "type": "text",
    "messegeDetail": "Hello",
    "fromUserId": "Takahashi",
    "groupId": "group1",
    "postDate": "2017-07-11T13:43:37.799Z"
  }
]



http://localhost:3000/messeges/aa?groupId=group2

スタンプ取得API (GETのみサポート)
http://localhost:3000/stamps