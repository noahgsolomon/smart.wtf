import { FunctionComponent } from "react";
import ThemeButton from "./ui/theme";
import { buttonVariants } from "./ui/button";
import { UserButton, auth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from 'next/navigation'; 

interface NavBarProps {
    
}
 
const NavBar: FunctionComponent<NavBarProps> = () => {
    
  const {userId} = auth();
    
    return (      
    <header className='p-5'>
        <div className="flex justify-between">
            <div>
                <Link href={'/'}>home</Link>
            </div>
            <div className="gap-4 flex justify-end items-center">
            <ThemeButton />
            {userId ? (
                <>
                <Link href={'/dashboard'} className={buttonVariants()}>dashboard</Link>
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
                </>
                
            ) : (
                <>
                    <Link href={'signup'} className={buttonVariants()}>Sign up</Link>
                    <Link className={buttonVariants()} href={'login'}>Log in</Link>
                </>
            )}
        </div>
        </div>
  </header>);
}
 
export default NavBar;