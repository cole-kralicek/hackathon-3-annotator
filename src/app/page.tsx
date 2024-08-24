'use client'
import { useState, ChangeEvent } from 'react';
import { Container, Button, TextField, Box } from '@mui/material';

export default function Home() {
  const [text, setText] = useState<string>('');

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setText(result);
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
            onChange={handleFileUpload}
          />
        </Button>
        <TextField
          value={text}
          multiline
          rows={20}
          variant="outlined"
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>
    </Container>
  );
}
