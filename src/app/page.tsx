import { buttonVariants } from '@/components/ui/button';
import { currentUser, useUser } from '@clerk/nextjs';
import Link from 'next/link';

const Home = async () => {
	const user = await currentUser();

	return (
		<div>
			<main className="flex gap-4 flex-col justify-center items-center mt-20">
				{user ? (
					<>
						<div>Sup, {user.firstName}</div>
						<Link
							href="/dashboard"
							className={buttonVariants({ variant: 'outline' })}
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
};

export default Home;
