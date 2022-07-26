import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleBand } from '../../../api/bands';
import BandForm from '../../../components/forms/BandForm';

export default function EditBook() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleBand(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<BandForm obj={editItem} />);
}
