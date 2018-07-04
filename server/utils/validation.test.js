const expect = require("expect");

const {isRealString} = require("./validation");

describe("isRealString", () => {
    it("should reject non-string values", () => {
        let string = 98;
        let res = isRealString(string);
        expect(res).toBeFalsy();
    });

    it("should reject string with only spaces", () => {
        let string = "    ";
        let res = isRealString(string);
        expect(res).toBeFalsy();
    });

    it("should allow string with non-space characters", () => {
        let string = "test string";
        let res = isRealString(string);
        expect(res).toBeTruthy();
    });
});