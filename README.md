# WanderLust 🌍

A full-stack Airbnb-inspired web application built using Node.js, Express.js, MongoDB, and EJS — allowing users to browse, create, edit, and delete travel listings.

![WanderLust](https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=60)

---

## 🚀 Features

- 🏠 View all travel listings
- ➕ Add new listings with image, price, location & country
- ✏️ Edit existing listings
- 🗑️ Delete listings
- 🖼️ Default fallback image if no image URL is provided
- 📱 Responsive navbar and footer
- 🔁 RESTful routing
- 🗃️ MongoDB database integration
- 🖥️ Server-side rendering using EJS
- 🔄 Method Override for PUT & DELETE requests

---

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3
- Bootstrap 5
- EJS Templates (with ejs-mate layouts)

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Other Packages
- `ejs-mate` — layout support for EJS
- `method-override` — enables PUT & DELETE from HTML forms
- `dotenv` — environment variable management

---

## 📂 Project Structure

```
WanderLust/
│
├── models/
│   └── listing.js          # Mongoose schema & model
│
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs # Main layout (navbar + footer)
│   └── listings/
│       ├── index.ejs       # All listings
│       ├── show.ejs        # Single listing detail
│       ├── new.ejs         # Create listing form
│       └── edit.ejs        # Edit listing form
│
├── public/                 # Static assets (CSS, JS)
│
├── init/
│   ├── data.js             # Sample seed data
│   └── index.js            # DB initialization script
│
├── app.js                  # Main Express app
├── package.json
└── README.md
```

---

## 🔗 Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/Listings` | View all listings |
| GET | `/Listings/new` | Show create form |
| POST | `/Listings` | Create new listing |
| GET | `/Listings/:id` | View listing detail |
| GET | `/Listings/:id/edit` | Show edit form |
| PUT | `/Listings/:id` | Update listing |
| DELETE | `/Listings/:id` | Delete listing |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone <your-github-repo-link>
cd WanderLust
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start MongoDB

Make sure MongoDB is running locally:

```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

### 4️⃣ Seed the database

```bash
node init/index.js
```

> ⚠️ This deletes all existing data and inserts fresh sample listings.

### 5️⃣ Run the application

```bash
nodemon app.js
# or
node app.js
```

---

## 🌐 Local Development

Open your browser and visit:

```
http://localhost:8080/Listings
```

---

## 🗃️ Database Schema

```javascript
{
  title: String,        // required
  description: String,
  image: {
    filename: String,   // default: "listingimage"
    url: String,        // default: fallback image
  },
  price: Number,
  location: String,
  country: String,
}
```

---

## 🐛 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Image not showing | Use a direct image URL (e.g. `images.unsplash.com/...`), not a webpage link |
| `Cannot read properties of null` | Listing ID is invalid — go back to `/Listings` and pick a valid listing |
| `ValidationError: Cast to string failed` | Ensure `image` in schema is an Object `{ filename, url }`, not a String |

---

## 🔥 Future Improvements

- [ ] User Authentication (Passport.js)
- [ ] Image Uploads (Cloudinary + Multer)
- [ ] Reviews & Ratings
- [ ] Booking System
- [ ] Maps Integration (Mapbox)
- [ ] Search & Filters
- [ ] Error Handling Middleware
- [ ] Flash Messages

---

## 👩‍💻 Author

**Sushmita Dhandar**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [your-linkedin](https://linkedin.com/in/your-linkedin)

---

## 📄 License

This project is built for learning and educational purposes.