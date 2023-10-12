import { Button } from "@/components/ui/button";
import ThemeButton from "@/components/ui/theme";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const {userId} = auth();

  console.log(userId);

  if (userId) {
    redirect('/dashboard');
  }

  return (
    <div>
      <header className='p-5'>
                <div className="gap-4 flex justify-end items-center">
                    <ThemeButton />
                    <Link href={'signup'}><Button>Sign up</Button></Link>
                    <Link href={'login'}><Button>Log in</Button></Link>
                </div>
      </header>
      <main className="flex justify-center items-center mt-20">
          <div>Sup, stranger</div>
      </main>
    </div>
  )
}
