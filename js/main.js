// cart
let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart') 

// função que abri o cart
cartIcon.addEventListener("click", () => {
    cart.classList.add("active")
})

// função que fecha o cart
closeCart.addEventListener("click", () => {
    cart.classList.remove("active")
})

// Cart feito em JS
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready)
}else{
    ready()
}

function ready(){
    // Remover itens do cart
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for(var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    // Quantidade de items
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for(var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener("change", quantityChanged)
    }

    // Adicionando cart
    var addCart = document.getElementsByClassName('add-cart')
    for(var i = 0; i < addCart.length; i++){
        var button = addCart[i]
        button.addEventListener("click", addCartClicked)
    }
    
    // adicionando evento de click no botão de compra
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked)
}

// Função comprar e redirecionar para o zap
function buyButtonClicked(){
    // alert("Seu pedido será enviado via whatsapp..")
    var title = document.getElementsByClassName("cart-product-title")[0].innerText
    var price = document.getElementsByClassName("cart-price")[0].innerText
    
    var url = ("https://api.whatsapp.com/send?phone=558699692453&text= Olá tenho interesse nesse pedido -> Nome: " + title + " Valor: " + price);

    window.open(url);   
    
    updateTotal()
}

// Remover itens do cart
function removeCartItem(event){
    var buttonCliked = event.target
    buttonCliked.parentElement.remove()
    updateTotal()
}

// adicionar ao cart
function addCartClicked(event){
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText
    var price = shopProducts.getElementsByClassName('price')[0].innerText
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src
    cart.classList.add("active")
    addProductToCart(title, price, productImg)
    updateTotal()
}

function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement("div")
    cartShopBox.classList.add("cart-box")

    var cartItems = document.getElementsByClassName("cart-content")[0]
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title")
    for(var i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
            return;
        }
    }
    var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
    <!-- Remover item -->
    <i class="bx bx-trash-alt cart-remove"></i>
`
    cartShopBox.innerHTML = cartBoxContent
    cartItems.append(cartShopBox)
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem)
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged)
}

function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateTotal()
}

// update total
function updateTotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0]
    var cartBoxes = cartContent.getElementsByClassName('cart-box')
    var total = 0
    for(var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName('cart-price')[0]
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace("R$", ""))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }

        total = Math.round(total * 100) / 100

        document.getElementsByClassName('total-price')[0].innerHTML = "R$" + total
    
}