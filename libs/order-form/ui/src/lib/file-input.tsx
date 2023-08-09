import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { TextFieldVariants } from '@mui/material/TextField';
import { useRef } from 'react';

export function FileInput(p: {
  label?: string;
  varient?: TextFieldVariants;
  onChange: (file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const loadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log({ file });
    p.onChange(file);
  };

  return (
    <TextField
      type="file"
      inputRef={inputRef}
      label={p.label}
      variant={p.varient}
      onChange={loadFile}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Button
              variant="outlined"
              size="small"
              onClick={(e) =>
                inputRef.current?.dispatchEvent(
                  new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                    buttons: 1,
                  })
                )
              }
            >
              Choose File
            </Button>
          </InputAdornment>
        ),
      }}
      sx={{
        '& input::file-selector-button': {
          display: 'none',
        },
      }}
    />
  );
}
