import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./index.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import PortalLayout from "./Components/PortalLayout";
import Patients from "./Pages/Patient/Patients/Patients";
import AddEditPatient from "./Pages/Patient/Patients/AddEditPatient";
import Category from "./Pages/Stock/Category/Category";
import SubCategory from "./Pages/Stock/SubCategory/SubCategory";
import Type from "./Pages/Stock/Type/Type";
import Size from "./Pages/Stock/SIze/Size";
import Warehouse from "./Pages/Stock/Warehouse/Warehouse";
import MeasurementUnit from "./Pages/Stock/MeasurementUnit/MeasurementUnit";
import ProductSet from "./Pages/Stock/ProductSet/ProductSet";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Company from "./Pages/Account/Company/Company";
import Income from "./Pages/Account/Income/Income";
import Expense from "./Pages/Account/Expense/Expense";
import ReceiptCredit from "./Pages/Account/ReceiptCredit/ReceiptCredit";
import PaymentDebit from "./Pages/Account/PaymentDebit/PaymentDebit";
import Transaction from "./Pages/Account/Transaction/Transaction";
import Login from "./Pages/Login";
import { SESSION_IS_AUTHENTICATED } from "./Utills/Constants";
import Supplier from "./Pages/Purchase/Supplier/Supplier";
import OrderDetails from "./Pages/Purchase/Order/OrderDetails";
import AddOrder from "./Pages/Purchase/Order/AddOrder";
import Order from "./Pages/Purchase/Order/Order";
import Customer from "./Pages/Sale/Customer/Customer";
import Invoice from "./Pages/Sale/Invoice/Invoice";
import AddInvoice from "./Pages/Sale/Invoice/AddInvoice";
import InvoiceDetails from "./Pages/Sale/Invoice/InvoiceDetails";
import Return from "./Pages/Sale/Return/Return";
import OrderReturn from "./Pages/Purchase/OrderReturn/OrderReturn";

function App() {
  const [count, setCount] = useState(0);
 

  return (
    <BrowserRouter>
      <PortalLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />

          {/* // Patient ================================================================= */}
          <Route path="/patient/patients" element={<Patients />} />
          <Route path="/patient/patients/AddEdit" element={<AddEditPatient />} />

          {/* // Stock ================================================================= */}
          <Route path="/stock/category" element={<Category />} />
          <Route path="/stock/subCategory" element={<SubCategory />} />
          <Route path="/stock/type" element={<Type />} />
          <Route path="/stock/size" element={<Size />} />
          <Route path="/stock/warehouse" element={<Warehouse />} />
          <Route path="/stock/measurementUnit" element={<MeasurementUnit />} />
          <Route path="/stock/productSet" element={<ProductSet />} />

          {/* // Account  ================================================================= */}
          <Route path="/account/company" element={<Company />} />
          <Route path="/account/income" element={<Income />} />
          <Route path="/account/expense" element={<Expense />} />
          <Route path="/account/receiptCredit" element={<ReceiptCredit />} />
          <Route path="/account/paymentDebit" element={<PaymentDebit />} />
          <Route path="/account/transaction" element={<Transaction />} />

          {/* // Purchase  ================================================================= */}
          <Route path="/purchase/supplier" element={<Supplier />} />
          <Route path="/purchase/order" element={<Order />} />
          <Route path="/purchase/order/details" element={<OrderDetails />} />
          <Route path="/purchase/order/add" element={<AddOrder />} />
          <Route path="/purchase/order/return" element={<OrderReturn />} />

          {/* // Sale  ================================================================= */}
          <Route path="/sale/customer" element={<Customer />} />
          <Route path="/sale/invoice" element={<Invoice />} />
          <Route path="/sale/invoice/details" element={<InvoiceDetails />} />
          <Route path="/sale/invoice/add" element={<AddInvoice />} />
          <Route path="/sale/return" element={<Return />} />



        </Routes>
      </PortalLayout>
    </BrowserRouter>
  );
}

export default App;
