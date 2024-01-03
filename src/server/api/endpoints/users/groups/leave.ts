import $ from 'cafy';
import { ID } from '../../../../../misc/cafy-id';
import define from '../../../define';
import { ApiError } from '../../../error';
import { getUser } from '../../../common/getters';
import { UserGroups, UserGroupJoinings } from '../../../../../models';

export const meta = {
	desc: {
		'ja-JP': '指定したユーザーグループから抜けます。',
		'en-US': 'Leave a user group.'
	},

	tags: ['groups', 'users'],

	requireCredential: true as const,

	kind: 'write:user-groups',

	params: {
		groupId: {
			validator: $.type(ID),
		},
	},

	errors: {
		noSuchGroup: {
			message: 'No such group.',
			code: 'NO_SUCH_GROUP',
			id: '4662487c-05b1-4b78-86e5-fd46998aba74'
		},

		youAreOwner: {
			message: 'Your are the owner.',
			code: 'YOU_ARE_OWNER',
			id: 'b6d6e0c2-ef8a-9bb8-653d-79f4a3107c69'
		},
	}
};

export default define(meta, async (ps, me) => {
	// Fetch the group
	const userGroup = await UserGroups.findOne({
		id: ps.groupId,
	});

	if (userGroup == null) {
		throw new ApiError(meta.errors.noSuchGroup);
	}

	if (me.id === userGroup.userId) {
		throw new ApiError(meta.errors.youAreOwner);
	}

	// Pull the user
	await UserGroupJoinings.delete({ userGroupId: userGroup.id, userId: me.id });
});
