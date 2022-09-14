import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Box";
import { GroupSharp } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function Login() {

  const navigate = useNavigate();

  const {
    login,
    watch,
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onChange" });
  const onSubmit = (data) => console.log(data);

  const email = watch("email", "");
  const password = watch("password", "");

  const [validationError, setValidationError] = useState({});


 
  let Login = async () => {
    try {
      let formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      let res = await axios.post("http://127.0.0.1:8000/api/login/", formData)
     
      if (res.status === 200) {
        localStorage.setItem("access_token", res.data.token);
        console.log(res.data.token);
        navigate(-1);
      }
    } catch (err) {}
  };
  // //Fonction d'ajout de club
  // const Login = async (e) => {
  //  return false;

  //   const formData = new FormData();

  //   formData.append("email", email);
  //   formData.append("password", password);
  //   // formData.append("password_confirmation", password_confirmation);
    
  //   await axios
  //     .post(`http://localhost:8000/api/login`, formData)
     
  //     .then()
      
   
  //     .catch(({ response }) => {
  //       if (response.status === 422) {
  //         setValidationError(response.data.errors);
  //       }
  //       if (response.status === 200) {
  //               localStorage.setItem("access_token", response.data.token);
        
  //               navigate(-1);
  //             }
  //     });
    
 

  // let Login = async () => {
  //   try {
  //     let formData = new FormData();
  //     formData.append("email", email);
  //     formData.append("password", password);
  //     let res = await axios.post("http://127.0.0.1:8000/api/login", formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     if (res.status === 200) {
  //       localStorage.setItem("access_token", res.data.token);

  //       // navigate(-1);
  //     }
  //   } catch (err) {}
  // };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 14,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <GroupSharp />
          </Avatar>
          <Typography component="h1" variant="h5">
            Se connecter
          </Typography>
          <Box component="form" noValidate onSubmit={login} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                {...Login("email", {
                  required: "Veuillez saisir un email",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Veuillez saisir un email valide",
                  },
                })}
                  required
                  fullWidth
                  id="email"
                  label="Votre mail"
                />
              </Grid>
              {errors.email ? (
                <Alert sx={{ mt: 2, p: 0, pl: 2 }} severity="error">
                  {errors.email?.message}
                </Alert>
              ) : (
                ""
              )}

              <Grid item xs={12}>
                <TextField
                  {...Login("password", {
                    required: "Ce champ est requis",
                    minLength: {
                      value: 5,
                      message: "Longueur minimale de 5 caractères",
                    },
                    pattern: {
                      value:
                        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#:$%^&])/,
                      message:
                        "Le mot de passe doit contenir une minuscule, une majuscule, un chiffre et un caractère spéciale",
                    },
                  })}
                  required
                  fullWidth
                  name="password"
                  label="Votre mot de passe"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {errors.password ? (
                <Alert sx={{ mt: 2, p: 0, pl: 2 }} severity="error">
                  {errors.password?.message}
                </Alert>
              ) : (
                ""
              )}
            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Se connecter
            </Button>


            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Mot de passe oublié ?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Pas de compte ? Inscrivez-vous"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}