import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding-top: 50px;
  background-color: #faf3eb;
`;

const ProfileBox = styled.div`
  background: #fff;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const EditImageButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #c8a092;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  background-color: #c8a092;
  color: white;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

const PencilIcon = styled.i`
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  margin-top: 10px;
  cursor: pointer;
`;

const ProfilePage = () => {
  const { authState, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    password: false,
    mobile: false,
    address: false,
    state: false,
    zipcode: false,
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    address: '',
    state: '',
    zipcode: '',
  });
  const [image, setImage] = useState(authState.user ? authState.user.profileImage : '');

  useEffect(() => {
    if (authState.user) {
      setFormData({
        name: authState.user.name || '',
        email: authState.user.email || '',
        password: '',
        mobile: authState.user.mobile || '',
        address: authState.user.address || '',
        state: authState.user.state || '',
        zipcode: authState.user.zipcode || '',
      });
      setImage(authState.user.profileImage || '');
    }
  }, [authState.user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditToggle = (field) => {
    if (isEditing[field]) {
      // Save changes when editing is toggled off
      updateUser(formData);
    }
    setIsEditing({ ...isEditing, [field]: !isEditing[field] });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        updateUser({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
  };

  return (
    <Container>
      <Navbar profileImage={image} />
      <ProfileBox>
        <ProfileImageWrapper>
          <ProfileImage src={image || 'https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'} alt="Profile" />
          <EditImageButton>
            <label htmlFor="imageUpload" style={{ cursor: 'pointer' }}>
              <i className="fas fa-camera"></i>
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </EditImageButton>
        </ProfileImageWrapper>
        <h2>Profile</h2>
        <Form onSubmit={handleSubmit}>
          {['name', 'email', 'password', 'mobile', 'address', 'state', 'zipcode'].map(field => (
            <InputWrapper key={field}>
              <Input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                readOnly={!isEditing[field]}
              />
              <EditButton type="button" onClick={() => handleEditToggle(field)}>
                <PencilIcon className="fas fa-pencil-alt" />
              </EditButton>
            </InputWrapper>
          ))}
          <Button type="submit">Update Profile</Button>
        </Form>
      </ProfileBox>
    </Container>
  );
};

export default ProfilePage;
