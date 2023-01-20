function movetop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

let loginform=document.getElementById('loginBox')
let inputmessage=document.getElementById('inputmessage')

function loc_hover(){
    let location=document.getElementById('location_hover')
    location.style.visibility='visible';
}
function loc_nothover(){
    let location=document.getElementById('location_hover')
    location.style.visibility='hidden'
}

let loginclick=document.getElementById('loginclick')
loginclick.style.cursor='pointer'
loginclick.addEventListener('click',function(){
    loginform.style.visibility='visible'
})

let loginsubmit=document.querySelector('#loginsubmit')
loginsubmit.addEventListener('submit',function(e){
    e.preventDefault()
    let flag=false
    let arr=JSON.parse(localStorage.getItem('loginDetails'))||[]
    arr.forEach((element) => {
        if(element.email==loginsubmit.loginemail.value&&element.password==loginsubmit.loginpassword.value){
            flag=true
        }
    });
    if(flag){
        inputmessage.style.visibility='visible'
        inputmessage.innerText='login success'
        inputmessage.style.backgroundColor='green'
        pushgreenMessage()
        loginform.style.visibility='hidden'
    }else{
        inputmessage.style.visibility='visible'
        inputmessage.innerText='wrong input'
        inputmessage.style.backgroundColor='red'
        pushredMessage()
    }
    
})

let switchloginpage=document.getElementById('switchloginpage')
switchloginpage.addEventListener('click',function(){
    console.log('k')
    window.location.href='./createAccount.html'
})

function closeForm() {
    loginform.style.visibility='hidden'
}

function pushgreenMessage() {
    setTimeout(() => {
        inputmessage.style.visibility='hidden'  
    }, 2000);
}
function pushredMessage() {
    setTimeout(() => {
        inputmessage.style.visibility='hidden'  
    }, 2000);
}

updatecartvalue()
updatelikevalue()

let cart=JSON.parse(localStorage.getItem('cart'))||[]
let like=JSON.parse(localStorage.getItem('like'))||[]
let selectprice=document.getElementById('selectprice')
let globaldata=[]
let searchinput=document.querySelector('#nav_logo>input')
searchinput.addEventListener('keypress',function(e){
    if(e.key=='Enter'){
        e.preventDefault()
        let homepage=document.getElementById('hompage')
        homepage.innerHTML=''
        fetchproduct()
        async function fetchproduct() {
            let request=await fetch('./api.json')
            let data=await request.json()
            globaldata=data.home
            homesearchproduct(globaldata)
        }

        selectprice.addEventListener('change',function(){
            filtered=globaldata.filter(element=>{
                if(selectprice.value==''){return true}
                else if (selectprice.value=='Below'){ return element.price<500}
                else if (selectprice.value=='Above'){ return element.price>500}
            })
            homesearchproduct(filtered)
           
        })

        function homesearchproduct(data) {
            selectprice.style.visibility='visible'
            let parent=document.getElementById('displaypage')
            parent.innerHTML=''
            data.forEach((element) => {
               let div=document.createElement('div') 
               let img=document.createElement('img')
               img.setAttribute('src',element.img)
               let name=document.createElement('h4')
               name.innerText=element.name
               let price=document.createElement('h4')
               price.innerText='$'+ element.price
               let button=document.createElement('button')
               button.innerText='Add To Cart'
               button.addEventListener('click',function(){
                  cart.push(element)
                  localStorage.setItem('cart',JSON.stringify(cart))
                  updatecartvalue()
               })
               let button2=document.createElement('button')
               button2.innerText='💖'
               button2.addEventListener('click',function(){
                  like.push(element)
                  localStorage.setItem('like',JSON.stringify(like))
                  updatelikevalue()
               })
               div.append(img,name,price,button,button2)
               parent.append(div)
            });
            
        }
       
    }
})
function updatecartvalue() {   
let cart=JSON.parse(localStorage.getItem('cart'))||[]
let cartelementnumber=document.getElementById('cartelementnumber')
cartelementnumber.innerText=cart.length
}
function updatelikevalue() {   
let like=JSON.parse(localStorage.getItem('like'))||[]
let likeelementnumber=document.getElementById('likeelementnumber')
likeelementnumber.innerText=like.length
}
