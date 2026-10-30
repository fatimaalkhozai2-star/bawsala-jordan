
import "./App.css";

import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import Favorites from "./pages/Favorites";

import { getDestinations } from "./services/destinationService";
import { useLanguage } from "./context/LanguageContext";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
function Home() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { language, toggleLanguage, isArabic } = useLanguage();
  const { isLoggedIn, logout } = useAuth();

  const content = {
    en: {
      brand: "Bawsala",
      country: "Jordan",
      home: "Home",
      destinations: "Destinations",
      favorites: "My Favorites",
      about: "About",
      explore: "Start Exploring ↗",
      login: "Login",
      logout: "Logout",
      eyebrow: "Discover the beauty of Jordan",
      heroTitle: "Your journey to Jordan,",
      heroHighlight: "starts here.",
      heroDescription:
        "From the magic of Petra to the calm of Wadi Rum, discover extraordinary places and experiences worth living.",
      discover: "Discover Destinations",
      heroNote: "Jordan is more beautiful than you imagine",
      heroIndex: "Discover Jordan",
      selected: "Carefully selected destinations",
      sectionTitle: "Places worth your journey",
      sectionDescription:
        "Discover the most beautiful destinations in Jordan.",
      viewAll: "Explore more",
      loading: "Loading destinations...",
      error: "Could not load destinations.",
      empty: "No destinations available right now.",
      aboutKicker: "Your journey starts with one step",
      aboutTitle: "Jordan is a story. Discover it your way.",
      aboutDescription:
        "Explore destinations, plan your trip, and discover new places with Bawsala Jordan.",
      backToTop: "Back to top ↑",
      footer: "Made with love to explore Jordan 🇯🇴",
      category: "Destination"
    },

    ar: {
      brand: "بوصلة",
      country: "الأردن",
      home: "الرئيسية",
      destinations: "الوجهات",
      favorites: "مفضلتي",
      about: "عن المشروع",
      explore: "ابدأ الاستكشاف ↗",
      login: "تسجيل الدخول",
      logout: "تسجيل الخروج",
      eyebrow: "اكتشف جمال الأردن",
      heroTitle: "رحلتك للأردن،",
      heroHighlight: "تبدأ من هنا.",
      heroDescription:
        "من سحر البتراء إلى هدوء وادي رم، اكتشف أماكن استثنائية وتجارب تستحق أن تعيشها.",
      discover: "اكتشف الوجهات",
      heroNote: "الأردن أجمل مما تتخيّل",
      heroIndex: "اكتشف الأردن",
      selected: "وجهات مختارة بعناية",
      sectionTitle: "أماكن تستحق رحلتك",
      sectionDescription:
        "اكتشف أجمل الوجهات السياحية في الأردن.",
      viewAll: "اكتشف المزيد",
      loading: "جارٍ تحميل الوجهات السياحية...",
      error: "تعذّر تحميل الوجهات.",
      empty: "لا توجد وجهات سياحية حاليًا.",
      aboutKicker: "رحلتك تبدأ بخطوة",
      aboutTitle: "الأردن حكاية، اكتشفها بطريقتك.",
      aboutDescription:
        "استكشف الوجهات، خطط لرحلتك، واكتشف أماكن جديدة مع بوصلة الأردن.",
      backToTop: "العودة للأعلى ↑",
      footer: "صُنع بحب لاستكشاف الأردن 🇯🇴",
      category: "وجهة سياحية"
    }
  };

  const t = content[language];

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getDestinations();
        setDestinations(data.destinations || data);
      } catch (err) {
        setError(err.message || t.error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <div className="app" dir={isArabic ? "rtl" : "ltr"}>
      <header className="navbar">

        <Link className="brand" to="/" aria-label="Bawsala Jordan">
          <span className="brand-icon">⌁</span>

          <span>
            <strong>{t.brand}</strong>
            <small>{t.country}</small>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <Link className="active" to="/">
            {t.home}
          </Link>

          <Link to="/destinations">
            {t.destinations}
          </Link>

          <Link to="/favorites">
            {t.favorites}
          </Link>

          <a href="#about">
            {t.about}
          </a>
        </nav>

        <div className="nav-actions">

          <button
            className="language-btn"
            type="button"
            onClick={toggleLanguage}
            aria-label="Change language"
          >
            {language === "en" ? "العربية" : "En"}
          </button>

          {isLoggedIn ? (
            <button
              className="login-btn"
              type="button"
              onClick={logout}
            >
              {t.logout}
            </button>
          ) : (
            <Link className="login-btn" to="/login">
              {t.login}
            </Link>
          )}

          <Link className="login-btn" to="/destinations">
            {t.explore}
          </Link>

        </div>
      </header>

      <main>

        <section className="hero" id="home">

          <video
  className="hero-video"
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
>
  <source src="/hero-video.mp4" type="video/mp4" />
  Your browser does not support video.
</video>

          <div className="hero-overlay" />

          <div className="hero-content">

            <span className="eyebrow">
              <span className="eyebrow-dot" />
              {t.eyebrow}
            </span>

            <h1>
              {t.heroTitle}
              <br />
              <span>{t.heroHighlight}</span>
            </h1>

            <p>{t.heroDescription}</p>

            <Link className="hero-cta" to="/destinations">
              {t.discover}
              <span>{isArabic ? "←" : "→"}</span>
            </Link>

            <div className="hero-note">
              <span>✦</span>
              {t.heroNote}
            </div>

          </div>

          <div className="hero-index">
            <span>01</span>
            <span className="index-line" />
            <span>{t.heroIndex}</span>
          </div>

        </section>

        <section className="destinations section" id="destinations">

          <div className="section-heading">

            <div>
              <span className="section-kicker">{t.selected}</span>
              <h2>{t.sectionTitle}</h2>
              <p>{t.sectionDescription}</p>
            </div>

            <Link className="view-all" to="/destinations">
              {t.viewAll}
              <span>{isArabic ? "←" : "→"}</span>
            </Link>

          </div>

          {loading && (
            <p className="loading-message">{t.loading}</p>
          )}

          {!loading && error && (
            <p className="error-message">{error}</p>
          )}

          {!loading && !error && destinations.length === 0 && (
            <p className="loading-message">{t.empty}</p>
          )}

          {!loading && !error && destinations.length > 0 && (

            <div className="destination-grid">

              {destinations.map((destination, index) => {

                const name = isArabic
                  ? destination.nameAr || destination.name
                  : destination.name;

                const governorate = isArabic
                  ? destination.governorateAr || destination.governorate
                  : destination.governorate;

                const area = isArabic
                  ? destination.areaAr || destination.area
                  : destination.area;

                const category = isArabic
                  ? destination.categoryAr || destination.category
                  : destination.category;

                return (
                  <article
                    className="destination-card"
                    key={destination._id || destination.name}
                  >

                    <Link
                      className="destination-image-link"
                      to={`/destinations/${destination._id}`}
                      aria-label={`${t.category}: ${name}`}
                    >

                      <img
                        src={
                          destination.imageUrl ||
                          "https://images.unsplash.com/photo-1548786811-dd6e453ccca7?auto=format&fit=crop&w=900&q=85"
                        }
                        alt={name}
                        loading="lazy"
                      />

                      <span className="card-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="card-arrow">↖</span>

                    </Link>

                    <div className="destination-info">

                      <span className="destination-category">
                        {category}
                      </span>

                      <h3>{name}</h3>

                      <p>
                        ⌖ {governorate}
                        {area ? ` - ${area}` : ""}
                      </p>

                    </div>

                  </article>
                );

              })}

            </div>

          )}

        </section>

        <section className="about-strip" id="about">

          <span className="about-symbol">✳</span>

          <div>
            <span className="section-kicker">{t.aboutKicker}</span>
            <h2>{t.aboutTitle}</h2>
            <p>{t.aboutDescription}</p>
          </div>

          <a className="about-link" href="#home">
            {t.backToTop}
          </a>

        </section>

      </main>

      <footer className="footer">

        <Link className="footer-brand" to="/">
          {t.brand} {t.country}
        </Link>

        <span>{t.footer}</span>

        <span>© 2026 Bawsala Jordan</span>

      </footer>

    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:id" element={<DestinationDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>
    </Routes>
  );
}

export default App;
