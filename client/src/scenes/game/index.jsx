import React from "react";
import { Typography, Box, Stack, Card, CardMedia, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import backCard from "../../assets/cardbackground.jpg";
import { cards } from "../../assets/about";
import { useSaveGameMutation } from "../../state/api";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "../../components/Snackbar";
import { setUser } from "../../state/user/userSlice";
import "./index.css";

const Game = () => {
  const navigate = useNavigate();
  const [saveGameMutation, { error, data }] = useSaveGameMutation();

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    mssg: "",
  });
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token.token);
  const user = useSelector((state) => state.user);

  const initialCards = Array.from({ length: 5 }, () => ({
    ...cards[Math.floor(Math.random() * cards.length)],
    revealed: false,
  }));

  const [deck, setDeck] = useState(() => {
    const savedDeck = localStorage.getItem("deck");
    return savedDeck ? JSON.parse(savedDeck) : initialCards;
  });
  const [defuserKit, setDefuserKit] = useState(() => {
    const savedDefuserKit = localStorage.getItem("defuserKit");
    return savedDefuserKit ? +savedDefuserKit : 0;
  });
  const [revealedCards, setRevealedCards] = useState(() => {
    const savedRevealedCards = localStorage.getItem("revealedCards");
    return savedRevealedCards ? +savedRevealedCards : 0;
  });
  const [mssg, setMssg] = useState(() => {
    const savedMssg = localStorage.getItem("mssg");
    return savedMssg ? savedMssg : "Click any card to reveal it!";
  });

  const [header, setHeader] = useState(() => {
    const savedHeader = localStorage.getItem("header");
    return savedHeader ? savedHeader : "Reveal All Cards To Win!";
  });
  const [isActive, setActive] = useState(() => {
    const active = localStorage.getItem("isActive");
    return active ? JSON.parse(active) : true;
  });

  const [isWon, setIsWon] = useState(false);

  const shuffleCards = () => {
    setActive(false);
    setMssg("Shuffling Card...");
    const intervalID = setInterval(() => {
      const newDeck = Array.from({ length: 5 }, () => ({
        ...cards[Math.floor(Math.random() * cards.length)],
        revealed: true,
      }));
      setDeck(newDeck);
    }, 100);
    setTimeout(() => {
      clearInterval(intervalID);
      const newDeck = Array.from({ length: 5 }, () => ({
        ...cards[Math.floor(Math.random() * cards.length)],
        revealed: false,
      }));
      setDeck(newDeck);
      setRevealedCards(0);
      setMssg("Cards Shuffled!");
      setDefuserKit(0);
      setActive(true);
      setTimeout(() => {
        const finalDeck = Array.from({ length: 5 }, () => ({
          ...cards[Math.floor(Math.random() * cards.length)],
          revealed: false,
        }));
        setDeck(finalDeck);
      }, 250);
    }, 1000);
  };

  const gameOver = ({ won }) => {
    setActive(false);
    if (!won) {
      setMssg("Oops! You've revealed the exploding card.");
      setHeader("You Lost The Game!");
    } else {
      setMssg("You've revealed all cards.");
      setHeader("🎉 You Won The Game! 🎉");
    }
    const body = JSON.stringify({
      isWon: won,
    });
    const update = isWon
    ? { wonMatches: user.wonMatches + 1 }
    : { loseMatches: user.loseMatches + 1 };
    dispatch(setUser({...user, ...update}));
    saveGameMutation({ token, body });
    setIsWon(won);
  };

  const quit = () => {
    navigate("/");
  };

  const restartGame = () => {
    setDeck(initialCards);
    setIsWon(false);
    setMssg("Click any card to reveal it!");
    setHeader("Reveal All Cards To Win!");
    setDefuserKit(0);
    setRevealedCards(0);
    setActive(true);
  };

  const revealCard = (isRevealed, index) => {
    if (!isRevealed) {
      let updatedDeck = [...deck];
      updatedDeck[index].revealed = true;
      setDeck(updatedDeck);
      if (updatedDeck[index].name.includes("Kitten")) {
        setRevealedCards(revealedCards + 1);
        setMssg("You revealed a kitten card!");
      } else if (updatedDeck[index].name.includes("Defuse")) {
        setMssg("You revealed a defuse card!");
        setRevealedCards(revealedCards + 1);
        setDefuserKit(defuserKit + 1);
      } else if (updatedDeck[index].name.includes("Exploding")) {
        if (defuserKit > 0) {
          setMssg("You revealed an exploding card and defused it!");
          setDefuserKit(defuserKit - 1);
          setRevealedCards(revealedCards + 1);
        } else {
          gameOver({ won: false });
          removeLocally();
          return;
        }
      } else if (updatedDeck[index].name.includes("Shuffle")) {
        shuffleCards();
      }
    }
  };

  const saveLocally = () => {
    localStorage.setItem("deck", JSON.stringify(deck));
    localStorage.setItem("defuserKit", defuserKit);
    localStorage.setItem("revealedCards", revealedCards);
    localStorage.setItem("mssg", mssg);
    localStorage.setItem("header", header);
    localStorage.setItem("isActive", isActive);
  };

  const removeLocally = () => {
    localStorage.removeItem("deck");
    localStorage.removeItem("defuserKit");
    localStorage.removeItem("revealedCards");
    localStorage.removeItem("mssg");
    localStorage.removeItem("header");
    localStorage.removeItem("isActive");
  };

  useEffect(() => {
    if (revealedCards === 5) {
      gameOver({ won: true });
      removeLocally();
    } else {
      saveLocally();
    }
  }, [revealedCards]);

  useEffect(() => {
    if (data) {
      setSnackbar({
        open: true,
        severity: "success",
        mssg: "Game Progress Saved!",
      });
      if(user.rank < data.rank) {
        setHeader("Congratulations! You've ranked up.");
      }
      else if(user.rank > data.rank) {
        setHeader("Oops! Your rank dropped.");
      }
      dispatch(setUser({...user, rank: data.rank}));
    }
    if (error) {
      setSnackbar({
        open: true,
        mssg: "Error in saving game!",
        severity: "error",
      });
    }
  }, [data, error]);

  return (
    <Box
      width="100%"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="30px"
      sx={{ backgroundColor: "#f9ad3b" }}
    >
      <Snackbar
        open={snackbar.open}
        mssg={snackbar.mssg}
        severity={snackbar.severity}
        closeSnackbar={() =>
          setSnackbar({
            open: false,
            mssg: "",
            severity: "success",
          })
        }
      />
      <Box
        width="100%"
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        flexWrap="wrap"
      >
        <Box>
          <Typography
            variant="body1"
            sx={{
              color: "#644518",
              marginTop: "20px",
              textAlign: "center",
              fontSize: { xs: "15px", md: "23px" },
            }}
          >
            Matches Won: {user.wonMatches} /{" "}
            {user.wonMatches + user.loseMatches}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#644518",
              marginTop: "20px",
              textAlign: "center",
              fontSize: { xs: "15px", md: "23px" },
            }}
          >
            Accuracy:{" "}
            {user.loseMatches + user.wonMatches === 0
              ? "0%"
              : `${(
                  user.wonMatches /
                  (user.loseMatches + user.wonMatches)
                ).toFixed(2)}%`}
          </Typography>
        </Box>
        <Typography
          variant="h3"
          sx={{
            color: "#644518",
            marginTop: "20px",
            textAlign: "center",
            fontSize: { xs: "30px", md: "50px" },
          }}
          className={isWon ? 'win': ''}
        >
          {header}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: "#644518",
            marginTop: "20px",
            textAlign: "center",
            fontSize: { xs: "20px", md: "30px" },
          }}
        >
          Leaderboard Rank: #{user.rank}
        </Typography>
      </Box>
      <Stack
        direction={{ xs: "column-reverse", md: "column" }}
        justifyContent="flex-start"
        alignItems="center"
        spacing={4}
        width="100%"
      >
        <Stack
          width="100%"
          direction="row"
          justifyContent="space-around"
          flexWrap="wrap"
        >
          {deck.map((card, index) => (
            <React.Fragment key={index}>
              <Box className="card-container">
                <Box className={!card.revealed ? "flipped" : ""}>
                  <Box className="front">
                    <Card
                      sx={{
                        width: 200,
                        backgroundColor: "#fbc676",
                        marginBottom: "20px",
                      }}
                      onClick={
                        isActive
                          ? () => revealCard(card.revealed, index)
                          : () => {
                              setMssg("Click restart button to play!");
                            }
                      }
                    >
                      <CardMedia
                        component="img"
                        sx={{ height: 300, objectFit: "fill" }}
                        image={backCard}
                        title={"Click to reveal card!"}
                      />
                    </Card>
                  </Box>
                  <Box className="back">
                    <Card
                      sx={{
                        width: 200,
                        backgroundColor: "#fbc676",
                        marginBottom: "20px",
                      }}
                      onClick={
                        isActive
                          ? () => revealCard(card.revealed, index)
                          : () => {
                              setMssg("Click restart button to play!");
                            }
                      }
                    >
                      <CardMedia
                        component="img"
                        sx={{ height: 300, objectFit: "fill" }}
                        image={card.img}
                        title={card.name}
                      />
                    </Card>
                  </Box>
                </Box>
              </Box>
            </React.Fragment>
          ))}
        </Stack>
        <Typography
          variant="h4"
          sx={{
            color: "#644518",
            textAlign: "center",
            fontSize: { xs: "27px", md: "40px" },
          }}
        >
          {mssg}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#644518", fontSize: "20px", textAlign: "center" }}
        >
          Defuser Kit: {defuserKit}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#644518", fontSize: "20px", textAlign: "center" }}
        >
          Cards Revealed: {`${revealedCards}/5`}
        </Typography>
        <Stack
          direction="row"
          gap="20px"
          flexWrap="wrap"
          justifyContent="center"
        >
          <Button
            variant="outlined"
            sx={{
              color: "#644518",
              borderColor: "#ae7929",
              "&:hover": {
                backgroundColor: "#fabd62",
                borderColor: "#ae7929",
              },
            }}
            onClick={restartGame}
          >
            Restart
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "#644518",
              borderColor: "#ae7929",
              "&:hover": {
                backgroundColor: "#fabd62",
                borderColor: "#ae7929",
              },
            }}
            onClick={quit}
          >
            Quit
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Game;
