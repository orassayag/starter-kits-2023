import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  object,
  string,
  number,
} from 'yup';

const columns = [
  { id: 'name', label: 'Name' },
  { id: 'age', label: 'Age' },
  { id: 'email', label: 'Email' },
  { id: 'actions', label: 'Actions' },
];

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

const loadUsers = async (limit, skip) => {
  const response = await axios.get(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
  let { users } = response.data;
  users = users.map((u) => ({ ...u, name: `${u.firstName} ${u.lastName}` }));
  return users;
};

const useHandlers = () => {
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
    const fetchUsers = async () => {
      const users = await loadUsers(100, page * 5);
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
      name: '',
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
    setTimeout(() => {
      setSelectedRow(null);
      resetForm();
    }, 100);
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
      handleCancelClick();
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

  return {
    PAGE_SIZE,
    columns,
    openModal,
    formData,
    orderBy,
    order,
    page,
    errors,
    data,
    sortedData,
    modeDisplay,
    handleRequestSort,
    handleClickForm,
    handleCancelClick,
    handleSubmitForm,
    handleDeleteClick,
    handleChange,
    handlePageChange,
  };
};

export default useHandlers;