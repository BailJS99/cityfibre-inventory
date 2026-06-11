document.addEventListener("DOMContentLoaded",()=>{
const $=id=>document.getElementById(id);
let stock=JSON.parse(localStorage.getItem("stock")||"[]");
let jobs=JSON.parse(localStorage.getItem("jobs")||"[]");
$("menuBtn").onclick=()=>document.getElementById("sidebar").classList.toggle("open");
document.querySelectorAll("[data-page]").forEach(a=>a.onclick=()=>show(a.dataset.page));
$("addItemBtn").onclick=()=>{stock.push({name:$("itemName").value,qty:+$("itemQty").value,threshold:+$("itemThreshold").value,target:+$("itemTarget").value});save()};
$("saveJobBtn").onclick=()=>{jobs.push({ref:$("jobRef").value,item:$("jobItem").value,qty:+$("jobQty").value});save()};
function show(id){document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"));$(id).classList.remove("hidden");document.getElementById("sidebar").classList.remove("open");render();}
function save(){localStorage.setItem("stock",JSON.stringify(stock));localStorage.setItem("jobs",JSON.stringify(jobs));render();}
function render(){$("stats").innerHTML=`<div class=card>Total Items: ${stock.length}</div><div class=card>Jobs: ${jobs.length}</div>`;$("stockList").innerHTML=stock.map(s=>`<div class=card>${s.name} (${s.qty})</div>`).join("");$("orderList").innerHTML=stock.filter(s=>s.qty<=s.threshold).map(s=>`<div class=card>${s.name}: Order ${s.target-s.qty}</div>`).join("")||"<div class=card>No orders</div>";$("jobItem").innerHTML=stock.map(s=>`<option>${s.name}</option>`).join("");$("jobList").innerHTML=jobs.map(j=>`<div class=card>${j.ref}</div>`).join("");}
show("dashboard");
});