import { Button, Dialog, Typography, withStyles, IconButton, DialogTitle, DialogContent, DialogActions } from '@mui/material'
// import { Close } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { fetchCategories } from '../../../Api/Reducers/StockReducers/category';
import { createSubcategory } from '../../../Api/Reducers/StockReducers/subcategory';
// import { useSnackbar } from 'react-simple-snackbar'

function AddSubcategory({ setOpen, open, currentId, setCurrentId, editCancel, setEditCancel }) {

    const location = useLocation();
    const [subcategoryData, setSubcategoryData] = useState({  subcategoryName: '', category: '', user: '', status: 1  })
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch();
    const category = useSelector((state) => currentId ? state.category.categories.find((c) => c._id === currentId) : null)
    // const [openSnackbar, closeSnackbar] = useSnackbar();

    const categories = useSelector((state) => state.category.categories)

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    useEffect(() => {
        if (category) {
            setSubcategoryData(category)
        } else {
            if (editCancel) {
                setSubcategoryData({ subcategoryName: '', status: 1 })
            }
        }
    }, [category])

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    useEffect(() => {
        var check = user?.result?._id;
        if (check !== undefined) {
            setSubcategoryData({ ...subcategoryData, userId: [check] })
        }
    }, [location])

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if(subcategoryData?.subcategoryName?.length > 0){
    //         if (currentId) {
    //             dispatch(updateCategory(currentId, subcategoryData))
    //         } else {
    //             dispatch(createSubcategory(subcategoryData))
    //         }

    //         clear();
    //         handleClose();
    //     } else{
    //         // openSnackbar('Please fill the field')
    //     }
    // }

    const handleClose = () => {
        setOpen(false);
    }

    const clear = () => {
        // setCurrentId(null);
        setSubcategoryData({ categoryName: '', status: 1 })
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
                <Dialog onClose={handleClose} open={open} PaperProps={{ style: { borderRadius: 20 } }} style={{ zIndex: "999999" }} fullWidth>
                    <p onClose={handleClose} style={{ padding: '1.5rem 0', fontWeight: '700', textTransform: 'uppercase', paddingLeft: '20px', color: 'black', textAlign: 'center', background: '#fff' }}>{currentId ? 'Edit Subcategory' : 'Add Subcategory'}</p>
                    <div style={{ borderTop: '1px solid black', }} >
                        <div className='customInputs' style={{ paddingLeft: '60px', paddingRight: '60px', marginTop: '1rem' }}>
                            <p style={{ color: 'black', paddingLeft: '5px', fontWeight: '600', fontSize: '.9rem' }} gutterBottom>Category</p>
                            <select style={{ ...inputStyle, marginBottom: '10px' }} onChange={(e) => setSubcategoryData({ ...subcategoryData, category: e.target.value })}>
                                <option value="" selected disabled hidden>Select Category</option>
                                {categories?.map((row) => { return <option value={[row._id]}>{row.categoryName}</option> })}
                            </select>
                            <p style={{ color: 'black', paddingLeft: '5px', fontWeight: '600', fontSize: '.9rem' }} gutterBottom>SubCategory</p>
                            <input
                                placeholder='Subcategory Name'
                                style={inputStyle}
                                name='subcategoryName'
                                type='text'
                                onChange={(e) => setSubcategoryData({ ...subcategoryData, subcategoryName: e.target.value })}
                                value={subcategoryData.subcategoryName}
                            />
                        </div>
                    </div>
                    <div style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginTop: '2rem' }}>
                        <Button variant="contained" color="primary" style={{ margin: '15px', alignItems: 'center', background: '#007de3', color: '#fff', borderRadius: '6px', width: '180px', height: '40px', fontWeight: '800' }}>
                            Save Category
                        </Button>
                    </div>
                </Dialog>
            </form>
        </div>
    )
}

export default AddSubcategory