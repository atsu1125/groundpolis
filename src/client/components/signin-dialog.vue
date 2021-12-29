<template>
<<<<<<< HEAD
<XModalWindow ref="dialog"
	:width="370"
	:height="400"
	@close="$refs.dialog.close()"
	@closed="$emit('closed')"
>
	<template #header>{{ $ts.login }}</template>

	<MkSignin :auto-set="autoSet" @login="onLogin"/>
</XModalWindow>
=======
<x-window ref="window" :height="270" @closed="() => { $emit('closed'); destroyDom(); }">
	<template #header>{{ $t('login') }}</template>
	<mk-signin :auto-set="autoSet" @login="onLogin"/>
</x-window>
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import XModalWindow from '@/components/ui/modal-window.vue';
import MkSignin from './signin.vue';

export default defineComponent({
	components: {
		MkSignin,
		XModalWindow,
	},

	props: {
		autoSet: {
			type: Boolean,
			required: false,
			default: false,
		}
	},

	emits: ['done', 'closed'],

	methods: {
		onLogin(res) {
			this.$emit('done', res);
			this.$refs.dialog.close();
		}
	}
});
</script>
