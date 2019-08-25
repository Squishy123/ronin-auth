const fetch = require("node-fetch");
//${process.env.SERVER_URL}:${process.env.SERVER_PORT}
async function loginUser(username, email, password) {
    return await fetch(`http://localhost:3000/user/login`, {
        method: "POST",
        body: JSON.stringify({
            username,
            email,
            password
        }),
        headers: { "Content-Type": "application/json" }
    }).then(res => res.json());
}

test(`all null values`, () => {
    return loginUser(null, null, null).then(data => {
        expect(data).toMatchObject({
            message: "Error: Missing required parameter username/email and password"
        });
    });
});

test(`user null`, () => {
    return loginUser("tester", null, null).then(data => {
        expect(data).toMatchObject({
            message: "Error: Missing required parameter password"
        });
    });
});

test(`pass null`, () => {
    return loginUser(null, null, "t12211221T!").then(data => {
        expect(data).toMatchObject({
            message: "Error: Missing required parameter username or email"
        });
    });
});

test(`user password`, () => {
    return loginUser("tester", null, "t12211221T!").then(
        data => {
            expect(data).toHaveProperty(
                "message", "Success: Successfully Logged in User"
            );
            expect(data.payload).toHaveProperty("accessToken");
            expect(data.payload).toHaveProperty("idToken");
        }
    );
});
