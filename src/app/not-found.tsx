'use client';

import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

const Error = () => {
	return (
		<div className="h-[calc(100vh-20rem)] flex justify-center flex-col items-center gap-8">
			404 Not Found Error
			<Link className={buttonVariants({ variant: 'outline' })} href="/">
				Home
			</Link>
		</div>
	);
};

export default Error;
