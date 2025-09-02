//get signup detail from localstorage
let allSignupData=[];
if(localStorage.getItem("allSignupData")!=null){
    allSignupData=JSON.parse(localStorage.getItem("allSignupData"))
}

let loginForm=document.querySelector(".login-form");
let loginInput=loginForm.querySelectorAll("INPUT");
let loginBtn=document.querySelector("#login-btn");

loginForm.onsubmit=(e)=>{
    e.preventDefault();
    let checkEmail=allSignupData.find((data)=>data.email==loginInput[0].value);
    let checkPassword=allSignupData.find((data)=>data.password==loginInput[1].value);
    if(loginInput[0].value!="" && loginInput[1].value!=""){
       if(checkEmail!==undefined){
          if(checkPassword!==undefined){
              loginBtn.innerHTML="please wait....."
              setTimeout(()=>{
                  loginBtn.innerHTML="Login"
                  window.location.href="http://127.0.0.1:5500/todoApp/index.html";
                  sessionStorage.setItem("user",JSON.stringify(checkEmail));
              },3000) 
          }
          else{
            iziToast.error({
            title: 'Error',
            message: 'invalid credentials',
            position: 'topRight' // topRight, bottomRight, bottomLeft, center
        });
          }
       }else{
        iziToast.error({
            title: 'Error',
            message: 'invalid credentials',
            position: 'topRight' // topRight, bottomRight, bottomLeft, center
        });
       }
    }else{
        iziToast.error({
            title: 'Error',
            message: 'All field is required!',
            position: 'topRight' // topRight, bottomRight, bottomLeft, center
        });
    }
}