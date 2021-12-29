<template>
<<<<<<< HEAD
<MkModal ref="modal" @click="done(true)" @closed="$emit('closed')">
	<div class="mk-dialog _popup">
		<div class="icon" v-if="icon">
			<Fa :icon="icon"/>
		</div>
		<div class="icon" v-else-if="!input && !select" :class="type">
			<Fa :icon="faCheck" v-if="type === 'success'"/>
			<Fa :icon="faTimesCircle" v-if="type === 'error'"/>
			<Fa :icon="faExclamationTriangle" v-if="type === 'warning'"/>
			<Fa :icon="faInfoCircle" v-if="type === 'info'"/>
			<Fa :icon="faQuestionCircle" v-if="type === 'question'"/>
			<Fa :icon="faSpinner" pulse v-if="type === 'waiting'"/>
		</div>
		<header v-if="title"><Mfm :text="title"/></header>
		<div class="body" v-if="text"><Mfm :text="text"/></div>
		<MkInput v-if="input" v-model:value="inputValue" autofocus :type="input.type || 'text'" :placeholder="input.placeholder" @keydown="onInputKeydown"></MkInput>
		<MkSelect v-if="select" v-model:value="selectedValue" autofocus>
			<template v-if="select.items">
				<option v-for="item in select.items" :value="item.value">{{ item.text }}</option>
			</template>
			<template v-else>
				<optgroup v-for="groupedItem in select.groupedItems" :label="groupedItem.label">
					<option v-for="item in groupedItem.items" :value="item.value">{{ item.text }}</option>
				</optgroup>
			</template>
		</MkSelect>
		<div class="buttons" v-if="(showOkButton || showCancelButton) && !actions">
			<MkButton inline @click="ok" v-if="showOkButton" primary :autofocus="!input && !select">{{ (showCancelButton || input || select) ? $ts.ok : $ts.gotIt }}</MkButton>
			<MkButton inline @click="cancel" v-if="showCancelButton || input || select">{{ $ts.cancel }}</MkButton>
=======
<div class="mk-dialog" :class="{ iconOnly }">
	<transition :name="$store.state.device.animation ? 'bg-fade' : ''" appear>
		<div class="bg" ref="bg" @click="onBgClick" v-if="show"></div>
	</transition>
	<transition :name="$store.state.device.animation ? 'dialog' : ''" appear @after-leave="() => { destroyDom(); }">
		<div class="main" ref="main" v-if="show">
			<div class="icon" v-if="icon">
				<fa :icon="icon"/>
			</div>
			<div class="icon" v-else-if="!input && !select && !user" :class="type">
				<fa :icon="faCheck" v-if="type === 'success'"/>
				<fa :icon="faTimesCircle" v-if="type === 'error'"/>
				<fa :icon="faExclamationTriangle" v-if="type === 'warning'"/>
				<fa :icon="faInfoCircle" v-if="type === 'info'"/>
				<fa :icon="faQuestionCircle" v-if="type === 'question'"/>
				<fa :icon="faSpinner" pulse v-if="type === 'waiting'"/>
			</div>
			<header v-if="title" v-html="title"></header>
			<header v-if="title == null && user">{{ $t('enterUsername') }}</header>
			<div class="body" v-if="text" v-html="text"></div>
			<mk-input v-if="input" v-model="inputValue" autofocus :type="input.type || 'text'" :placeholder="input.placeholder" @keydown="onInputKeydown"></mk-input>
			<mk-input v-if="user" v-model="userInputValue" autofocus @keydown="onInputKeydown"><template #prefix>@</template></mk-input>
			<mk-select v-if="select" v-model="selectedValue" autofocus>
				<template v-if="select.items">
					<option v-for="item in select.items" :value="item.value">{{ item.text }}</option>
				</template>
				<template v-else>
					<optgroup v-for="groupedItem in select.groupedItems" :label="groupedItem.label">
						<option v-for="item in groupedItem.items" :value="item.value">{{ item.text }}</option>
					</optgroup>
				</template>
			</mk-select>
			<div class="buttons" v-if="!iconOnly && (showOkButton || showCancelButton) && !actions">
				<mk-button inline @click="ok" v-if="showOkButton" primary :autofocus="!input && !select && !user" :disabled="!canOk">{{ (showCancelButton || input || select || user) ? $t('ok') : $t('gotIt') }}</mk-button>
				<mk-button inline @click="cancel" v-if="showCancelButton || input || select || user">{{ $t('cancel') }}</mk-button>
			</div>
			<div class="buttons" v-if="actions">
				<mk-button v-for="action in actions" inline @click="() => { action.callback(); close(); }" :primary="action.primary" :key="action.text">{{ action.text }}</mk-button>
			</div>
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
		</div>
		<div class="buttons" v-if="actions">
			<MkButton v-for="action in actions" inline @click="() => { action.callback(); done(true); }" :primary="action.primary" :key="action.text">{{ action.text }}</MkButton>
		</div>
	</div>
</MkModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { faSpinner, faInfoCircle, faExclamationTriangle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
<<<<<<< HEAD
import MkModal from '@/components/ui/modal.vue';
import MkButton from '@/components/ui/button.vue';
import MkInput from '@/components/ui/input.vue';
import MkSelect from '@/components/ui/select.vue';
=======
import MkButton from './ui/button.vue';
import MkInput from './ui/input.vue';
import MkSelect from './ui/select.vue';
import parseAcct from '../../misc/acct/parse';
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109

export default defineComponent({
	components: {
		MkModal,
		MkButton,
		MkInput,
		MkSelect,
	},

	props: {
		type: {
			type: String,
			required: false,
			default: 'info'
		},
		title: {
			type: String,
			required: false
		},
		text: {
			type: String,
			required: false
		},
		input: {
			required: false
		},
		select: {
			required: false
		},
		icon: {
			required: false
		},
		actions: {
			required: false
		},
		showOkButton: {
			type: Boolean,
			default: true
		},
		showCancelButton: {
			type: Boolean,
			default: false
		},
		cancelableByBgClick: {
			type: Boolean,
			default: true
		},
	},

	emits: ['done', 'closed'],

	data() {
		return {
			inputValue: this.input && this.input.default ? this.input.default : null,
			selectedValue: this.select ? this.select.default ? this.select.default : this.select.items ? this.select.items[0].value : this.select.groupedItems[0].items[0].value : null,
			faTimesCircle, faQuestionCircle, faSpinner, faInfoCircle, faExclamationTriangle, faCheck
		};
	},

	mounted() {
		document.addEventListener('keydown', this.onKeydown);
	},

	beforeUnmount() {
		document.removeEventListener('keydown', this.onKeydown);
	},

	methods: {
		done(canceled, result?) {
			this.$emit('done', { canceled, result });
			this.$refs.modal.close();
		},

		async ok() {
			if (!this.showOkButton) return;

			const result =
				this.input ? this.inputValue :
				this.select ? this.selectedValue :
				true;
			this.done(false, result);
		},

		cancel() {
			this.done(true);
		},

		onBgClick() {
			if (this.cancelableByBgClick) {
				this.cancel();
			}
		},

		onKeydown(e) {
			if (e.which === 27) { // ESC
				this.cancel();
			}
		},

		onInputKeydown(e) {
			if (e.which === 13) { // Enter
				e.preventDefault();
				e.stopPropagation();
				this.ok();
			}
		}
	}
});
</script>

<style lang="scss" scoped>
.mk-dialog {
	position: relative;
	padding: 32px;
	min-width: 320px;
	max-width: 480px;
	box-sizing: border-box;
	text-align: center;
	background: var(--panel);
	border-radius: var(--radius);

	> .icon {
		font-size: 32px;

		&.success {
			color: var(--success);
		}

		&.error {
			color: var(--error);
		}

		&.warning {
			color: var(--warn);
		}

		> * {
			display: block;
			margin: 0 auto;
		}

		& + header {
			margin-top: 16px;
		}
	}

	> header {
		margin: 0 0 8px 0;
		font-weight: bold;
		font-size: 20px;

		& + .body {
			margin-top: 8px;
		}
	}

	> .body {
		margin: 16px 0 0 0;
	}

	> .buttons {
		margin-top: 16px;

		> * {
			margin: 0 8px;
		}
	}
}
</style>
