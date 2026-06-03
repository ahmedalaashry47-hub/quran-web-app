const api = "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1";
async function loadSurahs(){
  const res = await fetch(api+"/v1/surah.json");
  const data = await res.json();
  const div = document.getElementById("surahs");
  div.innerHTML = data.map(s=> 
    `<div class="surah" onclick="loadAyah(${s.id})">${s.id}. ${s.name}</div>`
  ).join("");
  
  document.getElementById("search").oninput = e=>{
    const q = e.target.value;
    document.querySelectorAll(".surah").forEach(el=>{
      el.style.display = el.textContent.includes(q) ? "block" : "none";
    });
  }
}
async function loadAyah(id){
  const res = await fetch(`${api}/v1/${id}.json`);
  const data = await res.json();
  document.getElementById("ayah").innerText = data.text.join(" ﴿")+" ﴾";
  document.getElementById("player").src = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${id}.mp3`;
}
loadSurahs();
