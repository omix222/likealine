# likealine
事前準備
## mongpoDBの起動とデータ準備
 -  mongo 起動

mongo

- アプリ用のDBに切り替え

use likealine

- 初期データ準備

db.users.drop();
db.users.insert({userId:"u001",userName:"Takahashi"});
db.users.insert({userId:"u002",userName:"Kuchiki"});
db.users.insert({userId:"u003",userName:"Ozaki"});
db.users.insert({userId:"u004",userName:"Saito"});
db.users.insert({userId:"u005",userName:"Iwata"});
db.users.insert({userId:"u006",userName:"Abe"});
db.users.insert({userId:"u007",userName:"Minami"});
db.users.ensureIndex( { userId: 1 }, { unique: true }) ;

db.groups.drop();
db.groups.insert({groupId:"g001",groupName:"ALL"});
db.groups.insert({groupId:"g002",groupName:"JFW"});
db.groups.insert({groupId:"g003",groupName:"ITP"});
db.groups.insert({groupId:"g004",groupName:"MPF"});
db.groups.ensureIndex( { groupId: 1 }, { unique: true }) ;

db.groupmembers.drop();
db.groupmembers.insert({groupId:"g001",userId:"u001"});
db.groupmembers.insert({groupId:"g001",userId:"u002"});
db.groupmembers.insert({groupId:"g001",userId:"u003"});
db.groupmembers.insert({groupId:"g001",userId:"u004"});
db.groupmembers.insert({groupId:"g001",userId:"u005"});
db.groupmembers.insert({groupId:"g001",userId:"u006"});
db.groupmembers.insert({groupId:"g001",userId:"u007"});
db.groupmembers.insert({groupId:"g002",userId:"u001"});
db.groupmembers.insert({groupId:"g002",userId:"u002"});
db.groupmembers.insert({groupId:"g003",userId:"u003"});
db.groupmembers.insert({groupId:"g003",userId:"u004"});
db.groupmembers.insert({groupId:"g004",userId:"u005"});
db.groupmembers.insert({groupId:"g005",userId:"u006"});
db.groupmembers.insert({groupId:"g006",userId:"u007"});


- 事前データのインサート１(group1)

db.messages.insert({ messageId: 1, type:"text", messageDetail: "Hello", fromUserId: "u001", groupId: "g001" ,postDate:new Date()});

- 事前データのインサート２(group1)

db.messages.insert({ messageId: 2, type:"text", messageDetail: "Hello again!", fromUserId: "u002", groupId: "g001" ,postDate:new Date()});
＃事前データのインサート3(group2)
db.messages.insert({ messageId: 3, type:"text", messageDetail: "Another Group!", fromUserId: "u003", groupId: "g002" ,postDate:new Date()});
＃事前データのインサート4(group2,スタンプ)
db.messages.insert({ messageId: 4, type:"stamp", messageDetail: "stamp.png", fromUserId: "u004", groupId: "g002" ,postDate:new Date()});

 - フィールド "messageId" をユニークにする

db.messages.ensureIndex( { messageId: 1 }, { unique: true }) ;

 - インサートしたデータの確認

db.messages.find()

 - 削除

db.messages.drop();

- stamp画像の仕込み

node datainit img/smile.jpg

 - フィールド "filename" をユニークにする

db.stamps.ensureIndex( { filename: 1 }, { unique: true }) ;

db.stamps.drop();



 ## アプリ起動
DEBUG=run:* npm start


http://localhost:3000/messages


## API外部仕様

 - 各Group内のメッセージ表示用のAPI


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

post

{
                type: "test",
                messageDetail: "first posted",
                fromUserId: "u001",
                groupId: "g001"
            }

 - スタンプ取得API (GETのみサポート)

http://localhost:3000/stamps

#特定Groupに所属しているユーザー一覧の取得（クエリストリングなしの場合は全Groupの所属User一覧を取得）
http://localhost:3000/groupmembers?groupId=g001
[
  {
    "groupId": "g001",
    "userId": "u001"
  },
  {
    "groupId": "g001",
    "userId": "u002"
  },
  {
    "groupId": "g001",
    "userId": "u003"
  },
  {
    "groupId": "g001",
    "userId": "u004"
  },
  {
    "groupId": "g001",
    "userId": "u005"
  },
  {
    "groupId": "g001",
    "userId": "u006"
  },
  {
    "groupId": "g001",
    "userId": "u007"
  }
]

- グループ情報取得API

http://localhost:3000/groups

[
  {
    "groupId": "g001",
    "groupName": "ALL"
  },
  {
    "groupId": "g002",
    "groupName": "JFW"
  },
  {
    "groupId": "g003",
    "groupName": "ITP"
  },
  {
    "groupId": "g004",
    "groupName": "MPF"
  }
]
http://localhost:3000/groups/g001
{
  "groupId": "g001",
  "groupName": "ALL"
}

- ユーザー情報取得API

http://localhost:3000/users
[
  {
    "userId": "u001",
    "userName": "Takahashi"
  },
  {
    "userId": "u002",
    "userName": "Kuchiki"
  },
  {
    "userId": "u003",
    "userName": "Ozaki"
  },
  {
    "userId": "u004",
    "userName": "Saito"
  },
  {
    "userId": "u005",
    "userName": "Iwata"
  },
  {
    "userId": "u006",
    "userName": "Abe"
  },
  {
    "userId": "u007",
    "userName": "Minami"
  }
]
http://localhost:3000/users/u001
{
  "userId": "u001",
  "userName": "Takahashi"
}


message post example

header
Content-Type: application/json
Accept: application/json

body
{"type" : "test","messageDetail" : "first posted","userId" : "u001","groupId" : "g001"}