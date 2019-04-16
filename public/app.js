const API_URL = 'http://localhost:3000';


Vue.component('products', {
  props: ['item'],
  template: `
    <div class="productsWrap">
        <div class="product" v-for="item in items" :item="item">
           <img :src="item.image" alt="">
           <p>{{ item.name }}</p> <br><span>{{ item.price }}</span>
        </div> 
    </div>`,
  data() {
    return {
      items: [],
    }
  },
  methods: {
    handleBuyClick(item) {
      this.$emit('onbuy', item);
    }
  },

  mounted() {
    fetch(`${API_URL}/products`)
      .then((response) => response.json())
      .then((items) => {
        this.items = items;
      });
  }
});


const app = new Vue({
  el: '#app',
  data: { 
  },
    
});