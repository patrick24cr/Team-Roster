import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleBand } from '../api/bands';

function BandCard({ bandObj, onUpdate }) {
  const deleteBandAndChangeState = () => {
    if (window.confirm(`Delete ${bandObj.name}?`)) {
      deleteSingleBand(bandObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card bg="dark" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img className="bandImage" variant="top" src={bandObj.imageURL} alt={bandObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{bandObj.name}</Card.Title>
        <p className="card-text bold">{bandObj.active ? <span>Active<br /></span> : <span>Inactive<br /></span> }</p>
        <Link href={`/band/${bandObj.firebaseKey}`} passHref>
          <Button variant="outline-primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/band/edit/${bandObj.firebaseKey}`} passHref>
          <Button variant="outline-info">EDIT</Button>
        </Link>
        <Button variant="outline-danger" onClick={deleteBandAndChangeState} className="m-2">
          DELETE
        </Button>
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
