
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getDestinationById } from "../services/destinationService";
import { useLanguage } from "../context/LanguageContext";

function DestinationDetails() {
  const { id } = useParams();
  const { isArabic } = useLanguage();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    return <p>{isArabic ? "جارٍ تحميل الوجهة..." : "Loading destination..."}</p>;
  }

  if (error || !destination) {
    return (
      <main dir={isArabic ? "rtl" : "ltr"}>
        <p>{error || (isArabic ? "الوجهة غير موجودة" : "Destination not found")}</p>
        <Link to="/destinations">
          {isArabic ? "العودة للوجهات" : "Back to destinations"}
        </Link>
      </main>
    );
  }

  const name = isArabic
    ? destination.nameAr || destination.name
    : destination.name;

  const description = isArabic
    ? destination.descriptionAr || destination.description
    : destination.description;

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
    <main
      className="destination-details-page"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <Link to="/destinations">
        {isArabic ? "← العودة للوجهات" : "← Back to destinations"}
      </Link>

      <img
        src={destination.imageUrl}
        alt={name}
      />

      <div className="destination-details-info">
        <span>{category}</span>

        <h1>{name}</h1>

        <p>{description}</p>

        <p>
          {isArabic ? "المحافظة:" : "Governorate:"} {governorate}
        </p>

        <p>
          {isArabic ? "المنطقة:" : "Area:"} {area}
        </p>
      </div>
    </main>
  );
}

export default DestinationDetails;
