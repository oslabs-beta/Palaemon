// import { useState } from 'react';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { JsxElement } from 'typescript';

// export default function BasicSelect() {
//   const [type, setType] = useState('');

//   const handleChange = (event: SelectChangeEvent) => {
//     setType(event.target.value as string);
//   };

//   return (
//     <Box sx={{ minWidth: 120 }}>
//       <FormControl fullWidth>
//         <InputLabel id="log-type-select-label">log type</InputLabel>
//         <Select
//           labelId="log-type-select-label"
//           id="log-type-select"
//           value={type}
//           label="log type"
//           onChange={handleChange}
//         >
//           <MenuItem value={'events'}>Events</MenuItem>
//           <MenuItem value={'alerts'}>Alerts</MenuItem>
//         </Select>
//       </FormControl>
//     </Box>
//   );
// }
