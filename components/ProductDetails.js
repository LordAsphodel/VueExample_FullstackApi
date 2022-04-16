app.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template:
  /*html*/
  `
	<div>
		<p class="mainTextClass">Contains</p>
		<ul class="containsClass">
			<li v-for="(item,index) in details" class="boldText">{{item.Material}} - {{item.Part}}%</li>
		</ul>
	</div>
  `
})