import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./Reducers/employeeSlice";
import category from "./Reducers/StockReducers/category";
import type from "./Reducers/StockReducers/type";
import size from "./Reducers/StockReducers/size";
import measurement from "./Reducers/StockReducers/measurement";
import subcategory from "./Reducers/StockReducers/subcategory";
import product from "./Reducers/StockReducers/product";
import warehouse from "./Reducers/StockReducers/warehouse";
import productset from "./Reducers/StockReducers/productset";
import income from "./Reducers/AccountReducers/income";
import transaction from "./Reducers/AccountReducers/transaction";
import company from "./Reducers/AccountReducers/company";
import credit from "./Reducers/AccountReducers/credit";
import debit from "./Reducers/AccountReducers/debit";
import expense from "./Reducers/AccountReducers/expense";
import authReducer from "./Reducers/authReducer";

const store = configureStore({
    reducer:{
// auth
        auth : authReducer,

        // stocks
        employee : employeeSlice,
        category: category,
        type: type,
        size: size,
        measurement: measurement,
        subcategory: subcategory,
        product: product,
        warehouse: warehouse,
        productset: productset,
        // accounts
        income: income,
        transaction: transaction,
        company : company,
        credit : credit,
        debit : debit,
        expense : expense,
    }
})

export default store