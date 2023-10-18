import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function Home() {
  const user = await currentUser();

  return (
    <div>
      <main className="mt-20 flex flex-col items-center justify-center gap-4">
        {user ? (
          <>
            <div>Sup, {user.firstName}</div>
            <Link
              href="/dashboard"
              className={buttonVariants({ variant: "outline" })}
            >
              Dashboard
            </Link>
          </>
        ) : (
          <div>Sup</div>
        )}
      </main>
    </div>
  );
}
