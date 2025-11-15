
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { userAgent } from "next/server";
import Counter from "./counter";
import { headers } from "next/headers";
import ServerComponent from "@/components/serverrComponent";
import { use } from "react";
import { prisma } from "@/lib/prisma";
import { Star } from "lucide-react";
import { SelectStar } from "@/components/select-star";
import { revalidatePath } from "next/cache";

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

    const reviews = await prisma.review.findMany();

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
                                    <CardTitle>{review.name}</CardTitle>
                                    <div className="flex gap-2 items-center">
                                        <SelectStar setNewStar={setNewStar.bind(null, review.id)} star={review.star} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p>{review.review}</p>
                                </CardContent>

                            </Card>
                        )
                    })}
                </ul>
            </CardHeader>

        </Card>
    </div>
}


const starsReview = (starNb: number) => {

    let counter = 0;
    let starsHTML = ""
    while (counter < starNb) {
        starsHTML += <Star className="h-4 w-4 text-yellow-500" />
        counter++
    }
    return starsHTML
}