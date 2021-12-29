<template>
<<<<<<< HEAD
<div class="fcuexfpr">
	<div v-if="note" class="note" v-anim>
		<div class="_section" v-if="showNext">
			<XNotes class="_content _noGap_" :pagination="next"/>
		</div>

		<div class="_section main">
			<MkLoading v-if="checkingHasNext"/>
			<MkButton v-if="!showNext && hasNext" class="load next _content" @click="showNext = true"><Fa :icon="faChevronUp"/></MkButton>
			<div class="_content _vMargin">
				<MkRemoteCaution v-if="note.user.host != null" :href="note.url || note.uri" class="_vMargin"/>
				<XNoteDetailed v-model:note="note" :key="note.id" class="_vMargin"/>
			</div>
			<div class="_content clips _vMargin" v-if="clips && clips.length > 0">
				<div class="title">{{ $ts.clip }}</div>
				<MkA v-for="item in clips" :key="item.id" :to="`/clips/${item.id}`" class="item _panel _vMargin">
					<b>{{ item.name }}</b>
					<div v-if="item.description" class="description">{{ item.description }}</div>
					<div class="user">
						<MkAvatar :user="item.user" class="avatar"/> <MkUserName :user="item.user" :nowrap="false"/>
					</div>
				</MkA>
			</div>
			<MkLoading v-if="checkingHasPrev"/>
			<MkButton v-if="!showPrev && hasPrev" class="load prev _content" @click="showPrev = true"><Fa :icon="faChevronDown"/></MkButton>
		</div>

		<div class="_section" v-if="showPrev">
			<XNotes class="_content _noGap_" :pagination="prev"/>
		</div>
	</div>

	<div v-if="error">
		<MkError @retry="fetch()"/>
=======
<div class="mk-note-page">
	<portal to="title" v-if="note">
		<mfm 
			:text="$t('noteOf')"
			:plain="true" :nowrap="true" :custom-emojis="note.user.emojis" :is-note="false"
		/>
	</portal>

	<div v-if="note">
		<x-note :note="note" :key="note.id" :detail="true"/>
		<div v-if="error">
			<mk-error @retry="fetch()"/>
		</div>
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
	</div>
</div>
</template>

<script lang="ts">
<<<<<<< HEAD
import { computed, defineComponent } from 'vue';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import XNote from '@/components/note.vue';
import XNoteDetailed from '@/components/note-detailed.vue';
import XNotes from '@/components/notes.vue';
import MkRemoteCaution from '@/components/remote-caution.vue';
import MkButton from '@/components/ui/button.vue';
import * as os from '@/os';
=======
import Vue from 'vue';
import Progress from '../scripts/loading';
import XNote from '../components/note.vue';
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109

export default defineComponent({
	components: {
		XNote,
<<<<<<< HEAD
		XNoteDetailed,
		XNotes,
		MkRemoteCaution,
		MkButton,
	},
	props: {
		noteId: {
			type: String,
			required: true
		}
=======
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
	},
	data() {
		return {
			INFO: computed(() => this.note ? {
				title: this.$ts.note,
				avatar: this.note.user,
			} : null),
			note: null,
<<<<<<< HEAD
			clips: null,
			hasPrev: false,
			hasNext: false,
			showPrev: false,
			showNext: false,
			checkingHasPrev: true,
			checkingHasNext: true,
=======
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
			error: null,
		};
	},
	watch: {
		noteId: 'fetch'
	},
	created() {
		this.fetch();
	},
	methods: {
		fetch() {
			this.showPrev = this.showNext = false;
			this.hasPrev = this.hasNext = false;
			this.checkingHasPrev = this.checkingHasNext = true;
			os.api('notes/show', {
				noteId: this.noteId
			}).then(note => {
<<<<<<< HEAD
				this.note = note;					
				Promise.all([
					os.api('notes/clips', {
						noteId: note.id,
					}),
					os.api('users/notes', {
						userId: note.userId,
						untilId: note.id,
						limit: 1,
					}),
					os.api('users/notes', {
						userId: note.userId,
						sinceId: note.id,
						limit: 1,
					}),
				]).then(([clips, prev, next]) => {
					this.clips = clips;
					this.hasPrev = prev.length !== 0;
					this.hasNext = next.length !== 0;
					this.checkingHasPrev = false;
					this.checkingHasNext = false;
				});
=======
				this.note = note;
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
			}).catch(e => {
				this.error = e;
			});
		}
	}
});
</script>

<style lang="scss" scoped>
.fcuexfpr {
	> .note {
		> .main {
			> .load {
				min-width: 0;
				border-radius: 999px;

				&.next {
					margin-bottom: var(--margin);
				}

				&.prev {
					margin-top: var(--margin);
				}
			}

			> .clips {
				> .title {
					font-weight: bold;
					padding: 12px;
				}

				> .item {
					display: block;
					padding: 16px;

					> .description {
						padding: 8px 0;
					}

					> .user {
						$height: 32px;
						padding-top: 16px;
						border-top: solid 1px var(--divider);
						line-height: $height;

						> .avatar {
							width: $height;
							height: $height;
						}
					}
				}
			}
		}
	}
}
</style>
