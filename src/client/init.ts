/**
 * App entry point
 */

import Vue from 'vue';
import Vuex from 'vuex';
import VueMeta from 'vue-meta';
import PortalVue from 'portal-vue';
import VAnimateCss from 'v-animate-css';
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome';
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'

import i18n from './i18n';
import VueHotkey from './scripts/hotkey';
import App from './app.vue';
import MiOS from './mios';
import { version, langs, instanceName } from './config';
import PostFormDialog from './components/post-form-dialog.vue';
import Dialog from './components/dialog.vue';
import Menu from './components/menu.vue';
import { router } from './router';
import { applyTheme, lightTheme } from './theme';
import { isDeviceDarkmode } from './scripts/is-device-darkmode';
import createStore from './store';

Vue.use(Vuex);
Vue.use(VueHotkey);
Vue.use(VueMeta);
Vue.use(PortalVue);
Vue.use(VAnimateCss);
Vue.use(VueVideoPlayer);

Vue.component('fa', FontAwesomeIcon);
Vue.component('fa-layers', FontAwesomeLayers);

require('./directives');
require('./components');
require('./widgets');
require('./filters');

Vue.mixin({
	methods: {
		destroyDom() {
			this.$destroy();

			if (this.$el.parentNode) {
				this.$el.parentNode.removeChild(this.$el);
			}
		}
	}
});

console.info(`Misskey v${version}`);

// v11互換性のため
if (localStorage.getItem('kyoppie') === 'yuppie') {
	const i = localStorage.getItem('i');
	localStorage.clear();
	localStorage.setItem('i', i);
	location.reload(true);
}


window.history.scrollRestoration = 'manual';

if (localStorage.getItem('theme') == null) {
	applyTheme(lightTheme);
}

//#region Detect the user language
let lang = localStorage.getItem('lang');

if (lang == null) {
	if (langs.map(x => x[0]).includes(navigator.language)) {
		lang = navigator.language;
	} else {
		lang = langs.map(x => x[0]).find(x => x.split('-')[0] == navigator.language);

		if (lang == null) {
			// Fallback
			lang = 'en-US';
		}
	}

	localStorage.setItem('lang', lang);
}
//#endregion

// Detect the user agent
const ua = navigator.userAgent.toLowerCase();
const isMobile = /mobile|iphone|ipad|android/.test(ua);

// Get the <head> element
const head = document.getElementsByTagName('head')[0];

// If mobile, insert the viewport meta tag
if (isMobile || window.innerWidth <= 1024) {
	const viewport = document.getElementsByName('viewport').item(0);
	viewport.setAttribute('content',
		`${viewport.getAttribute('content')},minimum-scale=1,maximum-scale=1,user-scalable=no`);
	head.appendChild(viewport);
}

//#region Fetch locale data
const cachedLocale = localStorage.getItem('locale');

if (cachedLocale == null) {
	fetch(`/assets/locales/${lang}.${version}.json`)
		.then(response => response.json()).then(locale => {
			localStorage.setItem('locale', JSON.stringify(locale));
			i18n.locale = lang;
			i18n.setLocaleMessage(lang, locale);
		});
} else {
	// TODO: 古い時だけ更新
	setTimeout(() => {
		fetch(`/assets/locales/${lang}.${version}.json`)
			.then(response => response.json()).then(locale => {
				localStorage.setItem('locale', JSON.stringify(locale));
			});
	}, 1000 * 5);
}
//#endregion

//#region Set lang attr
const html = document.documentElement;
html.setAttribute('lang', lang);
//#endregion

// iOSでプライベートモードだとlocalStorageが使えないので既存のメソッドを上書きする
try {
	localStorage.setItem('foo', 'bar');
} catch (e) {
	Storage.prototype.setItem = () => { }; // noop
}

// http://qiita.com/junya/items/3ff380878f26ca447f85
document.body.setAttribute('ontouchstart', '');

// アプリ基底要素マウント
document.body.innerHTML = '<div id="app"></div>';

const store = createStore();

const os = new MiOS(store);

os.init(async () => {
	window.addEventListener('storage', e => {
		if (e.key === 'vuex') {
			store.replaceState(JSON.parse(localStorage['vuex']));
		} else if (e.key === 'i') {
			location.reload();
		}
	}, false);

	const reactions = store.state.settings.reactions.map(r => {
		switch (r) {
			case 'like': return '👍';
			case 'love': return '❤️';
			case 'laugh': return '😆';
			case 'hmm': return '🤔';
			case 'surprise': return '😮';
			case 'congrats': return '🎉';
			case 'angry': return '💢';
			case 'confused': return '😥';
			case 'rip': return '😇';
			case 'pudding': return '🍮';
			default: return r;
		}
	});
	store.dispatch('settings/set', { key: 'reactions', value: reactions });

	store.watch(state => state.device.darkMode, darkMode => {
		import('./theme').then(({ builtinThemes }) => {
			const themes = builtinThemes.concat(store.state.device.themes);
			applyTheme(themes.find(x => x.id === (darkMode ? store.state.device.darkTheme : store.state.device.lightTheme)));
		});
	});

	//#region Sync dark mode
	if (store.state.device.syncDeviceDarkMode) {
		store.commit('device/set', { key: 'darkMode', value: isDeviceDarkmode() });
	}

	window.matchMedia('(prefers-color-scheme: dark)').addListener(mql => {
		if (store.state.device.syncDeviceDarkMode) {
			store.commit('device/set', { key: 'darkMode', value: mql.matches });
		}
	});
	//#endregion

	if ('Notification' in window && store.getters.isSignedIn) {
		// 許可を得ていなかったらリクエスト
		if (Notification.permission === 'default') {
			Notification.requestPermission();
		}
	}

	const app = new Vue({
		store: store,
		metaInfo: {
			title: null,
			titleTemplate: title => title ? `${title} | ${(instanceName || 'Misskey')}` : (instanceName || 'Misskey')
		},
		data() {
			return {
				stream: os.stream,
				isMobile: isMobile
			};
		},
		methods: {
			api: (endpoint: string, data: { [x: string]: any } = {}, token?) => store.dispatch('api', { endpoint, data, token }),
			signout: os.signout,
			new(vm, props) {
				const x = new vm({
					parent: this,
					propsData: props
				}).$mount();
				document.body.appendChild(x.$el);
				return x;
			},
			dialog(opts) {
				const vm = this.new(Dialog, opts);
				const p: any = new Promise((res) => {
					vm.$once('ok', result => res({ canceled: false, result }));
					vm.$once('cancel', () => res({ canceled: true }));
				});
				p.close = () => {
					vm.close();
				};
				return p;
			},
			menu(opts) {
				const vm = this.new(Menu, opts);
				const p: any = new Promise((res) => {
					vm.$once('closed', () => res());
				});
				return p;
			},
			post(opts, cb) {
				const vm = this.new(PostFormDialog, opts);
				if (cb) vm.$once('closed', cb);
				(vm as any).focus();
			},
			sound(type: string) {
				if (this.$store.state.device.sfxVolume === 0) return;
				const sound = this.$store.state.device['sfx' + type.substr(0, 1).toUpperCase() + type.substr(1)];
				if (sound == null) return;
				const audio = new Audio(`/assets/sounds/${sound}.mp3`);
				audio.volume = this.$store.state.device.sfxVolume;
				audio.play();
			},
			createNoteInstantly(text: string) {
				const s = this.$store.state.settings;
				const d = this.$store.state.device;
				return this.api('notes/create', {
					text,
					localOnly: s.rememberNoteVisibility ? d.localOnly : s.defaultNoteLocalOnly,
					remoteFollowersOnly: s.rememberNoteVisibility ? false : d.localOnly,
					visibility: s.rememberNoteVisibility ? d.visibility : s.defaultNoteVisibility,
					viaMobile: this.isMobile
				});
			}
		},
		router: router,
		render: createEl => createEl(App)
	});

	os.app = app;

	// マウント
	app.$mount('#app');

	os.stream.on('emojiAdded', data => {
		// TODO
		//store.commit('instance/set', );
	});

	if (store.getters.isSignedIn) {
		const main = os.stream.useSharedConnection('main');

		// 自分の情報が更新されたとき
		main.on('meUpdated', i => {
			store.dispatch('mergeMe', i);
		});

		main.on('readAllNotifications', () => {
			store.dispatch('mergeMe', {
				hasUnreadNotification: false
			});
		});

		main.on('unreadNotification', () => {
			store.dispatch('mergeMe', {
				hasUnreadNotification: true
			});
		});

		main.on('unreadMention', () => {
			store.dispatch('mergeMe', {
				hasUnreadMentions: true
			});
		});

		main.on('readAllUnreadMentions', () => {
			store.dispatch('mergeMe', {
				hasUnreadMentions: false
			});
		});

		main.on('unreadSpecifiedNote', () => {
			store.dispatch('mergeMe', {
				hasUnreadSpecifiedNotes: true
			});
		});

		main.on('readAllUnreadSpecifiedNotes', () => {
			store.dispatch('mergeMe', {
				hasUnreadSpecifiedNotes: false
			});
		});

		main.on('readAllMessagingMessages', () => {
			store.dispatch('mergeMe', {
				hasUnreadMessagingMessage: false
			});
		});

		main.on('unreadMessagingMessage', () => {
			store.dispatch('mergeMe', {
				hasUnreadMessagingMessage: true
			});

			app.sound('chatBg');
		});

		main.on('readAllAntennas', () => {
			store.dispatch('mergeMe', {
				hasUnreadAntenna: false
			});
		});

		main.on('unreadAntenna', () => {
			store.dispatch('mergeMe', {
				hasUnreadAntenna: true
			});

			app.sound('antenna');
		});

		main.on('readAllAnnouncements', () => {
			store.dispatch('mergeMe', {
				hasUnreadAnnouncement: false
			});
		});

		main.on('clientSettingUpdated', x => {
			store.commit('settings/set', {
				key: x.key,
				value: x.value
			});
		});

		// トークンが再生成されたとき
		// このままではMisskeyが利用できないので強制的にサインアウトさせる
		main.on('myTokenRegenerated', () => {
			os.signout();
		});
	}
});
