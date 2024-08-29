"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SearchAppBar from './components/NavbarWithSearch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditDrawer from './components/EditDrawer';
// Define the columns

import AlertDialog from './components/DeleteDialog';

import {useDispatch, useSelector} from 'react-redux'
import { getOneProduct, getProduct, createProduct, updateProduct, deleteProduct } from './api/product';
import {addProduct, removeProduct,updateProductByid , setProduct} from './redux/slices/entitiesSlice'


import  {myContext}  from './_app';
import { useContext } from 'react';

export default function DataGridDemo() {
 
  const [editDrawer, setEditDrawer] = React.useState<boolean>(false)

  const [toggle, setToggle] = React.useState(false);
  const {setEditData,setDeleteId, allProduct,setAllProduct, setUpdateId} = useContext(myContext);
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'description', headerName: 'Description', width: 250, editable: true },
    { field: 'image', headerName: 'Image', width: 120, renderCell: (params) => (
        <img src={params.value} alt="thumbnail" style={{ width: '100%', height: 'auto' }} />
      ),
    },
    { field: 'active', headerName: 'Active', type: 'boolean', width: 120, editable: true },
    { 
      field: 'action', 
      headerName: 'Action', 
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton 
            color="primary" 
            onClick={(e) => {
              setEditDrawer(true)
              
              let id =params.row.id;
              setUpdateId(id);
              fetch(`http://192.168.2.206:3001/api/products/getProduct/${id}`)
              .then(res => res.json())
              .then(data =>setEditData(data))
              .catch(err => console.log(err))
              setToggle(true)
              
            }}
            size="small"
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton 
            color="error" 
            onClick={()=>{
              setConfirmDelete(true)
              setDeleteId(params.row.id)
            }}
            size="small"
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Box>
      ),
    },
  ];



  React.useEffect(() => {
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

      console.log("data is fetching..............")
  },[]);

  const handleClose=()=>{
    setEditDrawer(false)
  }



  
  return (
    <>
      <SearchAppBar />
      {toggle && <EditDrawer open={editDrawer} onclose={handleClose}/>}
      <AlertDialog open={confirmDelete} setOpen={setConfirmDelete} />
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={allProduct}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}
