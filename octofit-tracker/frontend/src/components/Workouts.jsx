import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeRecords } from '../utils/api.js';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadWorkouts() {
      try {
        setLoading(true);
        const response = await fetch(buildApiUrl('workouts'));
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.message || 'Unable to load workouts');
        }

        if (isMounted) {
          setWorkouts(normalizeRecords(payload));
        }
      } catch (caughtError) {
        if (isMounted) {
          setError(caughtError.message || 'Failed to load workouts');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div className="alert alert-secondary">Loading workouts...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="card-title mb-3">Workouts</h2>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Focus</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id || workout.name}>
                  <td>{workout.name}</td>
                  <td>{workout.focus}</td>
                  <td>{workout.duration} min</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Workouts;
