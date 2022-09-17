<template>
<div class="mkw-sunmoon" :class="{ _panel: !props.transparent }">
	<div class="lunar-calendar">
		<!-- <p class="moonface"><img :src="moonFace" height="64" :style="`transform:rotateZ(${moonAngle}rad);`"></p> -->
		<p class="moonface"><img :src="moonFace" height="64"></p>
		<p class="moonage">{{ moonAge }}</p>
	</div>
	<div class="suntime">
		<div>
			<p><i class="fas fa-arrow-up"></i>{{ $ts.sunRise }}: <b>{{ sunRiseTime }}</b></p>
		</div>
		<div>
			<p><i class="fas fa-arrow-down"></i>{{ $ts.sunSet }}: <b>{{ sunSetTime }}</b></p>
		</div>
	</div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import moment from "moment";
import SunCalc from "suncalc";
import define from './define';
import { twemojiSvgBase } from '../../misc/twemoji-base';
const widget = define({
	name: 'sunmoon',
	props: () => ({
		transparent: {
			type: 'boolean',
			default: false,
		},
		latitude: {
			type: 'number',
			default: 35,
		},
		longitude: {
			type: 'number',
			default: 135,
		},
		altitude: {
			type: 'number',
			default: 0,
		},
	})
});
export default defineComponent({
	extends: widget,
	data() {
		return {
			now: new Date(),
			year: 2000,
			month: 1,
			day: 1,
			sunRiseTime: "00:00",
			sunSetTime: "00:00",
			moonAge: "0.0",
			moonFace: `${twemojiSvgBase}/1f313.svg`,
			// moonAngle: 0,
			clock: 0
		};
	},
	created() {
		this.tick();
		this.clock = setInterval(this.tick, 8000);
	},
	beforeUnmount() {
		clearInterval(this.clock);
	},
	methods: {
		tick() {
			const now = new Date();
			const nd = now.getDate();
			const nm = now.getMonth();
			const ny = now.getFullYear();
			this.year = ny;
			this.month = nm + 1;
			this.day = nd;
			const hour12 = new Date(now);
			hour12.setHours(12);
			hour12.setMinutes(0);
			hour12.setSeconds(0);
			const sunTimes = SunCalc.getTimes(hour12, this.props.latitude, this.props.longitude, this.props.altitude);
			// const moonPosition = SunCalc.getMoonPosition(now, this.props.latitude, this.props.longitude, this.props.altitude);
			const moonTimes = SunCalc.getMoonIllumination(now);
			const sunRiseTime0 = sunTimes["sunrise"];
			const sunSetTime0 = sunTimes["sunset"];
			this.sunRiseTime = moment(sunRiseTime0).format("HH:mm");
			this.sunSetTime = moment(sunSetTime0).format("HH:mm");
			const moonPhase = moonTimes["phase"];
			this.moonAge = (29.5 * moonPhase).toFixed(1);
			const moonFaceImg = ["a", "2", "3", "4", "d", "6", "7", "8"][Math.floor(8 * moonPhase)];
			this.moonFace = `${twemojiSvgBase}/1f31${moonFaceImg}.svg`;
			// this.moonAngle = moonTimes.angle - moonPosition.parallacticAngle;
		}
	}
});
</script>

<style lang="scss" scoped>
.mkw-sunmoon {
	padding: 16px 0;
	display: flex;
	justify-content: center;
	align-items: center;
	&:after {
		content: "";
	}
	> .lunar-calendar {
		float: left;
		width: 40%;
		text-align: center;
		> p {
			margin: 0;
			line-height: 18px;
			font-size: 0.9em;
		}
		> .moonface {
			line-height: 72px;
			font-size: 4em;
		}
	}
	> .suntime {
		display: block;
		float: right;
		text-align: center;
		width: 60%;
		padding: 0 16px 0 0;
		box-sizing: border-box;
		> div {
			margin-bottom: 16px;
			&:last-child {
				margin-bottom: 0;
			}
			> p {
				margin: 0 0 2px 0;
				font-size: 1em;
				line-height: 18px;
			// sunrise sunset time
				> b {
					margin-left: 2px;
				}
			}
		}
	}
}
</style>
