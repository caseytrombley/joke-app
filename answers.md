## 1. What’s a closure? Where in the code is there a closure?
   A closure is when a function remembers or keeps access to variables from the scope where it was created. Like in my code, onRate inside the joke card uses the rating store from the outer setup.  It references store and joke.id, which come from the outer setup() scope. Even though onRate is passed around or triggered later, it still has access to those variables:
```bash
    function onRate(value) {
      store.rateJoke(joke.id, value);
    }
```

## 2. Which are the potential side effects in any function? Any in your code? Are they expected? Can they be avoided?
   Side effects are functions or operations that go beyond returning a value. In my code, the addCustomJoke function in the store introduces several expected side effects:
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

These side effects are intentional and scoped, such as adding a new joke to the store app state, writing to the localStorage to persist jokes on reload, and resetting the page to page 1 to make sure the newly added joke is visible right away.

Can they be avoided? No, not really but they could be put into a utility function or plugin to separate concerns. Here it seemed appropriate to keep together because I wanted to submit and persist the joke and it's handled in a predictable way.

