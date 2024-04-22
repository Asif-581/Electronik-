import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import {
  InputNumber,
  InputNumberChangeEvent,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import {
  deleteProductAsync,
  fetchCategories,
  fetchCompanies,
  getAllProducts,
  updateProductAsync,
} from "../features/product/ProductSlice";
import { productType } from "../Types/type";
import { formatPrice } from "../utils/helper";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Badge } from "primereact/badge";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { SelectItem } from "primereact/selectitem";
import { Product } from "../Types/type";

type Company = {
  id: string | undefined;
  company_name: string | undefined;
};

type Category = {
  id: string | undefined;
  name: string | undefined;
};

//  type product = {
//   id?: string;
//   name?: string;
//   description?: string;
//   price?: number;
//   stock?: number;
//   image?: string;
//   categories?: Category | null;
//   category_id?: string;
//   company_id?: string;
//   colors?: string[];
//   companies?: Company | null;
//   quantity?:number
// };

export default function AdminTable() {
  let emptyProduct: Product = {
    id: "",
    name: "",
    image: "",
    description: "",
    categories: null,
    price: 0,
    companies: null,
    stock: 0,
    category_id: "",
  };

  const [productDialog, setProductDialog] = useState<boolean>(false);
  const [deleteProductDialog, setDeleteProductDialog] =
    useState<boolean>(false);
  const [deleteProductsDialog, setDeleteProductsDialog] =
    useState<boolean>(false);
  const [product, setProduct] = useState<Product>(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState<Product | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<Product[]>>(null);
  const { products, categories, companies } = useAppSelector(
    (store) => store.products
  );

  const dispatch = useAppDispatch();
  // const categories = ["Kitchen", "Bedroom", "Dining", "Living room", "Office"];
  //  const categoryOptions = [
  //    { label: "Kitchen", value: "Kitchen" },
  //    { label: "Bedroom", value: "Bedroom" },
  //    { label: "Dining", value: "Dining" },
  //    { label: "Living room", value: "Living room" },
  //    { label: "Office", value: "Office" },
  //  ];

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categoryOptions = categories.map((category) => {
    const { name, id } = category;
    return { name: name, id: id };
  });

  const companiesOptions = companies.map((company) => {
    const { company_name, id } = company;
    return { company_name: company_name, id: id };
  });

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(fetchCategories());
    dispatch(fetchCompanies());
  }, []);

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = async () => {
    setSubmitted(true);

    try {
      await dispatch(
        updateProductAsync({
          productId: product.id!,
          updatedProduct: {
            ...product,
            company: product.companies?.id,
            category: product.categories?.id,
          },
        })
      );
      dispatch(getAllProducts());
      setProductDialog(false);
      setProduct(emptyProduct);
    } catch (error) {
      // Handle any errors that occur during the update process
      console.error("Error saving product:", error);
      // Optionally, display an error message to the user
    }
  };

  const editProduct = (product: Product) => {
    setProduct({ ...product });

    setProductDialog(true);
  };

  const confirmDeleteProduct = (product: Product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = async () => {
    await dispatch(deleteProductAsync(product?.id!));
    dispatch(getAllProducts());
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };

  const deleteSelectedProducts = () => {
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  const onCategoryChange = (e: DropdownChangeEvent) => {
    product.categories = e.value;
    setSelectedCategory(e.value);
    setProduct(product);
  };

  const onInputChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };

    // @ts-ignore
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (
    e: InputNumberValueChangeEvent,
    name: string
  ) => {
    const val = e.value || 0;
    let _product = { ...product };

    // @ts-ignore
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _product = { ...product };

    _product["image"] = e.target.value;
    console.log(e.target.value);
    setProduct(_product);
  };

  const onCompanyChange = (e: DropdownChangeEvent) => {
    //let _product = { ...product };

    product.companies = e.value;
    setSelectedCompany(e.value);
    setProduct(product);
  };

  const onPriceChange = (e: any) => {
    const inputValue = e.target.value;

    const newPrice = parseInt(inputValue);

    if (!isNaN(newPrice)) {
      const updatedProduct = { ...product, price: newPrice };
      setProduct(updatedProduct);
    }
  };

  const imageBodyTemplate = (rowData: productType) => {
    return (
      <img
        src={rowData.image}
        alt={rowData.name!}
        className="shadow-2 border-round"
        style={{ width: "100px", height: "80px" }}
      />
    );
  };

  const priceBodyTemplate = (rowData: productType) => {
    return formatPrice(rowData?.price!);
  };

  const statusBodyTemplate = (rowData: productType) => {
    const severity = getSeverity(rowData);
    return (
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {
          <Tag style={{ backgroundColor: severity?.color, padding: "5px" }}>
            {severity?.status === "instock" ? "INSTOCK" : "OUTOFSTOCK"}
          </Tag>
        }
        <Badge value={rowData.stock}></Badge>
      </div>
    );
  };

  const actionBodyTemplate = (rowData: Product) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const getSeverity = (product: productType) => {
    const stock = product.stock;

    if (stock! > 0) {
      return { status: "instock", color: "green" };
    } else if (stock === 0) {
      return { status: "outofstock", color: "red" };
    } else {
      return null;
    }
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Products</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          placeholder="Search..."
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            setSearchQuery(target.value);
          }}
        />
      </span>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        outlined
        onClick={hideDialog}
        className="mr-4"
      />
      <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductDialog}
        className="mr-3"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );

  return (
    <div className=" responsive-container">
      <Toast ref={toast} />
      <div className="card ">
        <DataTable
          ref={dt}
          value={products}
          selection={selectedProducts}
          onSelectionChange={(e) => {
            if (Array.isArray(e.value)) {
              setSelectedProducts(e.value);
            }
          }}
          dataKey="id"
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          header={header}
        >
          <Column
            field="image"
            header="Image"
            body={imageBodyTemplate}
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="name"
            header="Name"
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>

          <Column
            field="price"
            header="Price"
            body={priceBodyTemplate}
            sortable
            style={{ minWidth: "8rem" }}
          ></Column>
          <Column
            field="category"
            header="Category"
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="company"
            header="Company"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="inventoryStatus"
            header="Status"
            body={statusBodyTemplate}
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            header="Actions"
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={productDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Product Details"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-grid p-fluid">
          <div className="p-col-12">
            <label htmlFor="name" className="font-bold">
              Name
            </label>
            <InputText
              id="name"
              value={product.name}
              onChange={(e) => onInputChange(e, "name")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !product.name,
              })}
            />
            {submitted && !product.name && (
              <small className="p-error">Name is required.</small>
            )}
          </div>

          <div className="p-col-12">
            <label className="mb-3 font-bold">
              {/* Company : {product.company} */}
            </label>
            <Dropdown
              id="company"
              name="company"
              optionLabel="company_name"
              value={product.companies}
              options={companiesOptions}
              onChange={onCompanyChange}
              placeholder="Select Company"
              className="w-full"
            />
          </div>

          <div className="p-col-12">
            <label htmlFor="description" className="font-bold">
              Description
            </label>
            <InputTextarea
              id="description"
              value={product.description}
              onChange={(e) => onInputChange(e, "description")}
              required
              rows={3}
              cols={20}
            />
          </div>

          <div className="p-col-12">
            <label className="mb-3 font-bold">Category</label>
            <Dropdown
              id="category"
              name="category"
              optionLabel="name"
              value={product.categories}
              options={categoryOptions}
              onChange={onCategoryChange}
              placeholder="Select Category"
              className="w-full"
            />
          </div>

          <div className="p-col-12">
            <label htmlFor="price" className="font-bold">
              Price
            </label>
            <InputNumber
              id="price"
              value={product.price ?? 0}
              onValueChange={(e) => onPriceChange(e)}
              className="w-full"
            />
          </div>

          <div className="p-col-12">
            <label htmlFor="stock" className="font-bold">
              Stock
            </label>
            <InputNumber
              id="stock"
              value={product.stock}
              onValueChange={(e) => onInputNumberChange(e, "stock")}
              className="w-full"
            />
          </div>

          <div className="p-col-12">
            <label htmlFor="image" className="font-bold">
              Image
            </label>
            <InputText
              id="image"
              value={product.image}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onImageChange(e)
              }
              className="w-full"
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductsDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>Are you sure you want to delete the selected products?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
