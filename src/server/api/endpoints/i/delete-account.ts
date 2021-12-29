import $ from 'cafy';
import * as bcrypt from 'bcryptjs';
import define from '../../define';
<<<<<<< HEAD
import { UserProfiles, Users } from '../../../../models';
import { doPostSuspend } from '../../../../services/suspend-user';
import { publishUserEvent } from '../../../../services/stream';
import { createDeleteAccountJob } from '../../../../queue';
=======
import { Users, UserProfiles } from '../../../../models';
import { ensure } from '../../../../prelude/ensure';
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109

export const meta = {
	requireCredential: true as const,

	secure: true,

	params: {
		password: {
			validator: $.str
		},
	}
};

export default define(meta, async (ps, user) => {
	const profile = await UserProfiles.findOneOrFail(user.id);
	const userDetailed = await Users.findOneOrFail(user.id);
	if (userDetailed.isDeleted) {
		return;
	}

	// Compare password
	const same = await bcrypt.compare(ps.password, profile.password!);

	if (!same) {
		throw new Error('incorrect password');
	}

<<<<<<< HEAD
	// 物理削除する前にDelete activityを送信する
	await doPostSuspend(user).catch(e => {});

	createDeleteAccountJob(user);

	await Users.update(user.id, {
		isDeleted: true,
	});

	// Terminate streaming
	publishUserEvent(user.id, 'terminate', {});
=======
	await Users.delete(user.id);
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
});
