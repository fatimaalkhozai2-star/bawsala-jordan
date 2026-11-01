
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { getTripById } from "../services/tripService";
import { getDestinations } from "../services/destinationService";
import "./TripDetails.css";

function TripDetails() {
  const { id } = useParams();
  const { token } = useAuth();
  const { language, isArabic } = useLanguage();

  const [trip, setTrip] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const content = {
    en: {
      title: "Trip Details",
      subtitle: "Explore your planned adventure",
      destinations: "Destinations",
      start: "Start Date",
      end: "End Date",
      notes: "Additional Notes",
      noNotes: "No additional notes",
      back: "Back to My Trips",
      loading: "Loading trip details...",
      error: "Could not load trip details",
      notFound: "Trip not found"
    },
    ar: {
      title: "تفاصيل الرحلة",
      subtitle: "اكتشف تفاصيل مغامرتك القادمة",
      destinations: "الوجهات السياحية",
      start: "تاريخ البداية",
      end: "تاريخ النهاية",
      notes: "ملاحظات إضافية",
      noNotes: "لا توجد ملاحظات إضافية",
      back: "العودة إلى رحلاتي",
      loading: "جاري تحميل تفاصيل الرحلة...",
      error: "تعذر تحميل تفاصيل الرحلة",
      notFound: "الرحلة غير موجودة"
    }
  };

  const t = content[language] || content.en;

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const [tripData, destinationsData] = await Promise.all([
          getTripById(id, token),
          getDestinations()
        ]);

        setTrip(tripData);
        setDestinations(
          Array.isArray(destinationsData)
            ? destinationsData
            : destinationsData.destinations || []
        );
      } catch (err) {
        console.error("Trip Details Error:", err);
        setError(t.error);
      } finally {
        setLoading(false);
      }
    };

    if (token && id) {
      fetchTripDetails();
    } else {
      setLoading(false);
    }
  }, [id, token, t.error]);

  const getDestinationInfo = (destination) => {
    if (typeof destination === "object") {
      return destination;
    }

    return destinations.find((item) => item._id === destination);
  };

  if (loading) {
    return (
      <div className="trip-details-message" dir={isArabic ? "rtl" : "ltr"}>
        {t.loading}
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="trip-details-message" dir={isArabic ? "rtl" : "ltr"}>
        <p>{error || t.notFound}</p>
        <Link to="/trips">{t.back}</Link>
      </div>
    );
  }

  return (
    <main className="trip-details-page" dir={isArabic ? "rtl" : "ltr"}>
      <header className="trip-details-header">
        <div>
          <h1>{trip.title}</h1>
          <p>{t.subtitle}</p>
        </div>

        <Link to="/trips" className="trip-back-btn">
          {t.back}
        </Link>
      </header>

      <section className="trip-details-card">
        <div className="trip-details-dates">
          <div>
            <span>{t.start}</span>
            <strong>
              {new Date(trip.startDate).toLocaleDateString(
                language === "ar" ? "ar-JO" : "en-US"
              )}
            </strong>
          </div>

          <div>
            <span>{t.end}</span>
            <strong>
              {new Date(trip.endDate).toLocaleDateString(
                language === "ar" ? "ar-JO" : "en-US"
              )}
            </strong>
          </div>
        </div>

        <h2>{t.destinations}</h2>

        <div className="trip-details-destinations">
          {trip.destinations?.map((destination, index) => {
            const item = getDestinationInfo(destination);

            if (!item) return null;

            const name = isArabic
              ? item.nameAr || item.name
              : item.name;

            return (
              <article
                className="trip-details-destination"
                key={item._id || index}
              >
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={name} />
                )}

                <h3>{name}</h3>
                {item.governorate && <p>{item.governorate}</p>}
              </article>
            );
          })}
        </div>

        <div className="trip-details-notes">
          <h2>{t.notes}</h2>
          <p>{trip.notes?.trim() || t.noNotes}</p>
        </div>
      </section>
    </main>
  );
}

export default TripDetails;
