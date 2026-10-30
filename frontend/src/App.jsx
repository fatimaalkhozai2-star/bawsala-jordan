
import './App.css';

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import { getDestinations } from "./services/destinationService";


function Home() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch destinations from Backend
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getDestinations();
        setDestinations(data.destinations || data);
      } catch (err) {
        setError(err.message || "تعذر تحميل الوجهات");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <div className="app" dir="rtl">

      {/* Navbar */}
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

          <a className="login-btn" href="#destinations">
            ابدأ الاستكشاف ↗
          </a>
        </div>
      </header>


      <main>

        {/* Hero Section */}
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


        {/* Destinations Section */}
        <section className="destinations section" id="destinations">

          <div className="section-heading">

            <div>
              <span className="section-kicker">
                وجهات مختارة بعناية
              </span>

              <h2>أماكن تستحق رحلتك</h2>

              <p>
                اكتشف أجمل الوجهات السياحية في الأردن.
              </p>
            </div>

            <a className="view-all" href="#about">
              اكتشف المزيد <span>←</span>
            </a>

          </div>


          {/* Loading State */}
          {loading && (
            <p className="loading-message">
              جارٍ تحميل الوجهات السياحية...
            </p>
          )}


          {/* Error State */}
          {!loading && error && (
            <p className="error-message">
              {error}
            </p>
          )}


          {/* Empty State */}
          {!loading && !error && destinations.length === 0 && (
            <p className="loading-message">
              لا توجد وجهات سياحية حاليًا.
            </p>
          )}


          {/* Destinations Cards */}
          {!loading && !error && destinations.length > 0 && (
            <div className="destination-grid">

              {destinations.map((destination, index) => (

                <article
                  className="destination-card"
                  key={destination._id || destination.name}
                >

                  <a
                    className="destination-image-link"
                    href="#about"
                    aria-label={`اكتشف ${destination.name}`}
                  >

                    <img
                      src={
                        destination.imageUrl ||
                        "https://images.unsplash.com/photo-1548786811-dd6e453ccca7?auto=format&fit=crop&w=900&q=85"
                      }
                      alt={destination.name}
                      loading="lazy"
                    />

                    <span className="card-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="card-arrow">↖</span>

                  </a>


                  <div className="destination-info">

                    <span className="destination-category">
                      {destination.category}
                    </span>

                    <h3>{destination.name}</h3>

                    <p>
                      ⌖ {destination.governorate}
                      {destination.area ? ` - ${destination.area}` : ""}
                    </p>

                  </div>

                </article>

              ))}

            </div>
          )}

        </section>


        {/* About Section */}
        <section className="about-strip" id="about">

          <span className="about-symbol">✳</span>

          <div>
            <span className="section-kicker">
              رحلتك تبدأ بخطوة
            </span>

            <h2>الأردن حكاية، اكتشفها بطريقتك.</h2>

            <p>
              استكشف الوجهات، خطط لرحلتك، واكتشف أماكن جديدة
              مع بوصلة الأردن.
            </p>
          </div>

          <a className="about-link" href="#home">
            العودة للأعلى ↑
          </a>

        </section>

      </main>


      {/* Footer */}
      <footer className="footer">

        <a className="footer-brand" href="#home">
          بوصلة الأردن
        </a>

        <span>صُنع بحب لاستكشاف الأردن 🇯🇴</span>

        <span>© 2026 Bawsala Jordan</span>

      </footer>

    </div>
  );
}


// Main App
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
