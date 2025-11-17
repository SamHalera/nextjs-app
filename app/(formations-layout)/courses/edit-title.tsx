"use client"

import { cn } from "@/lib/utils"
import { Check, Edit } from "lucide-react"
import { useOptimistic, useRef, useState, useTransition } from "react"

export const UpdateTitleForm = (props: { children: string, setReviewName: (newName: string) => void, className: string }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const ref = useRef<HTMLInputElement>(null)

    const [title, setTitle] = useOptimistic(
        props.children,
        (_, newTitle: string) => newTitle
    )

    const [isPending, startTransition] = useTransition()
    if (isEditing)
        return (
            <div className="group flex items-center gap-2 p-1">
                <input ref={ref} className={cn(`${props.className} outline p-1`)} defaultValue={props.children} style={{
                    //@ts-expect-error - new field api
                    fieldSizing: "content"
                }} />

                <button onClick={() => {
                    setIsEditing(false)
                    const newName = ref.current?.value ?? ""
                    props.setReviewName(newName)
                    startTransition(() => {
                        setTitle(newName)
                    })

                }} className="group-hover:opacity-100 opacity-0 p-1 bg-accent"><Check size={16} /></button>
            </div>
        );
    return (
        <div className="group flex items-center gap-2 p-1">
            <p className={cn(props.className, {
                "animate-pulse": isPending
            })}>{props.children}</p>
            <button onClick={() => {
                setIsEditing(true)
                setTimeout(() => {
                    ref.current?.focus()
                }, 100)
            }} className="group-hover:opacity-100 opacity-0 p-3"><Edit size={16} /></button>
        </div>
    )
}