import React from 'react'
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Paper,
  Box
} from '@mui/material'
import type { Question } from '../../types'

interface TestQuestionProps {
  question: Question
  value: number
  onChange: (value: number) => void
}

export default function TestQuestion({ question, value, onChange }: TestQuestionProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value)
    if (!isNaN(newValue)) {
      onChange(newValue)
    }
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        bgcolor: 'background.default',
        transition: 'all 0.3s ease',
        '&:hover': {
          bgcolor: 'action.hover'
        }
      }}
    >
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend">
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2,
              color: 'text.primary',
              fontWeight: 500
            }}
          >
            {question.text}
          </Typography>
        </FormLabel>
        <RadioGroup
          value={value === -1 ? '' : value.toString()}
          onChange={handleChange}
        >
          {question.options.map((option, index) => (
            <Box
              key={index}
              sx={{
                mb: 1,
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateX(4px)'
                }
              }}
            >
              <FormControlLabel
                value={index.toString()}
                control={
                  <Radio 
                    sx={{
                      '&.Mui-checked': {
                        color: 'primary.main'
                      }
                    }}
                  />
                }
                label={
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.primary',
                      fontWeight: value === index ? 500 : 400
                    }}
                  >
                    {option}
                  </Typography>
                }
                sx={{
                  m: 0,
                  p: 1,
                  borderRadius: 1,
                  bgcolor: value === index ? 'action.selected' : 'transparent',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              />
            </Box>
          ))}
        </RadioGroup>
      </FormControl>
    </Paper>
  )
} 