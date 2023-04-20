/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Logindata, loginUser } from '@service';
import { StoreContext, USER_LOG_IN } from '@store';
import { useContext, useState } from 'react';
interface IResults {
	message?: string;
	token?: string;
	role?: string;
}
export const useLogin = () => {
	const { dispatch } = useContext(StoreContext);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<any>();
	const handle = async (data: Logindata) => {
		let res: IResults;
		try {
			setLoading(true);
			res = (await loginUser(data)).data;
			console.log(res.message);

			if (res.message) {
				setError(res.message);
				return;
			}
			if (res.role && res.token) dispatch({ type: USER_LOG_IN, payload: { role: res.role, token: res.token } });
			// else throw new Error('Error');
		} catch (error) {
			console.log(error);
			setError(error);
		} finally {
			setLoading(false);
		}
		// };
		// return results;
	};
	return { loading, error, execute: handle };
};
