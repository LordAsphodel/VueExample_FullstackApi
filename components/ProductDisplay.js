app.component('product-display', {
	props: {
		premium: {
			type: Boolean,
			requiered: true,
		}
	},
	template:
		/*html*/
		`<div class="product-display">
			<div class="product-container">
		
				<div class="product-image">
					<div :class="[!enableCartAdd ? 'out-of-stock-img' : '']">
						<a :href="imgUrl"><img :src="image" :alt="description"></a>
					</div>						
					
					<div>
						<button class="button" :class="{ disabledButton: !enableCartAdd }" :disabled="!enableCartAdd" @click="addToCart">Add to cart</button>
						<button class="button" @click="removeFromCart" :disabled="!enableCartAdd" :class="{ disabledButton: !enableCartAdd }">Remove from cart</button>
					</div>						
				</div>
		
				<div class="product-info">
					<h1>{{ title }} <span class="onSaleClass" id="onSaleID"> {{ onSaleString }}</span></h1>
					<p>{{ description }}</p>
		
					<product-details :details="containsMaterial"></product-details>
		
					<div>
						<p class="mainTextClass">Colors</p>
						<ul>
							<li v-for="(item,index) in sockColors" :key="item.colorID" class="boldText colorClass" @mouseover="changeData(index)"><span class="color-circle" :style="{ backgroundColor: item.color, color: item.color }">O0</span>{{item.color}}</li>
						</ul>
					</div>
					
					<div>
						<p class="mainTextClass">Sizes</p>
						<ul class="containsClass">
							<li v-for="(item,index) in sockSizes" :key="item.sizeID" class="boldText">{{item.size}}</li>
						</ul>
					</div>
					<p>Availibility: <span :class="inStockStateClass">{{ inStockState }} ({{ inventory }} pieces)</span></p>

					<p>Price: <span class="boldText">{{ price.itemPrice }} {{ currency }} </span></p>
					<p>Shipping: <span class="boldText">{{ shipping }} </span></p>
				</div>
			</div>
			
			<div class='review-box'>
				<div>
					<review-list :reviews="reviews"></review-list>
				</div>
				<div> 
					<review-form @review-submitted="addReview"></review-form>
				</div>
			</div>
			
			Products: {{ http_response[response_item] }}<br>
			Reviews: {{ reviews_response }}
		</div>`,
	data() {
		return {
			product: 'Socks',
			brand: "D&G",
			description: 'A warm fuzzy pair of socks.',
			onSale: true,
			onSaleString: '',
			inStockState: 'In Stock',
			inStockStateClass: 'fullStockClass',
			inStockStateClassEnum: ['fullStockClass', 'lowStockClass', 'outOfStockClass'],
			inventory: 15,
			lowQuantity: 10,
			selectedColor: 0,
			containsMaterial: [{
					Material: 'Cotton',
					Part: 50
				},
				{
					Material: 'Wool',
					Part: 30
				},
				{
					Material: 'Polyester',
					Part: 20
				},
			],
			sockColors: [{
				colorID: 101,
				color: 'Green',
				image: './assets/images/socks_green.jpg',
				quantity: 15
			}, {
				colorID: 102,
				color: "Blue",
				image: './assets/images/socks_blue.jpg',
				quantity: 5
			}],
			sockSizes: [{
				sizeID: 201,
				size: '36-38'
			}, {
				sizeID: 202,
				size: "38-40"
			}, {
				sizeID: 203,
				size: "40-42"
			}],
			image: './assets/images/socks_green.jpg',
			imgUrl: 'https://yandex.ru/search/?lr=66&text=%D0%BD%D0%BE%D1%81%D0%BA%D0%B8',

			cartItems: 0,
			enableCartAdd: true,

			currency: 'USD',
			price: {
				itemPrice: 10,
				shippingPrice: 2.99
			},

			reviews: [],
			reviews_response: [],
			http_response: [{
				"ID": null,
				"Name": null,
				"Quantity": null,
				"Sale": null,
				"Price": null
			}],
			response_item: null
		}
	},
	mounted() {
		//url_addr ='./Requests/getData/get.php?ID=101';
		let url_addr = 'https://trdlic2.info/Test/api/product/readProducts.php';
		//let url_addr = 'https://trdlic2.info/Test/api/getData/get.php?ID=100' ;

		axios
			.get(url_addr)
			.then(response => (this.http_response = response.data.records));

		url_addr = 'https://trdlic2.info/Test/api/product/getReviews.php';

		axios
			.get(url_addr)
			.then(response => (this.reviews_response = response.data.records));

		this.reviews = this.reviews_response;
		
		setInterval(() => {
			//url_addr ='./Requests/getData/get.php?ID=101';
			let url_addr = 'https://trdlic2.info/Test/api/product/readProducts.php';
			//let url_addr = 'https://trdlic2.info/Test/api/getData/get.php?ID=100' ;
		
			axios
				.get(url_addr)
				.then(response => (this.http_response = response.data.records));
		
			url_addr = 'https://trdlic2.info/Test/api/product/getReviews.php';
		
			axios
				.get(url_addr)
				.then(response => (this.reviews_response = response.data.records));
		
			this.reviews = this.reviews_response;
		}, 100);
	},
	updated() {
		
	},
	methods: {
		addToCart() {
			this.$emit('add-to-cart', this.sockColors[this.selectedColor].colorID)
			if (this.cartItems < this.inventory) {
				this.cartItems++
			}
		},
		removeFromCart() {
			this.$emit('remove-from-cart', this.sockColors[this.selectedColor].colorID)
			if (this.cartItems > 0) {
				this.cartItems--
			}
		},
		changeData(gotIndex) {
			for (i = 0; i < 4; i++) {
				if (this.http_response[i]["ID"] == this.sockColors[gotIndex].colorID) {
					this.inventory = this.http_response[i]["Quantity"];
					this.product = this.http_response[i]["Name"];
					this.price.itemPrice = this.http_response[i]["Price"];
					this.http_response[i]["Sale"] == "true" ? onSale = true : onSale = false;
					this.response_item = i;
					if (onSale) {
						this.onSaleString = 'ON SALE!';
					} else {
						this.onSaleString = '';
					}
				}
			}
			this.image = this.sockColors[gotIndex].image

			this.selectedColor = gotIndex

			if (this.inventory > this.lowQuantity) {
				this.inStockState = "In Stock"
				this.inStockStateClass = this.inStockStateClassEnum[0]
				this.enableCartAdd = true
			} else if (this.inventory <= this.lowQuantity && this.inventory > 0) {
				this.inStockState = "Nearly sold out! Hurry up!"
				this.inStockStateClass = this.inStockStateClassEnum[1]
				this.enableCartAdd = true
			} else {
				this.inStockState = "Sold out! Out of Stock!"
				this.inStockStateClass = this.inStockStateClassEnum[2]
				this.enableCartAdd = false
			}
		},
		addReview(review) {

			let post_url = 'https://trdlic2.info/Test/api/product/sendReview.php';
			axios.post(post_url, {
					Name: review.name,
					Review: review.review,
					Rating: review.rating,
					Recommend: review.recommend
				})
				.then(function(response) {
					console.log(response);
				})
				.catch(function(error) {
					console.log(error);
				});

			url_addr = 'https://trdlic2.info/Test/api/product/getReviews.php';

			axios
				.get(url_addr)
				.then(response => (this.reviews_response = response.data.records));

			this.reviews = this.reviews_response;
		}
	},
	computed: {
		title() {
			return this.brand + ' ' + this.product
		},
		shipping() {
			if (this.premium) {
				return 'Free'
			} else {
				return this.price.shippingPrice + " " + this.currency
			}
		}
	}
})
