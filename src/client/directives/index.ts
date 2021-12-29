import { App } from 'vue';

<<<<<<< HEAD
import userPreview from './user-preview';
=======
import autocomplete from './autocomplete';
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
import size from './size';
import particle from './particle';
import tooltip from './tooltip';
import hotkey from './hotkey';
import appear from './appear';
import anim from './anim';

<<<<<<< HEAD
export default function(app: App) {
	app.directive('userPreview', userPreview);
	app.directive('user-preview', userPreview);
	app.directive('size', size);
	app.directive('particle', particle);
	app.directive('tooltip', tooltip);
	app.directive('hotkey', hotkey);
	app.directive('appear', appear);
	app.directive('anim', anim);
}
=======
Vue.directive('autocomplete', autocomplete);
Vue.directive('size', size);
Vue.directive('particle', particle);
Vue.directive('tooltip', tooltip);
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
