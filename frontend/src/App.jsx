
import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
const destinations = [
  {
    name: 'البتراء',
    location: 'محافظة معان',
    category: 'مواقع تاريخية',
    image:
      'https://images.unsplash.com/photo-1579606032821-4e6161c81bd3?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'وادي رم',
    location: 'جنوب الأردن',
    category: 'طبيعة ومغامرات',
    image:
      'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=900&q=85',
  },
  {
  name: 'جرش',
  location: 'محافظة جرش',
  category: 'آثار وحضارة',
  image:
  'https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=900&q=85',
},
  {
    name: 'البحر الميت',
    location: 'الأغوار',
    category: 'استجمام وطبيعة',
    image:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=85',
  },
]

function Home()  {
  return (
    <div className="app" dir="rtl">
      <header className="navbar">
        <a className="brand" href="#home" aria-label="بوصلة الأردن">
          <span className="brand-icon">⌁</span>
          <span>
            <strong>بوصلة</strong>
            <small>الأردن</small>
          </span>
        </a>

        <nav className="nav-links" aria-label="التنقل الرئيسي">
          <a className="active" href="#home">الرئيسية</a>
          <a href="#destinations">الوجهات</a>
          <a href="#about">عن المشروع</a>
        </nav>

        <div className="nav-actions">
          <button className="language-btn" type="button" aria-label="اللغة">
            EN
          </button>
          <a className="login-btn" href="#destinations">ابدأ الاستكشاف ↗</a>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1548786811-dd6e453ccca7?auto=format&fit=crop&w=2200&q=90"
            alt="منظر سياحي لصخور ومعالم البتراء"
          />
          <div className="hero-overlay" />

          <div className="hero-content">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              اكتشف جمال الأردن
            </span>

            <h1>
              رحلتك للأردن،
              <br />
              <span>تبدأ من هنا.</span>
            </h1>

            <p>
              من سحر البتراء إلى هدوء وادي رم، اكتشف أماكن
              استثنائية وتجارب تستحق أن تعيشها.
            </p>

            <a className="hero-cta" href="#destinations">
              اكتشف الوجهات
              <span>←</span>
            </a>

            <div className="hero-note">
              <span>✦</span>
              الأردن أجمل مما تتخيّل
            </div>
          </div>

          <div className="hero-index">
            <span>01</span>
            <span className="index-line" />
            <span>اكتشف الأردن</span>
          </div>
        </section>

        <section className="destinations section" id="destinations">
          <div className="section-heading">
            <div>
              <span className="section-kicker">وجهات مختارة بعناية</span>
              <h2>أماكن تستحق رحلتك</h2>
              <p>أربع وجهات، وآلاف التفاصيل التي تستحق الاكتشاف.</p>
            </div>

            <a className="view-all" href="#about">
              اكتشف المزيد <span>←</span>
            </a>
          </div>

          <div className="destination-grid">
            {destinations.map((destination, index) => (
              <article className="destination-card" key={destination.name}>
                <a
                  className="destination-image-link"
                  href="#about"
                  aria-label={`اكتشف ${destination.name}`}
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                    loading="lazy"
                  />
                  <span className="card-number">
                    0{index + 1}
                  </span>
                  <span className="card-arrow">↖</span>
                </a>

                <div className="destination-info">
                  <span className="destination-category">
                    {destination.category}
                  </span>
                  <h3>{destination.name}</h3>
                  <p>⌖ {destination.location}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-strip" id="about">
          <span className="about-symbol">✳</span>
          <div>
            <span className="section-kicker">رحلتك تبدأ بخطوة</span>
            <h2>الأردن حكاية، اكتشفها بطريقتك.</h2>
            <p>
              استكشف الوجهات، خطط لرحلتك، واكتشف أماكن جديدة
              مع بوصلة الأردن.
            </p>
          </div>
          <a className="about-link" href="#home">العودة للأعلى ↑</a>
        </section>
      </main>

      <footer className="footer">
        <a className="footer-brand" href="#home">بوصلة الأردن</a>
        <span>صُنع بحب لاستكشاف الأردن 🇯🇴</span>
        <span>© 2026 Bawsala Jordan</span>
      </footer>
    </div>
  )
}
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
export default App ;
