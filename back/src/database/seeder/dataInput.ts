import FakeDataUrls from "./urls.json";

export const urlsData = FakeDataUrls;

export const historiesData = [
    {
        status_code: 200,
        response: "Youtube response",
        content_type: "text/html",
    },
    {
        status_code: 500,
        response: "Facebook response",
        content_type: "text/html",
    },
];

export const userData = {
    id: "e5fb990e-f9d9-4858-82d1-1fd1755485a5",
    username: "test",
    email: "test@test.fr",
    hashedPassword: "hashedPasswordTest",
};
