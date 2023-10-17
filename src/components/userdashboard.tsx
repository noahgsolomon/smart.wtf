import { currentUser, useUser } from '@clerk/nextjs';
import { FunctionComponent } from 'react';

const UserDashboard: FunctionComponent = async () => {
	const user = await currentUser();

	return (
		<div>
			<h1>Sup, {user?.firstName}</h1>
		</div>
	);
};

export default UserDashboard;
