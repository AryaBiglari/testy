import * as React from "react";
import {
  Autocomplete,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    width: "100%",
    maxWidth: "80rem",
    minWidth: "50rem",
    height: "auto",
    maxHeight: "90vh",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    overflowY: "auto",
    overflowX: "hidden",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function SupplierDialog(props) {
  const [suppliers, setSuppliers] = React.useState([]);
  const [editingSupplier, setEditingSupplier] = React.useState(null);
  const [newSupplier, setNewSupplier] = React.useState(false);

  const [supplier, setSupplier] = React.useState("");
  const [supplierURL, setSupplierURL] = React.useState("");
  const [supplierEmail, setSupplierEmail] = React.useState("");
  const [supplierPhone, setSupplierPhone] = React.useState("");
  const [supplierNotes, setSupplierNotes] = React.useState("");

  const handleChangeSupplier = (event, value) => {
    console.log(props.uniqueSuppliersArray);
    setSupplier(value);
    const selectedSupplier = props.uniqueSuppliersArray.find(
      (s) => s.name === value
    );
    if (selectedSupplier) {
      setSupplierURL(selectedSupplier.url);
      setSupplierEmail(selectedSupplier.email);
      setSupplierPhone(selectedSupplier.phone);
      setSupplierNotes(selectedSupplier.notes || "");
    }
  };

  const handleChangeSupplierURL = (event) => {
    setSupplierURL(event.target.value);
  };

  const handleChangeSupplierEmail = (event) => {
    setSupplierEmail(event.target.value);
  };

  const handleChangeSupplierPhone = (event) => {
    setSupplierPhone(event.target.value);
  };

  const handleChangeSupplierNotes = (event) => {
    setSupplierNotes(event.target.value);
  };

  const handleDone = async () => {
    setEditingSupplier(null);
    setSupplier("");
    setSupplierURL("");
    setSupplierEmail("");
    setSupplierPhone("");
    setSupplierNotes("");
    await props.handleUpdateSupplier(props.row, suppliers);
    setSuppliers([]);
    props.handleCloseSupplierView(props.row._id);
  };

  const handleAddSupplier = () => {
    setNewSupplier(true);
    setEditingSupplier(null);
    setSupplier("");
    setSupplierURL("");
    setSupplierEmail("");
    setSupplierPhone("");
    setSupplierNotes("");
  };

  const handleEditSupplier = (supplier) => {
    setEditingSupplier(supplier.id);
    setNewSupplier(false);
    setSupplier(supplier.name);
    setSupplierURL(supplier.url);
    setSupplierEmail(supplier.email);
    setSupplierPhone(supplier.phone);
    setSupplierNotes(supplier.notes);
  };

  const handleSaveSupplier = () => {
    if (newSupplier) {
      setSuppliers([
        ...suppliers,
        {
          id: suppliers.length + 1,
          name: supplier,
          url: supplierURL,
          email: supplierEmail,
          phone: supplierPhone,
          notes: supplierNotes,
        },
      ]);
    } else {
      setSuppliers(
        suppliers.map((s) =>
          s.id === editingSupplier
            ? {
                ...s,
                name: supplier,
                url: supplierURL,
                email: supplierEmail,
                phone: supplierPhone,
                notes: supplierNotes,
              }
            : s
        )
      );
    }
    setNewSupplier(false);
    setEditingSupplier(null);
    setSupplier("");
    setSupplierURL("");
    setSupplierEmail("");
    setSupplierPhone("");
    setSupplierNotes("");
  };

  const handleCancel = () => {
    setNewSupplier(false);
    setEditingSupplier(null);
    setSupplier("");
    setSupplierURL("");
    setSupplierEmail("");
    setSupplierPhone("");
    setSupplierNotes("");
  };

  const handleDeleteSupplier = (id) => {
    setSuppliers(suppliers.filter((s) => s.id !== id));
  };

  React.useEffect(() => {
    setSuppliers(props?.row?.suppliers || []);
  }, [props.currentID, props.row]);

  if (props.mode === "view" && suppliers.length < 1) {
    return (
      <BootstrapDialog
        onClose={props.handleCloseSupplierView}
        aria-labelledby="customized-dialog-title"
        open={props.openSupplierView}
      >
        <DialogTitle sx={{ ml: 1, p: 2 }} id="customized-dialog-title">
          Suppliers List
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={props.handleCloseSupplierView}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography>No current suppliers.</Typography>
        </DialogContent>
      </BootstrapDialog>
    );
  }

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={props.handleCloseSupplierView}
        aria-labelledby="customized-dialog-title"
        open={props.openSupplierView}
      >
        <DialogTitle sx={{ ml: 1, p: 2 }} id="customized-dialog-title">
          Suppliers List
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={props.handleCloseSupplierView}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Supplier</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Notes</TableCell>
                  {props.mode === "edit" && <TableCell>Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {suppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell>
                      <Typography
                        onClick={() => window.open(`${supplier.url}`)}
                        sx={{
                          color: "var(--primary)",
                          fontSize: "0.9rem",
                          textDecoration: "underline",
                        }}
                      >
                        {supplier.name}
                      </Typography>
                    </TableCell>
                    <TableCell>{supplier.email}</TableCell>
                    <TableCell>{supplier.phone}</TableCell>
                    <TableCell>{supplier.notes}</TableCell>
                    {props.mode === "edit" && (
                      <TableCell>
                        <IconButton
                          onClick={() => handleEditSupplier(supplier)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteSupplier(supplier.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {(newSupplier || editingSupplier !== null) && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 3,
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "80%",
                }}
              >
                <Autocomplete
                  freeSolo
                  options={props.uniqueSuppliersArray.map((s) => s.name)}
                  getOptionLabel={(option) => option}
                  onInputChange={handleChangeSupplier}
                  sx={{
                    mr: 1.3,
                    flex: 1,
                  }}
                  ListboxProps={{
                    style: {
                      maxHeight: 150, // Approximately 4 items with some padding
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{}}
                      size="small"
                      fullWidth
                      label="Supplier"
                      variant="outlined"
                      value={supplier}
                    />
                  )}
                />
                <TextField
                  sx={{
                    mb: 1.3,
                    flex: 1,
                  }}
                  size="small"
                  fullWidth
                  label="Supplier URL"
                  variant="outlined"
                  value={supplierURL}
                  onChange={handleChangeSupplierURL}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "80%",
                }}
              >
                <TextField
                  sx={{ mr: 1.3 }}
                  size="small"
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={supplierEmail}
                  onChange={handleChangeSupplierEmail}
                />
                <TextField
                  sx={{ mb: 1.3 }}
                  size="small"
                  fullWidth
                  label="Phone"
                  variant="outlined"
                  value={supplierPhone}
                  onChange={handleChangeSupplierPhone}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "80%",
                }}
              >
                <TextField
                  sx={{ mb: 1.3 }}
                  size="large"
                  fullWidth
                  label="Notes"
                  variant="outlined"
                  value={supplierNotes}
                  onChange={handleChangeSupplierNotes}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleCancel}
                  sx={{ mr: "1rem" }}
                >
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleSaveSupplier}>
                  Save
                </Button>
              </Box>
            </Box>
          )}

          {!newSupplier &&
            editingSupplier === null &&
            props.mode === "edit" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 3,
                  mb: 2,
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleAddSupplier}
                  sx={{ mr: "1rem" }}
                >
                  Add a Supplier
                </Button>
                <Button variant="contained" onClick={handleDone}>
                  Done
                </Button>
              </Box>
            )}
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
