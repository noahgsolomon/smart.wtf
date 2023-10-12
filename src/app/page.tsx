import { Button } from "@/components/ui/button";
import ThemeButton from "@/components/ui/theme";
import Link from "next/link";

export default function Home() {
  

  return (
    <div className="gap-2 first-letter:h-screen w-screen flex justify-center items-center">
        <ThemeButton />
        <Link href={'signup'}><Button>Sign up</Button></Link>
      </div>
  )
}
