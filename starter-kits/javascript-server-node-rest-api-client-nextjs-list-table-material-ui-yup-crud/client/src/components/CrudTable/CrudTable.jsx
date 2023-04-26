import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  object,
  string,
  number,
} from 'yup';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Pagination,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { styled } from '@mui/system';
import styles from './CrudTable.module.scss';

const CrudTableContainer = styled(TableContainer)`
&& {
  background-color: #ffffff;
  .MuiTableCell-head, .MuiTableSortLabel-root {
    background-color: #000000;
    color: #ffffff;
  }
  .Mui-active .MuiTableSortLabel-icon {
    color: #ffffff;
  }
}`;

const CrudPagination = styled(Pagination)`
&& {
  margin-top: 10px;
}`;

const columns = [
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'age', label: 'Age' },
  { id: 'email', label: 'Email' },
  { id: 'actions', label: 'Actions' },
];

const userSchema = object().shape({
  firstName: string().min(2).max(100)
    .required('First name is required'),
  lastName: string().min(2).max(100)
    .required('Last name is required'),
  age: number().min(18).max(120).typeError('Invalid age')
    .required('Age is required'),
  email: string().email('Invalid email address')
    .required('Email is required'),
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

export default function CrudTable() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({
    mode: '',
    firstName: '',
    lastName: '',
    age: '',
    email: '',
  });
  const [orderBy, setOrderBy] = useState('firstName');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [errors, setErrors] = useState({});
  const baseUrl = 'http://localhost:8081/api/users';

  const loadUsers = async (size) => {
    const response = await axios.get(`${baseUrl}?pageNumber=${page}&pageSize=${size}&sortBy=firstName&sortOrder=asc`);
    return response.data;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await loadUsers(100);
      setData(users);
    };
    fetchUsers();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const resetForm = () => {
    setFormData({
      mode: '',
      firstName: '',
      lastName: '',
      age: '',
      email: '',
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

  const clearRequest = (user) => {
    const updatedUser = { ...user };
    ['mode', 'id'].forEach((key) => {
      delete updatedUser[key];
    });
    return updatedUser;
  };

  const handleSubmitForm = async () => {
    const { isValid, validationErrors } = await validateForm(formData);
    if (isValid) {
      const updatedUser = clearRequest(formData);
      if (formData.mode === 'add') {
        await axios.post(baseUrl, updatedUser);
        const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
        setData([...data, { ...formData, id: newId }]);
      } else {
        await axios.put(`${baseUrl}/${selectedRow.id}`, updatedUser);
        const updatedData = data.map((d) => (d.id === selectedRow.id ? formData : d));
        setData(updatedData);
      }
      setSelectedRow(null);
      setOpenModal(false);
      resetForm();
    }
    setErrors(validationErrors);
  };

  const handleDeleteClick = async (row) => {
    await axios.delete(`${baseUrl}/${row.id}`);
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
    <>
      <div className={styles.button_container}>
        <Button variant="contained" onClick={() => handleClickForm(null)}>Add Row</Button>
      </div>
      <CrudTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                if (column.id === 'actions') {
                  return (
                    <TableCell key={column.id}>
                      {column.label}
                    </TableCell>
                  );
                }
                return (
                  <TableCell key={column.id} sortDirection={orderBy === column.id ? order : false}>
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={(e) => handleRequestSort(e, column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleClickForm(row)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(row)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CrudTableContainer>
      <CrudPagination
        count={Math.ceil(data.length / PAGE_SIZE)}
        page={page}
        onChange={handlePageChange}
      />
      <Dialog open={openModal} onClose={handleCancelClick}>
        <DialogTitle>{`${modeDisplay} Row`}</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter the details below:</DialogContentText>
          <TextField
            error={errors.firstName}
            autoFocus
            margin="dense"
            name="firstName"
            label="First Name"
            type="text"
            fullWidth
            value={formData.firstName}
            onChange={handleChange}
            helperText={errors.firstName}
          />
          <TextField
            error={errors.lastName}
            autoFocus
            margin="dense"
            name="lastName"
            label="Last Name"
            type="text"
            fullWidth
            value={formData.lastName}
            onChange={handleChange}
            helperText={errors.lastName}
          />
          <TextField
            error={errors.age}
            margin="dense"
            name="age"
            label="Age"
            type="number"
            fullWidth
            value={formData.age}
            onChange={handleChange}
            helperText={errors.age}
          />
          <TextField
            error={errors.email}
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            helperText={errors.email}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitForm}
          >
            {modeDisplay}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
