
    const $add = document.querySelector('#add');
   
    const $searchQuery1 = document.querySelector('#searchQuery1');
    const $searchQuery2 = document.querySelector('#searchQuery2');
     

    $add.addEventListener('click', () => {
       const name = $searchQuery1.value;
       let phone = $searchQuery2.value 
  
      const phoneRegex = /\d{11}/;
        
        if(!phoneRegex.test(phone)){
            alert('Введите телефон в формате 11 цифр');
           
            
        } else {
          fetch('http://localhost:3000/users', {
        method: 'POST',
        body: JSON.stringify({ name, phone }),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((response) => response.json())
      .then((user) => {
        alert('User has been created');
      });  
        }
      
      
    });

   
      
      
     