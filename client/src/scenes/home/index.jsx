import {
  Box,
  Typography,
  Stack,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useFetchUserQuery } from "../../state/api";
import { setUser } from "../../state/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);

  const { data, error, refetch } = useFetchUserQuery({ token });

  useEffect(() => {
    if (data) {
      dispatch(setUser(data.user));
    }
  }, [data, error]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Box
      height="100vh"
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      className="home"
    >
      <Box width="100%" display="flex" justifyContent="center">
        <Box sx={{ flex: 0.5 }}>
          <List sx={{ marginLeft: "20px" }}>
            <ListItem>
              <ListItemText
                primary={
                  data
                    ? `${data.user.firstname} ${
                        data.user.lastname ? data.user.lastname : ""
                      }`
                    : "User"
                }
                sx={{color: "#644518", '& .MuiListItemText-secondary': { color: '#ae7929' }}}
                secondary={data && `@${data.user.username}`}
              />
            </ListItem>
          </List>
        </Box>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
          <Typography variant="h3" sx={{ marginTop: "30px", color: "#4b3412" }}>
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
        {data && (
          <>
            {" "}
            Matches Won:{" "}
            {`${data.user.wonMatches}/${
              data.user.wonMatches + data.user.loseMatches
            }`}{" "}
          </>
        )}
      </Typography>
      <Stack direction="column" spacing={3} mt="150px">
        <Button
          sx={{ color: "#7d571e", fontSize: "1.5rem" }}
          onClick={() => {
            navigate("/game");
          }}
        >
          Start Game
        </Button>
        <Button
          sx={{ color: "#7d571e", fontSize: "1.5rem" }}
          onClick={() => {
            navigate("/leaderboard");
          }}
        >
          Leaderboard
        </Button>
        <Button
          sx={{ color: "#7d571e", fontSize: "1.5rem" }}
          onClick={() => {
            navigate("/about");
          }}
        >
          About Game
        </Button>
        <Button
          sx={{ color: "#7d571e", fontSize: "1.5rem" }}
          onClick={() => {
            navigate("/login");
          }}
        >
          Log out
        </Button>
      </Stack>
    </Box>
  );
};

export default Home;
