import Link from "next/link"
import { PropsWithChildren } from "react"

export default async function Layout(props: PropsWithChildren<{ params: Promise<{ videoId: string }> }>) {
    const { videoId } = await props.params


    return <div className="p-4  m-4">
        <header className="border-b -mx-4 pb-2">
            <Link href={`/formations/${videoId}`} className="font-bold">/formations/{videoId}</Link>
        </header>
        {props.children}
    </div>

}