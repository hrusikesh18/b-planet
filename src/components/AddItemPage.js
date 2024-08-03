import React, { useState } from 'react';
import styled from 'styled-components';
import { useItems } from '../context/ItemContext';
import Navbar from './Navbar';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: auto;
  background-color: #faf3eb;
  padding: 40px 20px 20px 20px;
`;

const AddItemBox = styled.div`
  background: #faf3eb;
  padding: 20px;
  padding-top: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  width: 1000px;
  justify-content: space-between;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const ImageContainer = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  margin-top: 10px;
  cursor: pointer;
`;

const ImagePreview = styled.img`
  max-width: 200px;
  max-height: 200px;
  margin-bottom: 10px;
  border: 1px dashed #ccc;
  border-radius: 10px;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 16px;
  margin-top: 10px;
`;

const AddItemPage = () => {
  const { addItem } = useItems();
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [guide1Title, setGuide1Title] = useState('');
  const [guide1Desc, setGuide1Desc] = useState('');
  const [guide2Title, setGuide2Title] = useState('');
  const [guide2Desc, setGuide2Desc] = useState('');
  const [guide3Title, setGuide3Title] = useState('');
  const [guide3Desc, setGuide3Desc] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // Success message state

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      title,
      subtitle,
      guides: [
        { guide: guide1Title, description: guide1Desc },
        { guide: guide2Title, description: guide2Desc },
        { guide: guide3Title, description: guide3Desc }
      ],
      description,
      image: imagePreview
    };
    addItem(newItem);
    setSuccessMessage('Item added successfully!'); // Set success message
    // Clear form fields if desired
    setTitle('');
    setSubtitle('');
    setGuide1Title('');
    setGuide1Desc('');
    setGuide2Title('');
    setGuide2Desc('');
    setGuide3Title('');
    setGuide3Desc('');
    setDescription('');
    setImage(null);
    setImagePreview(null);
  };

  return (
    <Container>
      <Navbar />
      <AddItemBox>
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <Section>
              <Title>Title</Title>
              <Input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Input
                type="text"
                placeholder="Subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                required
              />
            </Section>
            <Section>
              <Title>Guide</Title>
              <Input
                type="text"
                placeholder="Guide 1 Title"
                value={guide1Title}
                onChange={(e) => setGuide1Title(e.target.value)}
                required
              />
              <Input
                type="text"
                placeholder="Guide 1 Description"
                value={guide1Desc}
                onChange={(e) => setGuide1Desc(e.target.value)}
                required
              />
              <Input
                type="text"
                placeholder="Guide 2 Title"
                value={guide2Title}
                onChange={(e) => setGuide2Title(e.target.value)}
                required
              />
              <Input
                type="text"
                placeholder="Guide 2 Description"
                value={guide2Desc}
                onChange={(e) => setGuide2Desc(e.target.value)}
                required
              />
              <Input
                type="text"
                placeholder="Guide 3 Title"
                value={guide3Title}
                onChange={(e) => setGuide3Title(e.target.value)}
                required
              />
              <Input
                type="text"
                placeholder="Guide 3 Description"
                value={guide3Desc}
                onChange={(e) => setGuide3Desc(e.target.value)}
                required
              />
            </Section>
            <Section>
              <Title>Description</Title>
              <TextArea
                placeholder="Write your description here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Section>
            <Button type="submit">Add Item</Button>
            {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>} {/* Show success message */}
          </Form>
        </FormContainer>
        <ImageContainer>
          <Label>Image</Label>
          <Input type="file" accept="image/*" onChange={handleImageChange} required />
          {imagePreview && <ImagePreview src={imagePreview} alt="Preview" />}
        </ImageContainer>
      </AddItemBox>
    </Container>
  );
};

export default AddItemPage;
