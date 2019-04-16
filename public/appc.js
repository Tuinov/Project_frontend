const API_URL = 'http://localhost:3000';

//Vue.component('product-item', {
//  props: ['item'],
//  template: `
//    <div>
//      <h3>{{ item.name }}</h3>
//      <span>{{ item.price }}</span>
//      <button @click="handleBuyClick(item)">Buy</button>
//    </div>
//  `,
//  methods: {
//    handleBuyClick(item) {
//      this.$emit('onBuy', item);
//    }
//  }
//});
//
//Vue.component('products', {
//  props: ['query'],
//  template: `
//    <div>
//      <div class="goods" v-if="filteredItems.length">
//        <product-item @onBuy="handleBuyClick" v-for="item in filteredItems" :item="item"></product-item>
//      </div>
//      <div v-if="!filteredItems.length" class="empty">Ничего не найдено</div>
//    </div>
//  `,
//  data() {
//    return {
//      items: [],
//    }
//  },
//  methods: {
//    handleBuyClick(item) {
//      this.$emit('onbuy', item);
//    }
//  },
//  computed: {
//    filteredItems() {
//      const regexp = new RegExp(this.query, 'i');
//      return this.items.filter((item) => regexp.test(item.name))
//    },
//  },
//  mounted() {
//    fetch(`${API_URL}/products`)
//      .then((response) => response.json())
//      .then((items) => {
//        this.items = items;
//      });
//  }
//});
//
//Vue.component('search', {
//  template: `<div>
//      <input type="text" v-model="searchQuery" />
//      <button @click="handleSearchClick">Поиск</button>
//    </div>
//  `,
//  data() {
//    return {
//      searchQuery: '',
//    };
//  },
//  methods: {
//    handleSearchClick() {
//      this.$emit('onsearch', this.searchQuery);
//    }
//  }
//});
//
//Vue.component('cart', {
//  props: ['cart', 'total'],
//  template: `
//    <div>
//      <ul v-if="cart.length">
//        <li v-for="item in cart">
//          {{ item.name }} ({{ item.quantity }}) <button @click="handleDeleteClick(item)">x</button>
//        </li>
//      </ul>
//      <div v-if="cart.length">Общая сумма товаров в корзине: {{total}}</div>
//      <div v-if="!cart.length">Корзина пуста</div>
//    </div>
//  `,
//  methods: {
//    handleDeleteClick(item) {
//      this.$emit('ondelete', item);
//    }
//  }
//});

const appc = new Vue({
  el: '#appc',
  data: {
    cart: [],
    items: [],
    display: 'none',  
    searchQuery: '', 
    total: 0,  
  },
    
    methods: {
       handleclick(item) {
//           console.log(item.id);
           
            const cartItem = this.cart.find(cartItem => cartItem.id === item.id);
           if(cartItem) {
             fetch(`${API_URL}/cart/${item.id}`, {
              method: 'PATCH',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({quantity: cartItem.quantity + 1})
             }).then((response) => response.json())
             .then((updated) => {
              const itemIdx = this.cart.findIndex(cartItem => cartItem.id === item.id);
              Vue.set(this.cart, itemIdx, updated);
             });
           } else {
              fetch(`${API_URL}/cart`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...item, quantity: 1}),
              }).then((response) => response.json())
                .then((created) => {
                  this.cart.push(created);
                });
           }
       } 
    },
    
    mounted(){
        fetch('http://localhost:3000/products')
         .then((response) => response.json())
         .then((items) => {
          this.items = items;
          
          this.display = 'block';
            console.log(this.filteredItems);
    });
        fetch(`${API_URL}/cart`)
         .then((response) => response.json())
            .then((items) => {
              this.cart = items;
            }); 
            
    
    },
     computed: {
        filteredItems() {
            const regexp = new RegExp(this.searchQuery, 'i');
            return this.items.filter((item) => regexp.test(item.name));
        },
        
        totalAmount() {
            return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        }
    }
    
});