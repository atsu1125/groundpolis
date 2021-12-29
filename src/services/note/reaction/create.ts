import { publishNoteStream } from '../../stream';
<<<<<<< HEAD
import { renderLike } from '../../../remote/activitypub/renderer/like';
import DeliverManager from '../../../remote/activitypub/deliver-manager';
import { renderActivity } from '../../../remote/activitypub/renderer';
import { toDbReaction, decodeReaction, getFallbackReaction } from '../../../misc/reaction-lib';
import { User, IRemoteUser } from '../../../models/entities/user';
import { Note } from '../../../models/entities/note';
import { NoteReactions, Users, NoteWatchings, Notes, Emojis } from '../../../models';
import { Not } from 'typeorm';
=======
import watch from '../watch';
import { toDbReaction } from '../../../misc/reaction-lib';
import { User } from '../../../models/entities/user';
import { Note } from '../../../models/entities/note';
import { NoteReactions, Users, Notes, UserProfiles } from '../../../models';
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
import { perUserReactionsChart } from '../../chart';
import { genId } from '../../../misc/gen-id';
import deleteReaction from './delete';

<<<<<<< HEAD
export default async (user: User, note: Note, reaction?: string, isDislike = false) => {
	const dbReaction = await toDbReaction(reaction, user.host);
	reaction = dbReaction ? dbReaction : await getFallbackReaction();
	const isFallback = !dbReaction;
=======
export default async (user: User, note: Note, reaction?: string) => {
	if (!reaction || !['👍', '❤️', '❤', '😆', '😇', '😮', '🎉', '👏', '🍣', '🍮', '🙏', '🤯', '🥴'].includes(reaction)) {
		reaction = '👍'
	}

	reaction = await toDbReaction(reaction);
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109

	const exist = await NoteReactions.findOne({
		noteId: note.id,
		userId: user.id,
	});

	if (exist) {
		if (exist.reaction !== reaction) {
			// 別のリアクションがすでにされていたら置き換える
			await deleteReaction(user, note);
		} else {
			// 同じリアクションがすでにされていたら何もしない
			return;
		}
	}

	// Create reaction
	await NoteReactions.save({
		id: genId(),
		createdAt: new Date(),
		noteId: note.id,
		userId: user.id,
		reaction, 
		dislike: isDislike,
	});

	// Increment reactions count
	const sql = `jsonb_set("reactions", '{${reaction}}', (COALESCE("reactions"->>'${reaction}', '0')::int + 1)::text::jsonb)`;
	await Notes.createQueryBuilder().update()
		.set({
			reactions: () => sql,
		})
		.where('id = :id', { id: note.id })
		.execute();

	if (!isDislike) {
		Notes.increment({ id: note.id }, 'score', 1);
	}

	perUserReactionsChart.update(user, note);

	publishNoteStream(note.id, 'reacted', {
		reaction: reaction,
		userId: user.id,
	});

<<<<<<< HEAD
	//#region 配信
	if (Users.isLocalUser(user) && !note.localOnly) {
		const content = renderActivity(await renderLike(inserted, note, isFallback));
		const dm = new DeliverManager(user, content);
		if (note.userHost !== null) {
			const reactee = await Users.findOne(note.userId);
			dm.addDirectRecipe(reactee as IRemoteUser);
		}
		dm.addFollowersRecipe();
		dm.execute();
=======
	const profile = await UserProfiles.findOne(user.id);

	// ユーザーがローカルユーザーかつ自動ウォッチ設定がオンならばこの投稿をWatchする
	if (Users.isLocalUser(user) && profile!.autoWatch) {
		watch(user.id, note);
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
	}
	//#endregion
};
