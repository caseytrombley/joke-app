## 1. What’s a closure? Where in the code is there a closure?
   A closure is when a function keeps access to variables from the scope where it was created. Like in my code, onRate inside the joke card uses the rating store from the outer setup.
```bash
    function onRate(value) {
      store.rateJoke(joke.id, value);
    }
```

## 2. Which are the potential side effects in any function? Any in your code?
   Side effects are things like updating state, calling APIs, or writing to localStorage. In my app, saving jokes or ratings to localStorage is a side effect. They're expected here and kept in the store.
   
```bash
    addCustomJoke(jokeData) {
        const validIds = this.jokes.map(j => parseInt(j.id, 10)).filter(id => !isNaN(id));
        const nextId = validIds.length > 0 ? Math.max(...validIds) + 1 : 1;

        const newJoke = {
            id: nextId,
            type: jokeData.type || 'general',
            setup: jokeData.setup,
            punchline: jokeData.punchline,
            isCustom: true,
        };

        this.jokes = [newJoke, ...this.jokes];
        this.currentPage = 1;

        const saved = JSON.parse(localStorage.getItem('customJokes') || '[]');
        localStorage.setItem('customJokes', JSON.stringify([newJoke, ...saved]));
    },
```