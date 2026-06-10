import React from 'react';

function Blog({ list, activeIndex, onItemClick }) {
  return (
    <section className="blog-section">
      <h2 className="blog-section__title">Blog</h2>
      <div className="blog-section__grid">
        {list.map((item) => (
          <div
            key={item}
            className={`blog-section__card ${activeIndex === item ? 'blog-section__card--active' : ''}`}
            onClick={() => onItemClick(activeIndex === item ? null : item)}
            title="Click to select card"
          />
        ))}
      </div>
    </section>
  );
}

export default Blog;
