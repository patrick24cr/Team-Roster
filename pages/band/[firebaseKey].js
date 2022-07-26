/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { viewBandDetails } from '../../api/bands';
import BandDetails from '../../components/BandDetails';

export default function ViewBook() {
  const [bandDetails, setBandDetails] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewBandDetails(firebaseKey, user.uid).then(setBandDetails);
  }, [firebaseKey, user]);
  return (<BandDetails bandDetails={bandDetails} />);
}
