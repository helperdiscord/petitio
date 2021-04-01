
import fetch from "../src";

describe("check korean", () => {
	test("SHOULD not crash while parsing korean", async () => {
		const URL = "https://ludy.game.onstove.com:44333/web/ItemDictionary/Select/212300022?_=1617310085179";

		const res = await fetch(URL).json();

		expect(res.ItemInfo.BasicInfo.itemName).toBe("타락한 그림자의 반지");
	});
});
