/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { viewBandDetails } from '../../api/bands';

export default function ViewBook() {
  const [bandDetails, setBandDetails] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewBandDetails(firebaseKey, user.uid).then(setBandDetails);
  }, [firebaseKey, user]);

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column bandDetailsImageDiv">
          <img src={bandDetails.imageURL} alt={bandDetails.name} className="bandDetailsImage" />
        </div>
        <div className="text-white ms-5 details bandDetailsInfoDiv">
          <h5>
            {bandDetails.name}
          </h5>
          <hr />
          <p>Currently {bandDetails.active ? 'active' : 'inactive'}</p>
          <p>Genre: {bandDetails.genre}</p>
          <p>
            Band Homepage: <a href={bandDetails.homepage}>{bandDetails.homepage}</a>
          </p>
          <p>Members listed: {bandDetails.members?.length}</p>
          {console.warn(bandDetails)}
          <Button variant="outline-light" className="m-2 addMemberButton">
            Add Member
          </Button>
        </div>
      </div>
      <div className="memberList">
        <ListGroup>
          {bandDetails.members?.map((member) => (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start memberListItem"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{member.name}</div>
                on {member.instrument}
              </div>
              <Button variant="outline-light" className="m-2">
                Edit
              </Button>
              <Button variant="outline-light" className="m-2">
                Delete
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </>
  );
}
