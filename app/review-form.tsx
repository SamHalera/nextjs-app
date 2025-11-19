"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { addReviewAction } from "../actions/review.action"
import { useFormStatus } from "react-dom"
import { ComponentProps } from "react"

export const ReviewForm = () => {


    return (<form action={addReviewAction} className="flex flex-col gap-4">
        <div className="space-y-2">
            <Label htmlFor="name">Review Name</Label>
            <Input id="name" type="name" name="name" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="review">Review</Label>
            <Textarea id="review" name="review" />
        </div>
        <SubmitButton type="submit">Submit</SubmitButton>
    </form>)
}

const SubmitButton = (props: ComponentProps<typeof Button>) => {
    const { pending } = useFormStatus()
    return (<Button {...props} disabled={props.disabled || pending} />)
}