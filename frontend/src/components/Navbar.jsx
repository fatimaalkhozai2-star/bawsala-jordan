import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

function Navbar() {
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const { language, toggleLanguage, isArabic } = useLanguage();

  const t = {
    en: {
      brand: "Bawsala",
      country: "Jordan",
      home: "Home",
      destinations: "Destinations",
      favorites: "My Favorites",
      trips: "My Trips",
      about: "About",
      login: "Login",
      logout: "Logout",
      explore: "Start Exploring ↗",
      admin: "Admin Dashboard"
    },
    ar: {
      brand: "بوصلة",
      country: "الأردن",
      home: "الرئيسية",
      destinations: "الوجهات",
      favorites: "مفضلتي",
      trips: "رحلاتي",
      about: "عن المشروع",
      login: "تسجيل الدخول",
      logout: "تسجيل الخروج",
      explore: "ابدأ الاستكشاف ↗",
      admin: "لوحة التحكم"
    }
  };

  const content = t[language] || t.en;

  return (
    <header className="navbar" dir={isArabic ? "rtl" : "ltr"}>
      <Link className="brand" to="/">
        <span className="brand-icon">⌁</span>
        <span>
          <strong>{content.brand}</strong>
          <small>{content.country}</small>
        </span>
      </Link>

      <nav className="nav-links">
        <Link to="/">{content.home}</Link>

        <Link to="/destinations">{content.destinations}</Link>

        {isLoggedIn && (
          <>
            <Link to="/trips">{content.trips}</Link>
            <Link to="/favorites">{content.favorites}</Link>
          </>
        )}

        <Link to="/#about">{content.about}</Link>

        {isAdmin && (
          <Link to="/admin">{content.admin}</Link>
        )}
      </nav>

      <div className="nav-actions">
        <button
          className="language-btn"
          type="button"
          onClick={toggleLanguage}
        >
          {language === "en" ? "عربي" : "En"}
        </button>

        {isLoggedIn ? (
          <button
            className="login-btn"
            type="button"
            onClick={logout}
          >
            {content.logout}
          </button>
        ) : (
          <Link className="login-btn" to="/login">
            {content.login}
          </Link>
        )}

        <Link className="login-btn" to="/destinations">
          {content.explore}
        </Link>
      </div>
    </header>
  );
}

export default Navbar;