var frisby = require("frisby");

frisby.create("SAMPLE TEST").get(
	// リクエストするAPIパス
	"http://localhost:3000/messeges?groupId=group2"
).expectJSON(0,
	// 期待するレスポンスボディ
	{
		"messageID": "messegeID:3",
		"type": "text",
		"messegeDetail": "Another Group!",
		"fromUserId": "Ozaki",
		"groupId": "group2"
	}).toss();
