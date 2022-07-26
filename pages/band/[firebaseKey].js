/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewBandDetails } from '../../api/bands';
import BandDetails from '../../components/BandDetails';

export default function ViewBand() {
  const [bandDetails, setBandDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  const viewBandDetailsDrillable = () => {
    viewBandDetails(firebaseKey).then(setBandDetails);
  };

  useEffect(() => {
    viewBandDetailsDrillable();
  }, []);
  return (<BandDetails bandDetails={bandDetails} onUpdate={viewBandDetailsDrillable} />);
}
