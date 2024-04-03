# Exploding Kitten Game

## Description

A simple and intuitive single player game where players withdraw cards one by one from a deck of five cards until they found a explosive card (where they lose game) or no cards left to withdraw (where they win the game).

The user will be given a deck of 5 cards of 4 different types of cards:
1. Cat/Kitten Card -> If this card is drawn, simply it will be removed from deck.
2. Shuffle Card -> On withdrawl of this card, the deck will be reshuffled.
3. Explosive Card ->  On withdrawl of this card, user will lose the game (if no defuser kit available).
4. Defuser Card ->  If user withdraws this card, he will be allowed to defuse one explosive card that he will encounter in future.

In this game, you can:

- You can register yourself as a new player easily
- Login to the game with your username and password
- Play the game to compete with other players and top the leaderboard

The ranking of leaderboard is based on:
- The player who won more matches will be on top
- In case two or more players have same number of winning matches, the player with less number of matches lost will be on top
- In case two or more players have same number of winning matches and losing matches, time factor will be considered

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of `node` and `npm`.
- You have a `Windows/Linux/Mac` machine.

## Installing and Using Exploding Kitten Game

To install Exploding Kitten Game, follow these steps:

Open up a new terminal and type the following command:
```bash
git clone https://github.com/adityaguptavd/exploding-kitten-game.git
cd client/
npm install
npm run build
```
Copy the dist folder from client to server.
Now open up a new terminal and type: 
```bash
cd server
npm install
npm run server
```

Now, open your browser and navigate to http://localhost:3000

## Contributing to Exploding Kitten Game
To contribute to Exploding Kitten Game, follow these steps:

1. Fork this repository.
2. Create a branch: ```git checkout -b <branch_name>```
3. Make your changes and commit them: ```git commit -m "<commit_message>"```
4. Push to the original branch: ```git push origin <exploding-kitten-game>/<location>```
5. Create the pull request.

## Contact
If you want to contact me you can reach me at aarav30572@gmail.com