import { Resolver, Query, Mutation, Arg } from "type-graphql";

@Resolver()
export class HelloWorldResolver {
    private message: string = "Hello, World!";

    @Query(() => String)
    async helloWorld() {
        return this.message;
    }

    @Mutation(() => String)
    async setHelloWorld(@Arg("message") message: string): Promise<string> {
        this.message = message;
        return this.message;
    }
}
