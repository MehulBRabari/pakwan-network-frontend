import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BrandLogo from "../components/BrandLogo";

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [activeCat, setActiveCat] = useState(0);
  const [visible, setVisible] = useState({});
  const [orderCount, setOrderCount] = useState(49832);
  const refs = useRef({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setVisible((p) => ({ ...p, [e.target.id]: true }));
      }),
      { threshold: 0.08 }
    );
    Object.values(refs.current).forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveStep((p) => (p + 1) % 4), 3000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setOrderCount(p => p + Math.floor(Math.random() * 3 + 1)), 4000);
    return () => clearInterval(t);
  }, []);

  const ref = (id) => (el) => { refs.current[id] = el; };
  const vis = (id) => visible[id];

  const categories = [
    { name: "Biryani", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=85&auto=format&fit=crop", count: "240+" },
    { name: "Pizza", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=85&auto=format&fit=crop", count: "180+" },
    { name: "Burgers", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=85&auto=format&fit=crop", count: "150+" },
    { name: "Sushi", img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=85&auto=format&fit=crop", count: "90+" },
    { name: "Desserts", img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=85&auto=format&fit=crop", count: "200+" },
    { name: "North Indian", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=85&auto=format&fit=crop", count: "300+" },
    { name: "Chinese", img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=85&auto=format&fit=crop", count: "120+" },
    { name: "Fast Food", img: "https://images.unsplash.com/photo-1619881590738-a111d176d906?w=400&q=85&auto=format&fit=crop", count: "280+" },
  ];

  const restaurants = [
    { name: "Royal Biryani Palace", cuisine: "Mughlai · Biryani", rating: 4.8, time: "22 min", price: "₹200 for one", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=85&auto=format&fit=crop", tag: "Bestseller", discount: "20% OFF" },
    { name: "The Pizza Co.", cuisine: "Italian · Pizza · Pasta", rating: 4.6, time: "18 min", price: "₹350 for one", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=85&auto=format&fit=crop", tag: "New", discount: null },
    { name: "Burger Republic", cuisine: "American · Burgers", rating: 4.7, time: "20 min", price: "₹250 for one", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=85&auto=format&fit=crop", tag: "Top Rated", discount: "Free Delivery" },
    { name: "Spice Garden", cuisine: "North Indian · Curry", rating: 4.5, time: "28 min", price: "₹300 for one", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=85&auto=format&fit=crop", tag: "Popular", discount: null },
  ];

  const steps = [
    { img: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=300&q=85&auto=format&fit=crop", title: "Choose Your Location", desc: "Share your location and instantly discover the best restaurants near you", num: "01" },
    { img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&q=85&auto=format&fit=crop", title: "Pick Your Meal", desc: "Browse menus, read reviews, and select your favorite dishes with ease", num: "02" },
    { img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&q=85&auto=format&fit=crop", title: "Pay Securely", desc: "UPI, cards, or Cash on Delivery — all 100% safe via Razorpay", num: "03" },
    { img: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=300&q=85&auto=format&fit=crop", title: "Track & Enjoy", desc: "Watch your delivery live on the map until it arrives at your door", num: "04" },
  ];

  const testimonials = [
    { name: "Priya Sharma", city: "Mumbai", text: "The live tracking is absolutely brilliant! I always know exactly when my food arrives. Nothing compares to this experience.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80&auto=format&fit=crop", rating: 5, orders: "120+ orders" },
    { name: "Rahul Verma", city: "Delhi", text: "Ordering from multiple restaurants in one checkout is a game changer. Perfect for our office lunch orders every day!", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80&auto=format&fit=crop", rating: 5, orders: "85+ orders" },
    { name: "Anjali Patel", city: "Ahmedabad", text: "As a restaurant owner, the dashboard is incredibly intuitive. My revenue has doubled since joining Pakwan Network!", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80&auto=format&fit=crop", rating: 5, orders: "Owner since 2024" },
  ];

  const navScrolled = scrollY > 70;

  return (
    <div style={{ fontFamily: "'Fraunces', Georgia, serif", background: "#FAFAF8", color: "#1C1507", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700;9..144,900&family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        :root {
          --o1: #F47B1F; --o2: #E8620A; --o3: #FAA040;
          --dark: #1C1507; --dark2: #2E1E08;
          --cream: #FAFAF8; --cream2: #FEF6EC; --cream3: #FDE8C8;
          --muted: #917850;
        }
        .out { font-family: 'Outfit', sans-serif; }
        .nav-glass {
          background: rgba(250,250,248,0.94);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow: 0 1px 0 rgba(244,123,31,0.1), 0 4px 32px rgba(0,0,0,0.05);
        }
        .logo-blend { mix-blend-mode: multiply; filter: saturate(1.1) contrast(1.05); }
        .btn-primary {
          background: linear-gradient(135deg, #F47B1F 0%, #E8620A 100%);
          color: #fff; border: none; border-radius: 14px; padding: 15px 32px;
          font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 15px;
          cursor: pointer; transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
          box-shadow: 0 4px 20px rgba(244,123,31,0.38);
        }
        .btn-primary:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 10px 32px rgba(244,123,31,0.48); }
        .btn-outline {
          background: transparent; color: #F47B1F; border: 2px solid rgba(244,123,31,0.5);
          border-radius: 14px; padding: 13px 30px;
          font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 15px;
          cursor: pointer; transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .btn-outline:hover { background: #F47B1F; color: white; border-color: #F47B1F; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(244,123,31,0.3); }
        .card-hover { transition: all 0.4s cubic-bezier(0.25,0.46,0.45,0.94); }
        .card-hover:hover { transform: translateY(-10px); box-shadow: 0 32px 80px rgba(0,0,0,0.16) !important; }
        .fade-up { opacity: 0; transform: translateY(48px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .fade-up.show { opacity: 1; transform: translateY(0); }
        .fade-left { opacity: 0; transform: translateX(-56px); transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1); }
        .fade-left.show { opacity: 1; transform: translateX(0); }
        .fade-right { opacity: 0; transform: translateX(56px); transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1); }
        .fade-right.show { opacity: 1; transform: translateX(0); }
        .fade-scale { opacity: 0; transform: scale(0.88); transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1); }
        .fade-scale.show { opacity: 1; transform: scale(1); }
        .dl-1{transition-delay:0.05s!important}.dl-2{transition-delay:0.12s!important}
        .dl-3{transition-delay:0.19s!important}.dl-4{transition-delay:0.26s!important}
        .dl-5{transition-delay:0.33s!important}.dl-6{transition-delay:0.40s!important}
        .dl-7{transition-delay:0.47s!important}.dl-8{transition-delay:0.54s!important}
        .hero-badge{opacity:0;transform:translateY(20px);animation:hIn 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s forwards}
        .hero-h1{opacity:0;transform:translateY(28px);animation:hIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s forwards}
        .hero-p{opacity:0;transform:translateY(24px);animation:hIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s forwards}
        .hero-search{opacity:0;transform:translateY(24px);animation:hIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.62s forwards}
        .hero-stats{opacity:0;transform:translateY(20px);animation:hIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.76s forwards}
        .hero-img-main{opacity:0;transform:scale(0.93) translateY(18px);animation:hImg 1s cubic-bezier(0.16,1,0.3,1) 0.38s forwards}
        .hero-img-bl{opacity:0;transform:scale(0.93) translateY(18px);animation:hImg 1s cubic-bezier(0.16,1,0.3,1) 0.52s forwards}
        .hero-img-br{opacity:0;transform:scale(0.93) translateY(18px);animation:hImg 1s cubic-bezier(0.16,1,0.3,1) 0.62s forwards}
        .hero-c1{opacity:0;transform:translateX(-20px);animation:hIn 0.7s cubic-bezier(0.16,1,0.3,1) 0.9s forwards}
        .hero-c2{opacity:0;transform:translateX(20px);animation:hIn 0.7s cubic-bezier(0.16,1,0.3,1) 1.0s forwards}
        .hero-c3{opacity:0;transform:translateY(18px);animation:hIn 0.7s cubic-bezier(0.16,1,0.3,1) 1.1s forwards}
        @keyframes hIn { to { opacity:1; transform:none; } }
        @keyframes hImg { to { opacity:1; transform:scale(1) translateY(0); } }
        .float-a { animation: flt 6s ease-in-out infinite; }
        .float-b { animation: flt 6s ease-in-out infinite 2s; }
        .float-c { animation: flt 6s ease-in-out infinite 1s; }
        @keyframes flt { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-13px)} }
        .live-glow { animation: lglow 2.4s ease-in-out infinite; }
        @keyframes lglow { 0%,100%{box-shadow:0 0 0 0 rgba(244,123,31,0.5)} 50%{box-shadow:0 0 0 10px rgba(244,123,31,0)} }
        .mq-inner { display:flex; animation: mq 26s linear infinite; white-space:nowrap; }
        @keyframes mq { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .shimmer-bar {
          background: linear-gradient(90deg, #F47B1F 0%, #FAA040 50%, #F47B1F 100%);
          background-size: 200% 100%;
          animation: sBar 1.8s ease-in-out infinite;
        }
        @keyframes sBar { 0%{background-position:0% 0} 100%{background-position:200% 0} }
        .gt { background: linear-gradient(135deg, #F47B1F, #E8620A); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .gt2 { background: linear-gradient(135deg, #FAA040, #F47B1F); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .srch {
          width:100%; padding:18px 20px 18px 52px; border-radius:16px;
          border:1.5px solid rgba(244,123,31,0.2); background:white;
          font-family:'Outfit',sans-serif; font-size:15px; color:#1C1507;
          outline:none; transition:all 0.3s;
          box-shadow:0 2px 16px rgba(0,0,0,0.05);
        }
        .srch::placeholder { color:#C4A07A; }
        .srch:focus { border-color:#F47B1F; box-shadow:0 0 0 4px rgba(244,123,31,0.1),0 2px 16px rgba(0,0,0,0.05); }
        .img-dark { position:absolute;inset:0;background:linear-gradient(to top,rgba(28,21,7,0.78) 0%,rgba(28,21,7,0.1) 55%,transparent 100%);border-radius:inherit; }
        .slabel { font-family:'Outfit',sans-serif;font-size:12px;font-weight:800;letter-spacing:3.5px;text-transform:uppercase;color:#F47B1F;margin-bottom:14px; }
        .divider { width:56px;height:4px;background:linear-gradient(90deg,#F47B1F,#E8620A);border-radius:3px; }
        .nl { color:#7A6040;text-decoration:none;font-family:'Outfit',sans-serif;font-size:14px;font-weight:600;transition:color 0.2s;position:relative; }
        .nl::after { content:'';position:absolute;left:0;bottom:-2px;width:0;height:2px;background:#F47B1F;border-radius:2px;transition:width 0.3s; }
        .nl:hover { color:#F47B1F; }
        .nl:hover::after { width:100%; }
        .cat-card { cursor:pointer;border-radius:20px;overflow:hidden;transition:all 0.35s cubic-bezier(0.25,0.46,0.45,0.94); }
        .cat-card:hover { transform:translateY(-8px) scale(1.02);box-shadow:0 16px 40px rgba(0,0,0,0.14)!important; }
        .cat-card img { transition:transform 0.45s ease; display:block; }
        .cat-card:hover img { transform:scale(1.1); }
        .rest-card { border-radius:22px;overflow:hidden;background:white;transition:all 0.4s cubic-bezier(0.25,0.46,0.45,0.94);cursor:pointer; }
        .rest-card:hover { transform:translateY(-10px);box-shadow:0 24px 56px rgba(0,0,0,0.13)!important; }
        .rest-card:hover .rimg { transform:scale(1.06); }
        .rimg { transition:transform 0.45s ease;width:100%;height:100%;object-fit:cover; }
        .step-card { cursor:pointer;border-radius:24px;transition:all 0.35s cubic-bezier(0.25,0.46,0.45,0.94); }
        .step-card:hover { transform:translateY(-6px); }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:#FAFAF8; }
        ::-webkit-scrollbar-thumb { background:linear-gradient(#F47B1F,#E8620A);border-radius:3px; }
        .mob-menu { position:fixed;inset:0;background:rgba(250,250,248,0.98);z-index:300;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2.4rem;backdrop-filter:blur(20px); }
        @media(max-width:960px){
          .desk{display:none!important}
          .hero-flex{flex-direction:column!important}
          .hero-right{width:100%!important;height:340px!important;margin-top:40px}
          .steps-g{grid-template-columns:1fr 1fr!important}
          .cat-g{grid-template-columns:repeat(4,1fr)!important}
          .rest-g{grid-template-columns:1fr 1fr!important}
          .feat-flex{flex-direction:column!important}
          .testi-g{grid-template-columns:1fr!important}
          .roles-g{grid-template-columns:1fr!important}
          .foot-g{flex-direction:column!important;gap:36px}
          .h1{font-size:2.8rem!important}
          .stats-r{flex-wrap:wrap!important;gap:20px!important}
        }
        @media(max-width:600px){
          .h1{font-size:2.1rem!important}
          .cat-g{grid-template-columns:repeat(2,1fr)!important}
          .steps-g{grid-template-columns:1fr!important}
          .rest-g{grid-template-columns:1fr!important}
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,padding:navScrolled?"12px 5%":"20px 5%",transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)"}} className={navScrolled?"nav-glass":""}>
        <div style={{maxWidth:1300,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <BrandLogo
            size={navScrolled ? "md" : "lg"}
            theme="light"
            tagline="The World's Finest Flavors, Connected"
            showTagline={!navScrolled}
            onClick={() => navigate("/landing")}
          />
          <div className="desk" style={{display:"flex",gap:32,alignItems:"center"}}>
            {["Home","Restaurants","How It Works","For Business","Contact"].map(l=><a key={l} href="#" className="nl">{l}</a>)}
          </div>
          <div className="desk" style={{display:"flex",gap:10}}>
            <button className="btn-outline out" style={{padding:"10px 22px",fontSize:13,borderRadius:12}} onClick={()=>navigate("/signin")}>Sign In</button>
            <button className="btn-primary out" style={{padding:"10px 22px",fontSize:13,borderRadius:12}} onClick={()=>navigate("/signup")}>Get Started →</button>
          </div>
          <button onClick={()=>setMenuOpen(!menuOpen)} style={{display:"none",background:"none",border:"none",fontSize:26,cursor:"pointer",color:"#1C1507"}} className="mob-toggle">☰</button>
        </div>
      </nav>

      {menuOpen&&(
        <div className="mob-menu">
          <button onClick={()=>setMenuOpen(false)} style={{position:"absolute",top:20,right:"5%",background:"none",border:"none",fontSize:28,cursor:"pointer"}}>✕</button>
          {["Home","Restaurants","How It Works","For Business","Contact"].map(l=><a key={l} href="#" onClick={()=>setMenuOpen(false)} style={{color:"#1C1507",textDecoration:"none",fontSize:26,fontWeight:700,fontFamily:"'Fraunces',serif"}}>{l}</a>)}
          <button className="btn-primary out" onClick={()=>navigate("/signup")}>Get Started →</button>
          <button className="btn-outline out" onClick={()=>navigate("/signin")}>Sign In</button>
        </div>
      )}

      {/* ── HERO ── */}
      <section style={{minHeight:"100vh",background:"linear-gradient(160deg,#FAFAF8 0%,#FEF6EC 45%,#FDE8C8 100%)",display:"flex",alignItems:"center",padding:"100px 5% 60px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 1px 1px,rgba(244,123,31,0.07) 1px,transparent 0)",backgroundSize:"36px 36px",pointerEvents:"none"}} />
        <div style={{position:"absolute",top:"-15%",right:"-8%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(244,123,31,0.07),transparent 65%)",pointerEvents:"none"}} />
        <div style={{position:"absolute",bottom:"-10%",left:"-5%",width:440,height:440,borderRadius:"50%",background:"radial-gradient(circle,rgba(232,98,10,0.05),transparent 65%)",pointerEvents:"none"}} />

        <div style={{maxWidth:1300,margin:"0 auto",width:"100%",display:"flex",alignItems:"center",gap:56}} className="hero-flex">
          {/* LEFT */}
          <div style={{flex:1,minWidth:0}}>
            <div className="out hero-badge live-glow" style={{display:"inline-flex",alignItems:"center",gap:8,background:"white",border:"1.5px solid rgba(244,123,31,0.22)",borderRadius:50,padding:"8px 18px",marginBottom:30,fontSize:12,color:"#E8620A",fontWeight:700,boxShadow:"0 4px 20px rgba(244,123,31,0.14)"}}>
              <span style={{width:8,height:8,borderRadius:"50%",background:"#F47B1F",flexShrink:0}} />
              Now delivering in 50+ cities across India
            </div>

            <h1 className="h1 hero-h1" style={{fontSize:"clamp(2.6rem,5.2vw,5.4rem)",fontWeight:700,lineHeight:1.04,letterSpacing:-2,marginBottom:22,color:"#1C1507"}}>
              The World's Finest<br />
              Flavors, <span className="gt">Delivered</span><br />
              <span style={{fontStyle:"italic",fontWeight:400,fontSize:"0.7em",color:"#917850",letterSpacing:-0.5}}>right to your door.</span>
            </h1>

            <p className="out hero-p" style={{fontSize:17,lineHeight:1.8,color:"#917850",maxWidth:500,marginBottom:34}}>
              Discover local restaurants, order from multiple places at once, and watch your delivery live — all in one app.
              <strong style={{color:"#F47B1F",fontWeight:700}}> Pakwan Network</strong> — where every meal is an experience.
            </p>

            <div className="hero-search" style={{display:"flex",gap:10,marginBottom:36,maxWidth:540}}>
              <div style={{flex:1,position:"relative"}}>
                <span style={{position:"absolute",left:18,top:"50%",transform:"translateY(-50%)",fontSize:18,zIndex:1}}>📍</span>
                <input className="srch" placeholder="Enter your delivery location..." />
              </div>
              <button className="btn-primary out" style={{whiteSpace:"nowrap",borderRadius:16,padding:"15px 26px"}} onClick={()=>navigate("/signup")}>Start Ordering →</button>
            </div>

            <div className="hero-stats stats-r" style={{display:"flex",gap:36,alignItems:"center"}}>
              {[{val:"50K+",label:"Happy Customers"},{val:"1,200+",label:"Restaurants"},{val:"25 min",label:"Avg. Delivery"},{val:"4.8 ★",label:"Rating"}].map((s,i)=>(
                <div key={i}>
                  <div style={{fontSize:24,fontWeight:700,fontFamily:"'Fraunces',serif",lineHeight:1}}><span className="gt">{s.val}</span></div>
                  <div className="out" style={{fontSize:11,color:"#917850",marginTop:3,fontWeight:500}}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="hero-right" style={{flex:"0 0 48%",position:"relative",height:600}}>
            <div className="hero-img-main" style={{position:"absolute",right:0,top:0,width:"82%",height:"74%",borderRadius:28,overflow:"hidden",boxShadow:"0 32px 80px rgba(0,0,0,0.18),0 8px 24px rgba(0,0,0,0.1)"}}>
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000&q=90&auto=format&fit=crop" alt="food" style={{width:"100%",height:"100%",objectFit:"cover"}} />
              <div className="img-dark" />
              <div className="out float-a" style={{position:"absolute",bottom:22,left:22,background:"white",borderRadius:16,padding:"12px 18px",boxShadow:"0 8px 28px rgba(0,0,0,0.16)",display:"flex",alignItems:"center",gap:12,minWidth:200}}>
                <div style={{width:44,height:44,borderRadius:12,background:"linear-gradient(135deg,#F47B1F,#E8620A)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>🍽️</div>
                <div>
                  <div style={{fontSize:18,fontWeight:800,color:"#1C1507",fontFamily:"'Fraunces',serif"}}>{orderCount.toLocaleString()}</div>
                  <div style={{fontSize:11,color:"#917850",fontWeight:500}}>orders placed today</div>
                </div>
              </div>
            </div>

            <div className="hero-img-bl" style={{position:"absolute",left:0,bottom:0,width:"50%",height:"46%",borderRadius:24,overflow:"hidden",boxShadow:"0 20px 52px rgba(0,0,0,0.15)"}}>
              <img src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=85&auto=format&fit=crop" alt="food" style={{width:"100%",height:"100%",objectFit:"cover"}} />
              <div className="img-dark" />
            </div>

            <div className="hero-img-br" style={{position:"absolute",right:0,bottom:0,width:"46%",height:"30%",borderRadius:22,overflow:"hidden",boxShadow:"0 16px 44px rgba(0,0,0,0.14)"}}>
              <img src="https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=85&auto=format&fit=crop" alt="desserts" style={{width:"100%",height:"100%",objectFit:"cover"}} />
              <div className="img-dark" />
            </div>

            <div className="hero-c1 out float-b" style={{position:"absolute",left:"-8%",top:"36%",background:"white",borderRadius:18,padding:"14px 18px",boxShadow:"0 16px 40px rgba(0,0,0,0.13)",border:"1.5px solid rgba(244,123,31,0.12)",minWidth:190}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                <div style={{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#F47B1F,#E8620A)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🚴</div>
                <div>
                  <div style={{fontSize:12,fontWeight:800,color:"#1C1507"}}>Live Tracking</div>
                  <div style={{fontSize:11,color:"#917850"}}>Arriving in 8 min</div>
                </div>
              </div>
              <div style={{width:"100%",height:5,background:"#F0EDE8",borderRadius:3,overflow:"hidden"}}>
                <div className="shimmer-bar" style={{width:"72%",height:"100%",borderRadius:3}} />
              </div>
            </div>

            <div className="hero-c2 out" style={{position:"absolute",top:12,left:"4%",background:"white",borderRadius:50,padding:"10px 18px",boxShadow:"0 8px 28px rgba(0,0,0,0.12)",display:"flex",alignItems:"center",gap:8,border:"1.5px solid rgba(244,123,31,0.12)"}}>
              <span style={{color:"#FAA040",fontSize:16}}>★★★★★</span>
              <span style={{fontSize:13,fontWeight:800,color:"#1C1507"}}>4.8 / 5.0</span>
            </div>

            <div className="hero-c3 out float-c" style={{position:"absolute",right:"-2%",top:"40%",background:"linear-gradient(135deg,#F47B1F,#E8620A)",borderRadius:14,padding:"10px 16px",boxShadow:"0 8px 24px rgba(244,123,31,0.4)",color:"white"}}>
              <div style={{fontSize:11,fontWeight:800,letterSpacing:0.5}}>FREE DELIVERY</div>
              <div style={{fontSize:10,opacity:0.85}}>on first 3 orders</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{background:"#1C1507",padding:"15px 0",overflow:"hidden"}}>
        <div className="mq-inner out" style={{display:"flex",gap:60,fontSize:12,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:"rgba(250,250,248,0.6)"}}>
          {Array(6).fill(["🍛 Fresh Biryani","🍕 Hot Pizza","🚴 Live GPS Tracking","🔐 Razorpay Secured","⚡ 25 Min Delivery","⭐ 4.8 Rated App","🌐 50+ Cities","🏪 1,200+ Restaurants","🎁 Free Delivery on First 3 Orders"]).flat().map((item,i)=>(
            <span key={i} style={{whiteSpace:"nowrap"}}>{item}</span>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section id="cats" ref={ref("cats")} style={{padding:"100px 5%",background:"#FAFAF8"}}>
        <div style={{maxWidth:1300,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:56}} className={`fade-up ${vis("cats")?"show":""}`}>
            <div className="slabel">What Are You Craving?</div>
            <h2 style={{fontSize:"clamp(2rem,3.8vw,3.2rem)",fontWeight:700,letterSpacing:-1.2,marginBottom:14}}>Explore <span className="gt">Food Categories</span></h2>
            <div className="divider" style={{margin:"0 auto"}} />
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(8,1fr)",gap:14}} className="cat-g">
            {categories.map((c,i)=>(
              <div key={i} className={`cat-card fade-scale dl-${(i%4)+1} ${vis("cats")?"show":""}`} onClick={()=>setActiveCat(i)}
                style={{background:"white",boxShadow:activeCat===i?"0 8px 32px rgba(244,123,31,0.22)":"0 2px 14px rgba(0,0,0,0.07)",border:activeCat===i?"2.5px solid #F47B1F":"2.5px solid transparent"}}>
                <div style={{height:104,overflow:"hidden",position:"relative"}}>
                  <img src={c.img} alt={c.name} style={{width:"100%",height:"100%",objectFit:"cover"}} />
                  {activeCat===i&&<div style={{position:"absolute",inset:0,background:"rgba(244,123,31,0.18)"}} />}
                </div>
                <div style={{padding:"10px 8px 12px",textAlign:"center"}}>
                  <div className="out" style={{fontSize:13,fontWeight:700,color:"#1C1507"}}>{c.name}</div>
                  <div className="out" style={{fontSize:10,color:"#917850",marginTop:2}}>{c.count} places</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESTAURANTS ── */}
      <section id="rests" ref={ref("rests")} style={{padding:"0 5% 100px",background:"#FAFAF8"}}>
        <div style={{maxWidth:1300,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:40}} className={`fade-up ${vis("rests")?"show":""}`}>
            <div>
              <div className="slabel">Top Picks</div>
              <h2 style={{fontSize:"clamp(1.9rem,3.2vw,2.8rem)",fontWeight:700,letterSpacing:-1}}>Restaurants <span className="gt">Near You</span></h2>
            </div>
            <button className="btn-outline out" style={{padding:"11px 24px",fontSize:13,borderRadius:12}}>View All →</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:22}} className="rest-g">
            {restaurants.map((r,i)=>(
              <div key={i} className={`rest-card fade-up dl-${i+1} ${vis("rests")?"show":""}`} style={{boxShadow:"0 2px 16px rgba(0,0,0,0.07)"}}>
                <div style={{height:192,position:"relative",overflow:"hidden"}}>
                  <img src={r.img} alt={r.name} className="rimg" />
                  <div className="img-dark" />
                  <div style={{position:"absolute",top:12,left:12}}>
                    <span className="out" style={{background:"rgba(244,123,31,0.92)",color:"white",borderRadius:20,padding:"5px 12px",fontSize:11,fontWeight:700}}>{r.tag}</span>
                  </div>
                  {r.discount&&<div style={{position:"absolute",top:12,right:12}}><span className="out" style={{background:"rgba(28,21,7,0.85)",color:"#FAA040",borderRadius:20,padding:"5px 12px",fontSize:11,fontWeight:700}}>{r.discount}</span></div>}
                  <div style={{position:"absolute",bottom:12,right:12,background:"rgba(255,255,255,0.95)",borderRadius:50,padding:"5px 12px",display:"flex",alignItems:"center",gap:5}}>
                    <span style={{color:"#FAA040",fontSize:13}}>★</span>
                    <span className="out" style={{fontSize:13,fontWeight:800,color:"#1C1507"}}>{r.rating}</span>
                  </div>
                </div>
                <div style={{padding:"16px 18px 20px"}}>
                  <h3 className="out" style={{fontSize:16,fontWeight:800,color:"#1C1507",marginBottom:4}}>{r.name}</h3>
                  <p className="out" style={{fontSize:12,color:"#917850",marginBottom:14}}>{r.cuisine}</p>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:12,borderTop:"1px solid #F0EDE8"}}>
                    <span className="out" style={{fontSize:12,color:"#917850"}}>⏱ <strong style={{color:"#1C1507"}}>{r.time}</strong></span>
                    <span className="out" style={{fontSize:12,color:"#917850"}}>{r.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="hiw" ref={ref("hiw")} style={{padding:"100px 5%",background:"#1C1507",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(244,123,31,0.06) 1px,transparent 1px)",backgroundSize:"30px 30px",pointerEvents:"none"}} />
        <div style={{position:"absolute",top:"-20%",left:"20%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(244,123,31,0.08),transparent 65%)",pointerEvents:"none"}} />
        <div style={{maxWidth:1300,margin:"0 auto",position:"relative",zIndex:2}}>
          <div style={{textAlign:"center",marginBottom:60}} className={`fade-up ${vis("hiw")?"show":""}`}>
            <div className="slabel" style={{color:"#FAA040"}}>Simple. Fast. Reliable.</div>
            <h2 style={{fontSize:"clamp(2rem,3.8vw,3.2rem)",fontWeight:700,letterSpacing:-1.2,marginBottom:14,color:"#FAFAF8"}}>How <span className="gt2">Pakwan Network</span> Works</h2>
            <div className="divider" style={{margin:"0 auto"}} />
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20}} className="steps-g">
            {steps.map((s,i)=>(
              <div key={i} className={`step-card fade-up dl-${i+1} ${vis("hiw")?"show":""}`} onClick={()=>setActiveStep(i)}
                style={{padding:28,position:"relative",overflow:"hidden",background:activeStep===i?"rgba(244,123,31,0.1)":"rgba(250,250,248,0.04)",border:activeStep===i?"1.5px solid rgba(244,123,31,0.45)":"1.5px solid rgba(250,250,248,0.08)"}}>
                <div style={{width:72,height:72,borderRadius:18,overflow:"hidden",marginBottom:20,boxShadow:"0 8px 28px rgba(0,0,0,0.35)"}}>
                  <img src={s.img} alt={s.title} style={{width:"100%",height:"100%",objectFit:"cover"}} />
                </div>
                <div className="out" style={{fontSize:10,fontWeight:800,letterSpacing:2.5,marginBottom:10,color:activeStep===i?"#F47B1F":"rgba(250,250,248,0.3)"}}>STEP {s.num}</div>
                <h3 style={{fontSize:18,fontWeight:700,marginBottom:10,color:"#FAFAF8",letterSpacing:-0.3,lineHeight:1.3}}>{s.title}</h3>
                <p className="out" style={{fontSize:13,color:"rgba(250,250,248,0.5)",lineHeight:1.75}}>{s.desc}</p>
                <div style={{display:"flex",gap:5,marginTop:20}}>
                  {steps.map((_,j)=><div key={j} style={{height:3,borderRadius:2,transition:"all 0.4s ease",background:j===i?"#F47B1F":"rgba(250,250,248,0.15)",flex:j===i?2:1}} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section id="feat" ref={ref("feat")} style={{padding:"100px 5%",background:"#FAFAF8"}}>
        <div style={{maxWidth:1300,margin:"0 auto",display:"flex",gap:80,alignItems:"center"}} className="feat-flex">
          <div className={`fade-left ${vis("feat")?"show":""}`} style={{flex:"0 0 44%",position:"relative",height:520}}>
            <div style={{position:"absolute",top:0,left:0,width:"67%",height:"78%",borderRadius:28,overflow:"hidden",boxShadow:"0 24px 64px rgba(0,0,0,0.15)"}}>
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85&auto=format&fit=crop" alt="restaurant" style={{width:"100%",height:"100%",objectFit:"cover"}} />
            </div>
            <div style={{position:"absolute",right:0,bottom:0,width:"55%",height:"50%",borderRadius:22,overflow:"hidden",boxShadow:"0 18px 48px rgba(0,0,0,0.13)"}}>
              <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=85&auto=format&fit=crop" alt="pizza" style={{width:"100%",height:"100%",objectFit:"cover"}} />
            </div>
            <div className="out float-a" style={{position:"absolute",bottom:"22%",left:"-6%",background:"white",borderRadius:18,padding:"16px 20px",boxShadow:"0 14px 36px rgba(0,0,0,0.12)",border:"1.5px solid rgba(244,123,31,0.12)"}}>
              <div style={{fontSize:28,fontWeight:800,fontFamily:"'Fraunces',serif",lineHeight:1}}><span className="gt">25 min</span></div>
              <div style={{fontSize:12,color:"#917850",fontWeight:500,marginTop:4}}>Average delivery time</div>
              <div style={{display:"flex",gap:5,marginTop:8}}>
                {[1,2,3,4,5].map(s=><div key={s} style={{flex:1,height:4,borderRadius:2,background:s<=4?"linear-gradient(90deg,#F47B1F,#E8620A)":"#F0EDE8"}} />)}
              </div>
            </div>
          </div>

          <div style={{flex:1}} className={`fade-right ${vis("feat")?"show":""}`}>
            <div className="slabel">Why Choose Us</div>
            <h2 style={{fontSize:"clamp(1.9rem,3.2vw,2.9rem)",fontWeight:700,letterSpacing:-1.2,marginBottom:14,lineHeight:1.18}}>More Than Just<br /><span className="gt">Food Delivery</span></h2>
            <div className="divider" style={{marginBottom:28}} />
            <p className="out" style={{fontSize:15,color:"#917850",lineHeight:1.85,marginBottom:36,maxWidth:480}}>
              A complete ecosystem for customers, restaurant owners, and delivery partners — built on real-time technology and designed to deliver joy.
            </p>
            <div style={{display:"flex",flexDirection:"column",gap:18}}>
              {[
                {img:"https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=100&q=80&auto=format&fit=crop",title:"Real-Time GPS Tracking",desc:"Watch your delivery partner move live on an interactive map from restaurant to your door"},
                {img:"https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&q=80&auto=format&fit=crop",title:"Multi-Restaurant Orders",desc:"Order from different restaurants in one single checkout — unique to Pakwan Network"},
                {img:"https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=100&q=80&auto=format&fit=crop",title:"OTP-Secured Delivery",desc:"Every delivery confirmed with your personal OTP — complete security, every time"},
              ].map((f,i)=>(
                <div key={i} style={{display:"flex",gap:16,alignItems:"flex-start",padding:18,borderRadius:18,background:"white",border:"1.5px solid rgba(244,123,31,0.1)",boxShadow:"0 2px 12px rgba(0,0,0,0.05)",transition:"all 0.3s ease",cursor:"pointer"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(244,123,31,0.35)";e.currentTarget.style.boxShadow="0 8px 32px rgba(244,123,31,0.12)";e.currentTarget.style.transform="translateX(6px)"}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(244,123,31,0.1)";e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,0.05)";e.currentTarget.style.transform="translateX(0)"}}>
                  <div style={{width:54,height:54,borderRadius:14,overflow:"hidden",flexShrink:0,boxShadow:"0 4px 16px rgba(0,0,0,0.1)"}}>
                    <img src={f.img} alt={f.title} style={{width:"100%",height:"100%",objectFit:"cover"}} />
                  </div>
                  <div>
                    <h4 className="out" style={{fontSize:15,fontWeight:800,color:"#1C1507",marginBottom:4}}>{f.title}</h4>
                    <p className="out" style={{fontSize:13,color:"#917850",lineHeight:1.7}}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{marginTop:36,display:"flex",gap:14,flexWrap:"wrap"}}>
              <button className="btn-primary out">Start Ordering Now →</button>
              <button className="btn-outline out">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testi" ref={ref("testi")} style={{padding:"100px 5%",background:"#FEF6EC"}}>
        <div style={{maxWidth:1300,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:56}} className={`fade-up ${vis("testi")?"show":""}`}>
            <div className="slabel">People Love Us</div>
            <h2 style={{fontSize:"clamp(2rem,3.8vw,3.2rem)",fontWeight:700,letterSpacing:-1.2,marginBottom:14}}>What Our <span className="gt">Customers Say</span></h2>
            <div className="divider" style={{margin:"0 auto"}} />
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24}} className="testi-g">
            {testimonials.map((t,i)=>(
              <div key={i} className={`card-hover fade-up dl-${i+1} ${vis("testi")?"show":""}`} style={{background:"white",borderRadius:24,padding:32,boxShadow:"0 2px 16px rgba(0,0,0,0.06)",border:"1.5px solid rgba(244,123,31,0.08)"}}>
                <div style={{fontSize:64,lineHeight:0.9,color:"rgba(244,123,31,0.12)",fontFamily:"Georgia",marginBottom:12,fontWeight:900}}>"</div>
                <div style={{display:"flex",gap:2,marginBottom:16}}>{Array(t.rating).fill("★").map((_,j)=><span key={j} style={{color:"#FAA040",fontSize:17}}>★</span>)}</div>
                <p className="out" style={{fontSize:14.5,lineHeight:1.85,color:"#5C4020",marginBottom:24,fontStyle:"italic"}}>{t.text}</p>
                <div style={{display:"flex",alignItems:"center",gap:14,paddingTop:20,borderTop:"1px solid #F0EDE8"}}>
                  <img src={t.img} alt={t.name} style={{width:48,height:48,borderRadius:"50%",objectFit:"cover",border:"2.5px solid rgba(244,123,31,0.25)"}} />
                  <div>
                    <div className="out" style={{fontWeight:800,fontSize:14,color:"#1C1507"}}>{t.name}</div>
                    <div className="out" style={{fontSize:11,color:"#917850",marginTop:1}}>{t.city} · {t.orders}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APP DOWNLOAD ── */}
      <section id="app" ref={ref("app")} style={{padding:"0 5% 100px",background:"#FEF6EC"}}>
        <div style={{maxWidth:1300,margin:"0 auto"}}>
          <div className={`fade-up ${vis("app")?"show":""}`} style={{background:"linear-gradient(135deg,#1C1507 0%,#2E1E08 60%,#1C1507 100%)",borderRadius:36,padding:"68px 64px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:48,flexWrap:"wrap",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:-80,right:-80,width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(244,123,31,0.1),transparent 65%)",pointerEvents:"none"}} />
            <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(244,123,31,0.04) 1px,transparent 1px)",backgroundSize:"24px 24px",pointerEvents:"none"}} />
            <div style={{position:"relative",zIndex:2,flex:1,minWidth:280}}>
              <div className="slabel" style={{color:"#FAA040"}}>Download the App</div>
              <h2 style={{fontSize:"clamp(1.9rem,3.2vw,3rem)",fontWeight:700,letterSpacing:-1.2,marginBottom:16,color:"#FAFAF8",lineHeight:1.18}}>
                Get <span className="gt2">Free Delivery</span><br />on Your First 3 Orders
              </h2>
              <p className="out" style={{color:"rgba(250,250,248,0.5)",fontSize:15,marginBottom:34,lineHeight:1.8,maxWidth:420}}>
                Download Pakwan Network and unlock exclusive deals, real-time tracking, and lightning-fast checkout — anywhere, anytime.
              </p>
              <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
                {[{icon:"🍎",store:"App Store",sub:"Download on the"},{icon:"🤖",store:"Google Play",sub:"Get it on"}].map((btn,i)=>(
                  <button key={i} style={{background:"rgba(250,250,248,0.07)",border:"1.5px solid rgba(250,250,248,0.14)",borderRadius:16,padding:"15px 24px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",color:"#FAFAF8",minWidth:186,transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)"}}
                    onMouseEnter={e=>{e.currentTarget.style.background="rgba(244,123,31,0.18)";e.currentTarget.style.borderColor="rgba(244,123,31,0.45)";e.currentTarget.style.transform="translateY(-3px)"}}
                    onMouseLeave={e=>{e.currentTarget.style.background="rgba(250,250,248,0.07)";e.currentTarget.style.borderColor="rgba(250,250,248,0.14)";e.currentTarget.style.transform="translateY(0)"}}>
                    <span style={{fontSize:32}}>{btn.icon}</span>
                    <div style={{textAlign:"left"}}>
                      <div className="out" style={{fontSize:10,color:"rgba(250,250,248,0.45)"}}>{btn.sub}</div>
                      <div style={{fontSize:19,fontWeight:700,fontFamily:"'Fraunces',serif"}}>{btn.store}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div style={{position:"relative",zIndex:2,flex:"0 0 auto"}}>
              <div style={{width:280,height:360,borderRadius:28,overflow:"hidden",boxShadow:"0 32px 80px rgba(0,0,0,0.5),0 0 0 1px rgba(244,123,31,0.15)"}}>
                <img src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=700&q=90&auto=format&fit=crop" alt="food" style={{width:"100%",height:"100%",objectFit:"cover"}} />
                <div className="img-dark" />
              </div>
              <div className="out float-a" style={{position:"absolute",bottom:-14,left:-20,background:"white",borderRadius:16,padding:"12px 18px",boxShadow:"0 12px 32px rgba(0,0,0,0.2)",display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#F47B1F,#E8620A)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🎁</div>
                <div>
                  <div style={{fontSize:13,fontWeight:800,color:"#1C1507"}}>Free Delivery</div>
                  <div style={{fontSize:10,color:"#917850"}}>First 3 orders</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 ROLES ── */}
      <section id="roles" ref={ref("roles")} style={{padding:"100px 5%",background:"#FAFAF8"}}>
        <div style={{maxWidth:1300,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:56}} className={`fade-up ${vis("roles")?"show":""}`}>
            <div className="slabel">Join the Network</div>
            <h2 style={{fontSize:"clamp(2rem,3.8vw,3.2rem)",fontWeight:700,letterSpacing:-1.2,marginBottom:14}}>Who Are <span className="gt">You?</span></h2>
            <p className="out" style={{color:"#917850",fontSize:16,maxWidth:500,margin:"0 auto"}}>Pakwan Network is built for everyone in the food world.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:26}} className="roles-g">
            {[
              {img:"https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800&q=85&auto=format&fit=crop",role:"Customer",badge:"Order Food",color:"#F47B1F",perks:["Discover 1,200+ restaurants","Real-time GPS tracking","Multi-restaurant single checkout","Secure payments & COD"],cta:"Start Ordering"},
              {img:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85&auto=format&fit=crop",role:"Restaurant Owner",badge:"Grow Business",color:"#E8620A",perks:["List your restaurant for free","Live order management","Direct customer connect","Revenue analytics"],cta:"List Your Restaurant"},
              {img:"https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=85&auto=format&fit=crop",role:"Delivery Partner",badge:"Earn Daily",color:"#C8760A",perks:["Flexible working hours","Weekly payouts guaranteed","GPS-optimized routes","Dedicated partner support"],cta:"Become a Partner"},
            ].map((role,i)=>(
              <div key={i} className={`card-hover fade-up dl-${i+1} ${vis("roles")?"show":""}`} style={{background:"white",borderRadius:26,overflow:"hidden",boxShadow:"0 2px 20px rgba(0,0,0,0.08)",border:"1.5px solid rgba(244,123,31,0.08)"}}>
                <div style={{height:220,position:"relative",overflow:"hidden"}}>
                  <img src={role.img} alt={role.role} className="rimg" />
                  <div className="img-dark" />
                  <div style={{position:"absolute",bottom:18,left:18}}>
                    <span className="out" style={{background:role.color,color:"white",borderRadius:20,padding:"6px 16px",fontSize:11,fontWeight:800,boxShadow:`0 4px 14px ${role.color}60`}}>{role.badge}</span>
                  </div>
                </div>
                <div style={{padding:"24px 24px 28px"}}>
                  <h3 style={{fontSize:24,fontWeight:700,color:"#1C1507",marginBottom:18,letterSpacing:-0.5}}>{role.role}</h3>
                  <ul style={{listStyle:"none",marginBottom:26}}>
                    {role.perks.map((p,j)=>(
                      <li key={j} className="out" style={{display:"flex",alignItems:"flex-start",gap:10,fontSize:13.5,color:"#917850",marginBottom:11,lineHeight:1.5}}>
                        <span style={{width:20,height:20,borderRadius:"50%",flexShrink:0,background:`rgba(244,123,31,0.1)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:role.color,fontWeight:800,marginTop:1}}>✓</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <button className="out" style={{width:"100%",padding:"14px",borderRadius:14,border:`2px solid ${role.color}`,background:"transparent",color:role.color,fontWeight:800,fontSize:14,cursor:"pointer",transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)"}}
                    onMouseEnter={e=>{e.currentTarget.style.background=role.color;e.currentTarget.style.color="white";e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 8px 24px ${role.color}40`}}
                    onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=role.color;e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}>
                    {role.cta} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{background:"#1C1507",padding:"72px 5% 32px"}}>
        <div style={{maxWidth:1300,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:44,marginBottom:56,paddingBottom:52,borderBottom:"1px solid rgba(250,250,248,0.07)"}} className="foot-g">
            <div style={{flex:"0 0 290px"}}>
              <BrandLogo size="md" theme="dark" tagline="Finest Flavors, Connected" style={{ marginBottom: 18 }} />
              <p className="out" style={{fontSize:13,color:"rgba(250,250,248,0.4)",lineHeight:1.85,marginBottom:22}}>
                India's premium food delivery platform. Fresh food, fast delivery, live GPS tracking — all in one place.
              </p>
              <div style={{display:"flex",gap:10}}>
                {["F","IN","TW","YT"].map((s,i)=>(
                  <button key={i} style={{width:38,height:38,borderRadius:10,background:"rgba(250,250,248,0.06)",border:"1px solid rgba(250,250,248,0.08)",color:"rgba(250,250,248,0.45)",cursor:"pointer",fontSize:11,fontWeight:800,fontFamily:"'Outfit',sans-serif",transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)"}}
                    onMouseEnter={e=>{e.currentTarget.style.background="rgba(244,123,31,0.2)";e.currentTarget.style.borderColor="rgba(244,123,31,0.4)";e.currentTarget.style.color="#FAA040";e.currentTarget.style.transform="translateY(-3px)"}}
                    onMouseLeave={e=>{e.currentTarget.style.background="rgba(250,250,248,0.06)";e.currentTarget.style.borderColor="rgba(250,250,248,0.08)";e.currentTarget.style.color="rgba(250,250,248,0.45)";e.currentTarget.style.transform="translateY(0)"}}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {[
              {title:"Company",links:["About Us","Careers","Press & Media","Blog","Investors"]},
              {title:"For Business",links:["List Your Restaurant","Delivery Partner","Advertise With Us","API Access","Affiliate Program"]},
              {title:"Support",links:["Help Center","Track Your Order","Contact Us","Privacy Policy","Terms of Service"]},
            ].map((col,i)=>(
              <div key={i}>
                <h4 className="out" style={{fontSize:11,fontWeight:800,letterSpacing:2.5,textTransform:"uppercase",color:"#F47B1F",marginBottom:20}}>{col.title}</h4>
                {col.links.map((l,j)=>(
                  <div key={j} style={{marginBottom:13}}>
                    <a href="#" className="out" style={{color:"rgba(250,250,248,0.38)",textDecoration:"none",fontSize:13,fontWeight:500,transition:"color 0.2s"}}
                      onMouseEnter={e=>e.target.style.color="rgba(250,250,248,0.82)"}
                      onMouseLeave={e=>e.target.style.color="rgba(250,250,248,0.38)"}>{l}</a>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
            <p className="out" style={{fontSize:12,color:"rgba(250,250,248,0.22)"}}>© 2025 Pakwan Network · <span style={{color:"rgba(244,123,31,0.55)"}}>pakwannetwork.com</span> · Made with ❤️ in India</p>
            <div style={{display:"flex",gap:24}}>
              {["Privacy","Terms","Cookies","Sitemap"].map(l=>(
                <a key={l} href="#" className="out" style={{fontSize:12,color:"rgba(250,250,248,0.22)",textDecoration:"none",transition:"color 0.2s"}}
                  onMouseEnter={e=>e.target.style.color="rgba(250,250,248,0.6)"}
                  onMouseLeave={e=>e.target.style.color="rgba(250,250,248,0.22)"}>{l}</a>
              ))}
            </div>
            <p className="out" style={{fontSize:12,color:"rgba(250,250,248,0.22)"}}>🔒 Secured by Razorpay</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
