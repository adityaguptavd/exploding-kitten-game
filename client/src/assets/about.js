import defuser from "./defuser.jpeg";
import kitten from "./kitten.jpeg";
import explosive from "./explosive.jpeg";
import shuffle from "./shuffle.jpeg";

export const cards = [
    {
        name: "Cat/Kitten Card😸",
        desc: "If this card is drawn, then it is removed from the deck of cards.",
        img: kitten
    },
    {
        name: "Exploding Card🤯💣",
        desc: "If this card is drawn, then the user will lose the game.",
        img: explosive
    },
    {
        name: "Defuse Card🛠️",
        desc: "If this card is drawn, then the user can use it for defusing the Exploding Card that user may encounter in current game.",
        img: defuser
    },
    {
        name: "Shuffle Card🔀",
        desc: "If this card is drawn, then the deck of cards will be reshuffled.",
        img: shuffle
    }
]
