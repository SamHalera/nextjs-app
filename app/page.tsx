import { ModeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center font-sans dark:bg-black">
      <ModeToggle />
      <h1>Learn Next-Js</h1>
      <Link href="/formations" className="text-indigo-500 underline">Plan des Formations</Link>
    </div>
  );
}
