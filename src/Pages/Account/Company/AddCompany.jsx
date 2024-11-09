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
import { addCompanyAccount,  updateCompanyAccount } from "../../../Api/Reducers/AccountReducers/company";

function AddCompany({
  setOpen,
  open,
  currentId,
  setCurrentId,
  editCancel,
  setEditCancel,
}) {
  const location = useLocation();
  const [accountData, setAccountData] = useState({
    account_name: "",
    account_type: "",
    account_number: '',
    account_holder: "",
    amount: '',
    opening_balance: '',
    allow_negative: false,
    creator: "60995d3e8e3ebe229cbf31a1",
  });
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();

  console.log('current id ' , currentId);


  // useEffect(() => {
  //   if (currentId) {
  //     dispatch(fetchCompanyAccountById(currentId))
  //   }
  // },[])

  const account = useSelector((state) => currentId ? state.company.data.find((c) => c._id === currentId) : null)

console.log('accounts' , account);

  // const [openSnackbar, closeSnackbar] = useSnackbar();

  useEffect(() => {
      if (account) {
          setAccountData(account)
      } else {
          if (editCancel) {
              setAccountData({
                  account_name: '',
                  account_type: '',
                  account_number: 0,
                  account_holder: '',
                  amount: 0,
                  opening_balance: 0
              })
          }
      }
  }, [account])

  // useEffect(() => {
  //     setUser(JSON.parse(localStorage.getItem('profile')))
  // }, [location])

  // useEffect(() => {
  //     var check = user?.result?._id;
  //     if (check !== undefined) {
  //         setCategoryData({ ...accountData, userId: [check] })
  //     }
  // }, [location])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updateCompanyAccount(accountData));
    } else {
      dispatch(addCompanyAccount(accountData));
    }

    clear();
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setAccountData({
      account_name: "",
      account_type: "",
      account_number: '',
      account_holder: "",
      amount: '',
      opening_balance: '',
    });
  };

  const clear = () => {
    setCurrentId(null);
    setAccountData({
      account_name: "",
      account_type: "",
      account_number: 0,
      account_holder: "",
      amount: 0,
      opening_balance: 0,
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
          <div style={{ borderTop: "1px solid black" }}>
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
                >
                  Company Account Name
                </p>
                <div style={{ display: "block" }}>
                  <input
                    placeholder="Company Account Name"
                    style={inputStyle}
                    name="account_name"
                    type="text"
                    onChange={(e) => {
                      setAccountData({
                        ...accountData,
                        account_name: e.target.value,
                      });
                    }}
                    value={accountData.account_name}
                  />
                </div>
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
                      Account Type - BANK, CASH, OTHER
                    </p>
                    <div style={{ display: "block" }}>
                      <select
                        name=""
                        id=""
                        style={inputStyle}
                        onChange={(e) => {
                          setAccountData({
                            ...accountData,
                            account_type: e.target.value,
                          });
                        }}
                        value={accountData.account_type}
                      >
                        <option selected disabled value="select">
                          Account Type - BANK, CASH, OTHER
                        </option>
                        <option value="BANK">BANK</option>
                        <option value="CASH">CASH</option>
                        <option value="OTHER">OTHER</option>
                      </select>
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
                      Account Holder
                    </p>
                    <div style={{ display: "block" }}>
                      <input
                        placeholder="Account Holder"
                        style={inputStyle}
                        name="account_holder"
                        type="text"
                        onChange={(e) => {
                          setAccountData({
                            ...accountData,
                            account_holder: e.target.value,
                          });
                        }}
                        value={accountData.account_holder}
                      />
                    </div>
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
                      Account Number
                    </p>
                    <div style={{ display: "block" }}>
                      <input
                        placeholder="Account Number"
                        style={inputStyle}
                        name="account_number"
                        type="text"
                        onChange={(e) => {
                          setAccountData({
                            ...accountData,
                            account_number: e.target.value,
                          });
                        }}
                        value={accountData.account_number}
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
                      Allow Negative
                    </p>
                    {/*<FormControl className={classes.formControl} fullWidth>*/}
                    <select
                      value={accountData.allow_negative}
                      disableUnderline
                      onChange={(e) => {
                        setAccountData({
                          ...accountData,
                          allow_negative: e.target.value,
                        });
                      }}
                      style={inputStyle}
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                    {/*</FormControl>*/}
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
                      Opening Balance
                    </p>
                    <div style={{ display: "block" }}>
                      <input
                        placeholder="Opening Balance"
                        style={inputStyle}
                        name="opening_balance"
                        type="text"
                        onChange={(e) => {
                          setAccountData({
                            ...accountData,
                            opening_balance: e.target.value,
                            amount: e.target.value,
                          });
                        }}
                        value={accountData.opening_balance}
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
                      Total Amount
                    </p>
                    <div style={{ display: "block" }}>
                      <input
                        placeholder="Amount"
                        style={inputStyle}
                        name="amount"
                        type="text"
                        onChange={(e) => {
                          setAccountData({
                            ...accountData,
                            amount: e.target.value,
                          });
                        }}
                        value={accountData.opening_balance}
                      />
                    </div>
                  </Container>
                </Grid>
              </Grid>
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
              Save Account
            </Button>
          </div>
        </Dialog>
      </form>
    </div>
  );
}

export default AddCompany;
