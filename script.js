// Blog posts configuration - add new posts here
const blogPosts = [
    {
        date: 'November 3, 2025',
        title: 'Hey, this is my first blog post',
        url: 'posts/first-post.html'
    }
];

// Simple navigation enhancements without animations
document.addEventListener('DOMContentLoaded', function() {
    
    // Load blog posts dynamically
    loadBlogPosts();
    
    // Navigation highlighting
    function updateActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    updateActiveNavLink();
    
    // Smooth scroll for anchor links (basic, no animation)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'auto',
                    block: 'start'
                });
            }
        });
    });
    
    // Keyboard navigation enhancements
    document.addEventListener('keydown', function(e) {
        // Navigate between pages with arrow keys (when focused on nav)
        if (document.activeElement.classList.contains('nav-link')) {
            const navLinks = Array.from(document.querySelectorAll('.nav-link'));
            const currentIndex = navLinks.indexOf(document.activeElement);
            
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                e.preventDefault();
                navLinks[currentIndex - 1].focus();
            } else if (e.key === 'ArrowRight' && currentIndex < navLinks.length - 1) {
                e.preventDefault();
                navLinks[currentIndex + 1].focus();
            }
        }
    });
});

// Load blog posts from post files
async function loadBlogPosts() {
    const blogList = document.getElementById('blog-posts');
    if (!blogList) return; // Not on blog page
    
    for (const post of blogPosts) {
        try {
            const response = await fetch(post.url);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Extract first paragraph from post content as excerpt
            const postContent = doc.querySelector('.post-content');
            const firstParagraph = postContent ? postContent.querySelector('p') : null;
            const excerpt = firstParagraph ? firstParagraph.textContent.trim() : '';
            
            // Create blog item
            const article = document.createElement('article');
            article.className = 'blog-item';
            article.innerHTML = `
                <div class="blog-date">${post.date}</div>
                <h2 class="blog-title">
                    <a href="${post.url}">${post.title}</a>
                </h2>
                <p class="blog-excerpt">${excerpt}</p>
                <a href="${post.url}" class="read-more">Read More</a>
            `;
            
            blogList.appendChild(article);
        } catch (error) {
            console.error('Error loading post:', post.url, error);
        }
    }
}