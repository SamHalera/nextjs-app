"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

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