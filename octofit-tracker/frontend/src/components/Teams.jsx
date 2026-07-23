import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeRecords } from '../utils/api.js';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadTeams() {
      try {
        setLoading(true);
        const response = await fetch(buildApiUrl('teams'));
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.message || 'Unable to load teams');
        }

        if (isMounted) {
          setTeams(normalizeRecords(payload));
        }
      } catch (caughtError) {
        if (isMounted) {
          setError(caughtError.message || 'Failed to load teams');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadTeams();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div className="alert alert-secondary">Loading teams...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="card-title mb-3">Teams</h2>
        <div className="row g-3">
          {teams.map((team) => (
            <div className="col-md-6" key={team._id || team.name}>
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="h5">{team.name}</h3>
                  <ul className="mb-0">
                    {(team.members || []).map((member) => (
                      <li key={`${team.name}-${member}`}>{member}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Teams;
