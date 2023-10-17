import { FunctionComponent } from 'react';
import ThemeButton from './ui/theme';
import { buttonVariants } from './ui/button';
import { UserButton, auth } from '@clerk/nextjs';
import Link from 'next/link';
import { Cloud } from 'lucide-react';

interface NavBarProps {}

const NavBar: FunctionComponent<NavBarProps> = () => {
	const { userId } = auth();

	return (
		<header className="p-5">
			<div className="flex justify-between">
				<div>
					<Link className={buttonVariants({ variant: 'ghost' })} href={'/'}>
						<Cloud className="h-5 w-5 transition-all hover:opacity-80" />
					</Link>
				</div>
				<div className="gap-4 flex justify-end items-center">
					<ThemeButton />
					{userId ? (
						<UserButton
							afterSignOutUrl="/"
							appearance={{
								elements: {
									rootBox: 'w-10 h-10 flex items-center',
									userButtonPopoverCard:
										'rounded-lg border border-border bg-card',
									userPreviewMainIdentifier: 'text-primary',
									userPreviewSecondaryIdentifier: 'text-primary opacity-60',
									userButtonPopoverFooter: 'opacity-0 hidden',
									userButtonPopoverActionButton: 'hover:bg-primary-foreground',
									userButtonPopoverActionButtonText: 'text-primary',
									userButtonPopoverActionButtonIcon: 'text-primary',
								},
							}}
						/>
					) : (
						<>
							<Link
								href={'signup'}
								className={buttonVariants({ variant: 'outline' })}
							>
								Sign up
							</Link>
							<Link
								className={buttonVariants({ variant: 'outline' })}
								href={'login'}
							>
								Log in
							</Link>
						</>
					)}
				</div>
			</div>
		</header>
	);
};

export default NavBar;
