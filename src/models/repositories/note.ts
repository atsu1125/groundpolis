import { EntityRepository, Repository, In } from 'typeorm';
import * as mfm from 'mfm-js';
import { Note } from '../entities/note';
import { User } from '../entities/user';
<<<<<<< HEAD
import { Emojis, Users, PollVotes, DriveFiles, NoteReactions, Followings, Polls, Channels } from '..';
=======
import { Emojis, DriveFiles, NoteReactions, Users } from '..';
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
import { ensure } from '../../prelude/ensure';
import { SchemaType } from '../../misc/schema';
import { nyaize } from '../../misc/nyaize';
import { awaitAll } from '../../prelude/await-all';
<<<<<<< HEAD
import { convertLegacyReaction, convertLegacyReactions, decodeReaction } from '../../misc/reaction-lib';
import { Emoji } from '../entities/emoji';
import { concat } from '../../prelude/array';
import parseAcct from '../../misc/acct/parse';
import { resolveUser } from '../../remote/resolve-user';
=======
import { convertLegacyReaction, convertLegacyReactions } from '../../misc/reaction-lib';
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109

export type PackedNote = SchemaType<typeof packedNoteSchema>;

@EntityRepository(Note)
export class NoteRepository extends Repository<Note> {
	public validateCw(x: string) {
		return x.trim().length <= 100;
	}

	private async hideNote(packedNote: PackedNote, meId: User['id'] | null) {
		let hide = false;

<<<<<<< HEAD
		// visibility が specified かつ自分が指定されていなかったら非表示
		if (packedNote.visibility === 'specified') {
			if (meId == null) {
				hide = true;
			} else if (meId === packedNote.userId) {
				hide = false;
			} else {
				// 指定されているかどうか
				const specified = packedNote.visibleUserIds!.some((id: any) => meId === id);

				if (specified) {
					hide = false;
				} else {
					hide = true;
				}
			}
		}

		// visibility が followers かつ自分が投稿者のフォロワーでなかったら非表示
		if (packedNote.visibility === 'followers') {
			if (meId == null) {
				hide = true;
			} else if (meId === packedNote.userId) {
				hide = false;
			} else if (packedNote.reply && (meId === (packedNote.reply as PackedNote).userId)) {
				// 自分の投稿に対するリプライ
				hide = false;
			} else if (packedNote.mentions && packedNote.mentions.some(id => meId === id)) {
				// 自分へのメンション
				hide = false;
			} else {
				// フォロワーかどうか
				const following = await Followings.findOne({
					followeeId: packedNote.userId,
					followerId: meId
				});

				if (following == null) {
					hide = true;
				} else {
					hide = false;
				}
			}
		}

		// visibility が users かつ自分が非ログインであれば非表示
		if (packedNote.visibility == 'users' && meId == null) {
			hide = true;
		}

=======
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
		if (hide) {
			packedNote.visibleUserIds = undefined;
			packedNote.fileIds = [];
			packedNote.files = [];
			packedNote.text = null;
			packedNote.cw = null;
			packedNote.isHidden = true;
		}
	}

	public async pack(
		src: Note['id'] | Note,
		me?: User['id'] | User | null | undefined,
		options?: {
			detail?: boolean;
			skipHide?: boolean;
			showActualUser?: boolean;
		}
	): Promise<PackedNote> {
		const opts = Object.assign({
			detail: true,
			skipHide: false,
			showActualUser: false,
		}, options);

		const meId = me ? typeof me === 'string' ? me : me.id : null;
		const note = typeof src === 'object' ? src : await this.findOne(src).then(ensure);
		const host = note.userHost;

		async function populateEmojis(emojiNames: string[], noteUserHost: string | null, reactionNames: string[]) {
			const where = [] as {}[];

<<<<<<< HEAD
			const accts = emojiNames.filter(n => n.startsWith('@'));

			// カスタム絵文字
=======
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
			if (emojiNames?.length > 0) {
				where.push({
					name: In(emojiNames),
					host: noteUserHost
				});
			}

<<<<<<< HEAD
			if (accts.length > 0) { 
				const tmp = await Promise.all(
					accts
						.map(acct => ({ acct, parsed: parseAcct(acct) }))
						.map(async ({ acct, parsed }) => {
							const user = await resolveUser(parsed.username.toLowerCase(), parsed.host || note.userHost).catch(() => null);
							return ({ acct, user: user ? await Users.pack(user) : undefined })
						})
				).then(users => users.filter((u) => u.user != null).map(u => {
					const res = {
						name: u.acct,
						url: u.user?.avatarUrl || ''
					};
					return res;
				}));

				all = concat([all, tmp]);
			}

			const customReactions = reactionNames?.map(x => decodeReaction(x)).filter(x => x.name);

			if (customReactions?.length > 0) {
				const where = [] as {}[];
=======
			reactionNames = reactionNames?.filter(x => x.match(/^:[^:]+:$/)).map(x => x.replace(/:/g, ''));
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109

			if (reactionNames?.length > 0) {
				where.push({
					name: In(reactionNames),
					host: null
				});
			}

			if (where.length === 0) return [];

			return Emojis.find({
				where,
				select: ['name', 'host', 'url', 'aliases']
			});
		}

		async function populateMyReaction() {
			const reaction = await NoteReactions.findOne({
				userId: meId!,
				noteId: note.id,
			});

			if (reaction) {
				return convertLegacyReaction(reaction.reaction);
			}

			return undefined;
		}

		function populateVirtualUser() {
			return {
				id: 'VIRTUAL_ANONYMOUS_USER',
				name: null,
				username: 'anonymous',
				host: null,
				avatarUrl: null,
				avatarColor: null,
				isAdmin: false,
				isModerator: false,
				isBot: false,
				isCat: false,
				emojis: [],
				url: null,
				createdAt: '1970-01-01T00:00:00.000Z',
				updatedAt: '1970-01-01T00:00:00.000Z',
				bannerUrl: null,
				bannerColor: null,
				isLocked: false,
				isSilenced: false,
				isSuspended: false,
				description: null,
				location: null,
				birthday: null,
				fields: [],
				followersCount: 0,
				followingCount: 0,
				notesCount: 0,
				pinnedNoteIds: [],
				pinnedNotes: [],
				pinnedPageId: null,
				pinnedPage: null,
				twoFactorEnabled: false,
				usePasswordLessLogin: false,
				securityKeys: false,
				isFollowing: false,
				isFollowed: false,
				hasPendingFollowRequestFromYou: false,
				hasPendingFollowRequestToYou: false,
				isBlocking: false,
				isBlocked: false,
				isMuted: false
			};
		}

		let text = note.text;

		if (note.name && (note.url || note.uri)) {
			text = `【${note.name}】\n${(note.text || '').trim()}\n\n${note.url || note.uri}`;
		}

<<<<<<< HEAD
		const channel = note.channelId
			? note.channel
				? note.channel
				: await Channels.findOne(note.channelId)
			: null;
=======
		const user = opts.showActualUser ? await Users.pack(note.user || note.userId, meId) : populateVirtualUser();
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109

		const packed = await awaitAll({
			id: note.id,
			createdAt: note.createdAt.toISOString(),
			userId: user.id,
			user,
			text: text,
			cw: note.cw,
			visibility: note.visibility,
<<<<<<< HEAD
			localOnly: note.localOnly || undefined,
			remoteFollowersOnly: note.remoteFollowersOnly || undefined,
			visibleUserIds: note.visibility === 'specified' ? note.visibleUserIds : undefined,
=======
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
			viaMobile: note.viaMobile || undefined,
			repliesCount: note.repliesCount,
			reactions: convertLegacyReactions(note.reactions),
			tags: note.tags.length > 0 ? note.tags : undefined,
			emojis: populateEmojis(note.emojis, host, Object.keys(note.reactions)),
			fileIds: note.fileIds,
<<<<<<< HEAD
			// groundpolis.appでぬるぽをやらかしているのでとりあえずなんとかする
			files: DriveFiles.packMany(note.fileIds).catch(_ => []),
			replyId: note.replyId,
			renoteId: note.renoteId,
			channelId: note.channelId || undefined,
			channel: channel ? {
				id: channel.id,
				name: channel.name,
			} : undefined,
			mentions: note.mentions.length > 0 ? note.mentions : undefined,
=======
			files: DriveFiles.packMany(note.fileIds),
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
			uri: note.uri || undefined,
			isMyNote: meId === note.userId,
			isAnnouncement: note.isAnnouncement,

			...(opts.detail ? {
				...(meId ? {
					myReaction: populateMyReaction(),
				} : {})
			} : {})
		});

<<<<<<< HEAD
		if (packed.user.isCat && packed.text) {
			const tokens = packed.text ? mfm.parse(packed.text) : [];
			mfm.inspect(tokens, node => {
				if (node.type === 'text') {
					node.props.text = nyaize(node.props.text);
				}
			});
			packed.text = mfm.toString(tokens);
		}

=======
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
		if (!opts.skipHide) {
			await this.hideNote(packed, meId);
		}

		return packed;
	}

	public packMany(
		notes: (Note['id'] | Note)[],
		me?: User['id'] | User | null | undefined,
		options?: {
			detail?: boolean;
			skipHide?: boolean;
			showActualuser?: boolean;
		}
	) {
		return Promise.all(notes.map(n => this.pack(n, me, options)));
	}
}

export const packedNoteSchema = {
	type: 'object' as const,
	optional: false as const, nullable: false as const,
	properties: {
		id: {
			type: 'string' as const,
			optional: false as const, nullable: false as const,
			format: 'id',
			description: 'The unique identifier for this Note.',
			example: 'xxxxxxxxxx',
		},
		createdAt: {
			type: 'string' as const,
			optional: false as const, nullable: false as const,
			format: 'date-time',
			description: 'The date that the Note was created on Groundpolis.'
		},
		text: {
			type: 'string' as const,
			optional: false as const, nullable: true as const,
		},
		cw: {
			type: 'string' as const,
			optional: true as const, nullable: true as const,
		},
		userId: {
			type: 'string' as const,
			optional: false as const, nullable: false as const,
			format: 'id',
		},
		user: {
			type: 'object' as const,
			ref: 'User',
			optional: false as const, nullable: false as const,
		},
		viaMobile: {
			type: 'boolean' as const,
			optional: true as const, nullable: false as const,
		},
		isHidden: {
			type: 'boolean' as const,
			optional: true as const, nullable: false as const,
		},
		isMyNote: {
			type: 'boolean' as const,
			optional: false as const, nullable: false as const,
		},
		isAnnouncement: {
			type: 'boolean' as const,
			optional: false as const, nullable: false as const,
		},
		visibility: {
			type: 'string' as const,
			optional: false as const, nullable: false as const,
		},
		visibleUserIds: {
			type: 'array' as const,
			optional: true as const, nullable: false as const,
			items: {
				type: 'string' as const,
				optional: false as const, nullable: false as const,
				format: 'id'
			}
		},
		fileIds: {
			type: 'array' as const,
			optional: true as const, nullable: false as const,
			items: {
				type: 'string' as const,
				optional: false as const, nullable: false as const,
				format: 'id'
			}
		},
		files: {
			type: 'array' as const,
			optional: true as const, nullable: false as const,
			items: {
				type: 'object' as const,
				optional: false as const, nullable: false as const,
				ref: 'DriveFile'
			}
		},
		tags: {
			type: 'array' as const,
			optional: true as const, nullable: false as const,
			items: {
				type: 'string' as const,
				optional: false as const, nullable: false as const,
			}
		},
<<<<<<< HEAD
		reactions: {
			type: 'object' as const,
			optional: false as const, nullable: false as const,
		},
		myReaction: {
			type: 'string' as const,
			optional: true as const, nullable: true as const,
		},
		poll: {
			type: 'object' as const,
			optional: true as const, nullable: true as const,
		},
		channelId: {
			type: 'string' as const,
			optional: true as const, nullable: true as const,
			format: 'id',
			example: 'xxxxxxxxxx',
		},
		channel: {
			type: 'object' as const,
			optional: true as const, nullable: true as const,
			ref: 'Channel'
		},
=======

>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
	},
};
