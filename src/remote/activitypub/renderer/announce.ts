import config from '../../../config';
import { Note } from '../../../models/entities/note';

export default (object: any, note: Note) => {
	const attributedTo = `${config.url}/users/${note.userId}`;

	let to: string[] = [];
	let cc: string[] = [];

	if (note.visibility === 'public') {
		to = ['https://www.w3.org/ns/activitystreams#Public'];
		cc = [`${attributedTo}/followers`];
	} else if (note.visibility === 'home') {
		to = [`${attributedTo}/followers`];
		cc = ['https://www.w3.org/ns/activitystreams#Public'];
	} else if (note.visibility === 'followers') {
			to = [`${attributedTo}/followers`];
			cc = [];
	} else {
		return null;
	}

	return {
		id: `${config.url}/notes/${note.id}/activity`,
		actor: `${config.url}/users/${note.userId}`,
		type: 'Announce',
		published: note.createdAt.toISOString(),
		to,
		cc,
		object
	};
};
