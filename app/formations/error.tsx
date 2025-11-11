'use client'
import { Alert, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

export default function error() {
    return (
        <Alert>
            <TriangleAlert size={16} />
            <AlertTitle>Unexpected error occured in our beautiful application</AlertTitle>
        </Alert>
    )
}