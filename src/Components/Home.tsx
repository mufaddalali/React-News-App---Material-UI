import React, { useMemo } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CircularProgress, MenuItem, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import FetchNews from "../hooks/FetchNews";
import Header from "./Header";

const Home: React.FC = () => {
  // HANDLING STATE
  const [darkMode, setDarkMode] = React.useState(false);
  const [selectedTopic, setSelectedTopic] = React.useState("tesla");
  const [selectedLanguage, setselectedLanguage] = React.useState("en");
  const { articles, Error, loading } = FetchNews(selectedTopic);
  // HANDLING STATE

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  // FILTERS
  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTopic(e.target.value);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setselectedLanguage(e.target.value);
  };

  const toggleTheme = (isChecked: boolean) => {
    setDarkMode(isChecked);
  };
  // FILTERS

  return (
    <ThemeProvider theme={theme}>
      {Error ? (
        <Typography variant="h4" sx={{ fontStyle: "italic", color: "red" }}>
          {Error}
        </Typography>
      ) : loading ? (
        <Typography
          height="78vh"
          alignItems="center"
          justifyContent="center"
          display="flex"
          flexDirection="column"
        >
          Loading Please Wait...
          <CircularProgress />
        </Typography>
      ) : (
        <div>
          <Header toggleTheme={toggleTheme} />

          <main
            style={{ direction: selectedLanguage === "ar" ? "rtl" : "ltr" }}
          >
            {/* Actions */}
            <Box
              component="div"
              display="flex"
              justifyContent="center"
              color="darkblue"
              sx={{
                bgcolor: "background.paper",
                "& .MuiTextField-root": { m: 5, width: "30rem"},
              }}
            >
              <Typography
                variant="h6"
                display="flex"
                alignItems="center"
                color="darkgrey"
              >
                Filters
              </Typography>
              <TextField
                id="select-topic"
                select
                label="Select Topic"
                onChange={handleTopicChange}
                defaultValue="tesla"
                value={selectedTopic}
              >
                <MenuItem value="tesla">Tesla</MenuItem>
                <MenuItem value="apple">Apple</MenuItem>
                <MenuItem value="netflix">Netflix</MenuItem>
                <MenuItem value="google">Google</MenuItem>
                <MenuItem value="twitter">Twitter</MenuItem>
                <MenuItem value="meta">Meta</MenuItem>
              </TextField>
              <TextField
                id="select-language"
                select
                label="Select Language"
                onChange={handleLanguageChange}
                value={selectedLanguage}
                defaultValue="en"
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="ar">Arabic</MenuItem>
              </TextField>
            </Box>

            {/* actions */}

            <Box
              sx={{
                bgcolor: "background.paper",
                pt: 4,
              }}
            >
              <Container maxWidth="lg" sx={{ pb: 8 }}>
                <Typography
                  component="h3"
                  variant="h3"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  Today's News
                </Typography>
                <Typography
                  variant="h6"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  {articles.length > 0 ? articles[0].title : "Loading..."}
                </Typography>
                <Stack
                  sx={{ pt: 2 }}
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                >
                  <Link to="/news/0">
                    <Button variant="outlined">Read More</Button>
                  </Link>
                </Stack>
              </Container>
            </Box>

            <Box
              sx={{
                bgcolor: "background.paper",
                pt: 4,
              }}
            >
              <Container maxWidth="xl">
                <Grid container spacing={3}>
                  {articles.slice(0, 30).map((article, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <CardMedia
                          component="div"
                          sx={{
                            pt: "56.25%",
                          }}
                          image={article?.urlToImage}
                          
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {article?.title}
                          </Typography>
                          <Typography>{article?.description}</Typography>
                        </CardContent>
                        <CardActions>
                          <Link to={`/news/${index}`} target="_blank">
                            <Button size="large" variant="outlined">
                              Read More
                            </Button>
                          </Link>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </Box>
          </main>

          <Footer />
        </div>
      )}
    </ThemeProvider>
  );
};

export default Home;
