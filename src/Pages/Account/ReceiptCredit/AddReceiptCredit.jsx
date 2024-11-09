import {
  Button,
  Dialog,
  Typography,
  withStyles,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
// import { Close } from '@material-ui/icons'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addCreditApi } from "../../../Api/Reducers/AccountReducers/credit";

// import { useSnackbar } from 'react-simple-snackbar'

const customers = [
  { _id: 1, customer_name: "Almeer" },
  { _id: 2, customer_name: "Shabir" },
];

const accounts = [
  { _id: 1, account_name: "Mezan Bank" },
  { _id: 2, account_name: "Cash" },
];

function AddReceiptCredit({
  setOpen,
  open,
  currentId,
  setCurrentId,
  editCancel,
  setEditCancel,
}) {
  const location = useLocation();
  const [reciptData, setReciptData] = useState({
    customer: "",
    account: "",
    mode: "",
    amount: "",
    date: new Date().toISOString(),
    note: "",
    status: 1,
  });
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const reciptCredit = useSelector((state) =>
    currentId
      ? state?.reciptCredit?.reciptCredits.find((c) => c._id === currentId)
      : null
  );
  const paymentModes = ["CASH", "BANK", "CHEQUE", "CARD", "OTHER"];

  const [date, setDate] = useState();
  //   const [openSnackbar, closeSnackbar] = useSnackbar()

  //   useEffect(() => {
  //     if (reciptCredit) {
  //       setReciptData(reciptCredit)
  //     } else {
  //       if (editCancel) {
  //         setReciptData({ customer: '', account: '', mode: '', amount: 0, date: new Date().toISOString(), note: '', status: 1 })
  //       }
  //     }
  //   }, [reciptCredit])

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  //   useEffect(() => {
  //     var check = user?.result?._id;
  //     if (check !== undefined) {
  //       setReciptData({ ...reciptCredit, creator: [check] });
  //     }
  //   }, [location]);

  //   useEffect(() => {
  //     setReciptData({ ...reciptData, date: date });
  //   }, [date]);

  //   const handleDateChange = (newDate) => {
  //     setDate(newDate);
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      //   dispatch(updateReceiptCredit(currentId, reciptData, openSnackbar))
    } else {
      dispatch(addCreditApi(reciptData));
    }
    clear();
    handleClose();
  };

  const clear = () => {
    setCurrentId(null);
    setReciptData({
      customer: "",
      account: "",
      mode: "",
      amount: 0,
      date: "",
      note: "",
      status: 1,
    });
  };

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
          PaperProps={{ style: { borderRadius: 20, width: "100%" } }}
          style={{ zIndex: "999999" }}
          maxWidth="md"
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
            {currentId ? "Edit Receipt Credit" : "Add Receipt Credit"}
          </p>
          <div style={{ borderTop: "1px solid black", padding: "1rem 2rem" }}>
            <div
              className="customInputs"
              style={{ paddingLeft: "40px", paddingRight: "40px" }}
            >
              <Container>
                <p
                  style={{
                    color: "black",
                    paddingLeft: "5px",
                    fontWeight: "600",
                    fontSize: ".9rem",
                  }}
                >
                  Select Customer
                </p>
                <select
                  style={{ ...inputStyle, marginBottom: "10px" }}
                  onChange={(e) =>
                    setReciptData({ ...reciptData, customer: e.target.value })
                  }
                >
                  <option value="" selected disabled hidden>
                    Select Customer
                  </option>
                  {customers?.map((row, index) => {
                    return (
                      <option key={index} value={[row._id]}>
                        {row.customer_name}
                      </option>
                    );
                  })}
                </select>
              </Container>

              <Grid container style={{ marginTop: "20px" }}>
                <Grid item style={{ width: "50%" }}>
                  <Container>
                    <p
                      style={{
                        color: "black",
                        paddingLeft: "5px",
                        fontWeight: "600",
                        fontSize: ".9rem",
                      }}
                    >
                      Select Account
                    </p>
                    <select
                      style={{ ...inputStyle }}
                      onChange={(e) =>
                        setReciptData({
                          ...reciptData,
                          account: e.target.value,
                        })
                      }
                    >
                      <option value="" selected disabled hidden>
                        Select Account
                      </option>
                      {accounts?.map((row, index) => {
                        return (
                          <option key={index} value={[row._id]}>
                            {row.account_name}
                          </option>
                        );
                      })}
                    </select>
                  </Container>
                </Grid>
                <Grid item style={{ width: "50%" }}>
                  <Container>
                    <p
                      style={{
                        color: "black",
                        paddingLeft: "5px",
                        fontWeight: "600",
                        fontSize: ".9rem",
                      }}
                    >
                      Payment Mode
                    </p>
                    <select
                      style={{ ...inputStyle }}
                      onChange={(e) =>
                        setReciptData({ ...reciptData, mode: e.target.value })
                      }
                    >
                      <option value="" selected disabled hidden>
                        Payment Mode
                      </option>
                      {paymentModes?.map((row, index) => {
                        return <option key={index}>{row}</option>;
                      })}
                    </select>
                  </Container>
                </Grid>
              </Grid>
              <Grid container style={{ marginTop: "20px" }}>
                <Grid item style={{ width: "50%" }}>
                  <Container>
                    <p
                      style={{
                        color: "black",
                        paddingLeft: "5px",
                        fontWeight: "600",
                        fontSize: ".9rem",
                      }}
                    >
                      Amount
                    </p>
                    <div style={{ display: "block" }}>
                      <input
                        placeholder="Amount"
                        style={inputStyle}
                        name="amount"
                        type="number"
                        onChange={(e) => {
                          setReciptData({
                            ...reciptData,
                            amount: e.target.value,
                          });
                        }}
                        value={reciptData.amount}
                      />
                    </div>
                  </Container>
                </Grid>
                <Grid item style={{ width: "50%" }}>
                  <Container>
                    <p
                      style={{
                        color: "black",
                        paddingLeft: "5px",
                        fontWeight: "600",
                        fontSize: ".9rem",
                      }}
                    >
                      Date
                    </p>
                    <div style={{ display: "block" }}>
                      <input
                        placeholder="Income Title"
                        style={inputStyle}
                        name="income_date"
                        type="date"
                        format="MM/dd/yyyy"
                        onChange={(e) =>
                          setReciptData({ ...reciptData, date: e.target.value })
                        }
                        value={reciptData.date}
                      />
                    </div>
                  </Container>
                </Grid>
              </Grid>
              <Container style={{ marginTop: "10px" }}>
                <p
                  style={{
                    color: "black",
                    paddingLeft: "5px",
                    fontWeight: "600",
                    fontSize: ".9rem",
                  }}
                >
                  Note
                </p>
                <div style={{ display: "block" }}>
                  <input
                    placeholder="Note"
                    style={inputStyle}
                    name="note"
                    type="text"
                    onChange={(e) => {
                      setReciptData({ ...reciptData, note: e.target.value });
                    }}
                    value={reciptData.note}
                  />
                </div>
              </Container>
            </div>
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
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              style={{
                margin: "15px",
                alignItems: "center",
                background: "#007de3",
                color: "#fff",
                borderRadius: "6px",
                width: "180px",
                height: "40px",
                fontWeight: "800",
              }}
            >
              Save Receipt
            </Button>
          </div>
        </Dialog>
      </form>
    </div>
  );
}

export default AddReceiptCredit;
