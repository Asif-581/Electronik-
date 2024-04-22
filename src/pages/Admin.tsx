import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close"; // Import the Close icon

import AddProduct from "../components/AddProduct";

import AdminTable from "./../components/AdminTable"


const Admin = () => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div
        className="mr-8 ml-8 mb-3"
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          variant="outlined"
          onClick={() => handleClickOpen("paper")}
          disableRipple
          size="small"
        >
          Add products
        </Button>
      </div>

      <Dialog open={open} scroll={scroll}>
        <DialogTitle>
          Add Products
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <AddProduct setOpen={setOpen} />
        </DialogContent>
      </Dialog>
      {/* <ProductsTable /> */}
      <div>
        <AdminTable />
      </div>
    </React.Fragment>
  );
};

export default Admin;
