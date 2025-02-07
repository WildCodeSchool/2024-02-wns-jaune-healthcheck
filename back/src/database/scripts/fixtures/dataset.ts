import { UrlInput } from "@/resolvers/UrlResolver";
import Urls from "./urls.json";

export const urlsDataset: UrlInput[] = Urls;

export const testHistories = [
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

export const testUser = {
    id: "e5fb990e-f9d9-4858-82d1-1fd1755485a5",
    username: "Pierre",
    email: "pierre@health-checker.fr",
    hashedPassword: "hashedPasswordTest",
};

export const testUrls = urlsDataset.slice(0, 2);
