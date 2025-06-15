import React from 'react'
import {
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material'
import {
  Palette as PaletteIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Circle as CircleIcon
} from '@mui/icons-material'
import { useTheme } from '../contexts/ThemeContext'

const colors = [
  { name: 'Синяя', value: 'blue', color: '#1976d2' },
  { name: 'Зелёная', value: 'green', color: '#2e7d32' },
  { name: 'Фиолетовая', value: 'purple', color: '#7b1fa2' },
  { name: 'Оранжевая', value: 'orange', color: '#f57c00' },
  { name: 'Красная', value: 'red', color: '#d32f2f' }
]

export default function ThemeSelector() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const { mode, color, setColor, toggleMode } = useTheme()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleColorSelect = (colorName: string) => {
    setColor(colorName as any)
    handleClose()
  }

  return (
    <>
      <Tooltip title="Тема">
        <IconButton
          onClick={handleClick}
          color="inherit"
          sx={{ ml: 1 }}
        >
          <PaletteIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 200,
            maxWidth: '100%'
          }
        }}
      >
        <MenuItem onClick={toggleMode}>
          <ListItemIcon>
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </ListItemIcon>
          <ListItemText>
            {mode === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
          </ListItemText>
        </MenuItem>
        <Divider />
        {colors.map((colorOption) => (
          <MenuItem
            key={colorOption.value}
            onClick={() => handleColorSelect(colorOption.value)}
            selected={color === colorOption.value}
          >
            <ListItemIcon>
              <CircleIcon sx={{ color: colorOption.color }} />
            </ListItemIcon>
            <ListItemText>
              {colorOption.name}
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
} 