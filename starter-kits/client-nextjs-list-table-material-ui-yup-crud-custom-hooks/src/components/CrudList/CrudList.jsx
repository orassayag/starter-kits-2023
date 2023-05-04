import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  object,
  string,
  number,
} from 'yup';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Pagination,
} from '@mui/material';
import { styled } from '@mui/system';

const CrudListItem = styled(ListItem)`
&& {
  margin-top: 10px;
  background-color: #ffffff;
  width: 50vw;
}`;

const CrudPagination = styled(Pagination)`
&& {
  margin-top: 10px;
}`;

const userSchema = object().shape({
  name: string().required('Name is required'),
  age: number().typeError('Invalid age').required('Age is required'),
  email: string().email('Invalid email address').required('Email is required'),
});

const validateForm = async (values) => {
  const validationErrors = {};
  try {
    await userSchema.validate(values, { abortEarly: false });
  } catch (err) {
    err.inner.forEach((error) => {
      validationErrors[error.path] = error.message;
    });
  }
  return {
    isValid: !Object.keys(validationErrors).length,
    validationErrors,
  };
};

const PAGE_SIZE = 5;

const loadProducts = async (limit, skip) => {
  const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  let { products } = response.data;
  products = products.map((u) => ({ ...u, name: `${u.firstName} ${u.lastName}` }));
  return products;
};

export default function CrudList() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({
    mode: '',
    name: '',
    age: '',
    email: '',
  });
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const users = await loadProducts(100, page * 5);
      setData(users);
    };
    fetchProducts();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const resetForm = () => {
    setFormData({
      mode: '',
      title: '',
      description: '',
      thumbnail: '',
    });
    setErrors({});
  };

  const handleClickForm = (row) => {
    let rowData = row;
    if (rowData) {
      rowData.mode = 'update';
    } else {
      rowData = formData;
      rowData.mode = 'add';
    }
    setSelectedRow(rowData);
    setFormData(rowData);
    setOpenModal(true);
  };

  const handleCancelClick = () => {
    setOpenModal(false);
    setSelectedRow(null);
    resetForm();
  };

  const handleSubmitForm = async () => {
    const { isValid, validationErrors } = await validateForm(formData);
    if (isValid) {
      if (formData.mode === 'add') {
        const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
        setData([...data, { ...formData, id: newId }]);
      } else {
        const updatedData = data.map((d) => (d.id === selectedRow.id ? formData : d));
        setData(updatedData);
      }
      setSelectedRow(null);
      setOpenModal(false);
      resetForm();
    }
    setErrors(validationErrors);
  };

  const handleDeleteClick = (row) => {
    setData(data.filter((d) => d.id !== row.id));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePageChange = (e, value) => {
    setPage(value);
  };

  const sortTable = (array, comparator) => {
    const sortArray = array.map((el, index) => [el, index]);
    sortArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (!order) {
        return a[1] - b[1];
      }
      return order;
    });
    return sortArray.map((el) => el[0]);
  };

  const compareOrder = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const comparatorFormat = (order, orderBy) => (order === 'desc'
    ? (a, b) => compareOrder(a, b, orderBy)
    : (a, b) => -compareOrder(a, b, orderBy));

  const sortedData = sortTable(data, comparatorFormat(order, orderBy))
    .slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const modeDisplay = formData.mode ? formData.mode[0].toUpperCase() + formData.mode.slice(1).toLowerCase() : '';

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Products
      </Typography>
      <List>
        {sortedData.map((product) => (
          <CrudListItem key={product.id} disablePadding>
            <ListItemAvatar>
              <Avatar
                src={product.thumbnail}
              >
                {product.id}

              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={product.title} secondary={`${product.description} ${product.description} ${product.description} ${product.description}`} />
          </CrudListItem>
        ))}
      </List>
      <CrudPagination
        count={Math.ceil(data.length / PAGE_SIZE)}
        page={page}
        onChange={handlePageChange}
      />
    </Box>
  );
}
