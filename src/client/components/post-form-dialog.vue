<template>
<<<<<<< HEAD
<MkModal ref="modal" @click="$refs.modal.close()" @closed="$emit('closed')" :position="'top'">
	<MkPostFormV2 v-if="$store.reactiveState.tryNewPostForm.value" @posted="$refs.modal.close()" @cancel="$refs.modal.close()" @esc="$refs.modal.close()" v-bind="$attrs"/>
	<MkPostForm v-else @posted="$refs.modal.close()" @cancel="$refs.modal.close()" @esc="$refs.modal.close()" v-bind="$attrs"/>
</MkModal>
=======
<div class="ulveipglmagnxfgvitaxyszerjwiqmwl">
	<transition :name="$store.state.device.animation ? 'form-fade' : ''" appear @after-leave="$emit('closed');">
		<div class="bg" ref="bg" v-if="show" @click="close()"></div>
	</transition>
	<div class="main" ref="main" @click.self="close()" @keydown="onKeydown">
		<transition :name="$store.state.device.animation ? 'form' : ''" appear
			@after-leave="destroyDom"
		>
			<x-post-form ref="form"
				v-if="show"
				:initial-text="initialText"
				:initial-note="initialNote"
				:instant="instant"
				@posted="onPosted"
				@cancel="onCanceled"
				style="border-radius: var(--radius);"
/>
		</transition>
	</div>
</div>
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MkModal from '@/components/ui/modal.vue';
import MkPostForm from '@/components/post-form.vue';
import MkPostFormV2 from '@/components/post-form-v2.vue';

export default defineComponent({
	components: {
		MkModal,
		MkPostForm,
		MkPostFormV2
	},
<<<<<<< HEAD
	emits: ['closed'],
=======

	props: {
		initialText: {
			type: String,
			required: false
		},
		initialNote: {
			type: Object,
			required: false
		},
		instant: {
			type: Boolean,
			required: false,
			default: false
		}
	},

	data() {
		return {
			show: true
		};
	},

	methods: {
		focus() {
			this.$refs.form.focus();
		},

		close() {
			this.show = false;
			(this.$refs.bg as any).style.pointerEvents = 'none';
			(this.$refs.main as any).style.pointerEvents = 'none';
		},

		onPosted() {
			this.$emit('posted');
			this.close();
		},

		onCanceled() {
			this.$emit('cancel');
			this.close();
		},

		onKeydown(e) {
			if (e.which === 27) { // Esc
				e.preventDefault();
				e.stopPropagation();
				this.close();
			}
		},
	}
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
});
</script>
