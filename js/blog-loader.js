// Add this to your main.js or create a separate blog-loader.js

// Load and display latest blog posts on homepage
async function loadLatestPosts() {
  const postsContainer = document.getElementById('latest-posts-container');
  if (!postsContainer) return; // Only run on homepage
  
  try {
    const response = await fetch('/blog-posts.json');
    const posts = await response.json();
    
    // Take only the latest 3 posts
    const latestPosts = posts.slice(0, 3);
    
    // Generate HTML for each post
    const postsHTML = latestPosts.map(post => `
      <article class="card post-card">
        <span class="post-category">${post.category}</span>
        <h3 class="card-title">
          <a href="blog/posts/${post.slug}.html">${post.title}</a>
        </h3>
        <p class="card-meta">${post.dateDisplay} · ${post.readTime}</p>
        <p class="card-excerpt">
          ${post.excerpt}
        </p>
        <a href="blog/posts/${post.slug}.html" class="card-link">Read more</a>
      </article>
    `).join('');
    
    postsContainer.innerHTML = postsHTML;
  } catch (error) {
    console.error('Failed to load blog posts:', error);
  }
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadLatestPosts);
} else {
  loadLatestPosts();
}
