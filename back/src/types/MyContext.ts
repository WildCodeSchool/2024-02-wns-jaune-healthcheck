import { BaseContext } from "@apollo/server";
import JwtPayload from "./JwtPayload";

interface MyContext extends BaseContext {
    res: {
        setHeader: (name: string, value: string) => void;
    };
    payload?: JwtPayload;
}

export default MyContext;
