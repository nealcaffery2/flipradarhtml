(function loadNav(){
  const el = document.getElementById("nav-placeholder");
  fetch("/nav.html").then(r=>r.text()).then(html=>{
    el.innerHTML = html;

    // highlight active tab
    const path = window.location.pathname;
    document.querySelectorAll(".tabs a").forEach(a=>{
      a.classList.toggle("active", a.getAttribute("href") === path);
    });

    // dark mode toggle
    const key="fr_darkmode";
    const apply=(on)=>{ document.body.classList.toggle("dark",!!on); localStorage.setItem(key,on?"1":"0"); };
    apply((localStorage.getItem(key)||"0")==="1");
    document.getElementById("darkToggle")?.addEventListener("click", ()=>apply(!document.body.classList.contains("dark")));

    // profile/hamburger menu
    const menu=document.getElementById("profileMenu");
    const avatar=document.getElementById("avatar");
    const burger=document.getElementById("hamburgerBtn");
    const toggle=()=>{ if(menu) menu.style.display=(menu.style.display==="block"?"none":"block"); };
    avatar?.addEventListener("click", toggle);
    burger?.addEventListener("click", toggle);
    document.addEventListener("click",(e)=>{
      if(!menu) return;
      const inside = menu.contains(e.target) || avatar?.contains(e.target) || burger?.contains(e.target);
      if(!inside) menu.style.display="none";
    });
  });
})();
