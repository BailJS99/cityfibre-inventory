
let stock=JSON.parse(localStorage.stock||'[]');
let jobs=JSON.parse(localStorage.jobs||'[]');

function toggleMenu(){document.getElementById('sidebar').classList.toggle('show')}
function showPage(id){document.querySelectorAll('.page').forEach(p=>p.classList.add('hidden'));document.getElementById(id).classList.remove('hidden');document.getElementById('sidebar').classList.remove('show');render();}
function save(){localStorage.stock=JSON.stringify(stock);localStorage.jobs=JSON.stringify(jobs);render();}
function addItem(){stock.push({name:itemName.value,qty:+itemQty.value,threshold:+itemThreshold.value,target:+itemTarget.value});save();}
function saveJob(){jobs.push({ref:jobRef.value,item:jobItem.value,qty:+jobQty.value});let s=stock.find(x=>x.name===jobItem.value);if(s)s.qty-=+jobQty.value;save();}
function render(){
totalItems.textContent=stock.length;
lowStock.textContent=stock.filter(s=>s.qty<=s.threshold).length;
ordersNeeded.textContent=stock.filter(s=>s.qty<=s.threshold).length;
jobsLogged.textContent=jobs.length;
stockList.innerHTML=stock.map((s,i)=>`<div class='stock-item'><b>${s.name}</b><br>Current ${s.qty} | Threshold ${s.threshold} | Target ${s.target}<br><button onclick='stock[${i}].qty++;save()'>+</button></div>`).join('');
orderList.innerHTML=stock.filter(s=>s.qty<=s.threshold).map(s=>`<div class='card'>${s.name}: Order ${s.target-s.qty}</div>`).join('')||'<div class="card">No orders needed</div>';
jobItem.innerHTML=stock.map(s=>`<option>${s.name}</option>`).join('');
jobList.innerHTML=jobs.map(j=>`<div class='card'>${j.ref}: ${j.item} x${j.qty}</div>`).join('');
}
showPage('dashboard');
