import { prisma } from "@/lib/prisma";
import { SafeError } from "@/lib/safe-action-client";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";


const reviewSchema = z.object({
    review: z.string().min(10).max(500),
    name: z.string().min(2).max(50),
})
export const POST = async (request: NextRequest) => {

    const { name, review } = await request.json()
    const input = reviewSchema.parse({
        name,
        review
    })

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
    return NextResponse.json({ review: newReview, status: "success" })
}