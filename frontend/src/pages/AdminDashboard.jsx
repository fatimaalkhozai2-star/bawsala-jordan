
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import "./AdminDashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const { logout, token } = useAuth();
  const { language, toggleLanguage, isArabic } = useLanguage();

  const [statsData, setStatsData] = useState({
    destinationsCount: 0,
    usersCount: 0,
    tripsCount: 0,
    tripsPerMonth: [],
    destinationsByCategory: []
  });

  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
"https://bawsala-jordan-backend.onrender.com/api/admin/stats" ,         {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load statistics");
        }

        const data = await response.json();
        setStatsData(data);
      } catch (error) {
        console.error("Dashboard Stats Error:", error);
        setStatsError("Could not load statistics");
      } finally {
        setStatsLoading(false);
      }
    };

    if (token) {
      fetchStats();
    } else {
      setStatsLoading(false);
    }
  }, [token]);

  const content = {
    en: {
      title: "Admin Dashboard",
      subtitle: "Manage Bawsala Jordan",
      overview: "Overview",
      destinations: "Destinations",
      categories: "Categories",
      users: "Users",
      trips: "Trips",
      home: "View Website",
      logout: "Logout",
      totalDestinations: "Total Destinations",
      totalUsers: "Total Users",
      totalTrips: "Total Trips",
      quickActions: "Quick Actions",
      manageDestinations: "Manage Destinations",
      manageCategories: "Manage Categories",
      statsError: "Could not load statistics",
      tripsChart: "Trips Created Per Month",
      categoriesChart: "Destinations by Category",
      noTrips: "No trips recorded yet",
      noCategories: "No destinations recorded yet"
    },
    ar: {
      title: "لوحة تحكم الأدمن",
      subtitle: "إدارة منصة بوصلة الأردن",
      overview: "نظرة عامة",
      destinations: "الوجهات السياحية",
      categories: "التصنيفات",
      users: "المستخدمون",
      trips: "الرحلات",
      home: "عرض الموقع",
      logout: "تسجيل الخروج",
      totalDestinations: "إجمالي الوجهات",
      totalUsers: "إجمالي المستخدمين",
      totalTrips: "إجمالي الرحلات",
      quickActions: "إجراءات سريعة",
      manageDestinations: "إدارة الوجهات",
      manageCategories: "إدارة التصنيفات",
      statsError: "تعذر تحميل الإحصائيات",
      tripsChart: "الرحلات المنشأة شهريًا",
      categoriesChart: "الوجهات حسب التصنيف",
      noTrips: "لا توجد رحلات مسجلة حتى الآن",
      noCategories: "لا توجد وجهات مسجلة حتى الآن"
    }
  };

  const t = content[language] || content.en;

  const stats = [
    {
      title: t.totalDestinations,
      icon: "📍",
      value: statsLoading ? "..." : statsData.destinationsCount
    },
    {
      title: t.totalUsers,
      icon: "👥",
      value: statsLoading ? "..." : statsData.usersCount
    },
    {
      title: t.totalTrips,
      icon: "🧳",
      value: statsLoading ? "..." : statsData.tripsCount
    }
  ];

  const monthNames = isArabic
    ? ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
       "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
    : ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const tripsChartData = {
    labels: statsData.tripsPerMonth.map(
      (item) => `${monthNames[item._id.month - 1]} ${item._id.year}`
    ),
    datasets: [
      {
        label: t.trips,
        data: statsData.tripsPerMonth.map((item) => item.count),
        backgroundColor: "#326b55",
        borderColor: "#173f35",
        borderWidth: 1,
        borderRadius: 7
      }
    ]
  };

  const categoriesChartData = {
    labels: statsData.destinationsByCategory.map(
      (item) => item._id
    ),
    datasets: [
      {
        label: t.destinations,
        data: statsData.destinationsByCategory.map(
          (item) => item.count
        ),
        backgroundColor: [
          "#173f35",
          "#326b55",
          "#c69b55",
          "#b45b3b",
          "#8ba99a",
          "#d6b477"
        ],
        borderWidth: 2,
        borderColor: "#ffffff"
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 18
        }
      }
    }
  };

  const barOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    }
  };

  return (
    <div className="admin-layout" dir={isArabic ? "rtl" : "ltr"}>
      <aside className="admin-sidebar">
        <Link to="/" className="admin-brand">
          <span>⌁</span>
          <div>
            <strong>Bawsala</strong>
            <small>Jordan Admin</small>
          </div>
        </Link>

        <nav className="admin-nav">
          <span className="admin-nav-label">{t.overview}</span>

          <Link to="/admin" className="admin-nav-link active">
            <span>▦</span> {t.overview}
          </Link>

          <Link to="/destinations" className="admin-nav-link">
            <span>📍</span> {t.destinations}
          </Link>

          <a href="#categories" className="admin-nav-link">
            <span>▤</span> {t.categories}
          </a>

          <a href="#users" className="admin-nav-link">
            <span>👥</span> {t.users}
          </a>

          <a href="#trips" className="admin-nav-link">
            <span>🧳</span> {t.trips}
          </a>
        </nav>

        <div className="admin-sidebar-bottom">
          <Link to="/" className="admin-nav-link">
            ↗ {t.home}
          </Link>

          <button className="admin-logout" onClick={logout}>
            ⇥ {t.logout}
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>{t.title}</h1>
            <p>{t.subtitle}</p>
          </div>

          <button
            className="admin-language"
            onClick={toggleLanguage}
          >
            {language === "en" ? "عربي" : "En"}
          </button>
        </header>

        <section className="admin-welcome">
          <div>
            <span>BAWSALA JORDAN</span>
            <h2>{t.overview}</h2>
            <p>{t.subtitle}</p>
          </div>
          <span className="admin-welcome-icon"></span>
        </section>

        <section className="admin-stats">
          {stats.map((stat) => (
            <article className="admin-stat-card" key={stat.title}>
              <span className="admin-stat-icon">{stat.icon}</span>
              <p>{stat.title}</p>
              <h2>{stat.value}</h2>
            </article>
          ))}
        </section>

        {statsError && (
          <p style={{ color: "red" }}>{t.statsError}</p>
        )}

        {!statsLoading && !statsError && (
          <section className="admin-charts">
            <article className="admin-chart-card">
              <h2>{t.tripsChart}</h2>
              <div className="admin-chart-container">
                {statsData.tripsPerMonth.length > 0 ? (
                  <Bar data={tripsChartData} options={barOptions} />
                ) : (
                  <p>{t.noTrips}</p>
                )}
              </div>
            </article>

            <article className="admin-chart-card">
              <h2>{t.categoriesChart}</h2>
              <div className="admin-chart-container">
                {statsData.destinationsByCategory.length > 0 ? (
                  <Doughnut
                    data={categoriesChartData}
                    options={chartOptions}
                  />
                ) : (
                  <p>{t.noCategories}</p>
                )}
              </div>
            </article>
          </section>
        )}

        <section className="admin-quick-actions">
          <h2>{t.quickActions}</h2>

          <div className="admin-actions-grid">
            <Link to="/destinations" className="admin-action-card">
              <span>📍</span>
              <h3>{t.manageDestinations}</h3>
              <p>→</p>
            </Link>

            <Link to="/destinations" className="admin-action-card">
              <span>▤</span>
              <h3>{t.manageCategories}</h3>
              <p>→</p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
