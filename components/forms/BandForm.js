import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { updateBand, createBand } from '../../api/bands';

const initialState = {
  name: '',
  imageURL: '',
  genre: '',
  active: false,
  homepage: '',
};

function BandForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateBand(formInput)
        .then(() => router.push(`/band/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createBand(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="formClass">
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Band</h2>
      <FloatingLabel controlId="floatingInput1" label="Band Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter a name" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="Genre" className="mb-3">
        <Form.Control type="text" placeholder="Enter a genre" name="genre" value={formInput.genre} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Image URL" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image url" name="imageURL" value={formInput.imageURL} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="Homepage" className="mb-3">
        <Form.Control type="text" placeholder="Enter a homepage" name="homepage" value={formInput.homepage} onChange={handleChange} required />
      </FloatingLabel>
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="active"
        name="active"
        label="Are they currently active?"
        checked={formInput.active}
        onChange={(e) => setFormInput((prevState) => ({
          ...prevState,
          active: e.target.checked,
        }))}
      />
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Band</Button>
    </Form>
  );
}

BandForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    genre: PropTypes.string,
    active: PropTypes.bool,
    homepage: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

BandForm.defaultProps = {
  obj: initialState,
};

export default BandForm;
