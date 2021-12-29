<template>
<<<<<<< HEAD
<FormBase class="mmnnbwxb" v-if="meta">
	<section class="_formItem about">
		<div class="_formPanel panel" ref="about">
			<div class="icon" ref="icon" draggable="false">
				<img class="_shadow-2" v-if="meta.iconUrl" :src="meta.iconUrl" alt="" draggable="false"/>
			</div>
			<div class="name">{{ instanceName }}</div>
=======
<div class="mmnnbwxb">
	<portal to="icon"><fa :icon="faInfoCircle"/></portal>
	<portal to="title">{{ $t('about') }}</portal>

	<section class="_card info" v-if="meta">
		<div class="_title"><fa :icon="faInfoCircle"/> {{ $t('instanceInfo') }}</div>
		<div class="_content" v-if="meta.description">
			<div v-html="meta.description"></div>
		</div>
		<div class="_content table" v-if="meta.maintainerName || meta.maintainerEmail || meta.tosUrl">
			<div v-if="meta.maintainerName"><b>{{ $t('administrator') }}</b><span>{{ meta.maintainerName }}</span></div>
			<div v-if="meta.maintainerEmail"><b></b><span>{{ meta.maintainerEmail }}</span></div>
		</div>
		<div class="_content table" v-if="meta.tosUrl">
			<div><b>{{ $t('tos') }}</b><a :href="meta.tosUrl">{{ meta.tosUrl }}</a></div>
		</div>
		<div class="_content table">
			<div><b>Hitorisskey</b><span>v{{ version }}</span></div>
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109
		</div>
	</section>
	<section class="_formItem _panel _pa-2">
		<Mfm :text="meta.description || $ts.introMisskey" />
	</section>

	<FormGroup>
		<FormKeyValueView>
			<template #key>Groundpolis</template>
			<template #value>v{{ version }}</template>
		</FormKeyValueView>
	</FormGroup>

	<FormGroup>
		<FormKeyValueView>
			<template #key>{{ $ts.administrator }}</template>
			<template #value>{{ meta.maintainerName }}</template>
		</FormKeyValueView>
		<FormKeyValueView>
			<template #key>{{ $ts.contact }}</template>
			<template #value>{{ meta.maintainerEmail }}</template>
		</FormKeyValueView>
	</FormGroup>

	<FormLink v-if="meta.tosUrl" :to="meta.tosUrl" :external="!isInternalUrl(meta.tosUrl)">{{ $ts.tos }}</FormLink>

	<FormGroup v-if="stats">
		<template #label>{{ $ts.statistics }}</template>
		<FormKeyValueView>
			<template #key>{{ $ts.users }}</template>
			<template #value>{{ number(stats.originalUsersCount) }}</template>
		</FormKeyValueView>
		<FormKeyValueView>
			<template #key>{{ $ts.notes }}</template>
			<template #value>{{ number(stats.originalNotesCount) }}</template>
		</FormKeyValueView>
	</FormGroup>
</FormBase>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { version, instanceName } from '@/config';
import FormLink from '@/components/form/link.vue';
import FormBase from '@/components/form/base.vue';
import FormGroup from '@/components/form/group.vue';
import FormKeyValueView from '@/components/form/key-value-view.vue';
import * as os from '@/os';
import number from '@/filters/number';
import { url } from '@/config';

export default defineComponent({
	components: {
		FormBase,
		FormGroup,
		FormLink,
		FormKeyValueView,
	},

	data() {
		return {
			INFO: {
				title: this.$ts.instanceInfo,
				icon: faInfoCircle
			},
			version,
			instanceName,
			stats: null,
			faInfoCircle
		}
	},

	computed: {
		meta() {
			return this.$instance;
		},
	},

	created() {
		os.api('stats').then(stats => {
			this.stats = stats;
		});
	},

	methods: {
		isInternalUrl(link: string) {
			return link.startsWith(url);
		},
		number
	}
});
</script>

<style lang="scss" scoped>
.mmnnbwxb {
	max-width: 800px;
	box-sizing: border-box;
	margin: 0 auto;

	> .logo {
		text-align: center;

		> img {
			vertical-align: bottom;
			max-height: 100px;
		}
	}

	.panel {
		position: relative;
		text-align: center;
		padding: 16px;
		background: var(--bg);

		> .icon {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100px;
			margin: 0 auto;
			background: var(--bg);

			> img {
				width: 100%;
				height: 100%;
				border-radius: 16px;
			}
		}

		> .name {
			margin: 0.75em auto 0.3em auto;
			width: max-content;
			font-size: 24px;
			font-weight: bold;
		}
	}
}
</style>
