import { SelectStar } from "@/components/select-star";
import { ModeToggle } from "@/components/theme-toggle";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { UpdateTitleForm } from "./(formations-layout)/courses/edit-title";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import { Trash, X } from "lucide-react";

export default async function Home() {

  const reviews = await prisma.review.findMany({
    orderBy: {
      "createdAt": "asc"
    }
  })
  return (
    <div className="flex flex-col items-center justify-center font-sans dark:bg-black">
      <ModeToggle />
      <h1>Learn Next-Js</h1>
      <Link href="/formations" className="text-indigo-500 underline">
        Plan des Formations
      </Link>

      <div className="flex flex-col gap-4 my-3 w-full">
        {reviews.map((review) => {
          return (
            <Card key={review.id} className="relative mx-auto">
              <div className=" absolute right-2 top-2">
                <form>
                  <Button formAction={async () => {
                    "use server"
                    await prisma.review.delete({
                      where: {
                        id: review.id
                      }
                    })
                    revalidatePath('/')
                  }} size="sm" type="submit" className="bg-red-400 hover:bg-red-500 transition-all cursor-pointer">
                    <X className="text-white " />
                  </Button>
                </form>
              </div>
              <CardHeader>
                <div className="flex gap-2 items-center">
                  <SelectStar star={review.star} />
                </div>
                <UpdateTitleForm className="txt-lg font-bold">
                  {review.name}
                </UpdateTitleForm>
              </CardHeader>
              <CardContent>
                <p>{review.review}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
      <Card className="px-4">

        <form action={async (formData) => {
          "use server"
          const name = formData.get('name') as string
          const review = formData.get('review') as string

          console.log({ name, review })
          await prisma.review.create({
            data: {
              review,
              name,
              star: 5
            }
          })
          revalidatePath('/')
        }} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Review Name</Label>
            <Input id="name" type="name" name="name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="review">Review</Label>
            <Textarea id="review" name="review" />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </div>
  );
}
