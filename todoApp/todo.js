let userAuth=sessionStorage.getItem("user");
if(userAuth==null){
    window.location.href="http://127.0.0.1:5500/login.html";
}
//logout coding
let logBtn=document.querySelector("#log-btn");
logBtn.onclick=()=>{
    sessionStorage.removeItem("user");
    window.location.href="http://127.0.0.1:5500/login.html";
}
let userName=document.querySelector(".user-name");
let user=JSON.parse(sessionStorage.getItem("user"));
console.log(user.email);
let User=user.email.split('@')[0];
userName.innerHTML="Welcome"+" "+User;


let todoForm=document.querySelector(".todo-form");
let todoInput=todoForm.querySelector("INPUT")
let todoBtn=document.querySelector("#btn");
let todpResult=document.querySelector(".result");
let todoUpdate=todoForm.querySelector("#update-btn")

const fetchData=(key)=>{
    if(localStorage.getItem(key)!=null){
        data=JSON.parse(localStorage.getItem(key));
        return data;
    }
    else{
        return [];
    }
}

let allTodo=[];
allTodo=fetchData(User+"__allTodo")

//create todo
todoForm.onsubmit=(e)=>{
        e.preventDefault();
    if(todoInput.value!=""){
            let data={
            createdAt:new Date(),
            todo:todoInput.value
        }
        allTodo.unshift(data);
        localStorage.setItem(User+"__allTodo",JSON.stringify(allTodo));
        alert("todo created");
        getTodo();
        todoForm.reset("");
    }else{
        alert("first enter todo");
    }
}


//format date function

const formatDate=(cur_date)=>{
    let date=new Date(cur_date);
    let y=date.getFullYear();
    let m=date.getMonth()+1;
    let d=date.getDate();
    let time=date.toLocaleTimeString();
    d=d<10?"0"+d:d;
    m=m<10?"0"+m:m;
    return `${d}-${m}-${y} ${time}`;
}

//get all todo
const getTodo=()=>{
    todpResult.innerHTML="";
    allTodo.forEach((data,index)=>{
    let dataStr=JSON.stringify(data);
    finaldata=dataStr.replace(/"/g,"'");    
    todpResult.innerHTML+=`
    <div class="todo">
        <h4>${data.todo}<br><span style="color:dimgrey;font-size: 12px;">createdAt ${formatDate(data.createdAt)}</span></h4>
        <div>
        <button id="delete" index="${index}">delete</button>
        <button id="edit" index="${index}" data="${finaldata}">edit</button>
        </div>
        
    </div>
    <hr style="background-color:dimgrey"/>
    `
  })
  action();
}


const action=()=>{
    //delete todo coding
    let allDelBtn=todpResult.querySelectorAll("#delete");
    for(let btn of allDelBtn){
        btn.onclick=()=>{
            let index=btn.getAttribute("index");
            let confirm=window.confirm("Are you sure to delete todo?")
            if(confirm){
                allTodo.splice(index,1);
                localStorage.setItem(User+"__allTodo",JSON.stringify(allTodo));
                alert("todo delete success")
                getTodo();
                updateText();
            }else{
                alert("todo is safe");
            }
        }
    }

    //update todo coding
     let allEditBtn=todpResult.querySelectorAll("#edit");
     for(let btn of allEditBtn){
        btn.onclick=(e)=>{
            let index=btn.getAttribute('index');
            let dataStr=btn.getAttribute("data");
            finaldata=dataStr.replace(/'/g,'"');
            let data=JSON.parse(finaldata);
            todoInput.value=data.todo;
            todoBtn.style.display="none";
            todoUpdate.style.display="block";
                todoContainer.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            todoUpdate.onclick=()=>{
                let data={
                    createdAt:new Date(),
                    todo:todoInput.value
                }
                allTodo[index]=data;
                localStorage.setItem(User+"__allTodo",JSON.stringify(allTodo));
                alert("todo updated succesfully");
                todoForm.reset("");
                todoBtn.style.display="block";
                todoUpdate.style.display="none";
                getTodo();
                todoContainer.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }


        }
     }
}


getTodo()

//dark and light mode

let toggleBtn=document.querySelector("#toggleBtn");
let todoContainer=document.querySelector(".todo-container");
toggleBtn.onclick=()=>{
    document.body.classList.toggle("action");
    todoContainer.classList.toggle("action");
}

const updateText=()=>{
    if(allTodo.length<=0){
    h2=document.createElement("H2");
    h2.innerHTML="There is no todo yet";
    h2.style.textAlign="center";
    todpResult.append(h2);
}
}
window.onload=()=>{
    updateText();
}


