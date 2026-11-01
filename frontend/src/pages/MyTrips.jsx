
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { getTrips, deleteTrip } from "../services/tripService";
import { getDestinations } from "../services/destinationService";
import "./MyTrips.css";

function MyTrips() {
  const { token } = useAuth();
  const { language, isArabic } = useLanguage();

  const [trips, setTrips] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const content = {
    en: {
      title: "My Trips",
      subtitle: "Plan your next adventure in Jordan",
      create: "Create New Trip",
      empty: "You haven't planned any trips yet",
      emptyText: "Start planning your next adventure!",
      destinations: "Destinations",
      start: "Start Date",
      end: "End Date",
      view: "View Details",
      edit: "Edit",
      delete: "Delete",
      loading: "Loading your trips...",
      error: "Could not load your trips",
      confirm: "Are you sure you want to delete this trip?",
      noImage: "Jordan Adventure",
      count: "destinations"
    },
    ar: {
      title: "رحلاتي",
      subtitle: "خطط لمغامرتك القادمة في الأردن",
      create: "إنشاء رحلة جديدة",
      empty: "لسه ما خططت لأي رحلة",
      emptyText: "ابدأ بالتخطيط لمغامرتك القادمة!",
      destinations: "الوجهات",
      start: "تاريخ البداية",
      end: "تاريخ النهاية",
      view: "عرض التفاصيل",
      edit: "تعديل",
      delete: "حذف",
      loading: "جاري تحميل رحلاتك...",
      error: "تعذر تحميل الرحلات",
      confirm: "هل أنت متأكد من حذف هذه الرحلة؟",
      noImage: "مغامرة في الأردن",
      count: "وجهات"
    }
  };

  const t = content[language] || content.en;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [tripsData, destinationsData] = await Promise.all([
          getTrips(token),
          getDestinations()
        ]);

        setTrips(tripsData);
        setDestinations(
          Array.isArray(destinationsData)
            ? destinationsData
            : destinationsData.destinations || []
        );
      } catch (err) {
        console.error("My Trips Error:", err);
        setError(t.error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [token, t.error]);

  const handleDelete = async (tripId) => {
    if (!window.confirm(t.confirm)) return;

    try {
      await deleteTrip(tripId, token);
      setTrips((currentTrips) =>
        currentTrips.filter((trip) => trip._id !== tripId)
      );
    } catch (err) {
      console.error("Delete Trip Error:", err);
      setError(err.message);
    }
  };

  const getTripImage = (trip) => {
    const firstDestination = trip.destinations?.[0];

    if (typeof firstDestination === "object") {
      return firstDestination.imageUrl;
    }

    const destination = destinations.find(
      (item) => item._id === firstDestination
    );

    return destination?.imageUrl;
  };

  const getTripDestinationNames = (trip) => {
    return trip.destinations?.map((destination) => {
      if (typeof destination === "object") {
        return isArabic
          ? destination.nameAr || destination.name
          : destination.name;
      }

      const found = destinations.find(
        (item) => item._id === destination
      );

      return found
        ? isArabic
          ? found.nameAr || found.name
          : found.name
        : "";
    }).filter(Boolean);
  };

  if (loading) {
    return (
      <div className="my-trips-message" dir={isArabic ? "rtl" : "ltr"}>
        {t.loading}
      </div>
    );
  }

  return (
    <main className="my-trips-page" dir={isArabic ? "rtl" : "ltr"}>
      <header className="my-trips-header">
        <div>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>

        <Link to="/trips/create" className="create-trip-btn">
          + {t.create}
        </Link>
      </header>

      {error && <p className="my-trips-error">{error}</p>}

      {trips.length === 0 ? (
        <section className="empty-trips">
          <div className="empty-trips-icon">🧳</div>
          <h2>{t.empty}</h2>
          <p>{t.emptyText}</p>
          <Link to="/trips/create" className="create-trip-btn">
            + {t.create}
          </Link>
        </section>
      ) : (
        <section className="my-trips-grid">
          {trips.map((trip) => {
            const names = getTripDestinationNames(trip);
            const image = getTripImage(trip);

            return (
              <article className="my-trip-card" key={trip._id}>
                {image ? (
                  <img
                    src={image}
                    alt={trip.title}
                    className="my-trip-image"
                  />
                ) : (
                  <div className="my-trip-image-placeholder">
                    🧳 {t.noImage}
                  </div>
                )}

                <div className="my-trip-content">
                  <h2>{trip.title}</h2>

                  <p className="my-trip-destinations">
                    📍 {names.join(" • ") || `${trip.destinations?.length || 0} ${t.count}`}
                  </p>

                  <div className="my-trip-dates">
                    <p>
                      <strong>{t.start}:</strong>{" "}
                      {new Date(trip.startDate).toLocaleDateString(
                        language === "ar" ? "ar-JO" : "en-US"
                      )}
                    </p>

                    <p>
                      <strong>{t.end}:</strong>{" "}
                      {new Date(trip.endDate).toLocaleDateString(
                        language === "ar" ? "ar-JO" : "en-US"
                      )}
                    </p>
                  </div>

                  <div className="my-trip-actions">
                    <Link
                      to={`/trips/${trip._id}`}
                      className="trip-view-btn"
                    >
                      {t.view}
                    </Link>

                    <Link
                      to={`/trips/edit/${trip._id}`}
                      className="trip-edit-btn"
                    >
                      {t.edit}
                    </Link>

                    <button
                      type="button"
                      className="trip-delete-btn"
                      onClick={() => handleDelete(trip._id)}
                    >
                      {t.delete}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}

export default MyTrips;
