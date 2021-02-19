
console.log("Start Index");
const { el, mount } = redom;

function CreateLink(_url,_name){
  let link_tmp = el("a", {href:_url});
  link_tmp.textContent =_name;
  return link_tmp;
}

var link_login=CreateLink("/login","Login");
var link_Signup=CreateLink("/signup","Sign Up");
var link_Forgot=CreateLink("/forgot","Forgot");
var label_guest = el("label",{id:"alias"});

label_guest.textContent = "Welcome Guest!";
var label_wip = el("label","Work in progress!");

const div_index = el("#AccessTOS", [
  link_login
  ,el("span"," ")
  ,link_Signup
  ,el("span"," ")
  ,link_Forgot
  ,el("br")
  ,label_guest
  ,el("br")
  ,label_wip
]);

mount(document.body, div_index);
// https://stackoverflow.com/questions/62936641/svelte-sapper-body-empty-on-post
fetch('/user')
  //.then((res)=>{
    //console.log(res);
    //console.log(res.json());
  //})
  .then(res => res.json())
  .then(res => {
    console.log(res);
    document.getElementById("alias").innerHTML = "Welcome "+res.alias+"!";
  }) // {email: "test"}
  .catch(function(err) {  
    console.log('Failed to fetch page: ', err);  
  });

console.log("End Index");