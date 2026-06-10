import React from 'react';
import { pendingReviews } from '../data';

function PendingReviews() {
  return (
    <div className="pending-reviews">
      <ul className="pending-reviews__list">
        {pendingReviews.map((review) => (
          <li key={review.id} className="pending-reviews__item">
            <div className="pending-reviews__avatar-container">
              <div
                className="pending-reviews__avatar"
                style={{ backgroundColor: review.avatarColor }}
              >
                {review.initials}
              </div>
              <div className="pending-reviews__star-badge">
                <svg viewBox="0 0 24 24" width="10" height="10" className="pending-reviews__star-icon">
                  <path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              </div>
            </div>
            <div className="pending-reviews__content">
              <p className="pending-reviews__text">{review.comment}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PendingReviews;
