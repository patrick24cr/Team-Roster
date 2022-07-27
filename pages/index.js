/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import EmptyBands from '../components/EmptyBands';
import { getBands } from '../api/bands';
import BandCard from '../components/BandCard';

function Home() {
  const { user } = useAuth();
  const [bands, setBands] = useState(null);
  const getBandsDrillable = () => {
    getBands(user.uid).then(setBands);
  };
  useEffect(() => {
    getBandsDrillable();
  }, []);
  if (bands === null) {
    return <></>;
  }
  if (bands[0]) {
    return (
      <div className="d-flex flex-wrap">
        {bands.map((band) => (
          <BandCard key={band.firebaseKey} bandObj={band} onUpdate={getBandsDrillable} />
        ))}
      </div>
    );
  }
  return <EmptyBands displayName={user.displayName} />;
}

export default Home;
