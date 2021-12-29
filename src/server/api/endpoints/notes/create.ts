import $ from 'cafy';
import * as ms from 'ms';
import { length } from 'stringz';
import create from '../../../../services/note/create';
import define from '../../define';
import { fetchMeta } from '../../../../misc/fetch-meta';
import { ApiError } from '../../error';
import { ID } from '../../../../misc/cafy-id';
<<<<<<< HEAD
import { User } from '../../../../models/entities/user';
import { Users, DriveFiles, Notes, Channels } from '../../../../models';
=======
import { DriveFiles, Notes } from '../../../../models';
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
import { DriveFile } from '../../../../models/entities/drive-file';
import { DB_MAX_NOTE_TEXT_LENGTH } from '../../../../misc/hard-limits';
import { noteVisibilities } from '../../../../types';
import { Channel } from '../../../../models/entities/channel';

let maxNoteTextLength = 500;

setInterval(() => {
	fetchMeta().then(m => {
		maxNoteTextLength = m.maxNoteTextLength;
	});
}, 3000);

export const meta = {
	desc: {
		'ja-JP': '投稿します。'
	},

	tags: ['notes'],

	requireCredential: true as const,

	limit: {
		duration: ms('1hour'),
		max: 300
	},

	kind: 'write:notes',

	params: {
		visibility: {
			validator: $.optional.str.or(noteVisibilities as unknown as string[]),
			default: 'public',
			desc: {
				'ja-JP': '投稿の公開範囲'
			}
		},

		text: {
			validator: $.optional.nullable.str.pipe(text =>
				text.trim() != ''
					&& length(text.trim()) <= maxNoteTextLength
					&& Array.from(text.trim()).length <= DB_MAX_NOTE_TEXT_LENGTH	// DB limit
			),
			default: null as any,
			desc: {
				'ja-JP': '投稿内容'
			}
		},

		cw: {
			validator: $.optional.nullable.str.pipe(Notes.validateCw),
			desc: {
				'ja-JP': 'コンテンツの警告。このパラメータを指定すると設定したテキストで投稿のコンテンツを隠す事が出来ます。'
			}
		},

		announcement: {
			validator: $.optional.nullable.boolean,
		},

		viaMobile: {
			validator: $.optional.bool,
			default: false,
			desc: {
				'ja-JP': 'モバイルデバイスからの投稿か否か。'
			}
		},

		remoteFollowersOnly: {
			validator: $.optional.bool,
			default: false,
			desc: {
				'ja-JP': 'リモートに対してはフォロワー限定にするか否か。'
			}
		},

		noExtractMentions: {
			validator: $.optional.bool,
			default: false,
			desc: {
				'ja-JP': '本文からメンションを展開しないか否か。'
			}
		},

		noExtractHashtags: {
			validator: $.optional.bool,
			default: false,
			desc: {
				'ja-JP': '本文からハッシュタグを展開しないか否か。'
			}
		},

		noExtractEmojis: {
			validator: $.optional.bool,
			default: false,
			desc: {
				'ja-JP': '本文からカスタム絵文字を展開しないか否か。'
			}
		},

		fileIds: {
			validator: $.optional.arr($.type(ID)).unique().range(1, 4),
			desc: {
				'ja-JP': '添付するファイル'
			}
		},

		mediaIds: {
			validator: $.optional.arr($.type(ID)).unique().range(1, 4),
			deprecated: true,
			desc: {
				'ja-JP': '添付するファイル (このパラメータは廃止予定です。代わりに fileIds を使ってください。)'
			}
		},
<<<<<<< HEAD

		replyId: {
			validator: $.optional.nullable.type(ID),
			desc: {
				'ja-JP': '返信対象'
			}
		},

		renoteId: {
			validator: $.optional.nullable.type(ID),
			desc: {
				'ja-JP': 'Renote対象'
			}
		},

		channelId: {
			validator: $.optional.nullable.type(ID),
			desc: {
				'ja-JP': 'チャンネル'
			}
		},

		poll: {
			validator: $.optional.nullable.obj({
				choices: $.arr($.str)
					.unique()
					.range(2, 10)
					.each(c => c.length > 0 && c.length < 50),
				multiple: $.optional.bool,
				expiresAt: $.optional.nullable.num.int(),
				expiredAfter: $.optional.nullable.num.int().min(1)
			}).strict(),
			desc: {
				'ja-JP': 'アンケート'
			},
			ref: 'poll'
		}
=======
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
	},

	res: {
		type: 'object' as const,
		optional: false as const, nullable: false as const,
		properties: {
			createdNote: {
				type: 'object' as const,
				optional: false as const, nullable: false as const,
				ref: 'Note',
				description: '作成した投稿'
			}
		}
	},

	errors: {
		contentRequired: {
			message: 'Content required. You need to set text or fileIds.',
			code: 'CONTENT_REQUIRED',
			id: '6f57e42b-c348-439b-bc45-993995cc515a'
		},

<<<<<<< HEAD
		cannotCreateAlreadyExpiredPoll: {
			message: 'Poll is already expired.',
			code: 'CANNOT_CREATE_ALREADY_EXPIRED_POLL',
			id: '04da457d-b083-4055-9082-955525eda5a5'
		},

		noSuchChannel: {
			message: 'No such channel.',
			code: 'NO_SUCH_CHANNEL',
			id: 'b1653923-5453-4edc-b786-7c4f39bb0bbb'
=======
		notModerator: {
			message: 'Access denied.',
			code: 'ACCESS_DENIED',
			id: '56f35758-7dd5-468b-8439-5d6fb8ec9b8e',
			reason: 'You are not a moderator.'
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
		},
	}
};

export default define(meta, async (ps, user) => {
	let files: DriveFile[] = [];
	const fileIds = ps.fileIds != null ? ps.fileIds : ps.mediaIds != null ? ps.mediaIds : null;
	if (fileIds != null) {
		files = (await Promise.all(fileIds.map(fileId =>
			DriveFiles.findOne({
				id: fileId,
				userId: user.id
			})
		))).filter(file => file != null) as DriveFile[];
	}

	// テキストが無いかつ添付ファイルが無かったらエラー
	if (!(ps.text || files.length)) {
		throw new ApiError(meta.errors.contentRequired);
	}

	if (ps.announcement && !user.isAdmin && !user.isModerator) {
		throw new ApiError(meta.errors.notModerator);
	}

	let channel: Channel | undefined;
	if (ps.channelId != null) {
		channel = await Channels.findOne(ps.channelId);

		if (channel == null) {
			throw new ApiError(meta.errors.noSuchChannel);
		}
	}

	// 投稿を作成
	const note = await create(user, {
		createdAt: new Date(),
		files: files,
		text: ps.text || undefined,
		cw: ps.cw,
<<<<<<< HEAD
		viaMobile: ps.viaMobile,
		localOnly: ps.localOnly,
		remoteFollowersOnly: ps.remoteFollowersOnly,
		visibility: ps.visibility,
		visibleUsers,
		channel,
		apMentions: ps.noExtractMentions ? [] : undefined,
		apHashtags: ps.noExtractHashtags ? [] : undefined,
		apEmojis: ps.noExtractEmojis ? [] : undefined,
=======
		visibility: ps.visibility,
		viaMobile: ps.viaMobile,
		isAnnouncement: ps.announcement,
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
	});

	return {
		createdNote: await Notes.pack(note, user)
	};
});
