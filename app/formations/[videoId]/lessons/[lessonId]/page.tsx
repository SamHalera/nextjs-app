import { Videos } from "@/app/formations/data"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default async function Page(props: { params: Promise<{ videoId: string, lessonId: string }> }) {

    const { videoId, lessonId } = await props.params

    const video = Videos.find(elt => elt.id === videoId)
    const lesson = video?.lessons.find(lesson => lesson.lessonId === lessonId)

    if (!video || !lesson) {
        throw new Error('Invalid Lesson')
        return <p>Invalid {!video ? "video" : "lesson"}</p>
    }
    return <div className="flex flex-col p-4 gap-4 max-w-md mx-auto min-h-full border-x">

        <Card>
            <CardHeader>
                <CardTitle>{lesson?.title}</CardTitle>
                <CardDescription className="flex flex-col gap-4">
                    {lesson?.description}
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Link href={`/formations/${video.id}`}>Back</Link>
            </CardFooter>
        </Card>
    </div>
}