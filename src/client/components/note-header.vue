<template>
<header class="kkwtjztg">
<<<<<<< HEAD
	<MkA class="name-set" :to="userPage(note.user)" v-user-preview="note.user.id">
		<template v-if="$store.reactiveState.noteNameDisplayMode.value === 0">
			<MkUserName class="name" :user="note.user"/>
			<span class="username"><MkAcct :user="note.user"/></span>
		</template>
		<template v-else>
			<span v-if="$store.reactiveState.noteNameDisplayMode.value !== 2" class="username"><MkAcct :user="note.user"/></span>
			<MkUserName class="name" v-if="$store.reactiveState.noteNameDisplayMode.value !== 3" :user="note.user"/>
		</template>
	</MkA>
	<span class="is-bot" v-if="note.user.isBot">bot</span>
	<span class="admin" v-if="note.user.isAdmin"><Fa :icon="faBookmark"/></span>
	<GpVerified class="verified" v-if="note.user.isVerified" />
	<span class="premium" v-if="note.user.isPremium"><Fa :icon="faCrown"/></span>
	<div class="info">
		<span class="mobile" v-if="note.viaMobile"><Fa :icon="faMobileAlt"/></span>
		<MkA class="created-at" :to="notePage(note)">
			<MkTime :time="note.createdAt"/>
		</MkA>
		<VisibilityIcon class="visibility" v-if="note.visibility !== 'public' || note.localOnly || note.remoteFollowersOnly"
			:visibility="note.visibility"
			:localOnly="note.localOnly"
			:remoteFollowersOnly="note.remoteFollowersOnly"
			/>
=======
	<span class="username">{{ $t('note') }} ID: {{ note.id }}</span>
	<span class="is-myself" v-if="note.isMyNote">{{ $t('you') }}</span>
	<span class="announcement" v-tooltip="$t('thisIsAnnouncement')" v-if="note.isAnnouncement"><fa :icon="faBullhorn" /></span>
	<div class="info">
		<router-link :to="note | notePage" class="username"><mk-time :time="note.createdAt"/></router-link>

		<span class="visibility" v-if="note.visibility !== 'public'">
			<fa v-if="note.visibility === 'followers'" :icon="faLock"/>
		</span>
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
	</div>
</header>
</template>

<script lang="ts">
<<<<<<< HEAD
import { defineComponent } from 'vue';
import { faHome, faUnlock, faEnvelope, faMobileAlt, faBookmark, faUsers, faHeart, faHeartbeat, faCrown } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';
import notePage from '../filters/note';
import { userPage } from '../filters/user';
import GpVerified from './verified.vue';
import VisibilityIcon from './visibility-icon.vue';
=======
import Vue from 'vue';
import { faLock, faBullhorn } from '@fortawesome/free-solid-svg-icons';
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109

export default defineComponent({
	components: {
		GpVerified,
		VisibilityIcon,
	},
	props: {
		note: {
			type: Object,
			required: true
		},
		detail: {
			type: Boolean,
			default: false,
		}
	},

	data() {
		return {
<<<<<<< HEAD
			faHome, faUnlock, faEnvelope, faMobileAlt, faBookmark, farBookmark, faUsers, faHeart, faHeartbeat, faCrown
=======
			faLock, faBullhorn
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
		};
	},

	methods: {
		notePage,
		userPage
	}
});
</script>

<style lang="scss" scoped>
.kkwtjztg {
	display: flex;
	align-items: baseline;
	white-space: nowrap;
	margin-bottom: 12px;

	.name-set {
		overflow: hidden;
		font-size: 1em;
		font-weight: bold;
		text-decoration: none;
		text-overflow: ellipsis;
		> .name {
			margin: 0 .5em 0 0;
			padding: 0;
			overflow: hidden;
			color: var(--noteHeaderName);
			font-size: 1em;
			font-weight: bold;
			text-decoration: none;
			text-overflow: ellipsis;

			&:hover {
				text-decoration: underline;
			}
		}

		> .username {
			margin: 0 .5em 0 0;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	> .is-myself {
		flex-shrink: 0;
		align-self: center;
		margin: 0 .5em 0 0;
		padding: 1px 6px;
		font-size: 80%;
		border: solid 1px var(--divider);
		border-radius: 3px;
	}

	> .admin,
	> .moderator,
	> .announcement {
		margin-right: 0.5em;
		color: var(--badge);
	}

<<<<<<< HEAD
	> .premium {
		margin-right: 0.5em;
		color: var(--premium);
	}

	> .verified {
		margin-right: 0.5em;
=======
	> .username {
		margin: 0 .5em 0 0;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
	}

	> .info {
		margin-left: auto;
		font-size: 0.9em;

		> .mobile {
			margin-right: 8px;
		}

		> .visibility {
			margin-left: 8px;
		}

		> .localOnly {
			margin-left: 8px;
		}

		> .remoteFollowersOnly {
			margin-left: 8px;
		}

		> .global {
			margin-left: 8px;
			color: var(--accent);
		}
	}
}
</style>
