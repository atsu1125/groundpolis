import define from '../../../define';
import { listRelay } from '../../../../../services/relay';

export const meta = {
	desc: {
		'ja-JP': 'List relay'
	},

	tags: ['admin'],

	requireCredential: false as const,
	requireModerator: false as const,

	params: {
	},
};

export default define(meta, async (ps, user) => {
	return await listRelay();
});
