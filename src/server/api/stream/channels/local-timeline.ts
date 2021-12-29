import autobind from 'autobind-decorator';
<<<<<<< HEAD
import { isMutedUserRelated } from '../../../../misc/is-muted-user-related';
=======
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
import Channel from '../channel';
import { PackedNote } from '../../../../models/repositories/note';
<<<<<<< HEAD
import { PackedUser } from '../../../../models/repositories/user';
import { checkWordMute } from '../../../../misc/check-word-mute';
=======
import { Notes } from '../../../../models';
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109

export default class extends Channel {
	public readonly chName = 'localTimeline';
	public static shouldShare = true;
	public static requireCredential = false;

	@autobind
	public async init(params: any) {
<<<<<<< HEAD
		const meta = await fetchMeta();
		if (meta.disableLocalTimeline) {
			if (!this.user || (!this.user.isAdmin && !this.user.isModerator)) return;
		}

=======
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
		// Subscribe events
		this.subscriber.on('notesStream', this.onNote);
	}

	@autobind
	private async onNote(note: PackedNote) {
<<<<<<< HEAD
		if ((note.user as PackedUser).host !== null) return;
		if (note.visibility !== 'public') return;
		if (note.channelId != null && !this.followingChannels.has(note.channelId)) return;

		// リプライなら再pack
		if (note.replyId != null) {
			note.reply = await Notes.pack(note.replyId, this.user, {
				detail: true
			});
		}
		// Renoteなら再pack
		if (note.renoteId != null) {
			note.renote = await Notes.pack(note.renoteId, this.user, {
				detail: true
			});
		}

		// 関係ない返信は除外
		if (note.reply) {
			// 「チャンネル接続主への返信」でもなければ、「チャンネル接続主が行った返信」でもなければ、「投稿者の投稿者自身への返信」でもない場合
			if (note.reply.userId !== this.user!.id && note.userId !== this.user!.id && note.reply.userId !== note.userId) return;
		}

		// 流れてきたNoteがミュートしているユーザーが関わるものだったら無視する
		if (isMutedUserRelated(note, this.muting, false)) return;
		if (isMutedUserRelated(note, this.renoteMuting, true)) return;

		// 流れてきたNoteがミュートすべきNoteだったら無視する
		// TODO: 将来的には、単にMutedNoteテーブルにレコードがあるかどうかで判定したい(以下の理由により難しそうではある)
		// 現状では、ワードミュートにおけるMutedNoteレコードの追加処理はストリーミングに流す処理と並列で行われるため、
		// レコードが追加されるNoteでも追加されるより先にここのストリーミングの処理に到達することが起こる。
		// そのためレコードが存在するかのチェックでは不十分なので、改めてcheckWordMuteを呼んでいる
		if (this.userProfile && await checkWordMute(note, this.user, this.userProfile.mutedWords)) return;
=======
		// 流れるノートは投稿主に向けてpackしたものなので、packし直す
		const repacked = await Notes.pack(note.id, this.user!);

		// パブリックでなければ送らない
		if (repacked.visibility !== 'public') return;
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109

		this.send('note', repacked);
	}

	@autobind
	public dispose() {
		// Unsubscribe events
		this.subscriber.off('notesStream', this.onNote);
	}
}
