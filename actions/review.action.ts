"use server"

import { prisma } from "@/lib/prisma"
import { actionClient, SafeError } from "@/lib/safe-action-client"
import { revalidatePath } from "next/cache"
import { z } from "zod"


const reviewSchema = z.object({
    name: z.string(),
    review: z.string()
})

export const addReviewAction = async (formData: FormData) => {

    const name = formData.get('name') as string
    const review = formData.get('review') as string


    await new Promise((r) => setTimeout(r, 1000))

    await prisma.review.create({
        data: {
            review,
            name,
            star: 5
        }
    })
    revalidatePath('/')
}

export const addReviewSafeAction = actionClient.inputSchema(reviewSchema).action(async ({ parsedInput: input }) => {

    await new Promise((r) => setTimeout(r, 1000))

    if (input.name === "Test") {
        throw new SafeError('Invalid name!')
    }
    const newReview = await prisma.review.create({
        data: {
            review: input.review,
            name: input.name,
            star: 5
        }
    })
    revalidatePath('/')

    return newReview
})