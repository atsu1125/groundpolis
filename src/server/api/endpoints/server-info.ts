import * as os from 'os';
import * as si from 'systeminformation';
import define from '../define';
import config from '../../../config';

export const meta = {
	requireCredential: false as const,

	desc: {
	},

	tags: ['meta'],

	params: {
	},
};

export default define(meta, async () => {
	const memStats = await si.mem();
	const fsStats = await si.fsSize();

	return {
		machine: config.hideServerInfo ? 'Unknown' : os.hostname(),
		cpu: {
			model: config.hideServerInfo ? 'Unknown' : os.cpus()[0].model,
			cores: config.hideServerInfo ? 'Unknown' : os.cpus().length
		},
		mem: {
			total: config.hideServerInfo ? 'Unknown' : memStats.total
		},
		fs: {
			total: config.hideServerInfo ? 'Unknown' : fsStats[0].size,
			used: config.hideServerInfo ? 'Unknown' : fsStats[0].used,
		},
	};
});
