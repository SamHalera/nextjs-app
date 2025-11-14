import { Videos } from "@/app/(formations-layout)/formations/data"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Metadata } from "next"
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

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {

    const { videoId, lessonId } = await props.params
    const video = Videos.find(elt => elt.id === videoId)
    const lesson = video?.lessons.find(lesson => lesson.lessonId === lessonId)

    return {
        title: `Lesson ${lesson?.title} from Video ${video?.title}`
    }
}
type PageProps = {
    params: Promise<{ videoId: string, lessonId: string }>
}
export default async function Page(props: PageProps) {

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