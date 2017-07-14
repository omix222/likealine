var frisby = require("frisby");

frisby.create("SAMPLE TEST").get(
	// リクエストするAPIパス
	"http://localhost:3000/messages?groupId=group2"
).expectJSON(0,
	// 期待するレスポンスボディ
	{
		"messageID": "messageID:3",
		"type": "text",
		"messageDetail": "Another Group!",
		"fromUserId": "Ozaki",
		"groupId": "group2"
	}).toss();
