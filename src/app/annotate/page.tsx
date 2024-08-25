'use client'
import './page.css'
import { useState, useEffect, ChangeEvent } from 'react';
import { Container, Button, TextField, Box, Typography, Stack, Modal } from '@mui/material';

export default function Home() {
  // Comment data type
  interface Comment {
    range: number[],
    color: string,
    comment: string
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  }

  // Text to be displayed in center box
  const [textArray, setTextArray] = useState<string[]>([]);
  // Name of file displayed
  const [fileName, setFileName] = useState<string>('');
  // Save currrent highlighted words and indices
  const [highlightedText, setHighlightedText] = useState<string | null>();
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  // This contains all indices saved in the entire file
  const [fileHighlights, setFileHighlights] = useState<number[]>([]);
  // Array of all comments in order of arrival
  const [allComments, setAllComments] = useState<Comment[]>([]);
  // Map to connect arrival index to text index for fast retrieval
  const [commentMap, setCommentMap] = useState<Map<number, number>>(new Map());
  // Highlight mode selection (aka words or partial)
  const [highlightFullWords, setHighlightFullWords] = useState<boolean>(true);
  // Open comment dialog box
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  // Comment (text) currently edited in modal
  const [textComment, setTextComment] = useState<string>('')
  const [lastComment, setLastComment] = useState<Comment>({
    range: [-1],
    color: 'transparent',
    comment: ''
  })


  // const handleTextSelect = (index: number) => {
  //   if (!highlightFullWords) {
  //     const selected = window.getSelection()
  //     if (selected && selected.rangeCount > 0) {
  //       console.log(selected.toString())
  //       console.log(selected.getRangeAt(0).endOffset)
  //       setHighlightedText(window.getSelection()?.toString())
  //       const range = selected?.getRangeAt(0).getBoundingClientRect()
  //       console.log(range)
  //     }
  //   }
  //   else {
  //       setHighlightedText(textArray[index])
  //     console.log(textArray[index])
  //   }

  // }

  // Update highlighted "words" for each new index selected
  useEffect(() => {
    const currentSelected: any = []
    selectedIndices.forEach((index) => currentSelected.push(textArray[index]))
    setHighlightedText(currentSelected.join(" "))
  }, [selectedIndices])

  // Print final index list of document for every new comment
  useEffect(() => {
    console.log("All selected indices: ", fileHighlights)
    console.log("All comments ranges: ", allComments)
    console.log("Comment map: ", commentMap)
    console.log("Last comment: ", lastComment)

  }, [fileHighlights, allComments, commentMap, lastComment])

  const handleMouseDown = (index: number) => {
    setIsMouseDown(true);
    if (!selectedIndices.includes(index)) {
      setSelectedIndices([index]); //Begin recording selected indices
    }
  };

  const handleMouseEnter = (index: number) => {
    if (isMouseDown) {
      setSelectedIndices(prev => {
        if (!prev.includes(index)) {
          return [...prev, index]; // Add index to the current selection
        }
        return prev.sort();
      });
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    // Push final (current) selection to the overall file highlights
    selectedIndices.forEach((index) => {
      if (!fileHighlights?.includes(index)) {
        setFileHighlights(prev => {
          return [...prev, index];
        })
      }
    })
    // Open dialog to save comment
    setOpenDialog(true);
    
  };

  const handleSetComment = () => {
    setLastComment({ range: selectedIndices, color: "blue", comment: textComment })
  }

  const updateComments = () => {

    setAllComments(prev => {
      const updatedComments = [...prev, lastComment];
      // Map allcomment index to start index of comment (index represents start of comment index)
      setCommentMap(prevMap => {
        const updatedMap = new Map(prevMap);
        updatedMap.set(lastComment.range[0], updatedComments.length - 1);
        return updatedMap;
      });
      return updatedComments;
    })
    console.log("Last selected word indices:", selectedIndices);
  }

  // Function to convert file upload into array of strings for DB storage
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          // Here I assume the line break is formatted like this for now
          const replacement = result.replaceAll("\r\n\r\n", " \r\n\r\n ");
          const wordsList = replacement.split(' ');
          setTextArray(wordsList);
          console.log(wordsList);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Stack direction={'row'} gap={3}>
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
            width="50vw"
            textAlign="left"
            border={1}
          >
            <Typography className='prevent-select' variant="body1"
              component="p"
              display={"inline"}
              sx={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                width: '100%',
                margin: 0
              }}>
              {textArray.map((word, index) => (
                <span key={index}
                  onMouseDown={() => handleMouseDown(index)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseUp={handleMouseUp}
                  style={{
                    backgroundColor: selectedIndices.includes(index) || fileHighlights.includes(index) ? 'yellow' : 'transparent',
                    cursor: 'pointer',
                    padding: '0 2px',
                  }}>
                  {word.includes("\n") ? word : word + " "}
                </span>
              ))}
            </Typography>
          </Box>
        </Box>
        <Typography>Word selected: {highlightedText}</Typography>
        <Modal
          open={openDialog}
          //onClose={}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Item
            </Typography>
            <Stack width="100%" direction={'row'} spacing={2}>
              <TextField
                id="outlined-basic"
                label="Item"
                variant="outlined"
                fullWidth
                value={textComment}
                onChange={(e) => setTextComment(e.target.value)}
              />
              <Button
                variant="outlined"
                onClick={() => {
                  handleSetComment()
                  updateComments()
                  setTextComment('')
                  setOpenDialog(false)
                }}
              >
                Add
              </Button>
            </Stack>
          </Box>
        </Modal>
      </Stack>
    </Container>
  );
}
