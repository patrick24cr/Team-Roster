import { useAuth } from '../utils/context/authContext';
import EmptyBands from '../components/EmptyBands';

function Home() {
  const { user } = useAuth();
  return (
    <EmptyBands displayName={user.displayName} />
  );
}

export default Home;
