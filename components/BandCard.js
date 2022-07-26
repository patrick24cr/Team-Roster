import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteBandAndMembers } from '../api/bands';

function BandCard({ bandObj, onUpdate }) {
  const deleteBandAndChangeState = () => {
    if (window.confirm(`Delete ${bandObj.name}?`)) {
      deleteBandAndMembers(bandObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card bg="dark" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img className="bandImage" variant="top" src={bandObj.imageURL} alt={bandObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{bandObj.name}</Card.Title>
        <p className="card-text bold">{bandObj.genre}</p>
        <div className="bandButtons">
          <Link href={`/band/${bandObj.firebaseKey}`} passHref>
            <Button variant="outline-light" className="m-2">Details</Button>
          </Link>
          <Button variant="outline-light" onClick={deleteBandAndChangeState} className="m-2">
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

BandCard.propTypes = {
  bandObj: PropTypes.shape({
    name: PropTypes.string,
    genre: PropTypes.string,
    active: PropTypes.bool,
    homepage: PropTypes.string,
    firebaseKey: PropTypes.string,
    imageURL: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default BandCard;
