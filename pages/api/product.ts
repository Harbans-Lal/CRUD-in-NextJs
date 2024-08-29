import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.2.206:3001/api/products', 
});

export const getProduct = async () => {
  const response = await instance.get('/getAllProducts?page=1&per_page=10');
  return response.data;
};

export const getOneProduct = async (id:string) => {
  const response = await instance.get('/${id}');
  return response.data;
};


export const createProduct = async (newEntity:string) => {
  const response = await instance.post('', newEntity);
  return response.data;
};

export const updateProduct = async (id:string, updatedEntity:string) => {
  const response = await instance.put(`/update/${id}`, updatedEntity);
  return response.data;
};

export const deleteProduct = async (id:string) => {
  const response = await instance.delete(`/delete/${id}`);
  return response.data;
};