
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { getTripById, updateTrip } from "../services/tripService";
import { getDestinations } from "../services/destinationService";
import "./EditTrip.css";

function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const { language, isArabic } = useLanguage();

  const [title, setTitle] = useState("");
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const content = {
    en: {
      title: "Edit Your Trip",
      subtitle: "Update your Jordan adventure",
      tripName: "Trip Name",
      namePlaceholder: "Enter trip name",
      destinations: "Choose Destinations",
      start: "Start Date",
      end: "End Date",
      notes: "Additional Notes",
      notesPlaceholder: "Write your trip notes...",
      save: "Save Changes",
      cancel: "Cancel",
      loading: "Loading trip...",
      loadError: "Could not load trip",
      saveError: "Could not update trip",
      required: "Please enter a trip name and select at least one destination.",
      dateError: "End date must be after start date."
    },
    ar: {
      title: "تعديل الرحلة",
      subtitle: "حدّث تفاصيل مغامرتك في الأردن",
      tripName: "اسم الرحلة",
      namePlaceholder: "أدخل اسم الرحلة",
      destinations: "اختيار الوجهات السياحية",
      start: "تاريخ البداية",
      end: "تاريخ النهاية",
      notes: "ملاحظات إضافية",
      notesPlaceholder: "اكتب ملاحظات عن رحلتك...",
      save: "حفظ التعديلات",
      cancel: "إلغاء",
      loading: "جاري تحميل الرحلة...",
      loadError: "تعذر تحميل الرحلة",
      saveError: "تعذر تعديل الرحلة",
      required: "يرجى إدخال اسم الرحلة واختيار وجهة واحدة على الأقل.",
      dateError: "يجب أن يكون تاريخ النهاية بعد تاريخ البداية."
    }
  };

  const t = content[language] || content.en;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [tripData, destinationsData] = await Promise.all([
          getTripById(id, token),
          getDestinations()
        ]);

        const availableDestinations = Array.isArray(destinationsData)
          ? destinationsData
          : destinationsData.destinations || [];

        setDestinations(availableDestinations);
        setTitle(tripData.title || "");

        setSelectedDestinations(
          (tripData.destinations || []).map((destination) =>
            typeof destination === "object"
              ? destination._id
              : destination
          )
        );

        setStartDate(
          tripData.startDate ? tripData.startDate.slice(0, 10) : ""
        );

        setEndDate(
          tripData.endDate ? tripData.endDate.slice(0, 10) : ""
        );

        setNotes(tripData.notes || "");
      } catch (err) {
        console.error("Edit Trip Error:", err);
        setError(t.loadError);
      } finally {
        setLoading(false);
      }
    };

    if (token && id) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [id, token, t.loadError]);

  const toggleDestination = (destinationId) => {
    setSelectedDestinations((current) =>
      current.includes(destinationId)
        ? current.filter((item) => item !== destinationId)
        : [...current, destinationId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || selectedDestinations.length === 0) {
      setError(t.required);
      return;
    }

    if (
      !startDate ||
      !endDate ||
      new Date(endDate) <= new Date(startDate)
    ) {
      setError(t.dateError);
      return;
    }

    try {
      setSaving(true);

      await updateTrip(
        id,
        {
          title: title.trim(),
          destinations: selectedDestinations,
          startDate,
          endDate,
          notes: notes.trim()
        },
        token
      );

      navigate("/trips");
    } catch (err) {
      console.error("Update Trip Error:", err);
      setError(err.message || t.saveError);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-trip-message" dir={isArabic ? "rtl" : "ltr"}>
        {t.loading}
      </div>
    );
  }

  return (
    <main className="edit-trip-page" dir={isArabic ? "rtl" : "ltr"}>
      <header className="edit-trip-header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </header>

      <form className="edit-trip-form" onSubmit={handleSubmit}>
        <div className="edit-trip-field">
          <label>{t.tripName}</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t.namePlaceholder}
            required
          />
        </div>

        <div className="edit-trip-field">
          <label>{t.destinations}</label>

          <div className="edit-trip-destinations">
            {destinations.map((destination) => {
              const name = isArabic
                ? destination.nameAr || destination.name
                : destination.name;

              return (
                <label
                  className={`edit-trip-destination ${
                    selectedDestinations.includes(destination._id)
                      ? "selected"
                      : ""
                  }`}
                  key={destination._id}
                >
                  <input
                    type="checkbox"
                    checked={selectedDestinations.includes(destination._id)}
                    onChange={() => toggleDestination(destination._id)}
                  />

                  {destination.imageUrl && (
                    <img src={destination.imageUrl} alt={name} />
                  )}

                  <span>{name}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="edit-trip-dates">
          <div className="edit-trip-field">
            <label>{t.start}</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div className="edit-trip-field">
            <label>{t.end}</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || undefined}
              required
            />
          </div>
        </div>

        <div className="edit-trip-field">
          <label>{t.notes}</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t.notesPlaceholder}
            rows="5"
          />
        </div>

        {error && <p className="edit-trip-error">{error}</p>}

        <div className="edit-trip-actions">
          <Link to="/trips" className="edit-trip-cancel">
            {t.cancel}
          </Link>

          <button type="submit" disabled={saving}>
            {saving ? "..." : t.save}
          </button>
        </div>
      </form>
    </main>
  );
}

export default EditTrip;
