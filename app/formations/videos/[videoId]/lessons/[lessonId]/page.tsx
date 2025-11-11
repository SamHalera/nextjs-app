import { Videos } from "@/app/formations/data"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { notFound } from "next/navigation"


export async function generateStaticParams() {
    const videos = Videos

    const result = videos.flatMap((video) => {
        const params = video.lessons.map((lesson) => ({
            videoId: video.id,
            lessonId: lesson.lessonId
        }))
        return params
    })

    console.log(result)
    return result
}


export default async function Page(props: { params: Promise<{ videoId: string, lessonId: string }> }) {

    const { videoId, lessonId } = await props.params

    const video = Videos.find(elt => elt.id === videoId)
    const lesson = video?.lessons.find(lesson => lesson.lessonId === lessonId)

    //Simulate delay of loading
    await new Promise((resolve) => setTimeout(resolve, 500))
    if (!video || !lesson) {
        notFound()
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
                <Link href={`/formations/videos/${video.id}`}>Back</Link>
            </CardFooter>
        </Card>
    </div>
}