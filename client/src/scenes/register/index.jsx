import { Box, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoadButton from "../../components/LoadButton";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CustomSnack from "../../components/Snackbar";
import Input from "../../components/Input";
import { useRegisterUserMutation } from "../../state/api";
import { setToken } from "../../state/user/tokenSlice"
import PaperBox from "../../components/PaperBox";
import StyledLink from "../../components/StyledLink";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [registerUserMutation, {data, isLoading, error}] = useRegisterUserMutation();

  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    mssg: "",
  });

  const isAlpha = (str) => {
    return /^[A-Za-z]+$/.test(str);
  };

  const isFirstNameValid = () => {
    if(isAlpha(userDetails.firstname) && userDetails.firstname.length >= 3){
      return true;
    }
    setSnackbar({
      open: true,
      mssg: "First Name should be 3 characters long with alphabets only"
    })
    return false;
  };

  const isLastNameValid = () => {
    if(isAlpha(userDetails.lastname) || userDetails.lastname === ""){
      return true;
    }
    setSnackbar({
      open: true,
      mssg: "Last Name should contain alphabets only"
    })
    return false;
  };

  const isUsernameValid = () => {
    if(userDetails.username.length >= 5){
      return true;
    }
    setSnackbar({
      open: true,
      mssg: "Username must be atleast 5 characters long"
    })
    return false;
  };

  const isPasswordValid = () => {
    if(userDetails.password.length >= 8){
      return true;
    }
    setSnackbar({
      open: true,
      mssg: "Password must be atleast 8 characters long"
    })
    return false;
  };

  const validateForm = () => {
    if(!isFirstNameValid() || !isLastNameValid() || !isUsernameValid() || !isPasswordValid()){
      return false;
    }
    return true;
  };

  const signUp = () => {
    if (!validateForm()) {
      return;
    }
    const { firstname, lastname, username, password } = userDetails;
    const body = JSON.stringify({
      firstname,
      lastname,
      username,
      password,
    });
    registerUserMutation({body});
  };

  useEffect(() => {
    if(data){
      dispatch(setToken(data));
      localStorage.setItem("explodingKittenGameToken", data.token);
      navigate("/");
    }
    if(error){
      let mssg = "";
      if(error.status === "FETCH_ERROR"){
        mssg = "Server isn't responding.";
      }
      else if(error.data){
        if(Array.isArray(error.data.error)){
          mssg = "Invalid Details.";
        }
        else{
          mssg = error.data.error;
        }
      }
      setSnackbar({
        open: true,
        mssg,
      });
    }
  }, [data, error]);

  useEffect(() => {
    localStorage.clear();
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
      <CustomSnack
        open={snackbar.open}
        mssg={snackbar.mssg}
        closeSnackbar={() => {
          setSnackbar({ open: false, mssg: "" });
        }}
      />
      <Typography 
        variant="h3" 
        color="#4b3412" 
        mt="20px"
        sx={{
          fontSize: {
            xs: "25px",
            sm: "45px",
            md: "50px",
          }
        }}
      >
        World of Exploding Kittens
      </Typography>
      <PaperBox elevation={5}>
        <Stack direction="column" spacing={4} alignItems="center" mt="40px">
        <Typography 
            variant="h4" 
            color="#4b3412"
            sx={{
              fontSize: {
                xs: "20px",
                sm: "30px",
                md: "35px"
              }
            }}
          >
            Sign Up
          </Typography>
          <Input
            placeholder="First Name"
            value={userDetails.firstname}
            onChange={(e) =>
              setUserDetails({ ...userDetails, firstname: e.target.value })
            }
          />
          <Input
            placeholder="Last Name"
            value={userDetails.lastname}
            onChange={(e) =>
              setUserDetails({ ...userDetails, lastname: e.target.value })
            }
          />
          <Input
            placeholder="Username"
            value={userDetails.username}
            onChange={(e) =>
              setUserDetails({ ...userDetails, username: e.target.value })
            }
          />
          <Input
            placeholder="Password"
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
            type="password"
          />
          <StyledLink to={"/login"}>Already have an account?</StyledLink>

          <LoadButton
            loading={isLoading}
            variant="outlined"
            sx={{
              color: "#644518",
              borderColor: "#ae7929",
              "&:hover": {
                backgroundColor: "#fabd62",
                borderColor: "#ae7929",
              },
            }}
            onClick={signUp}
          >
            Sign Up
          </LoadButton>
        </Stack>
      </PaperBox>
    </Box>
  );
};

export default Register;
