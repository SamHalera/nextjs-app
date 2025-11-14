
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { userAgent } from "next/server";
import Counter from "./counter";
import { headers } from "next/headers";
import ServerComponent from "@/components/serverrComponent";
import { use } from "react";

type UserProps = {
    name: string
}

export default async function Page() {
    const userAgentQ = userAgent({
        headers: await headers()
    });

    const users = await fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())



    return <div className="flex flex-col p-4 gap-4 max-w-md mx-auto min-h-full border-x">

        <Card>
            <CardHeader>
                <CardTitle>Tous nos Cours</CardTitle>
                <CardDescription>{userAgentQ.browser.name}</CardDescription>
                <Counter>

                    <ServerComponent />
                </Counter>
                <ul className="list-disc list-inside">
                    {users.map((user: UserProps) => <li key={user.name}>{user.name}</li>)}
                </ul>
            </CardHeader>

        </Card>
    </div>
}

