import React, { useState, useEffect } from 'react';
import StarRating from 'react-native-star-rating-widget';
import { auth, database } from '../firebase/firebase';
import { ref, update } from 'firebase/database';

const BookRating = (props) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(props.item.rating);
  }, []);

  const pushRating = () => {
    if (auth.currentUser) {
      update(
        ref(
          database,
          'users/' + auth.currentUser.uid + '/books/' + props.item.key
        ),
        {
          rating: rating,
        }
      );
    }
  };
  return (
    <StarRating
      style={{ marginTop: 20 }}
      starSize={50}
      rating={rating}
      onChange={setRating}
      onRatingEnd={pushRating}
    />
  );
};

export default BookRating;
