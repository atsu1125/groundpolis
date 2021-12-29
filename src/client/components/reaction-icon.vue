<template>
<<<<<<< HEAD
<MkEmoji :emoji="reaction" :custom-emojis="customEmojis" :is-reaction="true" :normal="true" :no-style="noStyle"/>
=======
<mk-emoji :emoji="reaction.startsWith(':') ? null : reaction" :name="reaction.startsWith(':') ? reaction.substr(1, reaction.length - 2) : null" :is-reaction="true" :normal="true" :no-style="noStyle"/>
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		reaction: {
			type: String,
			required: true
		},
		noStyle: {
			type: Boolean,
			required: false,
			default: false
		},
	},
});
</script>
