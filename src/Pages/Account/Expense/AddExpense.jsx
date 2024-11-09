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
import { addExpenseAPI } from "../../../Api/Reducers/AccountReducers/expense";
// import { useSnackbar } from 'react-simple-snackbar'
const accounts = [
  { _id: 1, account_name: "Mezan Bank" },
  { _id: 2, account_name: "Cash" },
];

function AddExpense({
  setOpen,
  open,
  currentId,
  setCurrentId,
  editCancel,
  setEditCancel,
}) {
  const location = useLocation();
  const [expenseData, setExpenseData] = useState({
    expense_title: "",
    expense_amount: 0,
    expense_account: "",
    expense_date: new Date().toISOString(),
    paymentMode: "CASH",
    note: "",
    status: 1,
    creator: "60995d3e8e3ebe229cbf31a1",
  });
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const expense = useSelector((state) =>
    currentId ? state.expense.expenses.find((c) => c._id === currentId) : null
  );
  const paymentModes = ["CASH", "BANK", "CHEQUE", "CARD", "OTHER"];

  //   useEffect(() => {
  //     if (expense) {
  //       setExpenseData(expense)
  //     } else {
  //       if (editCancel) {
  //         setExpenseData({ expense_title: '', expense_amount: 0, expense_account: '', expense_date: '', paymentMode: 'CASH', note: '', status: 1 })
  //       }
  //     }
  //   }, [expense])

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  useEffect(() => {
    var check = user?.result?._id;
    if (check !== undefined) {
      setExpenseData({ ...expenseData, creator: [check] });
    }
  }, [location]);

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   if (currentId) {
  //     dispatch(updateExpense(currentId, expenseData, openSnackbar))
  //   } else {
  //     dispatch(addExpenseAPI(expenseData))
  //   }
  //   clear()
  //   handleClose()
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const clear = () => {
    setCurrentId(null);
    setExpenseData({
      expense_title: "",
      expense_amount: 0,
      expense_account: "",
      expense_date: "",
      paymentMode: "CASH",
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
            {currentId ? "Edit Company Account" : "Add Company Account"}
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
                  Expense Title
                </p>
                <div style={{ display: "block" }}>
                  <input
                    placeholder="Expense Title"
                    style={inputStyle}
                    name="expense_title"
                    type="text"
                    onChange={(e) => {
                      setExpenseData({
                        ...expenseData,
                        expense_title: e.target.value,
                      });
                    }}
                    value={expenseData.expense_title}
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
                        setExpenseData({
                          ...expenseData,
                          expense_account: e.target.value,
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
                        setExpenseData({
                          ...expenseData,
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
                        style={{ ...inputStyle, padding: "10px" }}
                        name="income_date"
                        type="date"
                        onChange={(e) => {
                          setExpenseData({
                            ...expenseData,
                            expense_date: e.target.value,
                          });
                        }}
                        value={expenseData.expense_date}
                        format="MM/dd/yyyy"
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
                    placeholder="Expense Amount"
                    style={inputStyle}
                    name="expense_amount"
                    type="number"
                    onChange={(e) => {
                      setExpenseData({
                        ...expenseData,
                        expense_amount: e.target.value,
                      });
                    }}
                    value={expenseData.expense_amount}
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
                      setExpenseData({ ...expenseData, note: e.target.value });
                    }}
                    value={expenseData.note}
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
              Save Expense
            </Button>
          </div>
        </Dialog>
      </form>
    </div>
  );
}

export default AddExpense;
