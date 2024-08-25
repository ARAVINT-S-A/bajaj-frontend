import React, { useState } from 'react';
import axios from 'axios';

const JsonProcessor = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const validateJson = (input) => {
    try {
      JSON.parse(input);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateJson(jsonInput)) {
      setError('Invalid JSON format');
      return;
    }
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/bfhl', {
        data: JSON.parse(jsonInput).data
      });
      setResponse(response.data);
    } catch (error) {
      console.error('Error making request:', error);
      setError('Failed to process JSON');
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions(
      checked ? [...selectedOptions, value] : selectedOptions.filter(opt => opt !== value)
    );
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    let filteredResponse = {};

    if (selectedOptions.includes('Numbers')) {
      filteredResponse.numbers = numbers;
    }
    if (selectedOptions.includes('Alphabets')) {
      filteredResponse.alphabets = alphabets;
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      filteredResponse.highestLowerCase = highest_lowercase_alphabet;
    }

    return (
      <div>
        <h3>Filtered Response:</h3>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div>
      <h1>JSON Processor</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        rows="4"
        cols="50"
        placeholder='Enter JSON e.g. {"data": ["A","C","z"]}'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h3>Select Options:</h3>
        <label>
          <input
            type="checkbox"
            value="Alphabets"
            onChange={handleOptionChange}
          />
          Alphabets
        </label>
        <label>
          <input
            type="checkbox"
            value="Numbers"
            onChange={handleOptionChange}
          />
          Numbers
        </label>
        <label>
          <input
            type="checkbox"
            value="Highest lowercase alphabet"
            onChange={handleOptionChange}
          />
          Highest lowercase alphabet
        </label>
      </div>
      {renderResponse()}
    </div>
  );
};

export default JsonProcessor;
