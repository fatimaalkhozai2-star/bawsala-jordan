
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getDestinations } from "../services/destinationService";
import {
  getFavorites,
  addFavorite,
  removeFavorite
} from "../services/favoriteService";

import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

import "./Destinations.css";

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favoriteError, setFavoriteError] = useState("");
  const [favoriteLoading, setFavoriteLoading] = useState(null);

  const [search, setSearch] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [category, setCategory] = useState("");

  const { language, toggleLanguage, isArabic } = useLanguage();
  const { token } = useAuth();

  const navigate = useNavigate();

  const translations = {
    en: {
      title: "Discover Jordan's Destinations",
      description: "Discover the most beautiful tourist destinations in Jordan.",
      search: "Search for a destination...",
      allGovernorates: "All Governorates",
      allCategories: "All Categories",
      clear: "Clear Filters",
      loading: "Loading destinations...",
      error: "Could not load destinations.",
      empty: "No destinations available right now.",
      category: "Destination",
      back: "Back to Home",
      addFavorite: "Add to favorites",
      removeFavorite: "Remove from favorites",
      loginFavorite: "Please log in to save your favorites.",
      favoriteError: "Could not update favorites."
    },

    ar: {
      title: "اكتشف وجهات الأردن",
      description: "اكتشف أجمل الأماكن السياحية في الأردن.",
      search: "ابحث عن وجهة سياحية...",
      allGovernorates: "كل المحافظات",
      allCategories: "كل التصنيفات",
      clear: "مسح الفلاتر",
      loading: "جارٍ تحميل الوجهات...",
      error: "تعذّر تحميل الوجهات.",
      empty: "لا توجد وجهات متاحة حاليًا.",
      category: "وجهة سياحية",
      back: "العودة للرئيسية",
      addFavorite: "أضف إلى المفضلة",
      removeFavorite: "إزالة من المفضلة",
      loginFavorite: "سجّلي الدخول لإضافة الوجهات للمفضلة.",
      favoriteError: "تعذرت عملية تحديث المفضلة."
    }
  };

  const t = translations[language];

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getDestinations({
          search,
          governorate,
          category
        });

        setDestinations(data.destinations || data);
      } catch (err) {
        setError(err.message || t.error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [search, governorate, category]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) {
        setFavorites([]);
        return;
      }

      try {
        const data = await getFavorites(token);
        setFavorites(data);
      } catch (err) {
        console.error("Failed to load favorites:", err);
      }
    };

    fetchFavorites();
  }, [token]);

  const isFavorite = (destinationId) => {
  return favorites.some((favorite) => {
    const savedDestination =
      favorite.destination?._id || favorite.destination;

    return savedDestination?.toString() === destinationId.toString();
  });
};
  // Add or remove favorite
  const handleFavorite = async (destinationId) => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (favoriteLoading === destinationId) return;

    setFavoriteError("");
    setFavoriteLoading(destinationId);

    try {
const existingFavorite = favorites.find((favorite) => {
  const savedDestination =
    favorite.destination?._id || favorite.destination;

  return savedDestination?.toString() === destinationId.toString();
});

      if (existingFavorite) {
        await removeFavorite(existingFavorite._id, token);

        setFavorites((current) =>
          current.filter(
            (favorite) => favorite._id !== existingFavorite._id
          )
        );
      } else {
        const newFavorite = await addFavorite(destinationId, token);

        setFavorites((current) => [...current, newFavorite]);
      }
    } catch (err) {
      setFavoriteError(err.message || t.favoriteError);
    } finally {
      setFavoriteLoading(null);
    }
  };

  return (
    <div
      className="destinations-page"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="destinations-topbar">
        <Link to="/" className="back-home">
          {t.back}
        </Link>

        <button
          className="language-btn"
          type="button"
          onClick={toggleLanguage}
        >
          {language === "en" ? "العربية" : "English"}
        </button>
      </div>

      <h1>{t.title}</h1>
      <p>{t.description}</p>

      {/* Search and Filters */}
      <div className="destination-filters">
        <input
          type="text"
          placeholder={t.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={governorate}
          onChange={(e) => setGovernorate(e.target.value)}
        >
          <option value="">{t.allGovernorates}</option>

          <option value="Ma'an">{isArabic ? "معان" : "Ma'an"}</option>
          <option value="Aqaba">{isArabic ? "العقبة" : "Aqaba"}</option>
          <option value="Madaba">{isArabic ? "مادبا" : "Madaba"}</option>
          <option value="Jerash">{isArabic ? "جرش" : "Jerash"}</option>
          <option value="Ajloun">{isArabic ? "عجلون" : "Ajloun"}</option>
          <option value="Irbid">{isArabic ? "إربد" : "Irbid"}</option>
          <option value="Tafilah">{isArabic ? "الطفيلة" : "Tafilah"}</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">{t.allCategories}</option>
          <option value="Historical">{isArabic ? "تاريخية" : "Historical"}</option>
          <option value="Natural">{isArabic ? "طبيعية" : "Natural"}</option>
          <option value="Religious">{isArabic ? "دينية" : "Religious"}</option>
          <option value="Natural & Therapeutic">
            {isArabic ? "طبيعية وعلاجية" : "Natural & Therapeutic"}
          </option>
        </select>

        <button
          type="button"
          onClick={() => {
            setSearch("");
            setGovernorate("");
            setCategory("");
          }}
        >
          {t.clear}
        </button>
      </div>

      {loading && <p>{t.loading}</p>}

      {!loading && error && <p>{error}</p>}

      {favoriteError && (
        <p className="error-message">{favoriteError}</p>
      )}

      {!loading && !error && destinations.length === 0 && (
        <p>{t.empty}</p>
      )}

      {/* Destination Cards */}
      {!loading && !error && destinations.length > 0 && (
        <div className="destination-grid">
          {destinations.map((destination) => {
            const name = isArabic
              ? destination.nameAr || destination.name
              : destination.name;

            const description = isArabic
              ? destination.descriptionAr || destination.description
              : destination.description;

            const destinationGovernorate = isArabic
              ? destination.governorateAr || destination.governorate
              : destination.governorate;

            const area = isArabic
              ? destination.areaAr || destination.area
              : destination.area;

            const destinationCategory = isArabic
              ? destination.categoryAr || destination.category
              : destination.category;

            const saved = isFavorite(destination._id);

            return (
              <article
                className="destination-card"
                key={destination._id}
              >
                <Link
                  to={`/destinations/${destination._id}`}
                  className="destination-card-link"
                >
                  <img
                    src={destination.imageUrl}
                    alt={name}
                    loading="lazy"
                  />

                  <div className="destination-info">
                    <span>{destinationCategory}</span>

                    <h3>{name}</h3>

                    <p>{description}</p>

                    <p>
                      ⌖ {destinationGovernorate}
                      {area ? ` - ${area}` : ""}
                    </p>
                  </div>
                </Link>

                {/* Favorite Button */}
                <button
                  type="button"
                  className={`favorite-btn ${saved ? "is-favorite" : ""}`}
                  onClick={() => handleFavorite(destination._id)}
                  disabled={favoriteLoading === destination._id}
                  aria-label={
                    saved ? t.removeFavorite : t.addFavorite
                  }
                  title={saved ? t.removeFavorite : t.addFavorite}
                >
                  {favoriteLoading === destination._id
                    ? "..."
                    : saved
                      ? "♥"
                      : "♡"}
                </button>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Destinations;
