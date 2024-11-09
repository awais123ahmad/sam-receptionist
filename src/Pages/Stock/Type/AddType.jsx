import { Button, Dialog, Typography, withStyles, IconButton, DialogTitle, DialogContent, DialogActions } from '@mui/material'
// import { Close } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { createType, updateType } from '../../../Api/Reducers/StockReducers/type';

function AddType({ setOpen, open, currentId, setCurrentId, editCancel, setEditCancel }) {

    const location = useLocation()
    const [ typeData, setTypeData ] = useState({ typeName: '', user: '6363127276dc5304e890c6e8', status: 1 })
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const type = useSelector((state) => currentId ? state.type.data.find((t) => t._id === currentId) : null)
  
    useEffect(() => {
      if (type) {
        setTypeData(type)
      } else {
        if (editCancel){
          setTypeData({ typeName: '', status: 1 })
        }
      }
    }, [type])
  
    useEffect(() => {
      setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])
  
    useEffect(() => {
      var check = user?.result?._id;
      if (check !== undefined) {
        setTypeData({ ...typeData, user: [check]})
      }
    }, [location])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(typeData?.typeName?.length > 0){
            if (currentId) {
                dispatch(updateType(currentId, typeData))
            } else {
                dispatch(createType(typeData))
            }
    
            clear();
            handleClose();
        } else{
            // openSnackbar('Please fill the field')
        }
    }

    const handleClose = () => {
        setOpen(false);
    }

    const clear = () => {
        setCurrentId(null);
        setTypeData({ typeName: '', status: 1 })
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
                <p onClose={handleClose} style={{ padding: '1.5rem 0', fontWeight: '700', textTransform: 'uppercase', paddingLeft: '20px', color: 'black', textAlign: 'center', background: '#fff' }}>{currentId ? 'Edit Type' : 'Add Type'}</p>
                    <div style={{ borderTop: '1px solid black', }} >
                        <div className='customInputs' style={{ paddingLeft: '60px', paddingRight: '60px', marginTop: '1rem' }}>
                            <p style={{ color: 'black', paddingLeft: '5px', fontWeight: '600', fontSize: '.9rem' }}>Type</p>
                            <input
                                placeholder='Type'
                                style={inputStyle}
                                name='name'
                                type='text'
                                onChange={(e) => setTypeData({ ...typeData, typeName: e.target.value })}
                                value={typeData.typeName}
                                required
                            />
                        </div>
                    </div>
                    <div style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginTop: '2rem' }}>
                        <Button onClick={handleSubmit} variant="contained" color="primary" style={{ margin: '15px', alignItems: 'center', background: '#007de3', color: '#fff', borderRadius: '6px', width: '180px', height: '40px', fontWeight: '800' }}>
                            Save Type
                        </Button>
                    </div>
                </Dialog>
            </form>
        </div>
    )
}

export default AddType