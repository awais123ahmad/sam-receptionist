import {
  Button,
  Dialog,
  Typography,
  withStyles,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { createWarehouse, updateWarehouse } from "../../../Api/Reducers/StockReducers/warehouse";

function AddWarehouse({
  setOpen,
  open,
  currentId,
  setCurrentId,
  editCancel,
  setEditCancel,
}) {
  const location = useLocation();
  const [warehouseData, setWarehouseData] = useState({ warehouseName: '', area: '', address: '', city: '', user: '6363127276dc5304e890c6e8', status: 1 })
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const warehouse = useSelector((state) =>
    currentId
      ? state.warehouse.data.find((c) => c._id === currentId)
      : null
  );
  // const [openSnackbar, closeSnackbar] = useSnackbar();

  useEffect(() => {
    if (warehouse) {
      setWarehouseData(warehouse);
    } else {
      if (editCancel) {
        setWarehouseData({ warehouseName: "", status: 1 });
      }
    }
  }, [warehouse]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  useEffect(() => {
    var check = user?.result?._id;
    if (check !== undefined) {
      setWarehouseData({ ...warehouseData, userId: [check] });
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(warehouseData?.warehouseName?.length > 0){
        if (currentId) {
            dispatch(updateWarehouse(currentId, warehouseData))
        } else {
            dispatch(createWarehouse(warehouseData))
        }
        clear();
        handleClose();
    } else{
        // openSnackbar('Please fill the field')
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clear = () => {
    // setCurrentId(null);
    setWarehouseData({ warehouseName: "", status: 1 });
  };

  const inputStyle = {
    display: "block",
    padding: "1.0rem 0.75rem",
    width: "100%",
    fontSize: "0.8rem",
    lineHeight: "1.25",
    color: "#343434",
    backgroundColor: "#efefef",
    backgroundImage: "none",
    backgroundClip: "padding-box",
    border: "1px solid #efefef",
    borderRadius: "8px",
    transition: "all 0.25s cubic-bezier(0.4, 0, 1, 1)",
  };

  return (
    <div>
      <form>
        <Dialog
          onClose={handleClose}
          open={open}
          PaperProps={{ style: { borderRadius: 20 } }}
          fullWidth
          style={{ 
            zIndex:'999999'
          }}
        >
          <h1  
            style={{
              fontWeight: "700",
              textTransform: "uppercase",
              padding: "20px",
              color: "black",
              textAlign: "center",
              background: "#fff",
            }}
          >
            {currentId ? "Edit Warehouse" : "Add Warehouse"}
          </h1>
          <DialogContent style={{ borderTop: "1px solid black" }}>
            <div
              className="customInputs"
              style={{
                paddingLeft: "40px",
                paddingRight: "40px",
                marginTop: "1rem",
              }}
            >
              <h1
                style={{
                  color: "black",
                  paddingRight: "3px",
                  fontWeight: "600",
                  marginTop:18,
                  fontSize:'14px'
                }}
                
              >
                Warehouse Name
              </h1>
              <input
                placeholder="Warehouse Name"
                style={inputStyle}
                name="warehouseName"
                type="text"
                onChange={(e) =>
                  setWarehouseData({
                    ...warehouseData,
                    warehouseName: e.target.value,
                  })
                }
                value={warehouseData.warehouseName}
              />
              <h1
                
                style={{
                  color: "black",
                  paddingRight: "3px",
                  fontWeight: "600",
                  marginTop:18,
                  fontSize:'14px'
                }}
                
              >
                Area
              </h1>
              <input
                placeholder="Area"
                style={inputStyle}
                name="area"
                type="text"
                onChange={(e) => setWarehouseData({ ...warehouseData, area: e.target.value })}
                value={warehouseData.area}
              />
              <h1
                
                style={{
                  color: "black",
                  paddingRight: "3px",
                  fontWeight: "600",
                  marginTop:18,
                  fontSize:'14px'
                }}
                
              >
                Address
              </h1>
              <input
                placeholder="Address"
                style={inputStyle}
                name="address"
                type="text"
                onChange={(e) => setWarehouseData({ ...warehouseData, address: e.target.value })}
                value={warehouseData.address}
              />
              <h1
                
                style={{
                  color: "black",
                  paddingRight: "3px",
                  fontWeight: "600",
                  marginTop:18,
                  fontSize:'14px'
                }}
                 
              >
                City
              </h1>
              <input
                placeholder="City"
                style={inputStyle}
                name="city"
                type="text"
                onChange={(e) => setWarehouseData({ ...warehouseData, city: e.target.value })}
                value={warehouseData.city}
              />
            </div>
          </DialogContent>
          <DialogActions
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              style={{
                margin: "15px",
                alignItems: "center",
                background: "#007de3",
                color: "#fff",
                borderRadius: "6px",
                
                height: "40px",
                fontWeight: "800",
              }}
            >
              Save Warehouse
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}

export default AddWarehouse;
