import {
  Typography,
  Box,
  Stack,
  CardContent,
  Card,
  CardMedia,
} from "@mui/material";
import { cards } from "../../assets/about";

const About = () => {
  return (
    <Box
      width="100%"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ backgroundColor: "#f9ad3b" }}
    >
      <Typography
        variant="h3"
        sx={{ color: "#4b3412", fontWeight: 700, marginTop: "30px", textAlign: "center" }}
      >
        About Exploding Kitten Game
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "#644518", fontWeight: 700, textAlign: "center" }}>
        - An online single-player card game
      </Typography>
      <Typography
        variant="h4"
        sx={{
          color: "#7d571e",
          alignSelf: "flex-start",
          fontSize: "25px",
          marginTop: "10px",
          marginLeft: "20px",
        }}
      >
        - The user will be given a deck of 5 cards of 4 different types.
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "#7d571e",
          alignSelf: "flex-start",
          fontSize: "25px",
          marginTop: "10px",
          marginLeft: "20px",
        }}
      >
        - User has to withdraw all 5 cards in order to win the game.
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{ marginTop: "20px", flexWrap: "wrap", width: "100%" }}
      >
        {cards.map((card) => (
          <Card
            key={card.name}
            sx={{ maxWidth: 250, backgroundColor: "#fbc676", minHeight: 460, marginBottom: "50px !important" }}
          >
            <CardMedia
              component="img"
              sx={{ height: 300, objectFit: 'fill' }}
              image={card.img}
              title={card.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {card.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.desc}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default About;
