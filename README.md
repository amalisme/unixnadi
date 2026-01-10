# UnixPulse Website

A simple, fast, introvert-friendly personal website for blogging about Linux, VMware, and web development. Built with pure HTML, CSS, and vanilla JavaScript.

## 🎨 Design

- **Color Palette**: Coastal Moroccan (ocean blue, turquoise, terracotta, sand)
- **Typography**: Fraunces (headings) + Source Sans 3 (body) + JetBrains Mono (code)
- **Features**: Dark mode toggle, RSS feed, mobile responsive

## 📁 File Structure

```
unixpulse/
├── index.html              # Homepage
├── about.html              # About page
├── toolbox.html            # Products & resources (Gumroad)
├── work-with-me.html       # Services overview
├── projects.html           # Portfolio
├── say-hello.html          # Contact forms
├── rss.xml                 # RSS feed
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Search engine directives
│
├── blog/
│   ├── index.html          # Blog listing
│   ├── post-template.html  # Template for new posts
│   └── posts/              # Your blog posts go here
│
├── services/
│   ├── websites.html       # Website service details
│   ├── vmware-consulting.html
│   └── pwa-conversion.html
│
├── css/
│   └── style.css           # All styles
│
├── js/
│   └── main.js             # Dark mode, mobile menu, etc.
│
└── images/
    ├── logo.svg            # Logo
    ├── favicon.svg         # Favicon
    └── (your images)
```

## 🚀 Getting Started

### 1. Set Up Formspree (Contact Forms)

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form
3. Copy your form ID (looks like `f/xxxxxxxx`)
4. Replace `YOUR_FORMSPREE_ID` in `say-hello.html` with your form ID

### 2. Update Your Domain

Search and replace `unixpulse.com` with your actual domain in:
- All HTML files (meta tags, canonical URLs)
- `sitemap.xml`
- `rss.xml`
- `robots.txt`

### 3. Add Your Images

Place images in the `images/` folder:
- `og-image.png` - Social sharing image (1200x630px recommended)
- `website-starter-kit-thumb.png` - Your Gumroad product thumbnail
- `project-*.png` - Portfolio screenshots
- `apple-touch-icon.png` - iOS home screen icon (180x180px)

### 4. Deploy to GitHub Pages

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main

# Enable GitHub Pages in repo Settings > Pages
# Select "main" branch and root folder
```

### 5. Set Up Cloudflare (Optional but Recommended)

1. Add your domain to Cloudflare
2. Update nameservers at your registrar
3. In Cloudflare DNS, add a CNAME record:
   - Name: `@` (or `www`)
   - Target: `YOUR_USERNAME.github.io`
4. Enable "Full" SSL in Cloudflare

## 📝 Adding a Blog Post

### Step 1: Create the Post File

1. Copy `blog/post-template.html`
2. Rename to `blog/posts/YYYY-MM-DD-your-post-slug.html`
3. Edit all `[EDIT: ...]` placeholders:
   - Title
   - Description
   - Date
   - Category
   - Content

### Step 2: Update the Blog Index

Open `blog/index.html` and add a new entry:

```html
<article class="blog-post-item">
  <time class="blog-post-date" datetime="2025-01-15">Jan 15</time>
  <a href="posts/2025-01-15-your-post-slug.html" class="blog-post-title">
    Your Post Title Here
  </a>
  <span class="blog-post-category">Linux</span>
</article>
```

### Step 3: Update the RSS Feed

Open `rss.xml` and add a new `<item>` at the top:

```xml
<item>
  <title>Your Post Title</title>
  <link>https://yourdomain.com/blog/posts/your-post-slug.html</link>
  <guid isPermaLink="true">https://yourdomain.com/blog/posts/your-post-slug.html</guid>
  <pubDate>Wed, 15 Jan 2025 00:00:00 +0000</pubDate>
  <category>Linux</category>
  <description>Your post description...</description>
</item>
```

Also update `<lastBuildDate>` to today's date.

### Step 4: Update the Sitemap

Add a new `<url>` entry in `sitemap.xml`:

```xml
<url>
  <loc>https://yourdomain.com/blog/posts/your-post-slug.html</loc>
  <lastmod>2025-01-15</lastmod>
  <changefreq>yearly</changefreq>
  <priority>0.6</priority>
</url>
```

### Step 5: Commit and Push

```bash
git add .
git commit -m "Add post: Your Post Title"
git push
```

## 🔧 Customization

### Changing Colors

Edit CSS variables in `css/style.css`:

```css
:root {
  --color-ocean: #0C7C97;      /* Primary blue */
  --color-turquoise: #17A2B8;  /* Accent */
  --color-terracotta: #E07A5F; /* Warm accent */
  /* ... etc */
}
```

### Adding Gumroad Products

In `toolbox.html`, add product cards:

```html
<article class="product-card">
  <img src="images/your-product.png" alt="Product" class="product-image">
  <div class="product-content">
    <h3 class="product-title">Product Name</h3>
    <p class="product-description">Description...</p>
    <p class="product-price">$XX</p>
    <a href="https://unixpulse.gumroad.com/l/xxxxx" class="btn btn-primary" target="_blank">
      View on Gumroad
    </a>
  </div>
</article>
```

### Adding Affiliate Links in Posts

Use the related box in your posts:

```html
<div class="post-related-box">
  <p class="post-related-box-title">📦 Related Resource</p>
  <p>
    Check out <a href="https://affiliate-link.com" target="_blank">Product Name</a> 
    — brief description of why it's useful.
  </p>
</div>
```

## 📊 Analytics (Optional)

### Google Analytics

Add before `</head>` in all pages:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Plausible (Privacy-Friendly Alternative)

```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

## 🔍 SEO Checklist

- [x] Meta titles and descriptions on all pages
- [x] Open Graph tags for social sharing
- [x] Canonical URLs
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Schema.org markup
- [x] RSS feed
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify social sharing with Facebook Debugger

## 📱 Testing

Before going live:

1. Test on mobile devices
2. Test dark mode toggle
3. Test contact forms
4. Validate HTML: [validator.w3.org](https://validator.w3.org)
5. Check accessibility: [wave.webaim.org](https://wave.webaim.org)
6. Test page speed: [pagespeed.web.dev](https://pagespeed.web.dev)

## 📄 License

This template is yours to use. Do whatever you want with it.

---

Built with simplicity in mind. No frameworks, no build tools, no dependencies.
