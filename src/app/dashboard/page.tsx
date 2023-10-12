import ThemeButton from "@/components/ui/theme";
import { UserButton, UserProfile } from "@clerk/nextjs";

const Dashboard = () => {

    return (
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
    );
}

export default Dashboard;