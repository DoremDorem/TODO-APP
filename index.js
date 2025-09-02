//signup coding
let signupForm=document.querySelector(".signup-form");
let allSignupInput=signupForm.querySelectorAll("INPUT");
let signupBtn=document.querySelector("#signup-btn");
let allSignupData=[];
if(localStorage.getItem("allSignupData")!=null){
    allSignupData=JSON.parse(localStorage.getItem("allSignupData"))
}
signupForm.onsubmit=(e)=>{
    e.preventDefault();
    if(allSignupInput[0].value!="" && allSignupInput[1].value!="" && allSignupInput[2].value!=""){
        let data={};
        let checkEmail=allSignupData.find((data)=>data.email===allSignupInput[1].value);
        if(checkEmail===undefined){
            for(let el of allSignupInput){
                let key=el.name;
                data[key]=el.value;
            }
            signupBtn.innerHTML="please wait......";
            setTimeout(()=>{
                signupBtn.innerHTML="Signup";
                allSignupData.push(data);
                localStorage.setItem("allSignupData",JSON.stringify(allSignupData))
                signupForm.reset("");
                iziToast.success({
                    title: 'Success',
                    message: 'registeration successfully done!',
                    position: 'topRight' // topRight, bottomRight, bottomLeft, center
                });
            },3000)
        }
        else{
           iziToast.warning({
            title: 'Error',
            message: 'User already Exist!',
            position: 'topRight' // topRight, bottomRight, bottomLeft, center
        });
        }
    }
    else{
        iziToast.error({
            title: 'Error',
            message: 'All field is required!',
            position: 'topRight' // topRight, bottomRight, bottomLeft, center
        });
    }
    
    
}