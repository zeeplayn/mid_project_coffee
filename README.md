# Bean There Coffee

## Topic
Coffee Shop Website (Web Development: midterm project + endterm project)

## Group members
- Member 1: Zharkyn Lukpan
- Member 2: Yelaman Orazkhan
- Member 3: Said sana ullah Sadat

## Short description
A multi-page responsive website for a small coffee shop. In the midterm we made the 5 main pages (home, menu, about, gallery, contact). In the endterm we added JavaScript and jQuery: a registration form with validation, a live search with category filter, a table with CRUD operations and a gallery with a lightbox.

## Features implemented

### Midterm
- 5 pages connected with a navigation bar (index, menu, about, gallery, contact)
- Header with logo and menu (Flexbox), main, footer with contacts, copyright and social links
- Table (drinks price table) and form (contact form)
- CSS Grid for cards, Flexbox for header and form
- Positioning: sticky header, absolute badge and gallery captions
- :hover and :focus on links, buttons and inputs
- :nth-child() for alternating cards and table rows
- 5 CSS variables in :root, Google Fonts (Poppins, Pacifico)
- loading="lazy" on images below the fold
- Media queries for tablet (768px) and mobile (576px)
- Bootstrap grid and utility classes

### Endterm
- **Registration form (register.html):** required fields (name, email, password, confirm password), email check with RegEx, password strength indicator (weak / medium / strong), password confirmation check, real-time messages with icons, form is not sent if there are errors
- **Search and filter (menu.html):** live search while typing (case-insensitive) and category buttons (All / Coffee / Desserts) that work together
- **Table with CRUD (manage.html):** list of products, add and edit with a Bootstrap modal, delete with confirmation, messages after every action
- **Gallery lightbox (gallery.html):** click on a photo to enlarge it, arrows (and keyboard arrows) to go to the next/previous photo, close with X, Esc or click on the dark background, fadeIn / fadeOut / animate effects with jQuery
- New pages were added to the navigation bar (Register, Admin)
- All midterm requirements are still working

## Technologies used
HTML5, CSS3, Bootstrap 5, JavaScript, jQuery 3, Google Fonts, Netlify

## Individual contribution

### Midterm
- Member 1: index.html, about.html, header, footer, hero section, CSS variables and base styles
- Member 2: menu.html (table + dessert cards), gallery.html, CSS for cards, grid, table and gallery
- Member 3: contact.html (form), CSS for form, media queries (tablet + mobile)

### Endterm
- Member 1 (Zharkyn Lukpan): register.html, form validation in js/script.js (RegEx, password strength, confirm password, real-time feedback), CSS for the registration form, adding the new links to the navigation
- Member 2 (Yelaman Orazkhan): search and category filter on menu.html, gallery lightbox with jQuery effects on gallery.html, CSS for search, filter buttons and lightbox
- Member 3 (Said sana ullah Sadat): manage.html (table with CRUD and Bootstrap modal), CRUD code in js/script.js, CSS for the table page, README update and publishing the updated repository

## Published website
Link: https://lopaf.netlify.app
