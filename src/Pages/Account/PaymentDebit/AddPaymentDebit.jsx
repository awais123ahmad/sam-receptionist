import { Button, Dialog, Typography, withStyles, IconButton, DialogTitle, DialogContent, DialogActions, Container, Grid, Select, MenuItem } from '@mui/material'
// import { Close } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';

// import { useSnackbar } from 'react-simple-snackbar'

const suppliers = [
    { _id: 1, customer_name: 'Lateef' },
    { _id: 2, customer_name: 'Shabir' },
]

const accounts = [
    { _id: 1, account_name: 'Mezan Bank' },
    { _id: 2, account_name: 'Cash' },
]

function AddPaymentDebit({ setOpen, open, currentId, setCurrentId, editCancel, setEditCancel }) {

    const location = useLocation()
    const [paymentDebitData, setPaymentDebitData] = useState({ supplier: '', account: '', mode: '', amount: 0, date: new Date().toISOString(), note: '', status: 1, creator: '' })
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const paymentDebit = useSelector((state) => currentId ? state.paymentDebit.paymentDebits.find((c) => c._id === currentId) : null)
    const [date, setDate] = useState()
    const paymentModes = ['CASH', 'BANK', 'CHEQUE', 'CARD', 'OTHER']

    //   useEffect(() => {
    //     if (paymentDebit) {
    //       setPaymentDebitData(paymentDebit)
    //     } else {
    //       if (editCancel) {
    //         setPaymentDebitData({ supplier: '', account: '', mode: '', amount: 0, date: new Date().toISOString(), note: '', status: 1 })
    //       }
    //     }
    //   }, [paymentDebit])

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    useEffect(() => {
        var check = user?.result?._id;
        if (check !== undefined) {
            setPaymentDebitData({ ...paymentDebit, creator: [check] })
        }
    }, [location])

    const handleSubmit = (e) => {
        // e.preventDefault()
        // if (currentId) {
        //   dispatch(updatePaymentDebit(currentId, paymentDebitData, openSnackbar))
        // } else {
        //   dispatch(createPaymentDebit(paymentDebitData, openSnackbar))
        // }

        // clear()
        // handleClose()
    }

    const handleClose = () => {
        setOpen(false)
    }

    const clear = () => {
        setCurrentId(null)
        setPaymentDebitData({ supplier: '', amount: 0, date: new Date().toISOString(), note: '', status: 1 })
    }

    const handleDateChange = (date) => {
        setDate(date)
    }

    useEffect(() => {
        setPaymentDebitData({ ...paymentDebitData, date: date })
    }, [date])
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
    }

    return (
        <div>
            <form>
                <Dialog onClose={handleClose} open={open} PaperProps={{ style: { borderRadius: 20, width: '100%' } }} style={{ zIndex: '999999' }} maxWidth="md">
                    <p onClose={handleClose} style={{ padding: '1.5rem 0', fontWeight: '700', textTransform: 'uppercase', paddingLeft: '20px', color: 'black', textAlign: 'center', background: '#fff' }}>{currentId ? 'Edit Payment Debit' : 'Add Payment Debit'}</p>
                    <div style={{ borderTop: '1px solid black', padding: '1rem 2rem' }} >
                        <div className='customInputs' style={{ paddingLeft: '40px', paddingRight: '40px' }}>
                            <Container>
                                <p style={{ color: 'black', paddingLeft: '5px', fontWeight: '600', fontSize: '.9rem' }} gutterBottom>Select Supplier</p>
                                <select style={{ ...inputStyle, marginBottom: '10px' }} onChange={(e) => setPaymentDebitData({ ...paymentDebitData, supplier: e.target.value })}>
                                    <option value="" selected disabled hidden>Select Supplier</option>
                                    {suppliers?.map((row) => { return <option value={[row._id]}>{row.supplier_name}</option> })}
                                </select>
                            </Container>

                            <Grid container style={{ marginTop: '20px' }}>
                                <Grid item style={{ width: '50%' }}>
                                    <Container>
                                        <p style={{ color: 'black', paddingLeft: '5px', fontWeight: '600', fontSize: '.9rem' }} gutterBottom>Select Account</p>
                                        <select style={{ ...inputStyle }} onChange={(e) => setPaymentDebitData({ ...paymentDebitData, account: e.target.value })}>
                                            <option value="" selected disabled hidden>Select Account</option>
                                            {accounts?.map((row, index) => { return <option key={index} value={[row._id]}>{row.account_name}</option> })}
                                        </select>
                                    </Container>
                                </Grid>
                                <Grid item style={{ width: '50%' }}>
                                    <Container>
                                        <p style={{ color: 'black', paddingLeft: '5px', fontWeight: '600', fontSize: '.9rem' }} gutterBottom>Payment Mode</p>
                                        <select style={{ ...inputStyle }} onChange={(e) => setPaymentDebitData({ ...paymentDebitData, mode: e.target.value })}>
                                            <option value="" selected disabled hidden>Payment Mode</option>
                                            {paymentModes?.map((row, index) => { return <option key={index} >{row}</option> })}
                                        </select>
                                    </Container>
                                </Grid>
                            </Grid>
                            <Grid container style={{ marginTop: '20px' }} >
                                <Grid item style={{ width: '50%' }}>
                                    <Container>
                                        <p style={{ color: 'black', paddingLeft: '5px', fontWeight: '600', fontSize: '.9rem' }} gutterBottom>Amount</p>
                                        <div style={{ display: 'block' }}>
                                            <input
                                                placeholder='Amount'
                                                style={inputStyle}
                                                name='amount'
                                                type='number'
                                                onChange={(e) => { setPaymentDebitData({ ...paymentDebitData, amount: e.target.value }) }}
                                                value={paymentDebitData.amount}
                                            />
                                        </div>
                                    </Container>
                                </Grid>
                                <Grid item style={{ width: '50%' }}>
                                    <Container>
                                        <p style={{ color: 'black', paddingLeft: '5px', fontWeight: '600', fontSize: '.9rem' }} gutterBottom>Date</p>
                                        <div style={{ display: 'block' }}>
                                            <input
                                                placeholder='Income Title'
                                                style={inputStyle}
                                                name='income_date'
                                                type='date'
                                                format="MM/dd/yyyy"
                                                onChange={handleDateChange}
                                                value={paymentDebitData.date}
                                            />
                                        </div>
                                    </Container>
                                </Grid>
                            </Grid>
                            <Container style={{ marginTop: '10px' }}>
                                <p style={{ color: 'black', paddingLeft: '5px', fontWeight: '600', fontSize: '.9rem' }} gutterBottom>Note</p>
                                <div style={{ display: 'block' }}>
                                    <input
                                        placeholder='Note'
                                        style={inputStyle}
                                        name='note'
                                        type='text'
                                        onChange={(e) => { setPaymentDebitData({ ...paymentDebitData, note: e.target.value }) }}
                                        value={paymentDebitData.note}
                                    />
                                </div>
                            </Container>
                        </div>
                    </div>
                    <div style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginTop: '2rem' }}>
                        <Button onClick={handleSubmit} variant="contained" color="primary" style={{ margin: '15px', alignItems: 'center', background: '#007de3', color: '#fff', borderRadius: '6px', width: '180px', height: '40px', fontWeight: '800' }}>
                            Save Debit
                        </Button>
                    </div>
                </Dialog>
            </form>
        </div>
    )
}

export default AddPaymentDebit