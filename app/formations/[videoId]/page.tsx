import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Videos } from "../data";



export default async function Page(props: { params: Promise<{ videoId: string }> }) {

    const params = await props.params
    const video = Videos.find(elt => elt.id === params.videoId)
    if (!video) {
        return <p>Invalid video</p>
    }
    return <div className="flex flex-col p-4 gap-4 max-w-md mx-auto min-h-full border-x">

        <Card>
            <CardHeader>
                <CardTitle>{video?.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <ul className="list-disc list-inside">
                    {video?.lessons.map((lesson) => {
                        return <li key={lesson.title} className="">
                            <Link href={`/formations/${video.id}/lessons/${lesson.lessonId}`} className="text-indigo-500 underline">{lesson.title}</Link>
                        </li>
                    })}
                </ul>
            </CardContent>
            <CardFooter>
                <Link href="/formations">Back</Link>
            </CardFooter>
        </Card>
    </div>
}