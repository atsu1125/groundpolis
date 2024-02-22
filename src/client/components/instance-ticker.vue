<template>
<div class="hpaizdrt" :style="bg">
	<img v-if="info.faviconUrl" class="icon" :src="info.faviconUrl"/>
	<span class="name">{{ info.name }}</span>
	<span v-if="info.softwareName" class="software">{{ info.softwareName }}</span>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { instanceName } from '@/config';

export default defineComponent({
	props: {
		instance: {
			type: Object,
			required: false
		},
	},

	data() {
		return {
			info: this.instance || {
				faviconUrl: '/favicon.ico',
				name: instanceName,
				themeColor: (document.querySelector('meta[name="theme-color-orig"]') as HTMLMetaElement)?.content,
				softwareName: (document.querySelector('meta[name="application-name"]') as HTMLMetaElement)?.content,
			}
		}
	},

	computed: {
		bg(): any {
			let softwareColor = '';
			switch (this.info.softwareName) {
	      case 'mastodon':
					if (this.info.softwareVersion && parseInt(this.info.softwareVersion) >= 4) {
						softwareColor = '#563acc';
					} else {
						softwareColor = '#2b90d9';
					}
	        break;
	      case 'pleroma':
	        softwareColor = '#10181e';
	        break;
	      case 'groundpolis':
	        softwareColor = '#251a10';
	        break;
				case 'groundpolis-milkey':
		      softwareColor = '#ed6c8e';
		      break;
	      case 'cherrypick':
	        softwareColor = '#ffbcdc';
	        break;
	      case 'misskey':
	        softwareColor = '#86b300';
	        break;
				case 'firefish':
		      softwareColor = '#31748f';
		      break;
				case 'meisskey':
					softwareColor = '#5A0608';
					break;
	      default:
	        softwareColor = '#777777';
    	}
			const themeColor = this.info.themeColor || softwareColor;
			return {
				background: `linear-gradient(90deg, ${themeColor}, ${themeColor}00)`
			};
		}
	}
});
</script>

<style lang="scss" scoped>
.hpaizdrt {
	$height: 1.1rem;

	height: $height;
	border-radius: 4px 0 0 4px;
	overflow: hidden;
	color: #fff;
	text-shadow: /* .866 ≈ sin(60deg) */
		1px 0 1px #000,
		.866px .5px 1px #000,
		.5px .866px 1px #000,
		0 1px 1px #000,
		-.5px .866px 1px #000,
		-.866px .5px 1px #000,
		-1px 0 1px #000,
		-.866px -.5px 1px #000,
		-.5px -.866px 1px #000,
		0 -1px 1px #000,
		.5px -.866px 1px #000,
		.866px -.5px 1px #000;

	> .icon {
		height: 100%;
	}

	> .name {
		margin-left: 4px;
		line-height: $height;
		font-size: 0.9em;
		vertical-align: top;
		font-weight: bold;
	}

	> .software {
		float: right;
		margin-right: .3em;
		line-height: $height;
		font-size: 0.9em;
		vertical-align: top;
		color: var(--fg);
		text-shadow: none;
		text-transform: capitalize;
	}
}
</style>
