let mainSection = document.getElementById('products')
let api = `https://weary-bee-train.cyclic.app/kids`

let cart_item = JSON.parse(localStorage.getItem('cart-item'))||[]

let wish_list = JSON.parse(localStorage.getItem('wish-item'))||[]

window.addEventListener('load', ()=>{
    fetchUser(api)
})
    
function fetchUser(url){
    
      fetch(url)
          .then((ele)=>{
            return ele.json()
          })
          .then((data)=>{
            console.log(data)
            let cardList = getCardList(data)
            mainSection.append(cardList)
          })
          .catch((error)=>{
           console.log('error')
          })
          
}

function getCardList(data){


        mainSection.innerHTML = null
        let cardList = document.createElement('div')
        cardList.classList.add('card-list')

        data.forEach((ele)=>{

            if(ele.user_category_section=='jeans'){

                if(ele.id==47){
                    ele.avatar = 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1678796009_1176010.jpg?format=webp&w=300&dpr=1.3'
                }
                else{

                    let card = getCard(
                        ele.id,
                        ele.avatar,
                        ele.name,
                        ele.price,
                        ele.user_category
    
                    )
                    cardList.append(card)

                }

                
            }
        })
        
        return cardList
}



function getCard(id,img,name,price,cat){

    let card = document.createElement('div')
    card.classList.add('card')
    card.setAttribute('data-id', id)

    let heart = document.createElement('i')
    heart.setAttribute('class','fa-regular fa-heart')
    heart.setAttribute('id','heart')
    
  
    let cardImg = document.createElement('div')
    cardImg.classList.add('card-img')
  
    let image = document.createElement('img')
    image.src = img
    image.style.width='100%'
    console.log(id)
    
  
    let cardBody = document.createElement('div')
    cardBody.classList.add('card-body')

    let cardDesc = document.createElement('div')
    cardDesc.setAttribute('class','card-desc')
    
    let title = document.createElement('p')
    title.classList.add('card-title')
    title.innerText = name

   
  
    let cost = document.createElement('div')
    cost.classList.add('card-price')
    cost.innerText = price
    
    let category = document.createElement('p')
    category.innerText = cat
    category.classList.add('category')

   

    let cardBtn = document.createElement('div')
    cardBtn.setAttribute('class','card-btn')

    let cart = document.createElement('i')
    cart.setAttribute('class','fa-solid fa-bag-shopping')
    cart.classList.add('btn')
    cart.style.color='rgba(219, 48, 82, 1)'
    

    cardBtn.append(cart)
    cardDesc.append(title,cost,category)
    cardBody.append(cardDesc,cardBtn)
    cardImg.append(image)
    card.append(cardImg,cardBody,heart)

    heart.addEventListener('click',()=>{


        if(check2(id)){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'PRODUCT ALREADY WISHLIST',
          
          })
        }
        else{
          let obj ={
            id:id,
            image:img,
            title:name,
            price:price,
            category:cat
          }
    
          wish_list.push(obj)
          localStorage.setItem('wish-item', JSON.stringify(wish_list))
  
          Swal.fire({
            //   position: 'top-end',
              icon: 'success',
              title: 'PRODUCT ADDED TO WISHLIST',
              showConfirmButton: false,
              timer: 2000
            })
  
        }
        
      })
  
      cart.addEventListener('click', () => {
  
  
        if(check(id)){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'PRODUCT ALREADY IN CART',
          
          })
        }
        else{
          let obj ={
            id:id,
            image:img,
            title:name,
            price:price,
            category:cat
          }
    
          cart_item.push(obj)
          localStorage.setItem('cart-item', JSON.stringify(cart_item))
  
          Swal.fire({
            //   position: 'top-end',
              icon: 'success',
              title: 'PRODUCT ADDED TO CART',
              showConfirmButton: false,
              timer: 2000
            })
  
        }
        
       
        
        });
    return card
}

function check(id){

    for (let i = 0; i < cart_item.length; i++) {
        if (Number(cart_item[i].id) == Number(id)) {
          return true;
        }
      }
      return false;
}

function check2(id){

  for (let i = 0; i < wish_list.length; i++) {
      if (Number(wish_list[i].id) == Number(id)) {
        return true;
      }
    }
    return false;
}