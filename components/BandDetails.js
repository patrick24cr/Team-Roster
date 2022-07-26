/* eslint-disable @next/next/no-img-element */
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteSingleMember } from '../api/bands';

export default function BandDetails({ bandDetails, onUpdate }) {
  const deleteMemberAndChangeState = (index) => {
    if (window.confirm(`Delete ${bandDetails.members[index].name}?`)) {
      deleteSingleMember(bandDetails.members[index].firebaseKey).then(() => onUpdate());
    }
  };
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
            <a href={bandDetails.homepage}>{bandDetails.homepage}</a>
          </p>
          <p>Members listed: {bandDetails.members?.length}</p>
          <div>
            <Link href={`/member/edit/${bandDetails.firebaseKey}`} passHref>
              <Button variant="outline-light" className="m-2 bandDetailsButton">
                Edit Details
              </Button>
            </Link>
          </div>
          <div>
            <Link href={`/member/new/${bandDetails.firebaseKey}`} passHref>
              <Button variant="outline-light" className="m-2 bandDetailsButton">
                Add Member
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="memberList">
        <ListGroup>
          {bandDetails.members?.map((member, index) => (
            <ListGroup.Item
              key={member.name}
              as="li"
              className="d-flex justify-content-between align-items-start memberListItem"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{member.name}</div>
                on {member.instrument}
              </div>
              <Link href={`/member/edit/${bandDetails.members[index].firebaseKey}`} passHref>
                <Button variant="outline-light" className="m-2">
                  Edit
                </Button>
              </Link>
              <Button variant="outline-light" className="m-2" onClick={() => deleteMemberAndChangeState(index)}>
                Delete
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </>
  );
}

BandDetails.propTypes = {
  bandDetails: PropTypes.shape({
    name: PropTypes.string,
    genre: PropTypes.string,
    active: PropTypes.bool,
    homepage: PropTypes.string,
    firebaseKey: PropTypes.string,
    imageURL: PropTypes.string,
    uid: PropTypes.string,
    members: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      instrument: PropTypes.string,
      firebaseKey: PropTypes.string,
      band: PropTypes.string,
    })),
  }),
  onUpdate: PropTypes.func.isRequired,
};

BandDetails.defaultProps = {
  bandDetails: PropTypes.shape({
    name: '',
    genre: '',
    active: true,
    homepage: '',
    firebaseKey: '',
    imageURL: '',
    uid: '',
    members: PropTypes.arrayOf(PropTypes.shape({
      name: '',
      instrument: '',
      firebaseKey: '',
      band: '',
    })),
  }),
};
