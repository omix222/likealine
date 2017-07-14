事前準備
mongpoDBの起動とデータ準備

#mongo 起動
mongo

＃アプリ用のDBに切り替え
use likealine

＃事前データのインサート１(group1)
db.messages.insert({ messageId: 1, type:"text", messageDetail: "Hello", fromUserId: "Takahashi", groupId: "group1" ,postDate:new Date()});
＃事前データのインサート２(group1)
db.messages.insert({ messageId: 2, type:"text", messageDetail: "Hello again!", fromUserId: "Kuchiki", groupId: "group1" ,postDate:new Date()});
＃事前データのインサート3(group2)
db.messages.insert({ messageId: 3, type:"text", messageDetail: "Another Group!", fromUserId: "Ozaki", groupId: "group2" ,postDate:new Date()});
＃事前データのインサート4(group2,スタンプ)
db.messages.insert({ messageId: 4, type:"stamp", messageDetail: "stamp.png", fromUserId: "Ozaki", groupId: "group2" ,postDate:new Date()});

#フィールド "messageId" をユニークにする
db.collection.ensureIndex( { messageId: 1 }, { unique: true }) ;

＃インサートしたデータの確認
db.messages.find()

# collectionを削除したい場合
db.messages.drop();

#stamp画像の仕込み
node datainit img/smile.jpg

db.stamps.drop();


アプリ起動
DEBUG=run:* npm start


http://localhost:3000/messages

各Group内のメッセージ表示用のAPIサンプル
外部仕様
一つのgetで取得できるメッセージは50まで
メッセージの起点はfromMessageIdで指定。fromMessageId=100とすると、100〜50で取得。デフォルトは1000000（通常取りえない最大値）。
messageIdの降順のorder byで返す。（最新メッセージから取得することを想定）
request sample1
HTTP method : GET
http://localhost:3000/messages?groupId=group2

response sample
[
  {
    "messageId": 2,
    "type": "text",
    "messageDetail": "Hello again!",
    "fromUserId": "Kuchiki",
    "groupId": "group1",
    "postDate": "2017-07-11T13:43:42.596Z"
  },
  {
    "messageId": 1,
    "type": "text",
    "messageDetail": "Hello",
    "fromUserId": "Takahashi",
    "groupId": "group1",
    "postDate": "2017-07-11T13:43:37.799Z"
  }
]

request sample2
HTTP method : GET
http://localhost:3000/messages?groupId=group1&fromMessageId=100000

response sample
[
  {
    "messageId": 2,
    "type": "text",
    "messageDetail": "Hello again!",
    "fromUserId": "Kuchiki",
    "groupId": "group1",
    "postDate": "2017-07-11T13:43:42.596Z"
  },
  {
    "messageId": 1,
    "type": "text",
    "messageDetail": "Hello",
    "fromUserId": "Takahashi",
    "groupId": "group1",
    "postDate": "2017-07-11T13:43:37.799Z"
  }
]



http://localhost:3000/messages/aa?groupId=group2

スタンプ取得API (GETのみサポート)
http://localhost:3000/stamps