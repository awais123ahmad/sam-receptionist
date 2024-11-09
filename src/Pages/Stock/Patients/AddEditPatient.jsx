import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Container, Divider, Grid } from "@mui/material";

const AddEditPatient = () => {
  return (

      <form
        //    onSubmit={handleSubmit}
        className="w-[90%] m-auto"
      >
        {/* <AddClient setOpen={setOpen} open={open} /> */}

        <h1 className="m-[30px] text-center font-[700] text-[20px]">
          {/* {id ? 'Edit Product' : 'Add Product'} */}
          Add Product
        </h1>

        <Divider />
        <div>
          <div className="mt-[20px] flex">
            <div  style={{ width: "50%" }}>
              <h1
                style={{
                  color: "black",
                  paddingRight: "3px",
                  fontWeight: "600",
                }}
              >
                Product Name
              </h1>
              <div style={{ display: "block" }}>
                <input
                  placeholder="Product Name"
                  className="block px-3 py-3 w-full text-sm leading-tight text-gray-700 bg-white border rounded-xl transition duration-300 ease-in-out focus:border-blue-500"
                  name="product_name"
                  type="text"
                  // onChange={(e) => { setProductData({ ...productData, product_name: e.target.value }) }}
                  // value={productData.product_name}
                  required
                />
              </div>
            </div>
            <div style={{ marginLeft: 20, textAlign: "left", width: "50%" }}>
              <h1
                style={{
                  color: "black",
                  paddingRight: "3px",
                  fontWeight: "600",
                }}
              >
                Product Code -or- SKU
              </h1>
              <div style={{ display: "block" }}>
                <input
                  placeholder="Product Code"
                  className="block px-3 py-3 w-full text-sm leading-tight text-gray-700 bg-white border rounded-xl transition duration-300 ease-in-out focus:border-blue-500"
                  name="product_code"
                  type="text"
                  // onChange={(e) => { setProductData({ ...productData, product_code: e.target.value }) }}
                  // value={productData.product_code}
                  // title={id ? "Disabled" : ""}
                  // disabled={id ? true : false}
                  required
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 my-[20px] gap-10">
            <div>
              <h1
                style={{
                  color: "black",
                  paddingRight: "3px",
                  fontWeight: "600",
                }}
              >
                Product Category
              </h1>
              <div style={{ display: "block" }}>
                <select
                  className="block px-3 py-3 w-full text-sm leading-tight text-gray-700 bg-white border rounded-xl transition duration-300 ease-in-out focus:border-blue-500"
                  //   onChange={(e) => { setCatID(e.target.value) }} disabled={id ? true : false} title={id ? "Disabled" : ""}
                  required
                >
                  <option value="" selected disabled hidden>
                    Select Category
                  </option>
                  {/* {categories?.map((row) => (
                      <CatOpt row={row}/>
                    ))} */}
                  category
                </select>
              </div>
            </div>

            <div>
              <h1
                style={{
                  color: "black",
                  paddingRight: "3px",
                  fontWeight: "600",
                }}
              >
                Product Subcategory
              </h1>
              <div style={{ display: "block" }}>
                <select
                  defaultValue="NONE"
                  className="block px-3 py-3 w-full text-sm leading-tight text-gray-700 bg-white border rounded-xl transition duration-300 ease-in-out focus:border-blue-500"
                  //  onChange={(e) => { if (e.target.value === "NONE") { setProductData({ ...productData, subcategory: null })} else { setProductData({ ...productData, subcategory: e.target.value }) } }} disabled={id ? true : false} title={id ? "Disabled" : ""}
                  required
                >
                  <option value="" selected disabled hidden>
                    Select Subcategory
                  </option>
                  <option value="NONE">NONE</option>
                  {/* {subcategories?.map((row) => ( <SubCatOpt row={row}/> ))} */}
                  category
                </select>
              </div>
            </div>
            <div>
              <h1
                style={{
                  color: "black",
                  paddingRight: "3px",
                  fontWeight: "600",
                }}
              >
                Type
              </h1>
              <div style={{ display: "block" }}>
                <select
                  className="block px-3 py-3 w-full text-sm leading-tight text-gray-700 bg-white border rounded-xl transition duration-300 ease-in-out focus:border-blue-500"
                  //    onChange={(e) => setProductData({ ...productData, type: e.target.value })} disabled={id ? true : false} title={id ? "Disabled" : ""}
                  required
                >
                  <option value="" selected disabled hidden>
                    Select Type
                  </option>
                  {/* {types?.map((row) => ( <TypeOpt row={row}/> ))} */}
                  type
                </select>
              </div>
            </div>
          </div>

          {/*</Grid>*/}

          <div className="my-[20px] ">
            <h1
              style={{ color: "black", paddingRight: "3px", fontWeight: "600" }}
            >
              Size
            </h1>
            <div style={{ display: "block" }}>
              <select
                className="block px-3 py-3 w-full text-sm leading-tight text-gray-700 bg-white border rounded-xl transition duration-300 ease-in-out focus:border-blue-500"
                //    onChange={(e) => setProductData({ ...productData, size: e.target.value })} disabled={id ? true : false} title={id ? "Disabled" : ""}
                required
              >
                <option value="" selected disabled hidden>
                  Select Size
                </option>
                {/* {sizes?.map((row) => ( <SizeOpt row={row}/> ))} */}
                size
              </select>
            </div>
          </div>

          <Divider />

          <div className="grid grid-cols-3 gap-4" style={{ marginTop: "20px", marginBottom: "20px" }}>
               <div>
                <h1
                  style={{
                    color: "black",
                    paddingRight: "3px",
                    fontWeight: "600",
                  }}
                >
                  Order Price
                </h1>
                <div style={{ display: "block" }}>
                  <input
                    placeholder="Order Price"
                    className="block px-3 py-3 w-full text-sm leading-tight text-gray-700 bg-white border rounded-xl transition duration-300 ease-in-out focus:border-blue-500"
                    name="order_price"
                    type="number"
                    // onChange={(e) => { setProductData({ ...productData, order_price: e.target.value }) }}
                    // value={productData.order_price}
                    required
                  />
                </div>
              </div>
              <div  >
                <h1
                  style={{
                    color: "black",
                    paddingRight: "3px",
                    fontWeight: "600",
                  }}
                >
                  Retail Price
                </h1>
                <div style={{ display: "flex" }}>
                  <input
                    placeholder="Retail Price"
                    className="block px-3 py-3 w-full text-sm leading-tight text-gray-700 bg-white border rounded-xl transition duration-300 ease-in-out focus:border-blue-500"
                    name="retail_price"
                    type="number"
                    // onChange={(e) => { setProductData({ ...productData, retail_price: e.target.value }) }}
                    // value={productData.retail_price}
                    required
                  />
                </div>
              </div>
 
            
              <div style={{}}>
                <h1
                  style={{
                    color: "black",
                    paddingRight: "3px",
                    fontWeight: "600",
                  }}
                >
                  Alert
                </h1>
                <div style={{ display: "block" }}>
                  <input
                    placeholder="Alert Quantity"
                    className="block px-3 py-3 w-full text-sm leading-tight text-gray-700 bg-white border rounded-xl transition duration-300 ease-in-out focus:border-blue-500"
                    name="alert"
                    type="number"
                    // onChange={(e) => { setProductData({ ...productData, alert: e.target.value }) }}
                    // value={productData.alert}
                    required
                  />
                </div>
              </div>
             
              <div>
                <h1
                  style={{
                    color: "black",
                    paddingRight: "3px",
                    fontWeight: "600",
                  }}
                >
                  Measurement Unit
                </h1>
                <div style={{ display: "block" }}>
                  <select
                    className="block px-3 py-3 w-full text-sm leading-tight text-gray-700 bg-white border rounded-xl transition duration-300 ease-in-out focus:border-blue-500"
                    //    onChange={(e) => setProductData({ ...productData, measurement_unit: e.target.value })}
                    //     disabled={id ? true : false} title={id ? "Disabled" : ""}
                    required
                  >
                    <option value="" selected disabled hidden>
                      Select Measurement Unit
                    </option>
                    {/* {measurementUnits?.map((row) => ( <MUOpt row={row}/> ))} */}
                    something
                  </select>
                </div>
              </div>
           </div>
          
          <Divider style={{ height: "1px", background: "#000" }} />
          <div
            style={{
              width: "100%",
            }}
          >
            {/* {id ?
      '' : */}
            <div style={{   margin: "auto", marginTop: "1rem" }}>
              <h1
                style={{
                  color: "black",
                  paddingRight: "3px",
                  fontWeight: "600",
                }}
              >
                Opening Balance
              </h1>
              <div
                style={{
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  borderRadius: "6px",
                  backgroundColor: "#f0f0f0",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <h1
                  style={{
                    color: "black",
                    fontWeight: "600",
                    fontSize: "0.8rem",
                  }}
                >
                  Warehouse
                </h1>
                <h1
                  style={{
                    color: "black",
                    fontWeight: "600",
                    fontSize: "0.8rem",
                    marginRight: "10px",
                  }}
                >
                  Quantity
                </h1>
              </div>
              {/* {warehouses?.map((value, index) => ( */}
              <div
                style={{
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  borderRadius: "10px",
                  padding: "3px 10px",
                }}
              >
                <h1
                  style={{
                    color: "gray",
                    fontWeight: "600",
                    fontSize: "0.8rem",
                  }}
                >
                  warehouse_name
                  {/* {value.warehouse_name} */}
                </h1>
                <div style={{ display: "block" }}>
                  <input
                    placeholder="Qty"
                    className="block px-3 py-3 w-full text-sm leading-tight text-gray-700 bg-white border rounded-xl transition duration-300 ease-in-out focus:border-blue-500"
                    defaultValue="0"
                    style={{ width: "60%", marginLeft: "auto", padding: "7px" }}
                    name="quantity"
                    type="number"
                    //   onChange={(e) => handleOpeningBalance(index, e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* ))} */}
            </div>
            {/*  } */}
          </div>
               <div className="mt-4 mx-4">
                <h1
                  style={{
                    color: "black",
                    paddingRight: "3px",
                    fontWeight: "600",
                  }}
                >
                  Description
                </h1>
                <div style={{ display: "block" }}>
                  <textarea
                    placeholder="Description"
                    className="block px-3 py-3 w-full text-sm leading-tight text-gray-700 bg-white border rounded-xl transition duration-300 ease-in-out focus:border-blue-500"
                    name="product_name"
                    type="text"
                    // onChange={(e) => { setProductData({ ...productData, description: e.target.value }) }}
                    // value={productData.description}
                    required
                  />
                </div>
              </div>
             
        </div>

        {/* <button className={styles.submitButton} type="submit">Save and continue</button> */}
        <Grid container style={{ justifyContent: "center", marginTop: "30px" }}>
          <Button
            variant="contained"
            style={{ justifyContentContent: "center", borderRadius: "10px" }}
            type="submit"
            color="primary"
            size="large"
            className="!bg-[#007fff] !text-white"
          >
            Save and Continue
          </Button>
        </Grid>
      </form>
  );
};

export default AddEditPatient;
