const BASE_PATH = "/igreja-missa-go/";
const WEEKDAYS = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];
let allData = {churches:[],events:[]};
const $ = id => document.getElementById(id);
const safe = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function dateBR(iso){const d=new Date(iso+"T12:00:00");return d.toLocaleDateString("pt-BR",{day:"2-digit",month:"long",year:"numeric"});}
function renderChurches(){
 const q=$("search").value.trim().toLocaleLowerCase("pt-BR"), n=$("neighborhood").value.trim().toLocaleLowerCase("pt-BR"), day=$("day").value;
 const rows=allData.churches.filter(c=>(`${c.name} ${c.neighborhood} ${c.address}`.toLocaleLowerCase("pt-BR").includes(q))&&(!n||String(c.neighborhood||"").toLocaleLowerCase("pt-BR").includes(n))&&(!day||(c.masses||[]).some(m=>m.day===day)));
 $("count").textContent=`${rows.length} local(is)`;
 $("churches").innerHTML=rows.length?rows.map(c=>{const masses=(c.masses||[]).filter(m=>!day||m.day===day);return `<article class="church"><span class="tag">${safe(c.kind||"Comunidade católica")}</span><h3>${safe(c.name)}</h3><p class="location">⌖ ${safe(c.neighborhood||"Campinas")} · ${safe(c.address||"Endereço a confirmar")}</p><div class="times">${masses.length?masses.map(m=>`<span class="time">${safe(m.day)} · ${safe(m.time)}</span>`).join(""):'<span class="time">Horários a confirmar</span>'}</div>${c.source?`<a href="${safe(c.source)}" target="_blank" rel="noopener">Canal oficial ↗</a>`:""}</article>`}).join(""):'<p class="empty">Nenhum local encontrado. Tente outro termo ou remova os filtros.</p>';
}
function renderEvents(){
 const today=new Date();today.setHours(0,0,0,0);
 const events=allData.events.filter(e=>new Date(e.date+"T12:00:00")>=today).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,9);
 $("events").innerHTML=events.length?events.map(e=>`<article class="event"><div class="event-date">${safe(dateBR(e.date)).toLocaleUpperCase("pt-BR")}</div><h3>${safe(e.name)}</h3><p>${safe(e.description||"Data do calendário católico.")}</p>${e.url?`<p><a href="${safe(e.url)}" target="_blank" rel="noopener">Ver publicação ↗</a></p>`:""}</article>`).join(""):'<p class="empty">Não há datas futuras cadastradas.</p>';
}
async function init(){try{const r=await fetch("data.json",{cache:"no-store"});if(!r.ok)throw Error("Não foi possível carregar os dados");allData=await r.json();const now=new Date();$("today-date").textContent=now.toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long",year:"numeric"});const todays=allData.events.filter(e=>e.date===now.toLocaleDateString("en-CA"));if(todays.length)$("today-title").textContent=todays.map(e=>e.name).join(" • ");renderChurches();renderEvents();}catch(e){$("churches").innerHTML='<p class="empty">Não foi possível carregar os dados. Atualize a página em instantes.</p>';}}
["search","day","neighborhood"].forEach(id=>$(id).addEventListener(id==="search"||id==="neighborhood"?"input":"change",renderChurches));
init();
