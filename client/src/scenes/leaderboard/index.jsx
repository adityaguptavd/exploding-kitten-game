import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetLeaderboardQuery } from "../../state/api";

export default function BasicTable() {
  const token = useSelector((state) => state.token.token);
  const { username, firstname, wonMatches, loseMatches } = useSelector(
    (state) => state.user
  );
  const { data, error, refetch } = useGetLeaderboardQuery({ token });
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (data) {
      if (data.rank > 10) {
        setLeaderboard([
          ...data.leaderboard,
          { username, firstname, wonMatches, loseMatches, rank: data.rank },
        ]);
      } else {
        setLeaderboard(data.leaderboard);
      }
    }
  }, [data, error]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Box
      width="100%"
      height="100vh"
      sx={{
        backgroundColor: "#f9ad3b",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Typography variant="h3" sx={{ color: "#4b3412", marginTop: "20px" }}>
        Leaderboard
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ margin: "10px", border: "1px solid #4b3412" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#7d571e" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Username</TableCell>
              <TableCell sx={{ color: "#fff" }} align="center">
                Name
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align="center">
                Rank
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align="center">
                Points
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align="center">
                Matches Won
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align="center">
                Matches Lost
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align="center">
                Total Matches Played
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "#e09c35" }}>
            {data &&
              leaderboard.map((row, index) => (
                <TableRow
                  key={row.username}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{ color: "#fff" }}>
                    {`@${row.username}`}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    {`${row.firstname} ${row.lastname ? row.lastname : ""}`}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    {row.rank ? row.rank : index + 1}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    {row.wonMatches}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    {row.wonMatches}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    {row.loseMatches}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    {row.loseMatches + row.wonMatches}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
