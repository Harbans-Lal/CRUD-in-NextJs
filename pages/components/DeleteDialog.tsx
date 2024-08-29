import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { myContext } from '../_app';
import { useContext } from 'react';
export default function AlertDialog({open, setOpen}) {
    const {deleteid,setAllProduct} = useContext(myContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () =>{
   
    fetch(`http://192.168.2.206:3001/api/products/delete/${deleteid} `,{
        method:'DELETE'
    })
    .then(res => res.json())
    .then(data =>{
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

    handleClose();
  }
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button  onClick={handleDelete}>Agree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}