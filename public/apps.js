const API_URL = 'http://localhost:3000';


const apps = new Vue({
  el: '#apps',
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
       },
        
     handleDeleteclick(item) {
      
         const cartItem = this.cart.find(cartItem => cartItem.id === item.id);

           if(item.quantity > 1) {
             fetch(`${API_URL}/cart/${item.id}`, {
              method: 'PATCH',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({quantity: item.quantity - 1})
             }).then((response) => response.json())
             .then((updated) => {
              const itemIdx = this.cart.findIndex(cartItem => cartItem.id === item.id);
              Vue.set(this.cart, itemIdx, updated);
             });
         } else {
             fetch(`${API_URL}/cart/${item.id}`, {
              method: 'DELETE',
             })
             .then(() => {
                this.cart = this.cart.filter((cartItem) => cartItem.id !== item.id) 
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
//         subtotal() {
//             return item.price * item.quantity;
//         },
        
        totalAmount() {
            return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        }
    }
    
});