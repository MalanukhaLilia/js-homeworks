import React, { useState } from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import Blog from './components/Blog';
import News from './components/News';

function App() {
  const [blogName, setBlogName] = useState('Blog name');
  const [activeNavItem, setActiveNavItem] = useState(0);
  const [activeBlogIndex, setActiveBlogIndex] = useState(null);
  const [activeNewsIndex, setActiveNewsIndex] = useState(null);

  const blogCards = [0, 1, 2, 3];
  const newsCards = [0, 1, 2];

  return (
    <div className="framework">
      <Header
        blogName={blogName}
        onBlogNameChange={setBlogName}
        activeNavItem={activeNavItem}
        onNavItemClick={setActiveNavItem}
      />
      
      <Banner text="Full-width banner image" />

      <main className="framework__main">
        <Blog
          list={blogCards}
          activeIndex={activeBlogIndex}
          onItemClick={setActiveBlogIndex}
        />
        <News
          list={newsCards}
          activeIndex={activeNewsIndex}
          onItemClick={setActiveNewsIndex}
        />
      </main>
    </div>
  );
}

export default App;
