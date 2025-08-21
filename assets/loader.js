
(async function(){
  const fallbackHeader = `<div class="nav">
  <div class="container bar">
    <a class="brand" href="index.html">
      <img alt="Premium Atlas Chemical Industries Co. logo" src="assets/logo.png"/>
      Premium Atlas Chemical Industries Co.
    </a>
    <button class="menu-btn" aria-label="Toggle menu">☰</button>
    <div class="navlinks">
      <a href="index.html">Home</a>
      <a href="products.html">Products</a>
      <a href="industries.html">Industries</a>
      <a href="manufacturing.html">Manufacturing</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
    </div>
  </div>
</div>`;
  const fallbackFooter = `<footer>
  <div class="container wrap">
    <div class="brand">
      <img src="assets/logo.png" alt="logo"/>
      <div>
        <div style="font-weight:800">Premium Atlas Chemical Industries Co.</div>
        <div class="muted">Specialty Chemicals • Fertilizer Additives • Oil & Gas Descalers</div>
        <p style="margin:.5rem 0 0"><a href="mailto:info@atlaschemco.com">info@atlaschemco.com</a><br/>+966 —</p>
      </div>
    </div>
    <div>
      <strong>Company</strong><br/>
      <a href="products.html">Products</a><br/>
      <a href="industries.html">Industries</a>
      <a href="manufacturing.html">Manufacturing</a><br/>
      <a href="about.html">About</a><br/>
      <a href="contact.html">Contact</a><br/>
      <a href="assets/Premium-Atlas-Catalog.pdf" download>Download Catalog (PDF)</a>
    </div>
    <div>
      <strong>Address</strong>
      <p style="margin-top:6px">Building No. 3748, Al Taqwa St.<br/>Al Khadamat Al Musanida Dist., 34341<br/>Dammam, Kingdom of Saudi Arabia</p>
    </div>
  </div>
  <div class="container" style="padding:10px 0;border-top:1px solid #0f2b1e">
    <small>© <span id="y"></span> Premium Atlas Chemical Industries Co. All rights reserved.</small>
  </div>
  <script>document.getElementById('y').textContent = new Date().getFullYear()</script>
</footer>`;
  async function inject(id, file, fallback){
    const el = document.getElementById(id);
    if(!el) return;
    try{
      const res = await fetch(file, {cache:'no-store'});
      if(!res.ok) throw new Error('fetch failed');
      el.innerHTML = await res.text();
    }catch(e){
      el.innerHTML = fallback;
    }
  }
  await inject("site-header", "partials/header.html", fallbackHeader);
  await inject("site-footer", "partials/footer.html", fallbackFooter);
  const nav = document.querySelector('.nav');
  const btn = document.querySelector('.menu-btn');
  if(btn){ btn.addEventListener('click', ()=> nav.classList.toggle('open')); }
})();
