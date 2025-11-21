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
import { useRouter } from "next/navigation"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const FormSchema = z.object({
    review: z.string().min(10).max(500),
    name: z.string().min(2).max(50),
})

export const ReviewForm = () => {

    const { execute, hasErrored, result, hasSucceeded } = useAction(addReviewSafeAction)
    const router = useRouter()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            review: "",
            name: ""
        }
    })

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)

        execute(values)
        router.refresh()
        form.reset()
    }

    const updateReview = async (obj: { name: string, review: string }) => {
        const result = await fetch('/api/review', {
            method: "POST",
            body: JSON.stringify(obj)
        })

        const data = await result.json()
        console.log("data==>", data)
        if (data.status === "success") {
            router.refresh()
        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="review"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Review</FormLabel>
                            <FormControl>
                                <Input placeholder="Your course is awesome!" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )


}

const SubmitButton = (props: ComponentProps<typeof Button>) => {
    const { pending } = useFormStatus()
    return (<Button {...props} disabled={props.disabled || pending} />)
}