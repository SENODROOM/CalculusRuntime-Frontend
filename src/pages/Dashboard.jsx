import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import "./Dashboard.css";

const CURRICULUM = [
  {
    id: "partial",
    title: "Partial Derivatives",
    icon: "∂",
    color: "teal",
    parts: [
      { id: "partial-1", label: "Part 1 — Functions, Limits & Continuity", path: "/partial-derivatives/1" },
      { id: "partial-2", label: "Part 2 — Derivatives, Chain Rule & Extrema", path: "/partial-derivatives/2" },
    ],
  },
  {
    id: "vector",
    title: "Vector Calculus",
    icon: "∇",
    color: "blue",
    parts: [
      { id: "vector-1", label: "Part 1 — Vector Functions & Line Integrals", path: "/vector-calculus/1" },
      { id: "vector-2", label: "Part 2 — Green's Theorem & Surfaces", path: "/vector-calculus/2" },
    ],
  },
  {
    id: "limits",
    title: "Limits & Continuity",
    icon: "lim",
    color: "purple",
    parts: [
      { id: "limits-1", label: "Part 1 — Limits of Multivariable Functions", path: "/limits-continuity/1" },
      { id: "limits-2", label: "Part 2 — Continuity", path: "/limits-continuity/2" },
    ],
  },
  {
    id: "integrals",
    title: "Multiple Integrals",
    icon: "∬",
    color: "teal",
    parts: [
      { id: "integrals-1", label: "Part 1 — Double Integrals & Fubini's Theorem", path: "/multiple-integrals/1" },
      { id: "integrals-2", label: "Part 2 — Triple Integrals & Coordinates", path: "/multiple-integrals/2" },
    ],
  },
];

const TOOLS = [
  { label: "Continuity Finder", path: "/test", icon: "≈" },
  { label: "Extreme Value Finder", path: "/extreme", icon: "⬆" },
  { label: "Volume Calculator", path: "/volumecalculator", icon: "∬" },
  { label: "AI Calculus Solver", path: "/ai-solver", icon: "🤖" },
];

function ProgressBar({ value, max }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="db-progress-bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className="db-progress-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

// ── Study Streak Component ──
function StudyStreak({ streak }) {
  return (
    <div className="db-streak-card">
      <span className="db-streak-fire">🔥</span>
      <div className="db-streak-info">
        <span className="db-streak-num">{streak}</span>
        <span className="db-streak-label">day streak</span>
      </div>
      <p className="db-streak-msg">
        {streak === 0
          ? "Start studying today to begin your streak!"
          : streak === 1
          ? "Great start! Come back tomorrow to continue."
          : `Amazing! You've studied ${streak} days in a row!`}
      </p>
    </div>
  );
}

// ── Progress Chart Component ──
function ProgressChart({ curriculum, progress }) {
  const totalParts = curriculum.reduce((sum, c) => sum + c.parts.length, 0);
  const completedParts = curriculum.reduce((sum, c) =>
    sum + c.parts.filter((p) => progress.completedSections[p.id]).length, 0);
  const inProgressParts = curriculum.reduce((sum, c) => {
    const done = c.parts.filter((p) => progress.completedSections[p.id]).length;
    return sum + (done > 0 && done < c.parts.length ? 1 : 0);
  }, 0);
  const notStarted = totalParts - completedParts;

  const completedPct = totalParts > 0 ? (completedParts / totalParts) * 100 : 0;
  const notStartedPct = 100 - completedPct;

  return (
    <div className="db-chart-wrapper">
      <h3 className="db-chart-title">Progress Overview</h3>
      <div className="db-chart-bars">
        {curriculum.map((course) => {
          const done = course.parts.filter((p) => progress.completedSections[p.id]).length;
          const pct = (done / course.parts.length) * 100;
          return (
            <div key={course.id} className="db-chart-row">
              <span className="db-chart-label">{course.title}</span>
              <div className="db-chart-bar-bg">
                <div
                  className={`db-chart-bar-fill db-chart-bar--${course.color}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="db-chart-pct">{Math.round(pct)}%</span>
            </div>
          );
        })}
      </div>
      <div className="db-chart-legend">
        <span className="db-legend-item">
          <span className="db-legend-dot db-legend-dot--done" />
          {completedParts} completed
        </span>
        <span className="db-legend-item">
          <span className="db-legend-dot db-legend-dot--progress" />
          {inProgressParts} in progress
        </span>
        <span className="db-legend-item">
          <span className="db-legend-dot db-legend-dot--none" />
          {notStarted} not started
        </span>
      </div>
    </div>
  );
}

// ── Bookmark Search Component ──
function BookmarksSection({ bookmarks, removeBookmark }) {
  const [search, setSearch] = useState("");

  const filtered = bookmarks.filter((bm) =>
    bm.title.toLowerCase().includes(search.toLowerCase())
  );

  if (bookmarks.length === 0) return null;

  return (
    <section className="db-section">
      <h2 className="db-section-title">Bookmarks</h2>
      <div className="db-bookmark-search-wrapper">
        <input
          className="db-bookmark-search"
          type="text"
          placeholder="Search bookmarks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="db-bookmark-count">{filtered.length} / {bookmarks.length}</span>
      </div>
      {filtered.length === 0 ? (
        <p className="db-bookmark-empty">No bookmarks match your search.</p>
      ) : (
        <div className="db-bookmarks">
          {filtered.map((bm) => (
            <div key={bm.id} className="db-bookmark">
              <Link to={bm.path} className="db-bookmark-link">
                <span className="db-bookmark-icon">📖</span>
                <span>{bm.title}</span>
              </Link>
              <button
                className="db-bookmark-remove"
                onClick={() => removeBookmark(bm.id)}
                aria-label={`Remove bookmark: ${bm.title}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// ── Main Dashboard ──
function Dashboard() {
  const { user, logout } = useAuth();
  const { progress, stats, removeBookmark, recordVisit } = useProgress();
  const navigate = useNavigate();

  // Calculate study streak
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    recordVisit("dashboard");
  }, [recordVisit]);

  useEffect(() => {
    // Calculate streak from localStorage
    try {
      const today = new Date().toDateString();
      const studyDays = JSON.parse(localStorage.getItem("calculus-study-days") || "[]");

      // Add today if not already there
      if (!studyDays.includes(today)) {
        studyDays.push(today);
        localStorage.setItem("calculus-study-days", JSON.stringify(studyDays));
      }

      // Count consecutive days ending today
      let count = 0;
      const now = new Date();
      for (let i = 0; i < 365; i++) {
        const d = new Date(now);
        d.setDate(now.getDate() - i);
        if (studyDays.includes(d.toDateString())) {
          count++;
        } else {
          break;
        }
      }
      setStreak(count);
    } catch {
      setStreak(0);
    }
  }, []);

  if (!user) return null;

  const overallPct = stats.totalSections > 0
    ? Math.round((stats.completedCount / stats.totalSections) * 100)
    : 0;

  return (
    <main className="dashboard">
      {/* Top bar */}
      <div className="db-topbar">
        <div className="db-welcome">
          <span className="db-avatar">{user.username[0].toUpperCase()}</span>
          <div>
            <div className="db-username">{user.username}</div>
            <div className="db-tagline">Keep going — you're doing great.</div>
          </div>
        </div>
        <button className="db-logout" onClick={logout}>Sign out</button>
      </div>

      {/* Stats row */}
      <div className="db-stats-row">
        <div className="db-stat">
          <span className="db-stat-num">{stats.completedCount}</span>
          <span className="db-stat-label">Sections done</span>
        </div>
        <div className="db-stat">
          <span className="db-stat-num">{stats.quizzesTaken}</span>
          <span className="db-stat-label">Quizzes taken</span>
        </div>
        <div className="db-stat">
          <span className="db-stat-num">{stats.bookmarkCount}</span>
          <span className="db-stat-label">Bookmarks</span>
        </div>
        <div className="db-stat">
          <span className="db-stat-num">{stats.solverUses}</span>
          <span className="db-stat-label">AI solver uses</span>
        </div>
      </div>

      {/* Streak + Chart row */}
      <div className="db-streak-chart-row">
        <StudyStreak streak={streak} />
        <ProgressChart curriculum={CURRICULUM} progress={progress} />
      </div>

      {/* Overall progress */}
      <section className="db-section">
        <h2 className="db-section-title">Overall progress</h2>
        <div className="db-overall">
          <div className="db-overall-label">
            <span>{stats.completedCount} / {stats.totalSections} sections</span>
            <span className="db-overall-pct">{overallPct}%</span>
          </div>
          <ProgressBar value={stats.completedCount} max={stats.totalSections} />
        </div>
      </section>

      {/* Curriculum */}
      <section className="db-section">
        <h2 className="db-section-title">Curriculum</h2>
        <div className="db-curriculum">
          {CURRICULUM.map((course) => {
            const done = course.parts.filter((p) => progress.completedSections[p.id]).length;
            return (
              <div key={course.id} className={`db-course db-course--${course.color}`}>
                <div className="db-course-head">
                  <span className="db-course-icon">{course.icon}</span>
                  <div>
                    <div className="db-course-title">{course.title}</div>
                    <div className="db-course-meta">{done} / {course.parts.length} parts complete</div>
                  </div>
                </div>
                <ProgressBar value={done} max={course.parts.length} />
                <div className="db-parts">
                  {course.parts.map((part) => {
                    const complete = !!progress.completedSections[part.id];
                    return (
                      <Link key={part.id} to={part.path} className={`db-part${complete ? " db-part--done" : ""}`}>
                        <span className="db-part-check">{complete ? "✓" : "○"}</span>
                        <span>{part.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tools */}
      <section className="db-section">
        <h2 className="db-section-title">Tools</h2>
        <div className="db-tools">
          {TOOLS.map((t) => (
            <Link key={t.path} to={t.path} className="db-tool-card">
              <span className="db-tool-icon">{t.icon}</span>
              <span>{t.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Bookmarks with search */}
      <BookmarksSection
        bookmarks={progress.bookmarks}
        removeBookmark={removeBookmark}
      />

      {/* Quiz scores */}
      {Object.keys(progress.quizScores).length > 0 && (
        <section className="db-section">
          <h2 className="db-section-title">Quiz scores</h2>
          <div className="db-quiz-scores">
            {Object.entries(progress.quizScores).map(([id, { score, total }]) => (
              <div key={id} className="db-quiz-row">
                <span className="db-quiz-id">{id.replace(/-/g, " ")}</span>
                <span className="db-quiz-score">{score} / {total}</span>
                <ProgressBar value={score} max={total} />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default Dashboard;