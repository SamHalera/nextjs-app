import Link from "next/link"
import { PropsWithChildren } from "react"
import { Videos } from "../../data"

export default async function Layout(props: PropsWithChildren<{ params: Promise<{ videoId: string }> }>) {
    const { videoId } = await props.params

    const video = Videos.find(videoItem => videoItem.id === videoId)


    return <div className="p-4  m-4">
        <header className="border-b -mx-4 pb-2 flex items-cen ter gap-2">
            <Link href={`/formations/videos/${videoId}`} className="font-bold">/formations/videos/{videoId}</Link>
            {video?.lessons.map((lesson) => {
                return <Link href={`/formations/videos/${videoId}/lessons/${lesson.lessonId}`} key={lesson.lessonId} className="text-xs">{lesson.title}</Link>
            })}
        </header>
        {props.children}
    </div>

}