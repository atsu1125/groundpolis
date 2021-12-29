import * as Bull from 'bull';
import { deleteDriveFiles } from './delete-drive-files';
import { exportNotes } from './export-notes';
import { exportFollowing } from './export-following';
import { exportMute } from './export-mute';
import { exportBlocking } from './export-blocking';
import { exportUserLists } from './export-user-lists';
<<<<<<< HEAD
import { importFollowing } from './import-following';
import { importUserLists } from './import-user-lists';
import { importMuting } from './import-muting';
import { importBlocking } from './import-blocking';
import { deleteAccount } from './delete-account';
=======
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109

const jobs = {
	deleteDriveFiles,
	exportNotes,
	exportFollowing,
	exportMute,
	exportBlocking,
	exportUserLists,
<<<<<<< HEAD
	importFollowing,
	importMuting,
	importBlocking,
	importUserLists,
	deleteAccount,
} as Record<string, Bull.ProcessCallbackFunction<DbJobData> | Bull.ProcessPromiseFunction<DbJobData>>;
=======
} as any;
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109

export default function(dbQueue: Bull.Queue) {
	for (const [k, v] of Object.entries(jobs)) {
		dbQueue.process(k, v as any);
	}
}
