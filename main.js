const app = Vue.createApp({
	data() {
		return {
			cartItemsGlobal: [],
			cartItemsGlobalCount: 0,
			premium: false
		}
	},
	mounted() {

	},
	methods: {
		addCart(id) {
			this.cartItemsGlobal.push(id)
			this.cartItemsGlobalCount = this.cartItemsGlobal.length
		},
		removeCart(id) {
			const index = this.cartItemsGlobal.indexOf(id)
			if (index > -1) {
				this.cartItemsGlobal.splice(index, 1)
			}
			this.cartItemsGlobalCount = this.cartItemsGlobal.length
		}
	},
	computed: {

	}
})
