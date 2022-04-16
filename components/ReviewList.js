app.component('review-list',{
	props:{
		reviews:{
			type: Array,
			required: true
		}
	},
	template:
	/*html*/
	`
	<div class="review-container">
	  <h3>Reviews:</h3>
		<p v-if="!reviews.length">No reviews yet. Be the first one to review!</p>
	    <ul>
	      <li v-for="(review, index) in reviews" :key="index">
	        <span class="boldText">{{ review.name }}</span> gave this <span class="boldText">{{ review.rating }}</span> stars
	        <br/>
	        <em>"{{ review.review }}"</em>
	        <br/>
	        Recommended: <span class="boldText"> {{ review.recommend }} </span>
	      </li>
	    </ul>
	  </div>
	`
})