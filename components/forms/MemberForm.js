import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createMember, updateMember } from '../../api/bands';

const initialState = {
  band: '',
  name: '',
  instrument: '',
};

function MemberForm({ memberObj, bandFirebaseKey }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (memberObj.firebaseKey) setFormInput(memberObj);
  }, [memberObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (memberObj.firebaseKey) {
      updateMember(formInput)
        .then(() => router.push(`/band/${memberObj.band}`));
    } else {
      const payload = { ...formInput, uid: user.uid, band: bandFirebaseKey };
      createMember(payload).then(() => {
        router.push(`/band/${payload.band}`);
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="formClass">
      <h2 className="text-white mt-5">{memberObj.firebaseKey ? 'Update' : 'Create'} Band Member</h2>
      <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter a name" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="Instrument(s)" className="mb-3">
        <Form.Control type="text" placeholder="Enter their instrument(s)" name="instrument" value={formInput.instrument} onChange={handleChange} required />
      </FloatingLabel>
      <Button type="submit">{memberObj.firebaseKey ? 'Update' : 'Create'} Member</Button>
    </Form>
  );
}

MemberForm.propTypes = {
  memberObj: PropTypes.shape({
    name: PropTypes.string,
    band: PropTypes.string,
    instrument: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  bandFirebaseKey: PropTypes.string,
};

MemberForm.defaultProps = {
  memberObj: initialState,
  bandFirebaseKey: '',
};

export default MemberForm;
