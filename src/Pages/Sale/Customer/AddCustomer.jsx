import { Button, Dialog} from '@mui/material'
// import { Close } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { createCategory, updateCategory } from '../../../Api/Reducers/StockReducers/category';
// import { useSnackbar } from 'react-simple-snackbar'

function AddCustomer({ setOpen, open, currentId, setCurrentId, editCancel, setEditCancel }) {

    const location = useLocation();
    const [ customerData, setCustomerData ] = useState({ customerName: '', email: '', phone: '', address: '', city: '', country: '', creator: '', status: 1 })
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch();
    const customer = useSelector((state) => currentId ? state.clients.clients.find((c) => c._id === currentId) : null)
    // const [openSnackbar, closeSnackbar] = useSnackbar();

    useEffect(() => {
        if (customer) {
            setCustomerData(customer)
        } else {
            if (editCancel) {
                setCustomerData({ customerName: '', status: 1 })
            }
        }
    }, [customer])

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    useEffect(() => {
        var check = user?.result?._id;
        if (check !== undefined) {
            setCustomerData({ ...customerData, userId: [check] })
        }
    }, [location])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (customerData?.customerName?.length > 0) {
            if (currentId) {
                dispatch(updateCategory(customerData))
            } else {
                dispatch(createCategory(customerData))
            }

            clear();
            handleClose();
        } else {
            // openSnackbar('Please fill the field')
        }
    }

    const handleClose = () => {
        setOpen(false);
    }

    const clear = () => {
        setCurrentId(null);
        setCustomerData({ categoryName: '', status: 1 })
    }

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
                <Dialog onClose={handleClose} open={open} PaperProps={{ style: { borderRadius: 20, } }} style={{ zIndex: '999999', }} fullWidth>
                    <p onClose={handleClose} style={{ padding: '1.5rem 0', fontWeight: '700', textTransform: 'uppercase', paddingLeft: '20px', color: 'black', textAlign: 'center', background: '#fff' }}>{currentId ? 'Edit Customer' : 'Add Customer'}</p>
                    <div style={{ borderTop: '1px solid black', }} >
                        <div className="customInputs" style={{ paddingLeft: '40px', paddingRight: '40px', marginTop: '1rem' }}>
                            <div>
                                <p style={{ color: 'black', paddingLeft: '5px', fontWeight: '600', fontSize: '.9rem' }} gutterBottom>Customer Name</p>
                                <div style={{ display: 'block' }}>
                                    <input
                                        placeholder='Customer Name'
                                        style={inputStyle}
                                        name='customerName'
                                        type='text'
                                        onChange={(e) => { setCustomerData({ ...customerData, customerName: e.target.value }) }}
                                        value={customerData.customerName}
                                    />
                                </div>

                            </div>
                            <div container style={{ display: 'flex', marginTop: '20px' }} >
                                <div item style={{ width: '50%' }}>
                                        <p style={{ color: 'black', paddingLeft: '5px', fontWeight: '600', fontSize: '.9rem' }} gutterBottom>Phone Number</p>
                                        <div style={{ display: 'block' }}>
                                            <input
                                                placeholder='Phone Number'
                                                style={inputStyle}
                                                name='phone'
                                                type='text'
                                                onChange={(e) => { setCustomerData({ ...customerData, phone: e.target.value }) }}
                                                value={customerData.phone}
                                            />
                                        </div>
                                </div>

                                <div item style={{ marginLeft: 20, textAlign: 'left', width: '45%' }}>
                                    <p style={{ color: 'black', paddingLeft: '5px', fontWeight: '600', fontSize: '.9rem' }} gutterBottom>Email Address</p>
                                    <div style={{ display: 'block' }}>
                                        <input
                                            placeholder='Email Address'
                                            style={inputStyle}
                                            name='email'
                                            type='text'
                                            onChange={(e) => { setCustomerData({ ...customerData, email: e.target.value }) }}
                                            value={customerData.email}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                <p style={{ color: 'black', paddingLeft: '5px', fontWeight: '600', fontSize: '.9rem' }} gutterBottom>Address</p>
                                <div style={{ display: 'block' }}>
                                    <input
                                        placeholder='Address'
                                        style={inputStyle}
                                        name='address'
                                        type='text'
                                        onChange={(e) => { setCustomerData({ ...customerData, address: e.target.value }) }}
                                        value={customerData.address}
                                    />
                                </div>

                            </div>
                            <div style={{ display: 'flex', marginTop: '20px' }} >
                                <div item style={{ width: '50%' }}>
                                    <p style={{ color: 'black', paddingLeft: '5px', fontWeight: '600', fontSize: '.9rem' }} gutterBottom>City</p>
                                    <div style={{ display: 'block' }}>
                                        <input
                                            placeholder='City'
                                            style={inputStyle}
                                            name='city'
                                            type='text'
                                            onChange={(e) => { setCustomerData({ ...customerData, city: e.target.value }) }}
                                            value={customerData.city}
                                        />
                                    </div>
                                </div>

                                <div item style={{ marginLeft: 20, textAlign: 'left', width: '45%' }}>
                                    <p style={{ color: 'black', paddingLeft: '5px', fontWeight: '600', fontSize: '.9rem' }} gutterBottom>Country</p>
                                    <div style={{ display: 'block' }}>
                                        <input
                                            placeholder='Country'
                                            style={inputStyle}
                                            name='country'
                                            type='text'
                                            onChange={(e) => { setCustomerData({ ...customerData, country: e.target.value }) }}
                                            value={customerData.country}
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginTop: '2rem' }}>
                        <Button onClick={handleSubmit} variant="contained" color="primary" style={{ margin: '15px', alignItems: 'center', background: '#007de3', color: '#fff', borderRadius: '6px', width: '180px', height: '40px', fontWeight: '800' }}>
                            Save Customer
                        </Button>
                    </div>
                </Dialog>
            </form>
        </div>
    )
}

export default AddCustomer