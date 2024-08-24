'use client'
import { useState, useEffect, ChangeEvent } from 'react';
import { Container, Button, TextField, Box, Typography } from '@mui/material';

export default function Home() {
  // Text to be displayed in center box
  const [textArray, setTextArray] = useState<string[]>([]);
  // Name of file displayed
  const [fileName, setFileName] = useState<string>('');
  // Save highlighted text
  const [highlightedText, setHighlightedText] = useState<string | null>();
  // Highlight mode selection (aka words or partial)
  const [highlightFullWords, setHighlightFullWords] = useState<boolean>(false)

  useEffect(() => {
    console.log("A")
  }, [])

  const handleTextSelect = () => {
    if (!highlightFullWords) {
      const selected = window.getSelection()
      if (selected && selected.rangeCount > 0) {
        console.log(selected.toString())
        console.log(selected.getRangeAt(0).endOffset)
        setHighlightedText(window.getSelection()?.toString())
        const range = selected?.getRangeAt(0).getBoundingClientRect()
        console.log(range)
      }
    }
    else {
      
    }

  }

  // Function to convert file upload into array of strings for DB storage
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          const wordsList = result.split(' ');
          setTextArray(wordsList);
          console.log(wordsList);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{ marginBottom: 2 }}
        >
          Upload File
          <input
            type="file"
            hidden
            onChange={e => {
              // Set file name and display in center box
              const file: string = e.target.value;
              setFileName(file.slice(-(file.lastIndexOf("\\") - 1)));
              handleFileUpload(e);
            }}
          />
        </Button>
        <Typography>{fileName != '' ? "File displayed: " + fileName : ""}</Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="top"
          height="90vh"
          textAlign="left"
          border={1}

        >
          <Typography variant="body1" component="p" onMouseUp={handleTextSelect}>
            {textArray.join(' ')}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
