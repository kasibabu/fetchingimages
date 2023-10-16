import React, { useState, useEffect } from 'react';
import'./FetchImage.css';

function FetchImage() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch images from the API
  const fetchImages = () => {
    fetch('https://picsum.photos/v2/list')
      .then((response) => response.json())
      .then((data) => {
        setImages(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError('Error fetching data');
        setIsLoading(false);
      });
  };

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  // Handle image click
  const handleImageClick = (id) => {
    // Fetch image details by id and set the selected image
    fetch(`https://picsum.photos/id/${id}/info`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedImage(data);
      })
      .catch((error) => {
        setError('Error fetching image details');
      });
  };

  // Handle close popup
  const handleClosePopup = () => {
    setSelectedImage(null);
  };

  return (
    <div className="fetchImage">
      <h1>Image Gallery</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="image-gallery">
        {images.map((image) => (
          <div
            key={image.id}
            className="image-card"
            onClick={() => handleImageClick(image.id)}
          >
            <img src={image.download_url} alt={image.author} />
            <p>{image.author}</p>
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className="image-popup">
          <img src={selectedImage.download_url} alt={selectedImage.author} />
          <div className="image-details">
            <p>Author: {selectedImage.author}</p>
            <p>Dimensions: {selectedImage.width}x{selectedImage.height}</p>
          </div>
          <button onClick={handleClosePopup}>Close</button>
        
        </div>
      )}
    </div>
  );
}

export default FetchImage;
