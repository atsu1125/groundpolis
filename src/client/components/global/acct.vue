<<<<<<< HEAD:src/client/components/global/acct.vue
<template>
<span class="mk-acct">
	<span class="name">@{{ user.username }}</span>
	<span class="host" v-if="user.host || detail || $store.state.showFullAcct">@{{ user.host || host }}</span>
=======
<template functional>
<span class="mk-acct" v-once>
	<span class="name">@{{ props.user.username }}</span>
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109:src/client/components/acct.vue
</span>
</template>

<script lang="ts">
<<<<<<< HEAD:src/client/components/global/acct.vue
import { defineComponent } from 'vue';
import { toUnicode } from 'punycode';
import { host } from '@/config';

export default defineComponent({
=======
import Vue from 'vue';

export default Vue.extend({
	name: 'MkAcct',
>>>>>>> 5819cf375277c06540c217ca14e69d9cf55e5109:src/client/components/acct.vue
	props: ['user', 'detail'],
});
</script>
