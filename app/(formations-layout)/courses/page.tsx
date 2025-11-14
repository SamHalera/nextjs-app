import { Card, CardHeader, CardTitle } from "@/components/ui/card";


export default function Page() {
    return <div className="flex flex-col p-4 gap-4 max-w-md mx-auto min-h-full border-x">

        <Card>
            <CardHeader>
                <CardTitle>Tous nos Cours</CardTitle>
            </CardHeader>

        </Card>
    </div>
}