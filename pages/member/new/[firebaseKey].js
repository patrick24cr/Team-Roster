import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MemberForm from '../../../components/forms/MemberForm';
import { getSingleBand } from '../../../api/bands';

export default function NewMember() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleBand(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return <MemberForm bandFirebaseKey={editItem.firebaseKey} />;
}
