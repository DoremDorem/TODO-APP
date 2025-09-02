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
                alert("signup success");
                signupForm.reset("");
            },3000)
        }
        else{
            alert("user already exist")
        }
    }
    else{
        alert("please fill all the fields")
    }
    
    
}