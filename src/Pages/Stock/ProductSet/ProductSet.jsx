import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Autocomplete } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import { getProducts } from "../../actions/pro/ductActions";
import styles from "./ProductSet.module.css";
// import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
// import { createProductSet } from "../../actions/productSetActions";
// import { useSnackbar } from 'react-simple-snackbar'
import { useNavigate } from "react-router-dom";



const CustomPaper = (props) => {
  return <Paper elevation={3} {...props} />;
};

const ProductSet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [productData, setProductData] = useState({
    title: '',
    products: [{ product: "", quantity: 0 }]
  });
  console.log(productData);

  // const products = useSelector((state) => state.product.products);
  const productsProps = {
    // options: products,
    getOptionLabel: (option) => option.product_name,
  };

  // useEffect(() => {
  //   dispatch(getProducts());
  // }, [dispatch]);

  const handleAddField = (e) => {
    e.preventDefault();
    // Adding a new object to the array
    // setProductData((prevProductData) => [
    //   ...prevProductData.product, product: [{ product: "", quantity: 0 }],
    // ]);
    setProductData((prevState) => ({ ...prevState, products: [...prevState.products, { product: '', quantity: 0 }] }))
  };

  const handleChange = (e) => {
    setProductData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangeProduct = (index, e, value) => {
    if (value?._id) {
      const values = [...productData.products]
      values[index].product = value?._id
      setProductData({ ...productData, products: values })
    }
    else {
      const values = [...productData.products]
      values[index][e.target.name] = e.target.value
      setProductData({ ...productData, products: values })
    }
  };


  const handleRemoveField = (index) => {
    const updatedProductData = productData?.products.filter((_, i) => i !== index);
    setProductData((prev) => ({ ...prev, products: updatedProductData }));
  };


  const handleSubmit = () => {
    // dispatch(createProductSet(productData, navigate, openSnackbar))
  }

  return (
    <div style={{ padding: "2rem 0" }}>
      <div
        style={{
          width: "80%",
          margin: "auto",
          paddingBottom: "2rem",
          backgroundColor: "white",
        }}
      >
        <Container>
          <Grid container>
            <Grid
              style={{
                width: "100%",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "20px",
              }}
            >
              <p style={{ fontWeight: "800", marginTop: '2rem', fontSize: '1.5rem' }}>
                PRODUCT SET
              </p>
            </Grid>
          </Grid>
        </Container>
        <Divider />
        <div style={{ marginTop: '2rem' }}>
          <div
            style={{ width: "60%", margin: "auto" }}
          >
            <div style={{ width: "90%", marginBottom: '10px' }}>
              <Typography
                variant="overline"
                style={{
                  color: "black",
                  paddingRight: "3px",
                  fontWeight: "700",
                  fontFamily: "montserrat",
                }}
                gutterBottom
              >
                Set Name
              </Typography>
              <div style={{ display: "block" }}>
                <input
                  placeholder="Set Name"
                  className={styles.inputStyle}
                  name="title"
                  type="text"
                  // value={productData.product_name}
                  onChange={(e) => setProductData({ ...productData, title: e.target.value })}
                />
              </div>
            </div>
            <div style={{ width: "100%" }}>
              <Typography
                variant="overline"
                style={{
                  color: "black",
                  paddingRight: "3px",
                  fontWeight: "700",
                  fontFamily: "montserrat",
                }}
                gutterBottom
              >
                Products
              </Typography>
              <div>
                {productData?.products?.map((value, index) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginTop: index === 0 ? "0" : "6px",
                    }}
                  >
                    <div style={{ width: "70%" }}>
                      <Autocomplete
                        {...productsProps}
                        freeSolo
                        PaperComponent={CustomPaper}
                        disableClearable
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            // required={!order && true}
                            label="Select Product"
                            variant="outlined"
                            name="product"
                            style={{ backgroundColor: "#efefef" }}
                            onChange={(e) => handleChangeProduct(index, e, '')}
                            value={value.product}
                          />
                        )}
                        // value={products?.product_name}
                        onChange={(event, value) => handleChangeProduct(index, event, value)}
                      />
                    </div>
                    <InputBase
                      sx={{ ml: 1 }}
                      className={styles.inputStyleQuantity}
                      style={{ width: "20%" }}
                      type="number"
                      name="quantity"
                      placeholder="0"
                      onChange={(e) => handleChangeProduct(index, e, '')}
                    />
                    {index === 0 ? (
                      ""
                    ) : (
                      <>
                        <IconButton
                          onClick={() => handleRemoveField(index)}
                          style={{ width: "6%" }}
                        >
                          <DeleteOutlineRoundedIcon
                            style={{ width: "20px", height: "20px" }}
                          />
                        </IconButton>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className={styles.addButton}>
                <button onClick={handleAddField}>+</button>
              </div>
            </div>
          </div>
        </div>
        <Grid container justifyContent="center">
          <Button onClick={handleSubmit} variant="contained" color="primary" style={{ margin: '15px', marginTop: '3rem', alignItems: 'center', background: '#007de3', color: '#fff', borderRadius: '6px', width: '180px', height: '40px', fontWeight: '800' }}>
            Save Set
          </Button>
        </Grid>
      </div>
    </div>
  );
};

export default ProductSet;
