import UserDashboard from '@/components/userdashboard';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

const Dashboard = () => {
	return (
		<>
			<main>
				<div className="flex justify-center mt-20">
					<Suspense fallback={<Loader2 className="w-4 h-4 animate-spin" />}>
						<UserDashboard />
					</Suspense>
				</div>
			</main>
		</>
	);
};

export default Dashboard;
