# EIRA.digital — Web Design & Development

This project is built with **Astro**, enhanced with **React islands** for interactive components like the pricing calculator and contact form.  
It’s a modern, fast, and flexible setup for showcasing web design and development work.

---

## 📁 Project Structure

/
├── public/
├── src/
│   ├── components/      → React + Astro components
│   ├── layouts/         → Site-wide layout wrapper
│   └── pages/           → Each .astro file becomes a route
└── package.json

Pages inside `src/pages/` automatically become routes.  
Components live in `src/components/`, and global layout elements live in `src/layouts/`.

---

## 🚀 Commands

All commands are run from the root of the project:

| Command | Action |
|--------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build your production site to `./dist/` |
| `npm run preview` | Preview your build locally |
| `npm run astro ...` | Run Astro CLI commands |
| `npm run astro -- --help` | Get help using the Astro CLI |

---

## 🔗 Pages

- `/` — Homepage  
- `/portfolio` — Portfolio page  
- `/pricing` — React pricing calculator  
- `/contact` — React contact form  

---

## 👀 Learn More

- Astro Docs: https://docs.astro.build  
- Astro Discord: https://astro.build/chat
