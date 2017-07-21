// 実行方法
// jasmine-node .

var frisby = require("frisby");

frisby.create("messages get each  TEST").get(
	// リクエストするAPIパス
	"http://localhost:3000/messages/1"
).expectJSON(
	// 期待するレスポンスボディ
	{
		"messageId": 1,
		"type": "text",
		"messageDetail": "Hello",
		"fromUserId": "u001",
		"groupId": "g001",
		"postDate": "2017-07-15T00:26:46.622Z"
	}
	).toss();

// frisby.create("messages get each  TEST").get(
// 	// リクエストするAPIパス
// 	"http://localhost:3000/messages"
// ).expectJSON(
// 	// 期待するレスポンスボディ
// 	{
// 		"messageId": 10,
// 		"type": "test",
// 		"messageDetail": "first posted",
// 		"fromUserId": "u001",
// 		"groupId": "g001",
// 		"postDate": "2017-07-15T01:16:37.779Z"
// 	},
// 	{
// 		"messageId": 9,
// 		"type": "test",
// 		"messageDetail": "first posted",
// 		"fromUserId": "u001",
// 		"groupId": "g001",
// 		"postDate": "2017-07-15T01:16:06.699Z"
// 	},
// 	{
// 		"messageId": 8,
// 		"type": "test",
// 		"messageDetail": "first posted",
// 		"fromUserId": "u001",
// 		"groupId": "g001",
// 		"postDate": "2017-07-15T01:06:59.165Z"
// 	},
// 	{
// 		"messageId": 7,
// 		"type": "test",
// 		"messageDetail": "first posted",
// 		"fromUserId": "u001",
// 		"groupId": "g001",
// 		"postDate": "2017-07-15T01:06:21.107Z"
// 	},
// 	{
// 		"messageId": 6,
// 		"type": "test",
// 		"messageDetail": "first posted",
// 		"fromUserId": "u001",
// 		"groupId": "g001",
// 		"postDate": "2017-07-15T01:04:42.942Z"
// 	},
// 	{
// 		"messageId": 5,
// 		"type": "text",
// 		"messageDetail": "mongo sample",
// 		"fromUserId": "u001",
// 		"groupId": "g001",
// 		"postDate": "2017-07-15T01:02:09.766Z"
// 	},
// 	{
// 		"messageId": 2,
// 		"type": "text",
// 		"messageDetail": "Hello again!",
// 		"fromUserId": "u002",
// 		"groupId": "g001",
// 		"postDate": "2017-07-15T00:26:46.782Z"
// 	},
// 	{
// 		"messageId": 1,
// 		"type": "text",
// 		"messageDetail": "Hello",
// 		"fromUserId": "u001",
// 		"groupId": "g001",
// 		"postDate": "2017-07-15T00:26:46.622Z"
// 	}


// 	).toss();