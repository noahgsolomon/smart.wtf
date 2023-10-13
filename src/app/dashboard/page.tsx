'use client'

import ThemeButton from "@/components/ui/theme";
import { UserButton } from "@clerk/nextjs";
import { trpc } from "../_trpc/client";

const Dashboard = () => {

    const userQuery = trpc.users.user.useQuery();

    if (userQuery.isLoading) {
        return <div>Loading...</div>;
    }

    if (userQuery.isError) {
        return <div>Error: {userQuery.error.message}</div>;
    }

    return (
        <>
        <header className="w-full flex flex-row gap-4 justify-end p-6">
            <ThemeButton />
            <UserButton afterSignOutUrl="/"
            appearance={{
                elements: {
                    rootBox: 'w-10 h-10',
                    userButtonPopoverCard: 'rounded-lg border border-border bg-card',
                    userPreviewMainIdentifier: 'text-primary',
                    userPreviewSecondaryIdentifier: 'text-primary opacity-60',
                    userButtonPopoverFooter: 'opacity-0 hidden',
                    userButtonPopoverActionButton: 'hover:bg-primary-foreground',
                    userButtonPopoverActionButtonText: 'text-primary',
                    userButtonPopoverActionButtonIcon: 'text-primary',
                }
            }}
            />
        </header>
        <main>
            <div>
                {userQuery.data}
                {/* {await serverClient.hey()} */}
            </div>
        </main>
        </>
        
    );
}

export default Dashboard;