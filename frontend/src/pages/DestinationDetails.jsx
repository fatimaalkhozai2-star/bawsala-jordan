
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getDestinationById } from "../services/destinationService";
import { useLanguage } from "../context/LanguageContext";
import "./DestinationDetails.css";

function DestinationDetails() {
  const { id } = useParams();
  const { isArabic } = useLanguage();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const text = (en, ar) => isArabic ? ar : en;

  const getValue = (en, ar) =>
    isArabic ? ar || en || "" : en || "";

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getDestinationById(id);
        setDestination(data);
      } catch (err) {
        setError(err.message || "Could not load destination");
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  if (loading) {
    return (
      <main className="details-message">
        {text("Loading destination...", "جارٍ تحميل الوجهة...")}
      </main>
    );
  }

  if (error || !destination) {
    return (
      <main className="details-message" dir={isArabic ? "rtl" : "ltr"}>
        <p>
          {error || text("Destination not found", "الوجهة غير موجودة")}
        </p>
        <Link to="/destinations">
          {text("Back to destinations", "العودة للوجهات")}
        </Link>
      </main>
    );
  }

  const name = getValue(destination.name, destination.nameAr);
  const description = getValue(
    destination.description,
    destination.descriptionAr
  );
  const governorate = getValue(
    destination.governorate,
    destination.governorateAr
  );
  const area = getValue(destination.area, destination.areaAr);
  const category = getValue(
    destination.category,
    destination.categoryAr
  );
  const history = getValue(
    destination.history,
    destination.historyAr
  );

  const activities = destination.activities || [];
  const features = destination.features || [];
  const visitorTips = isArabic
    ? destination.visitorTipsAr || destination.visitorTips || []
    : destination.visitorTips || [];

  const restaurants = destination.restaurants || [];
  const hotels = destination.hotels || [];

  const bestTime = getValue(
    destination.bestTimeToVisit,
    destination.bestTimeToVisitAr
  );

  const latitude = destination.location?.latitude;
  const longitude = destination.location?.longitude;

  const mapUrl =
    latitude != null && longitude != null
      ? `https://www.google.com/maps?q=${latitude},${longitude}`
      : null;

  return (
    <main
      className="destination-details-page"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="details-container">

        <Link to="/destinations" className="back-link">
          {text("← Back to destinations", "← العودة للوجهات")}
        </Link>

        {/* Hero */}
        <section className="destination-hero">
          <img
            src={destination.imageUrl}
            alt={name}
            className="destination-hero-image"
          />

          <div className="destination-hero-overlay">
            <span className="destination-category">{category}</span>
            <h1>{name}</h1>
            <p>{description}</p>
          </div>
        </section>

        {/* Basic Information */}
        <section className="details-section">
          <h2>{text("About This Destination", "عن هذه الوجهة")}</h2>

          <div className="destination-info-grid">
            <div className="info-card">
              <span>📍</span>
              <h3>{text("Governorate", "المحافظة")}</h3>
              <p>{governorate}</p>
            </div>

            <div className="info-card">
              <span>🗺️</span>
              <h3>{text("Area", "المنطقة")}</h3>
              <p>{area}</p>
            </div>

            <div className="info-card">
              <span>🏷️</span>
              <h3>{text("Category", "التصنيف")}</h3>
              <p>{category}</p>
            </div>
          </div>
        </section>

        {/* History */}
        {history && (
          <section className="details-section">
            <h2>{text("History", "التاريخ")}</h2>
            <div className="history-card">
              <p>{history}</p>
            </div>
          </section>
        )}

        {/* Features */}
        {features.length > 0 && (
          <section className="details-section">
            <h2>{text("Why Visit This Place?", "ما الذي يميز هذه الوجهة؟")}</h2>

            <div className="details-cards-grid">
              {features.map((feature, index) => (
                <article className="activity-card" key={index}>
                  <span className="feature-icon">
                    {["🌟", "🏛️", "🌿", "📸", "✨", "🗺️"][index % 6]}
                  </span>

                  <h3>
                    {getValue(feature.title, feature.titleAr)}
                  </h3>

                  <p>
                    {getValue(
                      feature.description,
                      feature.descriptionAr
                    )}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Activities */}
        {activities.length > 0 && (
          <section className="details-section">
            <h2>{text("Things To Do", "الأنشطة السياحية")}</h2>

            <div className="details-cards-grid">
              {activities.map((activity, index) => (
                <article className="activity-card" key={index}>
                  <h3>
                    {getValue(activity.name, activity.nameAr)}
                  </h3>

                  <p>
                    {getValue(
                      activity.description,
                      activity.descriptionAr
                    )}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Best Time */}
        {bestTime && (
          <section className="details-section">
            <h2>{text("Best Time to Visit", "أفضل وقت للزيارة")}</h2>

            <div className="history-card">
              <span className="feature-icon">🌤️</span>
              <p>{bestTime}</p>
            </div>
          </section>
        )}

        {/* Visitor Tips */}
        {visitorTips.length > 0 && (
          <section className="details-section">
            <h2>{text("Visitor Tips", "نصائح للزوار")}</h2>

            <div className="tips-card">
              {visitorTips.map((tip, index) => (
                <div className="tip-item" key={index}>
                  <span>✓</span>
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Restaurants */}
        {restaurants.length > 0 && (
          <section className="details-section">
            <h2>{text("Nearby Restaurants", "المطاعم القريبة")}</h2>

            <div className="details-cards-grid">
              {restaurants.map((place, index) => (
                <article className="nearby-card" key={index}>
                  {place.imageUrl && (
                    <img src={place.imageUrl} alt={place.name} />
                  )}

                  <div className="nearby-card-content">
                    <h3>{getValue(place.name, place.nameAr)}</h3>

                    <p>
                      {getValue(
                        place.description,
                        place.descriptionAr
                      )}
                    </p>

                    {place.mapsUrl && (
                      <a href={place.mapsUrl} target="_blank" rel="noreferrer">
                        {text("View Location", "عرض الموقع")}
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Hotels */}
        {hotels.length > 0 && (
          <section className="details-section">
            <h2>{text("Nearby Hotels", "الفنادق القريبة")}</h2>

            <div className="details-cards-grid">
              {hotels.map((place, index) => (
                <article className="nearby-card" key={index}>
                  {place.imageUrl && (
                    <img src={place.imageUrl} alt={place.name} />
                  )}

                  <div className="nearby-card-content">
                    <h3>{getValue(place.name, place.nameAr)}</h3>

                    <p>
                      {getValue(
                        place.description,
                        place.descriptionAr
                      )}
                    </p>

                    {place.mapsUrl && (
                      <a href={place.mapsUrl} target="_blank" rel="noreferrer">
                        {text("View Location", "عرض الموقع")}
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Map */}
        {mapUrl && (
          <section className="details-section">
            <h2>{text("Location", "الموقع")}</h2>

            <div className="map-card">
              <p>
                {latitude}, {longitude}
              </p>

              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="map-button"
              >
                {text("Open in Google Maps", "افتح الموقع على الخريطة")}
              </a>
            </div>
          </section>
        )}

      </div>
    </main>
  );
}

export default DestinationDetails;
