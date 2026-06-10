import React from 'react';

function News({ list, activeIndex, onItemClick }) {
  return (
    <section className="news-section">
      <h2 className="news-section__title">News</h2>
      <div className="news-section__grid">
        {list.map((item) => (
          <div
            key={item}
            className={`news-section__card ${activeIndex === item ? 'news-section__card--active' : ''}`}
            onClick={() => onItemClick(activeIndex === item ? null : item)}
            title="Click to select card"
          />
        ))}
      </div>
    </section>
  );
}

export default News;
