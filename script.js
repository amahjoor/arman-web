if (typeof module !== 'undefined' && module.exports) {
    const fs = require('fs');
    const path = require('path');
    const { marked } = require('marked');
    
    const CONTENT_DIR = path.join(__dirname, 'posts-txt');
    const POSTS_DIR = path.join(__dirname, 'posts-html');
    const OUTPUT_FILE = path.join(__dirname, 'posts.json');
    const TEMPLATE_FILE = path.join(__dirname, 'template.html');
    
    function parseTxtFile(content) {
        const lines = content.split('\n');
        let title = '';
        let date = '';
        let status = 'done';
        let contentStart = 0;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            if (line.startsWith('title:')) {
                title = line.substring(6).trim();
            } else if (line.startsWith('date:')) {
                date = line.substring(5).trim();
            } else if (line.startsWith('status:')) {
                status = line.substring(7).trim().toLowerCase();
            } else if (line === '---') {
                contentStart = i + 1;
                break;
            }
        }
        
        const contentLines = lines.slice(contentStart);
        const rawContent = contentLines.join('\n').trim();
        
        return { title, date, status, rawContent };
    }
    
    function contentToHtml(content) {
        const html = marked(content);
        return html.split('\n').map(line => '                ' + line).join('\n').trim();
    }
    
    function generateHtmlFromTemplate(title, date, content) {
        const template = fs.readFileSync(TEMPLATE_FILE, 'utf-8');
        const htmlContent = contentToHtml(content);
        
        return template
            .replace(/\{\{TITLE\}\}/g, title)
            .replace(/\{\{DATE\}\}/g, date)
            .replace(/\{\{CONTENT\}\}/g, htmlContent);
    }
    
    function parseDate(dateString) {
        return new Date(dateString);
    }
    
    function generatePosts() {
        console.log('🔍 Scanning posts-txt directory...');
        
        if (!fs.existsSync(CONTENT_DIR)) {
            console.error('❌ posts-txt directory not found!');
            process.exit(1);
        }
        
        if (!fs.existsSync(POSTS_DIR)) {
            fs.mkdirSync(POSTS_DIR);
        }
        
        const files = fs.readdirSync(CONTENT_DIR);
        const posts = [];
        
        files.forEach(file => {
            if (path.extname(file) === '.md') {
                console.log(`  📄 Found: ${file}`);
                
                const filePath = path.join(CONTENT_DIR, file);
                const txtContent = fs.readFileSync(filePath, 'utf-8');
                
                const { title, date, status, rawContent } = parseTxtFile(txtContent);
                
                if (status === 'draft') {
                    console.log(`    ⏭️  Skipped: Draft post`);
                    return;
                }
                
                if (title && date && rawContent) {
                    const htmlFilename = file.replace('.md', '.html');
                    const htmlFilePath = path.join(POSTS_DIR, htmlFilename);
                    
                    const html = generateHtmlFromTemplate(title, date, rawContent);
                    fs.writeFileSync(htmlFilePath, html, 'utf-8');
                    
                    posts.push({
                        date,
                        title,
                        url: `posts-html/${htmlFilename}`
                    });
                    
                    console.log(`    ✓ Title: "${title}"`);
                    console.log(`    ✓ Date: ${date}`);
                    console.log(`    ✓ Generated: ${htmlFilename}`);
                } else {
                    console.warn(`    ⚠️  Warning: Could not extract metadata from ${file}`);
                    if (!title) console.warn(`       Missing title`);
                    if (!date) console.warn(`       Missing date`);
                    if (!rawContent) console.warn(`       Missing content`);
                }
            }
        });
        
        posts.sort((a, b) => parseDate(b.date) - parseDate(a.date));
        
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2), 'utf-8');
        
        console.log(`\n✅ Generated ${OUTPUT_FILE} with ${posts.length} post(s)`);
        console.log('📝 Posts (newest first):');
        posts.forEach((post, index) => {
            console.log(`   ${index + 1}. ${post.title} (${post.date})`);
        });
    }
    
    if (require.main === module) {
        generatePosts();
    }
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {

let blogPosts = [];

document.addEventListener('DOMContentLoaded', async function() {
    
    await loadPostsConfig();
    loadBlogPosts();
    makeSortableTable();
    
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
    
    document.addEventListener('keydown', function(e) {
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

async function loadPostsConfig() {
    try {
        const response = await fetch('posts.json');
        blogPosts = await response.json();
    } catch (error) {
        console.error('Error loading posts.json:', error);
        blogPosts = [];
    }
}

function makeSortableTable() {
    const tables = document.querySelectorAll('.post-content table');
    
    tables.forEach(table => {
        const headers = table.querySelectorAll('th');
        
        headers.forEach((header, index) => {
            header.style.cursor = 'pointer';
            header.style.userSelect = 'none';
            header.title = 'Click to sort';
            
            header.addEventListener('click', () => {
                const tbody = table.querySelector('tbody');
                const rows = Array.from(tbody.querySelectorAll('tr'));
                
                const currentSort = header.dataset.sort || 'none';
                const isAscending = currentSort === 'asc';
                
                headers.forEach(h => {
                    h.dataset.sort = 'none';
                    h.textContent = h.textContent.replace(' ▲', '').replace(' ▼', '');
                });
                
                rows.sort((a, b) => {
                    const aCell = a.cells[index].textContent.trim();
                    const bCell = b.cells[index].textContent.trim();
                    
                    const aNum = parseFloat(aCell.replace(/[$,%]/g, ''));
                    const bNum = parseFloat(bCell.replace(/[$,%]/g, ''));
                    
                    let comparison = 0;
                    if (!isNaN(aNum) && !isNaN(bNum)) {
                        comparison = aNum - bNum;
                    } else {
                        comparison = aCell.localeCompare(bCell);
                    }
                    
                    return isAscending ? -comparison : comparison;
                });
                
                rows.forEach(row => tbody.appendChild(row));
                
                header.dataset.sort = isAscending ? 'desc' : 'asc';
                header.textContent += isAscending ? ' ▼' : ' ▲';
            });
        });
    });
}

async function loadBlogPosts() {
    const blogList = document.getElementById('blog-posts');
    if (!blogList) return;
    
    for (const post of blogPosts) {
        try {
            const response = await fetch(post.url);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const postContent = doc.querySelector('.post-content');
            const firstParagraph = postContent ? postContent.querySelector('p') : null;
            const excerpt = firstParagraph ? firstParagraph.textContent.trim() : '';
            
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

}
