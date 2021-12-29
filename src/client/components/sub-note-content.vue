<template>
<div class="wrmlmaau">
	<div class="body">
<<<<<<< HEAD
		<span v-if="note.isHidden" style="opacity: 0.5">({{ $ts.private }})</span>
		<span v-if="note.deletedAt" style="opacity: 0.5">({{ $ts.deleted }})</span>
		<MkA class="reply" v-if="note.replyId" :to="`/notes/${note.replyId}`"><Fa :icon="faReply"/></MkA>
		<Mfm v-if="note.text" :text="note.text" :author="note.user" :i="$i" :custom-emojis="note.emojis"/>
		<MkA class="rp" v-if="note.renoteId" :to="`/notes/${note.renoteId}`">RN: ...</MkA>
=======
		<span v-if="note.deletedAt" style="opacity: 0.5">({{ $t('deleted') }})</span>
		<mfm v-if="note.text" :text="no1te.text" :author="note.user" :i="$store.state.i" :custom-emojis="note.emojis"/>
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
	</div>
	<details v-if="note.files.length > 0">
		<summary>({{ $t('withNFiles', { n: note.files.length }) }})</summary>
		<XMediaList :media-list="note.files"/>
	</details>
<<<<<<< HEAD
	<details v-if="note.poll">
		<summary>{{ $ts.poll }}</summary>
		<XPoll :note="note"/>
	</details>
=======
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
</div>
</template>

<script lang="ts">
<<<<<<< HEAD
import { defineComponent } from 'vue';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import XPoll from './poll.vue';
=======
import Vue from 'vue';
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
import XMediaList from './media-list.vue';
import * as os from '@/os';

export default defineComponent({
	components: {
		XMediaList,
	},
	props: {
		note: {
			type: Object,
			required: true
		}
	}
});
</script>

<style lang="scss" scoped>
.wrmlmaau {
	overflow-wrap: break-word;
}
</style>
