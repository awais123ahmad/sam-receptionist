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
        Add Patient
      </h1>

      <Divider />
      <div>
        <div className="mt-[20px] flex">
          <div style={{ width: "50%" }}>
            <h1
              style={{
                color: "black",
                paddingRight: "3px",
                fontWeight: "600",
              }}
            >
              Patient Name
            </h1>
            <div style={{ display: "block" }}>
              <input
                placeholder="Enter Patient Name here"
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
              Phone No.
            </h1>
            <div style={{ display: "block" }}>
              <input
                placeholder="Enter Phone No. here"
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
              Gender
            </h1>
            <div style={{ display: "block" }}>
              <select
                className="block px-3 py-3 w-full text-sm leading-tight text-gray-700 bg-white border rounded-xl transition duration-300 ease-in-out focus:border-blue-500"
                //   onChange={(e) => { setCatID(e.target.value) }} disabled={id ? true : false} title={id ? "Disabled" : ""}
                required
              >
                <option value="" selected disabled hidden>
                  Select Gender
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
              Date of Birth
            </h1>
            <div style={{ display: "block" }}>
              <input
                type="date"
                className="block px-3 py-3 w-full text-sm leading-tight text-gray-700 bg-white border rounded-xl transition duration-300 ease-in-out focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/*</Grid>*/}

        <div>
            <h1
              style={{
                color: "black",
                paddingRight: "3px",
                fontWeight: "600",
              }}
            >
              Residential Address
            </h1>
            <div style={{ display: "block" }}>
              <input
                placeholder="Enter House Address here"
                className="block px-3 py-3 w-full text-sm leading-tight text-gray-700 bg-white border rounded-xl transition duration-300 ease-in-out focus:border-blue-500"
                name="product_name"
                type="text"
                // onChange={(e) => { setProductData({ ...productData, product_name: e.target.value }) }}
                // value={productData.product_name}
                required
              />
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
              CheckUp Date
            </h1>
            <div style={{ display: "block" }}>
              <input
                type="date"
                className="block px-3 py-3 w-full text-sm leading-tight text-gray-700 bg-white border rounded-xl transition duration-300 ease-in-out focus:border-blue-500"
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
              Assigned Doctor
            </h1>
            <div style={{ display: "block" }}>
              <select
                className="block px-3 py-3 w-full text-sm leading-tight text-gray-700 bg-white border rounded-xl transition duration-300 ease-in-out focus:border-blue-500"
                //   onChange={(e) => { setCatID(e.target.value) }} disabled={id ? true : false} title={id ? "Disabled" : ""}
                required
              >
                <option value="" selected disabled hidden>
                  Select Doctor
                </option>
                {/* {categories?.map((row) => (
                      <CatOpt row={row}/>
                    ))} */}
                Helllll
              </select>
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

      </div>
    </form>
  );
};

export default AddEditPatient;
