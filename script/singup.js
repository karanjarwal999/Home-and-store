let loginform=document.getElementById('loginBox')
let inputmessage=document.getElementById('inputmessage')

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
