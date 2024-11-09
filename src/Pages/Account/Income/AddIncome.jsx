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
import { addIncome } from "../../../Api/Reducers/AccountReducers/income";

// import { useSnackbar } from 'react-simple-snackbar'

const accounts = [
  { _id: 1, account_name: "Mezan Bank" },
  { _id: 2, account_name: "Cash" },
];

function AddIncome({
  setOpen,
  open,
  currentId,
  setCurrentId,
  editCancel,
  setEditCancel,
}) {
  const location = useLocation();
  const [incomeData, setIncomeData] = useState({
    income_title: "",
    income_amount: 0,
    income_account: "",
    income_date: new Date().toISOString(),
    paymentMode: "",
    note: "",
    status: 1,
    creator: "60995d3e8e3ebe229cbf31a1",
  });
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const income = useSelector((state) =>
    currentId ? state.income.incomes.find((c) => c._id === currentId) : null
  );
  const paymentModes = ["CASH", "BANK", "CHEQUE", "CARD", "OTHER"];

  // useEffect(() => {
  //     if (income) {
  //         setIncomeData(income)
  //     } else {
  //         if (editCancel) {
  //             setIncomeData({ income_title: '', income_amount: 0, income_account: '', income_date: new Date().toISOString(), paymentMode: '', note: '', status: 1 })
  //         }
  //     }
  // }, [income])

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  useEffect(() => {
    var check = user?.result?._id;
    if (check !== undefined) {
      setIncomeData({ ...incomeData, creator: [check] });
    }
  }, [location]);

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   if (currentId) {
  //     dispatch(updateIncome(currentId, incomeData, openSnackbar))
  //   } else {
  //     dispatch(addIncome(incomeData))
  //   }
  //   clear()
  //   handleClose()
  // };

  const handleClose = () => {
    setOpen(false);
    clear()
  };

  const clear = () => {
    setCurrentId(null);
    setIncomeData({
      income_title: "",
      income_amount: 0,
      income_account: "",
      income_date: "",
      paymentMode: "",
      note: "",
      status: 1,
    });
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

  console.log('form data' , incomeData);
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
            {currentId ? "Edit Income" : "Add Income"}
          </p>
          <div style={{ borderTop: "1px solid black", padding: "1rem 2rem" }}>
            <div
              className="customInputs"
              style={{
                paddingLeft: "40px",
                paddingRight: "40px",
                marginTop: "1rem",
              }}
            >
              <Container>
                <p
                  style={{
                    color: "black",
                    paddingLeft: "5px",
                    fontWeight: "600",
                    fontSize: ".9rem",
                  }}
                  gutterBottom
                >
                  Income Title
                </p>
                <div style={{ display: "block" }}>
                  <input
                    placeholder="Income Title"
                    style={inputStyle}
                    name="income_title"
                    type="text"
                    onChange={(e) => {
                      setIncomeData({
                        ...incomeData,
                        income_title: e.target.value,
                      });
                    }}
                    value={incomeData.income_title}
                  />
                </div>
              </Container>
              <Grid container style={{ marginTop: "20px" }}>
                <Grid item style={{ width: "33.3%" }}>
                  <Container>
                    <p
                      style={{
                        color: "black",
                        paddingLeft: "5px",
                        fontWeight: "600",
                        fontSize: ".9rem",
                      }}
                      gutterBottom
                    >
                      Select Account
                    </p>
                    <select
                      style={{ ...inputStyle, marginBottom: "10px" }}
                      onChange={(e) =>
                        setIncomeData({
                          ...incomeData,
                          income_account: e.target.value,
                        })
                      }
                    >
                      <option value="" selected disabled hidden>
                        Select Account
                      </option>
                      {accounts?.map((row, i) => {
                        return (
                          <option key={i} value={[row._id]}>
                            {row.account_name}
                          </option>
                        );
                      })}
                    </select>
                  </Container>
                </Grid>

                <Grid item style={{ width: "33.3%" }}>
                  <Container>
                    <p
                      style={{
                        color: "black",
                        paddingLeft: "5px",
                        fontWeight: "600",
                        fontSize: ".9rem",
                      }}
                      gutterBottom
                    >
                      Payment Mode
                    </p>
                    <select
                      style={{ ...inputStyle, marginBottom: "10px" }}
                      onChange={(e) =>
                        setIncomeData({
                          ...incomeData,
                          paymentMode: e.target.value,
                        })
                      }
                    >
                      <option value="" selected disabled hidden>
                        Select Payment Mode
                      </option>
                      {paymentModes?.map((row, i) => {
                        return (
                          <option key={i} value={[row]}>
                            {row}
                          </option>
                        );
                      })}
                    </select>
                  </Container>
                </Grid>
                <Grid item style={{ width: "33.3%" }}>
                  <Container>
                    <p
                      style={{
                        color: "black",
                        paddingLeft: "5px",
                        fontWeight: "600",
                        fontSize: ".9rem",
                      }}
                      gutterBottom
                    >
                      Date
                    </p>
                    <div style={{ display: "block" }}>
                      <input
                        placeholder="Income Title"
                        style={inputStyle}
                        name="income_date"
                        type="date"
                        onChange={(e) => {
                          setIncomeData({
                            ...incomeData,
                            income_date: e.target.value,
                          });
                        }}
                        value={incomeData.income_date}
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
                  gutterBottom
                >
                  Amount
                </p>
                <div style={{ display: "block" }}>
                  <input
                    placeholder="Income Amount"
                    style={inputStyle}
                    name="income_amount"
                    type="number"
                    onChange={(e) => {
                      setIncomeData({
                        ...incomeData,
                        income_amount: e.target.value,
                      });
                    }}
                    value={incomeData.income_amount}
                  />
                </div>
              </Container>
              <Container style={{ marginTop: "20px" }}>
                <p
                  style={{
                    color: "black",
                    paddingLeft: "5px",
                    fontWeight: "600",
                    fontSize: ".9rem",
                  }}
                  gutterBottom
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
                      setIncomeData({ ...incomeData, note: e.target.value });
                    }}
                    value={incomeData.note}
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
              //onClick={handleSubmit}
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
              Save Income
            </Button>
          </div>
        </Dialog>
      </form>
    </div>
  );
}

export default AddIncome;
