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

export default function SignUp() {

  const navigate = useNavigate();

  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onChange" });
  const onSubmit = (data) => console.log(data);

  const email = watch("email", "");
  const password = watch("password", "");
  const lastName = watch("lastName", "");
  const firstName = watch("firstName", "");

  const [validationError, setValidationError] = useState({});

  //Fonction d'ajout de club
  const Register = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    // formData.append("password_confirmation", password_confirmation);

    await axios
      .post(`http://localhost:8000/api/register`, formData)
      // .then(navigate("/home"))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };

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
            S'inscrire
          </Typography>
          <Box component="form" noValidate onSubmit={Register} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("firstName", {
                    required: true,
                    maxLength: {
                      value: 20,
                      message: "Longueur minimale de 8 caractères",
                    },
                  })}
                  required
                  fullWidth
                  id="firstName"
                  label="Prénom"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("lastName", {
                    required: "Longueur minimale de 8 caractèrefbfs",
                    maxLength: {
                      value:20,
                      message: "Longueur minimale de 8 caractères nom famille",
                    },
                  })}
                  required
                  fullWidth
                  id="lastName"
                  label="Nom"
                  autoFocus
                />
              </Grid>
              {errors.firstName ? (
                <Alert sx={{ mt: 2, p: 0, pl: 2 }} severity="error">
                  {errors.firstName?.message}
                </Alert>
              ) : (
                ""
              )}
              {errors.lastName ? (
                <Alert sx={{ mt: 2, p: 0, pl: 2 }} severity="error">
                  {errors.lastName?.message}
                </Alert>
              ) : (
                ""
              )}

              <Grid item xs={12}>
                <TextField
                  {...register("email", {
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
                  {...register("password", {
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

              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="Accepter les RGPD"
                />
              </Grid> */}
            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              S'inscrire
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                Vous avez déjà un compte ? Connectez-vous 
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}