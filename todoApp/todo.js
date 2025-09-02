let userAuth=sessionStorage.getItem("user");
if(userAuth==null){
    window.location.href="http://127.0.0.1:5500/login.html";
}


//toast messge configure message


function showToast(type, title, message) {
  let config = {
    title: title,
    message: message,
    position: 'topRight',
    backgroundColor:type==="success"?"green":"yellow"
  };

  // Type ke according iziToast function call
  if (type === "success") {
    iziToast.success(config);
  } else if (type === "error") {
    iziToast.error(config);
  } else if (type === "info") {
    iziToast.info(config);
  } else if (type === "warning") {
    iziToast.warning(config);
  } else {
    iziToast.show(config); // fallback
  }
}




//logout coding
let logBtn=document.querySelector("#log-btn");

logBtn.onclick = () => {
  iziToast.question({
    timeout: false,
    close: false,
    overlay: true,
    displayMode: 'once',
    title: 'Confirm Logout',
    message: 'Are you sure you want to logout?',
    position: 'center',
    buttons: [
      [
        '<button><b>YES</b></button>',
        function (instance, toast) {
          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

          // ✅ Session clear
          sessionStorage.removeItem("user");

          // Success toast
          iziToast.success({
            title: 'Logged Out',
            message: 'You have been logged out successfully!',
            position: 'topRight'
          });

          // Redirect after short delay
          setTimeout(() => {
            window.location.href = "http://127.0.0.1:5500/login.html";
          }, 1000);
        },
        true
      ],
      [
        '<button>NO</button>',
        function (instance, toast) {
          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

          iziToast.info({
            title: 'Cancelled',
            message: 'You are still logged in 😊',
            position: 'topRight'
          });
        }
      ]
    ]
  });
};




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

todoForm.onsubmit=(e)=>{
        e.preventDefault();
    if(todoInput.value!=""){
            let data={
            createdAt:new Date(),
            todo:todoInput.value
        }
        allTodo.unshift(data);
        localStorage.setItem(User+"__allTodo",JSON.stringify(allTodo));
        showToast("success","todo created successfully","success");
        getTodo();
        todoForm.reset("");
    }else{
        showToast("Warning","first write todo!","warning");
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
        <h4>${data.todo} <br><span style="color:dimgrey;font-size: 12px;">createdAt ${formatDate(data.createdAt)}</span></h4>
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


// delete todo coding
let allDelBtn = todpResult.querySelectorAll("#delete");

for (let btn of allDelBtn) {
  btn.onclick = () => {
    let index = btn.getAttribute("index");

    iziToast.question({
      timeout: false,
      close: false,
      overlay: true,
      displayMode: 'once',
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this todo?',
      position: 'center',
      buttons: [
        [
          '<button><b>YES</b></button>',
          function (instance, toast) {
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

            // ✅ Delete logic
            allTodo.splice(index, 1);
            localStorage.setItem(User + "__allTodo", JSON.stringify(allTodo));
            getTodo();
            updateText();

            // Success toast
            iziToast.success({
              title: 'Deleted',
              message: 'Todo deleted successfully!',
              position: 'topRight'
            });
          },
          true
        ],
        [
          '<button>NO</button>',
          function (instance, toast) {
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

            // Cancel info toast
            iziToast.info({
              title: 'Cancelled',
              message: 'Your todo is safe 😊',
              position: 'topRight'
            });
          }
        ]
      ]
    });
  };
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
                showToast("success","todo updated succesfully","success")
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



let search=document.querySelector("#search");

search.oninput=()=>{
    searchTodo();
}

const searchTodo = () => {
    let value = search.value.toLowerCase(); // input value
    let todos = todpResult.querySelectorAll('.todo'); // sab todo items

    for (let i = 0; i < todos.length; i++) {
        let h4 = todos[i].querySelector('h4'); // ek todo ka h4 title
        let text = h4.innerText.toLowerCase();

        if (text.includes(value)) {
            todos[i].style.display = "";   // pura todo dikhana
        } else {
            todos[i].style.display = "none"; // pura todo hide karna
        }
    }
};



