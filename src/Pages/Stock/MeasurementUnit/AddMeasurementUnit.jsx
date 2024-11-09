import { Button, Dialog } from "@mui/material";
// import { Close } from '@material-ui/icons'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function AddMeasurementUnit({ setOpen, open, currentId }) {
  const handleClose = () => {
    setOpen(false);
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
          style={{ zIndex: "999999" }}
          fullWidth
        >
          <p
            onClose={handleClose}
            style={{
              padding: "1.5rem 0",
              fontWeight: "700",
              textTransform: "uppercase",
              paddingLeft: "20px",
              color: "black",
              textAlign: "center",
              background: "#fff",
            }}
          >
            {currentId ? "Edit Measurement" : "Add Measurement"}
          </p>
          <div
            
            style={{
              paddingLeft: "40px",
              paddingRight: "40px",
              marginTop: "1rem",
            }}
          >
            <h1
             
              style={{ color: "black", paddingRight: "3px", fontWeight: "700" }}
              gutterBottom
            >
              Unit Name
            </h1>
            <input
              placeholder="Unit Name"
              style={inputStyle}
              name="unit_name"
              type="text"
              // onChange={(e) => setUnitData({ ...unitData, unit_name: e.target.value })}
              // value={unitData.unit_name}
            />

            <h1
              variant="overline"
              style={{ color: "black", paddingRight: "3px", fontWeight: "700" , marginTop:10}}
              gutterBottom
            >
              Prefix
            </h1>
            <input
              placeholder="Prefix"
              style={inputStyle}
              name="prefix"
              type="text"
              // onChange={(e) => setUnitData({ ...unitData, prefix: e.target.value })}
              // value={unitData.prefix}
            />
          </div>
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              marginTop: "2rem",
            }}
          >
            <Button
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
              Save Measurement
            </Button>
          </div>
        </Dialog>
      </form>
    </div>
  );
}

export default AddMeasurementUnit;
