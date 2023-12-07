import React, { useMemo } from 'react';
import FetchNews from "../hooks/FetchNews";
import { Link, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { CardActions, CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import Header from "./Header";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';



type SingleNewsParams = {
  id?: string;
};

const SingleNews = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const toggleTheme = (isChecked: boolean) => {
    setDarkMode(isChecked);
  };
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );


  const { loading, articles } = FetchNews();
  const { id } = useParams<SingleNewsParams>();

  
  if (id) {
    const index = parseInt(id, 10);
    const singleArticle = articles[index];
    return (
      <ThemeProvider theme={theme}>
         <Header toggleTheme={toggleTheme} />

        {loading ? (
          <Typography
            height="78vh"
            alignItems="center"
            justifyContent="center"
            display="flex"
            flexDirection="column"
          >
            Loading Please wait...
            <div style={{ marginTop: "2rem" }}>
              <CircularProgress />
            </div>
          </Typography>
        ) : (
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 5,
            }}
          >
            <Container maxWidth="lg">
              <Grid >
              
                <Card sx={{ maxWidth: "lg" }}>
                  <CardHeader
                    title={singleArticle?.title}
                    subheader={`Author: ${singleArticle?.author}`}
                  />

                  <CardMedia
                    component="img"
                    height="400"
                    image={singleArticle?.urlToImage}
                    alt={singleArticle?.title}
                  />

<CardContent>
        <Typography variant="h5" color="text.primary">
          {singleArticle?.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {singleArticle?.description}
        </Typography>


      </CardContent>

      <CardActions>
        <Link to={singleArticle?.url} target="_blank">
        <Button size="large" variant="outlined">Read News here</Button>
        </Link>
      </CardActions>


                </Card>
              </Grid>
            </Container>
          </Box>
        )}
      </ThemeProvider>
    );
  }
  return (
    <div>
      <Typography
        height="78vh"
        alignItems="center"
        justifyContent="center"
        display="flex"
        flexDirection="column"
      >
        Sorry No News found
      </Typography>
    </div>
  );
};

export default SingleNews;
