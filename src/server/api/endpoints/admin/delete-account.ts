import { Users } from '../../../../models';
import $ from 'cafy';
import define from '../../define';
import { doPostSuspend } from '../../../../services/suspend-user';
import { publishUserEvent } from '../../../../services/stream';
import { createDeleteAccountJob } from '../../../../queue';
import { ID } from '../../../../misc/cafy-id';

export const meta = {
	tags: ['admin'],

  requireCredential: true as const,
	requireModerator: true,

  params: {
		userId: {
			validator: $.type(ID),
			desc: {
				'ja-JP': '対象のユーザーID',
				'en-US': 'The user ID which you want to delete'
			}
		},
	}
};

export default define(meta, async (ps) => {
	const user = await Users.findOne(ps.userId as string);
	if (user.isDeleted) {
		return;
	}

  // 物理削除する前にDelete activityを送信する
  await doPostSuspend(user).catch(e => {});

  createDeleteAccountJob(user);

  await Users.update(user.id, {
    isDeleted: true,
  });

  // Terminate streaming
	publishUserEvent(user.id, 'terminate', {});
});
