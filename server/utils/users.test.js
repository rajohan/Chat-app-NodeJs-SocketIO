const expect = require("expect");

const {Users} = require("./users");

describe("Users", () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: "1",
            name: "Rajohan",
            room: "Test"
        }, {
            id: "2",
            name: "Rajohan2",
            room: "Test2"
        }, {
            id: "3",
            name: "Rajohan3",
            room: "Test"
        }];
    });

    it("should add new user", () => {
        let users = new Users();
        let user = {
            id: "123",
            name: "Rajohan",
            room: "Test"
        };

        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it("should remove a user", () => {
        let userId = "1";
        let user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it("should not remove user", () => {
        let userId = "99";
        let user = users.removeUser(userId);
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it("should find user", () => {
        let userId = "2";
        let user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it("should not find user", () => {
        let userId = "99";
        let user = users.getUser(userId);
        expect(user).toBeFalsy();
    });

    it("should return names for Test room", () => {
       let userList = users.getUserList("Test");
       expect(userList).toEqual(["Rajohan", "Rajohan3"]);
    });

    it("should return names for Test2 room", () => {
        let userList = users.getUserList("Test2");
        expect(userList).toEqual(["Rajohan2"]);
    });
});