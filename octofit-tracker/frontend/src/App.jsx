import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

const navItems = [
  { to: '/', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  return (
    <div className="container py-4">
      <div className="d-flex flex-column gap-3">
        <header className="bg-dark text-white rounded p-4">
          <h1 className="mb-1">OctoFit Tracker</h1>
          <p className="mb-0 text-light-emphasis">
            React 19 presentation tier for the multi-tier wellness application.
          </p>
          <p className="mb-0 small text-light-emphasis">
            API base URL resolves from <code>import.meta.env.VITE_CODESPACE_NAME</code> when set, otherwise it falls back to localhost.
          </p>
          <p className="mb-0 small text-light-emphasis">
            Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to use Codespaces URLs like
            <code>https://{codespaceName || 'your-codespace'}-8000.app.github.dev/api/... </code>
          </p>
        </header>

        <nav className="navbar navbar-expand-lg navbar-light bg-light rounded px-3">
          <div className="navbar-nav d-flex flex-row gap-2 flex-wrap">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active text-primary fw-semibold' : ''}`
                }
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
