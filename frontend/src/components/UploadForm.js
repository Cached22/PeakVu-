import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { projectActions } from '../actions/projectActions';
import { UPLOAD_COMPLETE } from '../utils/messageNames';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('notes', notes);

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      dispatch(projectActions.addProjectImage(response.data));
      alert(UPLOAD_COMPLETE);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="uploadInput">Upload Image:</label>
        <input
          id="uploadInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <div>
        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          value={notes}
          onChange={handleNotesChange}
          placeholder="Enter any notes here..."
        />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;