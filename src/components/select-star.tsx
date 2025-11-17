"use client"
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useState } from "react";


export const SelectStar = (props: { star: number, setNewStar: (star: number) => void }) => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)

    return (
        <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => {
                const isFilled = i < props.star;
                const isNewFilled = hoverIndex ? i < hoverIndex : null
                return (
                    <button
                        onMouseEnter={() => {
                            setHoverIndex(i)
                        }}
                        onMouseLeave={() => {
                            setHoverIndex(null)
                        }}
                        onClick={() => {
                            props.setNewStar(i + 1)
                        }}
                        key={i}>
                        <Star
                            className={cn("text-yellow-500 transition cursor-pointer", {
                                "fill-yellow-500": isFilled,
                                "fill-yellow-600 translate-y-0.5": isNewFilled
                            })}
                            style={{
                                transitionDelay: `${i * 0.1}s`
                            }}
                        />
                    </button>
                )
            })}
        </div>
    )

}

