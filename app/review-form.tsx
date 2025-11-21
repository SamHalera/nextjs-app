"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { addReviewSafeAction } from "../actions/review.action"
import { useFormStatus } from "react-dom"
import { ComponentProps } from "react"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"

export const ReviewForm = () => {


    const { execute, hasErrored, result, hasSucceeded } = useAction(addReviewSafeAction)
    return (<form action={async (formData) => {
        const name = formData.get('name') as string
        const review = formData.get('review') as string
        execute({ name, review })
        toast.success('Review created!')
    }} className="flex flex-col gap-4">
        <div className="space-y-2">
            <Label htmlFor="name">Review Name</Label>
            <Input id="name" type="name" name="name" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="review">Review</Label>
            <Textarea id="review" name="review" />
        </div>
        <SubmitButton type="submit">Submit</SubmitButton>
        {hasErrored ? <p className="text-red-500">{result.serverError}</p> : null}
        {hasSucceeded ? <p className="text-green-500">Review created with id : ${result.data?.id}</p> : null}
    </form>)
}

const SubmitButton = (props: ComponentProps<typeof Button>) => {
    const { pending } = useFormStatus()
    return (<Button {...props} disabled={props.disabled || pending} />)
}