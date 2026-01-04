import { useEffect, useState } from 'react';
import * as classService from '../../services/classService';
import { Link } from 'react-router';

function ClassList() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClasses() {
      try {
        const data = await classService.index();
        setClasses(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchClasses();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Classes</h1>

      {classes.length === 0 ? (
        <p>No classes found</p>
      ) : (
        classes.map((cls) => (
          <div key={cls._id}>
            <h3><Link to={`/class/${cls._id}`}>{cls.className}</Link></h3>
          </div>
        ))
      )}
    </div>
  );
}

export default ClassList;
