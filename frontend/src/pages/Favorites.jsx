
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getFavorites, removeFavorite } from "../services/favoriteService";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

import "./Favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { token } = useAuth();
  const { language, isArabic } = useLanguage();

  const t = {
    en: {
      title: "My Favorite Destinations",
      description: "Your saved places in Jordan.",
      loading: "Loading your favorites...",
      empty: "You haven't saved any destinations yet.",
      explore: "Explore Destinations",
      remove: "Remove from favorites",
      error: "Could not load favorites.",
      details: "View Details"
    },
    ar: {
      title: "وجهاتي المفضلة",
      description: "الأماكن التي حفظتها في الأردن.",
      loading: "جارٍ تحميل المفضلة...",
      empty: "لم تقومي بحفظ أي وجهة حتى الآن.",
      explore: "استكشفي الوجهات",
      remove: "إزالة من المفضلة",
      error: "تعذّر تحميل المفضلة.",
      details: "عرض التفاصيل"
    }
  }[language];

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) {
        setFavorites([]);
        setLoading(false);
        setError(t.error);
        return;
      }

      try {
        const data = await getFavorites(token);
        setFavorites(data);
      } catch (err) {
        setError(err.message || t.error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [token]);

  const handleRemove = async (favoriteId) => {
    try {
      await removeFavorite(favoriteId, token);

      setFavorites((current) =>
        current.filter((favorite) => favorite._id !== favoriteId)
      );
    } catch (err) {
      setError(err.message || t.error);
    }
  };

  return (
    <main className="favorites-page" dir={isArabic ? "rtl" : "ltr"}>
      <div className="favorites-header">
        <Link to="/" className="back-home">
          {isArabic ? "الرئيسية" : "Home"}
        </Link>

        <h1>{t.title}</h1>
        <p>{t.description}</p>
      </div>

      {loading && <p>{t.loading}</p>}

      {!loading && error && <p className="error-message">{error}</p>}

      {!loading && !error && favorites.length === 0 && (
        <div className="favorites-empty">
          <h2>{t.empty}</h2>
          <Link to="/destinations">{t.explore}</Link>
        </div>
      )}

      {!loading && !error && favorites.length > 0 && (
        <div className="destination-grid">
          {favorites.map((favorite) => {
            const destination = favorite.destination;

            if (!destination || typeof destination !== "object") {
              return null;
            }

            const name = isArabic
              ? destination.nameAr || destination.name
              : destination.name;

            const governorate = isArabic
              ? destination.governorateAr || destination.governorate
              : destination.governorate;

            return (
              <article className="destination-card" key={favorite._id}>
                <Link
                  to={`/destinations/${destination._id}`}
                  className="destination-card-link"
                >
                  <img src={destination.imageUrl} alt={name} />

                  <div className="destination-info">
                    <h3>{name}</h3>
                    <p>{governorate}</p>
                    <span>{t.details} ←</span>
                  </div>
                </Link>

                <button
                  type="button"
                  className="favorite-btn is-favorite"
                  onClick={() => handleRemove(favorite._id)}
                  title={t.remove}
                  aria-label={t.remove}
                >
                  ♥
                </button>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default Favorites;
