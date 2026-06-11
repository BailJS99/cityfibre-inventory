let stock=JSON.parse(localStorage.stock||"[]"),jobs=JSON.parse(localStorage.jobs||"[]");
function toggle(){sidebar.classList.toggle("show")}
function show(id){document.querySelectorAll("section").forEach(s=>s.classList.add("hidden"));document.getElementById(id).classList.remove("hidden");sidebar.classList.remove("show");render()}
function persist(){localStorage.stock=JSON.stringify(stock);localStorage.jobs=JSON.stringify(jobs);render()}
function addItem(){stock.push({name:name.value,qty:+qty.value,thr:+thr.value,target:+target.value});persist()}
function saveJob(){jobs.push({ref:jobRef.value,item:jobItem.value,qty:+jobQty.value});let s=stock.find(x=>x.name==jobItem.value);if(s)s.qty-=+jobQty.value;persist()}
function render(){stats.innerHTML=`<div class=card>Total Items ${stock.length}</div><div class=card>Orders ${stock.filter(s=>s.qty<=s.thr).length}</div>`;stockList.innerHTML=stock.map((s,i)=>`<div class=card>${s.name} (${s.qty}) <button onclick="stock[${i}].qty++;persist()">+</button><button onclick="stock[${i}].qty--;persist()">-</button></div>`).join("");orderList.innerHTML=stock.filter(s=>s.qty<=s.thr).map(s=>`<div class=card>${s.name}: Order ${s.target-s.qty}</div>`).join("")||"No orders";jobItem.innerHTML=stock.map(s=>`<option>${s.name}</option>`).join("");jobList.innerHTML=jobs.map(j=>`<div class=card>${j.ref}: ${j.item} x${j.qty}</div>`).join("")}
show("dashboard");