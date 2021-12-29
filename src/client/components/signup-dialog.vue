<template>
<<<<<<< HEAD
<XModalWindow ref="dialog"
	:width="366"
	:height="500"
	@close="$refs.dialog.close()"
	@closed="$emit('closed')"
>
	<template #header>{{ $ts.signup }}</template>

	<div class="_section">
		<XSignup :auto-set="autoSet" @signup="onSignup"/>
	</div>
</XModalWindow>
=======
<x-window ref="window" :width="366" :height="640" @closed="() => { $emit('closed'); destroyDom(); }">
	<template #header>{{ $t('signup') }}</template>
	<x-signup :auto-set="autoSet" @signup="onSignup"/>
</x-window>
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import XModalWindow from '@/components/ui/modal-window.vue';
import XSignup from './signup.vue';

export default defineComponent({
	components: {
		XSignup,
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
		onSignup(res) {
			this.$emit('done', res);
			this.$refs.dialog.close();
		}
	}
});
</script>
