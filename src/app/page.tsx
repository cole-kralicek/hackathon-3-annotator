'use client'
import { useState, useEffect, ChangeEvent } from 'react';
import { Container, Button, TextField, Box, Typography } from '@mui/material';
import { auth, currentUser } from "@clerk/nextjs/server";

export default function Home() {
  // const user = await currentUser();
  // console.log(user);

  const { userId } = auth();
  console.log(userId);
  
  // Text to be displayed in center box
  const [textArray, setTextArray] = useState<string[]>([]);
  // Name of file displayed
  const [fileName, setFileName] = useState<string>('');
  // Save highlighted text
  const [highlightedText, setHighlightedText] = useState<string | null>();
  // Highlight mode selection (aka words or partial)
  const [highlightFullWords, setHighlightFullWords] = useState<boolean>(true)


  const handleTextSelect = (index: number) => {
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
      console.log(textArray[index])
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
    <></>
  );
}
