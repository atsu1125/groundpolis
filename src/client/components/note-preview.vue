<template>
<div class="yohlumlk">
<<<<<<< HEAD
	<MkAvatar class="avatar" :user="note.user"/>
=======
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
	<div class="main">
		<XNoteHeader class="header" :note="note" :mini="true"/>
		<div class="body">
			<p v-if="note.cw != null" class="cw">
				<span class="text" v-if="note.cw != ''">{{ note.cw }}</span>
				<XCwButton v-model:value="showContent" :note="note"/>
			</p>
			<div class="content" v-show="note.cw == null || showContent">
				<XSubNote-content class="text" :note="note"/>
			</div>
		</div>
	</div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import XNoteHeader from './note-header.vue';
import XSubNoteContent from './sub-note-content.vue';
import XCwButton from './cw-button.vue';
import * as os from '@/os';

export default defineComponent({
	components: {
		XNoteHeader,
		XSubNoteContent,
		XCwButton,
	},

	props: {
		note: {
			type: Object,
			required: true
		}
	},

	data() {
		return {
			showContent: false
		};
	}
});
</script>

<style lang="scss" scoped>
.yohlumlk {
	display: flex;
	margin: 0;
	padding: 0;
	overflow: hidden;
	font-size: 0.95em;

	> .main {
		flex: 1;
		min-width: 0;

		> .header {
			margin-bottom: 2px;
		}

		> .body {

			> .cw {
				cursor: default;
				display: block;
				margin: 0;
				padding: 0;
				overflow-wrap: break-word;

				> .text {
					margin-right: 8px;
				}
			}

			> .content {
				> .text {
					cursor: default;
					margin: 0;
					padding: 0;
				}
			}
		}
	}
}
</style>
