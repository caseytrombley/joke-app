# 🤡 Jokester - Vue 3 Joke App

**Jokester** is a fun, interactive Vue 3 app that lets users browse, rate, and contribute their own jokes. Built using **Vite** and **Vue 3’s Composition API**, it features modern UI enhancements, joke filtering, local persistence, and inline editing—all styled with **Tailwind CSS**.

## 🚀 Features

- 📚 Loads a large dataset of jokes from a public [GitHub repo](https://github.com/15Dkatz/official_joke_api)
- 🌐 Pagination with URL sync (`?page=2`)
- 🔍 Filter jokes by type (programming, general, knock-knock, etc.)
- ⭐ Rate jokes with a star rating system (persisted in `localStorage`)
- ➕ Add your own jokes (automatically appear at the top)
- ✏️ Edit or 🗑️ remove custom jokes inline with confirmation
- 🎭 Reveal punchlines interactively with animation
- 🧠 Smart formatting for joke inputs (auto-punctuation & capitalization)
- 🧼 Responsive, animated UI with skeleton loaders & mobile-ready components

## 📦 Tech Stack

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/) for state management
- [Vue Router](https://router.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Vue](https://www.npmjs.com/package/lucide-vue-next) for icons

## 📂 Joke Source Attribution

Joke data is loaded from the excellent open-source repo:
👉 [https://github.com/15Dkatz/official_joke_api](https://github.com/15Dkatz/official_joke_api)

Custom jokes are stored in `localStorage` to persist across sessions.

---

## ❓ Questions

### 1. **What’s a closure?**
A **closure** is a function that retains access to its **lexical scope** (the variables around it) even after the outer function has exited. Closures allow Vue components and Pinia actions to access reactive refs, computed properties, and methods even when called later.

Closures appear throughout this app—in:
- event handlers (`handleSubmit`, `saveEdit`)
- computed props (`filteredJokes`)
- Pinia actions (`addCustomJoke`, `rateJoke`)

### 2. **Where in the code is there a closure?**
- `handleSubmit()` in `AddJokeForm.vue` closes over `setupText`, `punchline`, `type`, `store`, `router`.
- `paginatedJokes` computed in `HomeView.vue` closes over `store.jokes`, `store.currentPage`.
- `store.addCustomJoke()` closes over `this.jokes` in `jokeStore.js`.

---

## 🛠️ Development

```bash
npm install
npm run dev
