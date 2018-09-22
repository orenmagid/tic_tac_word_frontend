# Tic Tac Word

This is the frontend repository for an app <a href="https://github.com/BrittBarrow">Brittany Barrow</a> and I worked on for the JavaScript Module of the Flatiron School's Immersive Software Engineering Bootcamp. The backend repository is available <a href="https://github.com/orenmagid/tic_tac_word_backend">here</a>.

It's a (hopefully) fun game that combines tic tac toe and a vocabulary building, word-guessing game. 

Here's how it works:

Users are presented with an empty tic tac toe board. Their goal, put most simply, is try to establish three Xs in a row while preventing the computer from establishing three Os in a row.

After selecting a square, users are prompted with a word. Their goal is to guess a word with a highly related meaning to this prompt. If their guess is in fact highly related to the prompt, they win the square. Otherwise, the computer wins the square.

There's more to this, though, than just winning the square. Users are awarded points for every square won. How many points? Up to 100. The exact amount awarded depends on two factors: (1) how closely related their guess is to the prompt; (2) how long it takes them to answer.

In order to determine if their guess is closely related to the prompt, we use <a href="https://www.datamuse.com/api/">The Datamuse API<a/>. It gives us the top 500 words with a related meaning to the prompt. If a guess is in this list, the user wins the square and a point amount based on how highly related the user's guess is to the prompt. For every second it takes a user to answer, we deduct five percent of the meaning-related score.
  
If at any point the board has three Xs in a row, the user wins. If the user allows three Os in a row, the user loses. When a user wins, 100 points is added to her score. When a user loses, 100 points is subtracted from her score.

Winning is great and all, but the goal of this game is be to win with as many points as possible. Why not try to crack the top-ten scoring games, which is displayed in the app?

## Demo

You can check it out at https://tic-tac-word.herokuapp.com/. Because Heroku's <a href="https://devcenter.heroku.com/articles/free-dyno-hours">free dyno hours</a> <a href="https://devcenter.heroku.com/articles/free-dyno-hours#dyno-sleeping">go to sleep</a> if the app hasn't been used in thirty minutes, the app may be unresponsive for about 30 secs when you first attempt to use it. Unfortunately, this applies to the frontend and the backend. So, it may be about thirty seconds before the webpage loads, and then another delay before the database is responsive.


## License

MIT
