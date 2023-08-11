import React from 'react'
import axios from 'axios';

const Grid = ({ photos,onDelete,loggedInUser }) => {

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/${_id}`);
      onDelete(_id); // Notify parent component about deletion
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

    return (
      <>
      <div class="all">
        <h1></h1>
        <div className="grid">
          {photos.map(({ photo, _id }) => (
            <div key={_id} className="grid__item">
              <div>
              <img
                src={`http://localhost:5000/images/${photo}`}
                alt="grid_image"
              />
              </div>
              {loggedInUser && ( // Only render if loggedInUser is not null
                <div className="deletion" onClick={() => handleDelete(_id)}>
                  Delete
                </div>
              )}
            </div>
          ))}
        </div>
        </div>
      </>
    );
  };

export default Grid