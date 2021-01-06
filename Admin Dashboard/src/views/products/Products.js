import {
    CBadge,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,

    CDataTable,
    CForm,
    CFormGroup,
    CInput,

    CLabel, CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CRow,
    CSelect, CTextarea
} from '@coreui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct, onDeleteProduct, onGetAllBrand, onGetAllCategory, onUpdateProduct } from '../../actions/products'

const getBadge = status => {
    switch (status) {
        case 'Stocking': return 'success'
        case 'Out Of Stock': return 'danger'
        default: return 'primary'
    }
}

const Products = () => {

    const dispatch = useDispatch()
    const [modal, setModal] = React.useState(false);
    const [modalDelete, setModalDelete] = React.useState(false);
    const { ListProduct } = useSelector(state => state.products);
    const [editInforItem, setEditInfoItem] = React.useState({
        productID : '',
        name: '',
        price: 0,
        quantity: 0,
        category: '',
        brand: '',
        description: ''
    });
    const { ListBrand } = useSelector(state => state.brands);
    const { ListCategory } = useSelector(state => state.categories);

    useEffect(() => {
        dispatch(fetchProduct());
        dispatch(onGetAllBrand());
        dispatch(onGetAllCategory());
    }, [dispatch]);

    const toggle = (item) => {
        setModal(!modal);
        if (modal === false) {
            setEditInfoItem(prev => ({
                ...prev,
                productID : item.productID,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                category: item.category,
                brand: item.brand,
                description: item.description
            }))
        }
    }

    const toggleDelete = (item) => {
        setModalDelete(!modalDelete);
        setEditInfoItem(prev => ({
            ...prev,
            productID : item.productID,
        }))
    }

    const items = []

    if (ListProduct.length > 0) {
        for (var i = 0; i < ListProduct.length; i++) {
            items.push({
                productID: ListProduct[i].productID,
                name: ListProduct[i].name,
                price: ListProduct[i].price,
                quantity: ListProduct[i].quantity,
                category: ListProduct[i].typeProduct.type,
                brand: ListProduct[i].brand.name,
                status: ListProduct[i].quantity > 0 ? "Stocking" : "Out Of Stock",
                description: ListProduct[i].description
            })
        }
    }

    const fields = [
        { key: 'name', _classes: 'font-weight-bold' },
        'price', 'quantity',
        { key: 'category', _classes: 'font-weight-bold' },
        { key: 'brand', label: 'Brand', _classes: 'font-weight-bold' }, 'status',
        { key: 'action', filter: false, _style: { width: '15%' } }
    ]

    const onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        setEditInfoItem(prev => ({
            ...prev,
            [name] : value
        }))
    }
    useEffect(() => {
        setEditInfoItem(prev => ({
            ...prev
        }))
    },[editInforItem.brand])

    useEffect(() => {
        setEditInfoItem(prev => ({
            ...prev
        }))
    },[editInforItem.category])

    const confirmEdit = () => {
        setModal(!modal);
        var productDTO = {
            name: editInforItem.name,
            description: editInforItem.description,
            price: editInforItem.price,
            quantity: editInforItem.quantity,
            typeProduct: {
                type : editInforItem.category
            },
            brand: {
                name : editInforItem.brand
            },
        }
        dispatch(onUpdateProduct(editInforItem.productID,productDTO));
    }

    const confirmDelete = () => {
        setModalDelete(!modalDelete);
        dispatch(onDeleteProduct(editInforItem.productID));
    }


    return (
        <>
            <div className="card">
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>
                                All Products
                            </CCardHeader>
                            <CCardBody>
                                <CDataTable
                                    items={items}
                                    fields={fields}
                                    hover
                                    tableFilter
                                    striped
                                    bordered
                                    itemsPerPageSelect
                                    itemsPerPage={5}
                                    pagination
                                    columnFilter
                                    scopedSlots={{
                                        'status':
                                            (item) => (
                                                <td>
                                                    <CBadge color={getBadge(item.status === "Stocking" ? "Stocking" : "Out Of Stock")}>
                                                        {item.status}
                                                    </CBadge>
                                                </td>
                                            ),
                                        'action':
                                            (item, index) => {
                                                return (
                                                    <>
                                                        <td className="py-2">
                                                            <CButton size="sm" color="info" onClick={() => toggle(item)}>
                                                                Edit
                                                            </CButton>
                                                            <CButton size="sm" color="danger" className="ml-1" onClick={() => toggleDelete(item)}>
                                                                Delete
                                                            </CButton>
                                                        </td>
                                                    </>
                                                )
                                            }
                                    }}
                                />
                                <CModal
                                    show={modal}
                                    onClose={toggle}
                                >
                                    <CModalHeader closeButton>Edit Product</CModalHeader>
                                    <CModalBody>
                                        <CCardBody>
                                            <CForm id="product-details-form" className="form-horizontal">
                                                <CFormGroup row>
                                                    <CCol md="3">
                                                        <CLabel htmlFor="text-input">Product Name</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput id="product-name" onChange={onChange} value={editInforItem.name} name="name" placeholder="Product Name" />
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="3">
                                                        <CLabel htmlFor="text-input">Price</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput id="price" onChange={onChange} value={editInforItem.price} name="price" />
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="3">
                                                        <CLabel htmlFor="text-input">Quantity</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput id="quantity" onChange={onChange} value={editInforItem.quantity} name="quantity" />
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="3">
                                                        <CLabel htmlFor="select">Category</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CSelect custom onChange={onChange} name="category" value={editInforItem.category}>
                                                            <option value="0">Please select</option>
                                                            {
                                                                ListCategory.map((category, index) => {
                                                                    return (
                                                                        <option key={index} value={category.type}>{category.type}</option>
                                                                    )
                                                                })
                                                            }
                                                        </CSelect>
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="3">
                                                        <CLabel htmlFor="select">Brand</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CSelect custom name="brand" onChange={onChange} value={editInforItem.brand}>
                                                            <option value="0">Please select</option>
                                                            {
                                                                ListBrand.map((brand, index) => {
                                                                    return (
                                                                        <option key={index} value={brand.name}>{brand.name}</option>
                                                                    )
                                                                })
                                                            }
                                                        </CSelect>
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="3">
                                                        <CLabel htmlFor="textarea-input">Description</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CTextarea
                                                            onChange={onChange}
                                                            value={editInforItem.description}
                                                            name="description"
                                                            id="textarea-input"
                                                            rows="9"
                                                            placeholder="Content..."
                                                        />
                                                    </CCol>
                                                </CFormGroup>
                                            </CForm>
                                        </CCardBody>
                                    </CModalBody>
                                    <CModalFooter>
                                        <CButton color="primary" onClick={confirmEdit}>Save Changes</CButton>{' '}
                                        <CButton
                                            color="secondary"
                                            onClick={toggle}
                                        >Cancel</CButton>
                                    </CModalFooter>
                                </CModal>
                                <CModal
                                    show={modalDelete}
                                    onClose={toggleDelete}
                                >
                                    <CModalHeader closeButton>Confirm Delete ? </CModalHeader>
                                    <CModalBody>
                                        Do you want to delete this product ?
                                    </CModalBody>
                                    <CModalFooter>
                                        <CButton color="primary" onClick={confirmDelete}>OK</CButton>{' '}
                                        <CButton
                                            color="secondary"
                                            onClick={toggleDelete}
                                        >Cancel</CButton>
                                    </CModalFooter>
                                </CModal>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </div>
        </>
    )
}

export default Products
