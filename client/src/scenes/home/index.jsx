import {
  Box,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import StyledButton from "../../components/StyledButton";

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  return (
    <Box
      height="100vh"
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      className="home"
    >
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        flexDirection={{
          xs: "column",
          sm: "row",
        }}
      >
        <Box
          sx={{
            alignSelf: "flex-start",
          }}
        >
          <List
            sx={{
              marginLeft: {
                xs: "5px",
                sm: "20px",
              },
            }}
          >
            <ListItem>
              <ListItemText
                primary={
                  user
                    ? `${user.firstname} ${user.lastname ? user.lastname : ""}`
                    : "User"
                }
                sx={{
                  color: "#644518",
                  "& .MuiListItemText-primary": {
                    fontSize: {
                      xs: "12px",
                      sm: "17px",
                    },
                  },
                  "& .MuiListItemText-secondary": {
                    color: "#ae7929",
                    fontSize: {
                      xs: "8px",
                      sm: "12px",
                    },
                  },
                }}
                secondary={user ? `@${user.username}` : "@username"}
              />
            </ListItem>
          </List>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Typography
            variant="h3"
            color="#4b3412"
            mt={{
              xs: "0px",
              sm: "30px",
            }}
            sx={{
              fontSize: {
                xs: "25px",
                sm: "40px",
                md: "50px",
              },
              textAlign: "center",
            }}
          >
            World of Exploding Kittens
          </Typography>
        </Box>
      </Box>

      <Typography
        variant="body"
        sx={{
          color: "#644518",
          marginTop: "30px",
          fontSize: "30px",
        }}
      >
        {user && (
          <>
            {" "}
            Matches Won:{" "}
            {`${user.wonMatches}/${user.wonMatches + user.loseMatches}`}{" "}
          </>
        )}
      </Typography>
      <Stack direction="column" spacing={3} mt="150px">
        <StyledButton
          onClick={() => {
            navigate("/game");
          }}
        >
          Start Game
        </StyledButton>
        <StyledButton
          onClick={() => {
            navigate("/leaderboard");
          }}
        >
          Leaderboard
        </StyledButton>
        <StyledButton
          onClick={() => {
            navigate("/about");
          }}
        >
          Rules
        </StyledButton>
        <StyledButton
          onClick={() => {
            navigate("/login");
          }}
        >
          Log out
        </StyledButton>
      </Stack>
    </Box>
  );
};

export default Home;
