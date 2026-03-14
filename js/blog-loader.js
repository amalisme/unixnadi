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
    const postsHTML = latestPosts.map(post => {
      const url = `/blog/${post.categoryPath}/${post.slug}`;
      const label = post.subcategory ? `${post.category} › ${post.subcategory}` : post.category;
      return `
        <article class="card post-card">
          <span class="post-category">${label}</span>
          <h3 class="card-title">
            <a href="${url}">${post.title}</a>
          </h3>
          <p class="card-meta">${post.dateDisplay} · ${post.readTime}</p>
          <p class="card-excerpt">${post.excerpt}</p>
          <a href="${url}" class="card-link">Read more</a>
        </article>
      `;
    }).join('');

    postsContainer.innerHTML = postsHTML;
  } catch (error) {
    postsContainer.innerHTML = '<p>Could not load latest posts.</p>';
    console.error('Failed to load blog posts:', error);
  }
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadLatestPosts);
} else {
  loadLatestPosts();
}
