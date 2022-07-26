import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MemberForm from '../../../components/forms/MemberForm';
import { getSingleMember } from '../../../api/bands';

export default function EditMember() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMember(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return <MemberForm memberObj={editItem} />;
}
