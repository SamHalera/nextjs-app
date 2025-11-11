export interface Lesson {
    title: string,
    description: string,
    lessonId: string
}
export interface Video {
    id: string,
    title: string,
    lessons: Lesson[]
}
export const Videos: Video[] = [
    {
        id: "video-1",
        title: "Fondamentals",
        lessons: [
            {
                lessonId: "lesson-1",
                title: "Introduction to Next.js",
                description:
                    "Understand the core concepts of Next.js and how the App Router works.",
            },
            {
                lessonId: "lesson-2",
                title: "Project Setup",
                description:
                    "Learn how to initialize a new Next.js project and configure TypeScript.",
            },
        ],
    },
    {
        id: "video-2",
        title: "Server Components Prisma",
        lessons: [
            {
                lessonId: "lesson-1",
                title: "Setting up Prisma",
                description:
                    "Install and configure Prisma with a PostgreSQL database in Next.js.",
            },
            {
                lessonId: "lesson-2",
                title: "Fetching Data with Server Components",
                description:
                    "Use Prisma Client within Next.js Server Components for efficient data fetching.",
            },
        ],
    },
    {
        id: "video-3",
        title: "Server Function + Mutation",
        lessons: [
            {
                lessonId: "lesson-1",
                title: "Creating Server Actions",
                description:
                    "Learn how to build server functions to handle form submissions securely.",
            },
            {
                lessonId: "lesson-2",
                title: "Mutating Data with Prisma",
                description:
                    "Implement mutations using Prisma Client in server-side functions.",
            },
        ],
    },
]

