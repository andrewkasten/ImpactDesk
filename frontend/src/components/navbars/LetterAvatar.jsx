import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material'
import {colors} from "../../../theme"

export default function LetterAvatar(letter) {
 const theme = useTheme();
  const color = colors(theme.palette.mode);
  
  return (
      <Avatar sx={{ bgcolor: `${color.secondary[500]}` }}>{letter.letter}</Avatar>
  )
}
