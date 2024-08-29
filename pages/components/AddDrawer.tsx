import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { myContext} from '../_app';
import { useContext } from 'react';
export default function AddDrawer({open , onclose}) {
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    image: '',
    is_active: false,
  });

const {setAllProduct} = useContext(myContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    fetch('http://192.168.2.206:3001/api/products',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      if(data.success){
        fetch('http://192.168.2.206:3001/api/products/getAllProducts?page=1&per_page=10')
      .then(res => res.json())
      .then(data => {
        setAllProduct(data.data.map((item: any) => ({
          id: item._id, 
          name: item.name,
          description: item.description,
          image: item.image,
          active: item.active
        })));
      })
      .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err))
  };

  const DrawerContent = (
    <Box
      sx={{ width: 400, padding: 2 }}
      role="presentation"
      onClick={()=> console.log("drawer working.............")}
    >
      <Typography variant="h6" gutterBottom>
        Add Form
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          margin="normal"
          name="image"
          label="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.is_active}
              onChange={handleChange}
              name="active"
            />
          }
          label="Active"
        />
        <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={onclose} >
        {DrawerContent}
      </Drawer>
    </div>
  );
}
