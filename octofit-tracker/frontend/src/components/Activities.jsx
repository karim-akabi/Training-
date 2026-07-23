import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeRecords } from '../utils/api.js';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadActivities() {
      try {
        setLoading(true);
        const response = await fetch(buildApiUrl('activities'));
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.message || 'Unable to load activities');
        }

        if (isMounted) {
          setActivities(normalizeRecords(payload));
        }
      } catch (caughtError) {
        if (isMounted) {
          setError(caughtError.message || 'Failed to load activities');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadActivities();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div className="alert alert-secondary">Loading activities...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="card-title mb-3">Activities</h2>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Type</th>
                <th>Duration</th>
                <th>Date</th>
                <th>User ID</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.type + activity.date}>
                  <td>{activity.type}</td>
                  <td>{activity.duration} min</td>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                  <td>{activity.userId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Activities;
