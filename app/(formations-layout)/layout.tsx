import Link from "next/link"
import { PropsWithChildren } from "react"

export default function Layout(props: PropsWithChildren) {

    return <div className="p-4  m-4">
        <header className="border-b -mx-4 pb-2">
            <Link href="/formations" className="font-bold">/Formations</Link>
        </header>
        {props.children}
    </div>

}