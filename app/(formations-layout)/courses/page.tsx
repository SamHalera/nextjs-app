
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { userAgent } from "next/server";
import Counter from "./counter";
import { headers } from "next/headers";
import ServerComponent from "@/components/serverrComponent";
import { Suspense, use } from "react";
import { prisma } from "@/lib/prisma";
import { Star } from "lucide-react";
import { SelectStar } from "@/components/select-star";
import { revalidatePath } from "next/cache";
import { Skeleton } from "@/components/ui/skeleton";
import { UpdateTitleForm } from "./edit-title";

type ReviewsProps = {
    id: string,
    name: string,
    review: string,
    star: number,
    createdAt: Date
    updatedAt: Date
}

export default async function Page() {
    const userAgentQ = userAgent({
        headers: await headers()
    });

    const reviews = await prisma.review.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    //function executed on server side
    const setNewStar = async (reviewsId: string, star: number) => {
        "use server"
        console.log("hey")
        await prisma.review.update({
            where: { id: reviewsId },
            data: {
                star
            }
        })
        revalidatePath('/courses')
    }
    //function executed on server side
    const setReviewName = async (reviewsId: string, name: string) => {
        "use server"
        await new Promise((r) => setTimeout(r, 1000))

        if (name === "error") {
            revalidatePath("/courses")
            return
        }
        console.log("hey")
        await prisma.review.update({
            where: { id: reviewsId },
            data: {
                name
            }
        })
        revalidatePath('/courses')
    }

    return <div className="flex flex-col p-4 gap-4 max-w-md mx-auto min-h-full border-x">

        <Card>
            <CardHeader>
                <CardTitle>Tous nos Cours</CardTitle>
                <CardDescription>{userAgentQ.browser.name}</CardDescription>


                <ul className="list-disc list-inside">
                    {reviews.map((review: ReviewsProps) => {
                        return (
                            <Card key={review.id}>
                                <CardHeader>
                                    <div className="flex gap-2 items-center">
                                        <SelectStar setNewStar={setNewStar.bind(null, review.id)} star={review.star} />
                                    </div>
                                    <UpdateTitleForm className="txt-lg font-bold" setReviewName={setReviewName.bind(null, review.id)}>
                                        {review.name}
                                    </UpdateTitleForm>
                                </CardHeader>
                                <CardContent>
                                    <p>{review.review}</p>
                                </CardContent>

                                {/* <Card>
                                    <Suspense fallback={<Skeleton className="w-full h-10" />}>
                                        <LongLoadingComponent />
                                    </Suspense>
                                </Card> */}

                            </Card>
                        )
                    })}
                </ul>
            </CardHeader>

        </Card>
    </div>
}




const LongLoadingComponent = async () => {
    const reviews = await prisma.review.count()
    await new Promise((r) => setTimeout(r, 4000))
    return <p>{reviews}</p>

}