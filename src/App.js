import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";

function App() {
  const webcamRef = useRef(null);
  const [ocrResult, setOcrResult] = useState([]);
  const [snackBarOpen, setsnackBarOpen] = useState(false);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const {
      data: { text },
    } = await Tesseract.recognize(imageSrc, "eng");
    setOcrResult([...ocrResult, text]);
  };
  const copyCode = (code) => {
    navigator.clipboard.writeText(code); // Copiar el texto al portapapeles
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setsnackBarOpen(false);
  };
  return (
    <div className="App">
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          marginTop: "10px",
        }}
      >
        <Box
          sx={{
            bgcolor: "#f5f6f7",
            height: "100vh",
          }}
        >
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              style={{
                marginTop: "12px",
                width: "80%",
                maxWidth: "250px",
                borderRadius: "160px", // Esto redondeará los bordes del componente
              }}
            />
            <Button variant="contained" onClick={capture}>
              Leer
            </Button>
          </Stack>
          {ocrResult && (
            <List sx={{ marginLeft: 10, marginRight: 10, marginTop: 4 }}>
              {ocrResult.map((item, index) => {
                return (
                  <>
                    <ListItem
                      key={`code_${index}`}
                      secondaryAction={
                        <>
                          <IconButton
                            edge="end"
                            aria-label="copy"
                            onClick={() => {
                              copyCode(item);
                              setsnackBarOpen(true);
                            }}
                          >
                            <ContentCopyIcon />
                          </IconButton>
                        </>
                      }
                    >
                      <ListItemText primary={item} />
                    </ListItem>
                    <Divider />
                  </>
                );
              })}
            </List>
          )}
          <Snackbar
            open={snackBarOpen}
            onClose={handleClose}
            autoHideDuration={800}
            message="Copiado!"
          />
        </Box>
      </Container>
    </div>
  );
}

export default App;
