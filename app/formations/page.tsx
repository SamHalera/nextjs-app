import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Videos } from "./data";
import { Divide } from "lucide-react";

export default function Page() {
    return <div className="flex flex-col p-4 gap-4 max-w-md mx-auto min-h-full border-x">

        <Card>
            <CardHeader>
                <CardTitle>Plan des formations</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {Videos.map((video) => {
                    return <Link key={video.id} href={`/formations/videos/${video.id}`} className="text-indigo-500 underline">{video.title}</Link>
                })}
            </CardContent>
        </Card>
    </div>
}