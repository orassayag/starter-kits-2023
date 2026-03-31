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
import useTableHandlers from './useTableHandlers.hook';
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

export default function CrudTable() {
  const {
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
  } = useTableHandlers();

  return (
    <>
      <div className={styles.button_container}>
        <Button
          variant="contained"
          onClick={handleClickForm}
        >
          Add Row
        </Button>
      </div>
      <CrudTableContainer
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                if (column.id === 'actions') {
                  return (
                    <TableCell
                      key={column.id}
                    >
                      {column.label}
                    </TableCell>
                  );
                }
                return (
                  <TableCell
                    key={column.id}
                    sortDirection={orderBy === column.id ? order : false}
                  >
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
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleClickForm(row)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteClick(row)}
                  >
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
      <Dialog
        open={openModal}
        onClose={handleCancelClick}
      >
        <DialogTitle>{`${modeDisplay} Row`}</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter the details below:</DialogContentText>
          <TextField
            error={errors.name}
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            helperText={errors.name}
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
