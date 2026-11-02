
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { getDestinations } from "../services/destinationService";
import { createTrip } from "../services/tripService";
import "./CreateTrip.css";

function CreateTrip() {
  const { token } = useAuth();
  const { language, isArabic } = useLanguage();
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);
  const [title, setTitle] = useState("");
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const content = {
    en: {
      title: "Create New Trip",
      subtitle: "Plan your next adventure in Jordan",
      tripName: "Trip Name",
      tripNamePlaceholder: "Enter your trip name",
      chooseDestinations: "Choose Destinations",
      startDate: "Start Date",
      endDate: "End Date",
      notes: "Additional Notes",
      notesPlaceholder: "Write any notes about your trip...",
      save: "Create Trip",
      cancel: "Cancel",
      loading: "Loading destinations...",
      saving: "Creating...",
      required: "Please fill in all required fields",
      dateError: "End date must be after start date",
      destinationError: "Please select at least one destination",
      loadError: "Could not load destinations",
      createError: "Could not create trip",
      backToDestinations: "← Back to Destinations",
    },
    ar: {
      title: "إنشاء رحلة جديدة",
      subtitle: "خطط لمغامرتك القادمة في الأردن",
      tripName: "اسم الرحلة",
      tripNamePlaceholder: "أدخل اسم الرحلة",
      chooseDestinations: "اختار الوجهات السياحية",
      startDate: "تاريخ البداية",
      endDate: "تاريخ النهاية",
      notes: "ملاحظات إضافية",
      notesPlaceholder: "اكتب أي ملاحظات عن رحلتك...",
      save: "إنشاء الرحلة",
      cancel: "إلغاء",
      loading: "جاري تحميل الوجهات...",
      saving: "جاري الإنشاء...",
      required: "يرجى تعبئة جميع الحقول المطلوبة",
      dateError: "يجب أن يكون تاريخ النهاية بعد تاريخ البداية",
      destinationError: "يرجى اختيار وجهة واحدة على الأقل",
      loadError: "تعذر تحميل الوجهات",
      createError: "تعذر إنشاء الرحلة",
      backToDestinations: "العودة إلى الوجهات ←",
    }
  };

  const t = content[language] || content.en;

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getDestinations();

        setDestinations(
          Array.isArray(data) ? data : data.destinations || []
        );
      } catch (err) {
        console.error("Destinations Error:", err);
        setError(t.loadError);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [t.loadError]);

  const handleDestinationChange = (id) => {
    setSelectedDestinations((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !startDate || !endDate) {
      setError(t.required);
      return;
    }

    if (selectedDestinations.length === 0) {
      setError(t.destinationError);
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      setError(t.dateError);
      return;
    }

    try {
      setSaving(true);

      await createTrip(
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
      console.error("Create Trip Error:", err);
      setError(err.message || t.createError);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main
      className="create-trip-page"
      dir={isArabic ? "rtl" : "ltr"}
    ><header className="create-trip-header">
  <div>
    <h1>{t.title}</h1>
    <p>{t.subtitle}</p>
  </div>

  <Link
    to="/destinations"
    className="back-destinations-link"
  >
    {t.backToDestinations}
  </Link>
</header>
      <form className="create-trip-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="trip-title">{t.tripName}</label>
          <input
            id="trip-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t.tripNamePlaceholder}
            required
          />
        </div>

        <div className="form-group">
          <label>{t.chooseDestinations}</label>

          {loading ? (
            <p>{t.loading}</p>
          ) : (
            <div className="trip-destinations-list">
              {destinations.map((destination) => (
                <label
                  className="trip-destination-option"
                  key={destination._id}
                >
                  <input
                    type="checkbox"
                    checked={selectedDestinations.includes(destination._id)}
                    onChange={() =>
                      handleDestinationChange(destination._id)
                    }
                  />

                  {destination.imageUrl && (
                    <img
                      src={destination.imageUrl}
                      alt={destination.name}
                    />
                  )}

                  <span>
                    {isArabic
                      ? destination.nameAr || destination.name
                      : destination.name}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="trip-dates-row">
          <div className="form-group">
            <label htmlFor="start-date">{t.startDate}</label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="end-date">{t.endDate}</label>
            <input
              id="end-date"
              type="date"
              min={startDate || undefined}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="trip-notes">{t.notes}</label>
          <textarea
            id="trip-notes"
            rows="4"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t.notesPlaceholder}
          />
        </div>

        {error && (
          <p className="create-trip-error">{error}</p>
        )}

        <div className="create-trip-actions">
          <button
            type="submit"
            className="save-trip-btn"
            disabled={saving || loading}
          >
            {saving ? t.saving : t.save}
          </button>

          <Link to="/trips" className="cancel-trip-btn">
            {t.cancel}
          </Link>
        </div>
      </form>
    </main>
  );
}

export default CreateTrip;
