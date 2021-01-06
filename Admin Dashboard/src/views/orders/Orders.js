import CIcon from '@coreui/icons-react'
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
    CLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CRow,
    CSelect
} from '@coreui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails } from '../../actions/orderdetails'
import { onDeleteOrder, onGetListOrder, updateOrder } from '../../actions/orders'

const getBadge = status => {
    switch (status) {
        case 'Pending': return 'warning'
        case 'Delivered': return 'success'
        case 'Cancle': return 'danger'
        default: return 'primary'
    }
}

const Orders = () => {

    const dispatch = useDispatch();
    const { ListOrder } = useSelector(state => state.orders);
    let { ListOrderDetails } = useSelector(state => state.orderdetails);
    const [modal, setModal] = React.useState(false);
    const [orderID, setOrderID] = React.useState('');
    const [editItem, setEditItem] = React.useState("");
    const [modalEdit, setModalEdit] = React.useState(false);
    const [selectedOption, setSelectedOption] = React.useState({
        status: '',
        dateDelivery: ''
    });
    const [percent , setPercent] = React.useState(0);

    useEffect(() => {
        dispatch(onGetListOrder())
        ListOrderDetails = []
    }, [dispatch])

    useEffect(() => {
        const SetModal = () => {
            if (ListOrderDetails.length > 0) {
                setModal(m => !m);
            }
        }
        SetModal()
    }, [ListOrderDetails])

    const toggle = () => {
        setModal(!modal);
    }

    const GetOrderDetailsDispatch = (orderID) => {
        dispatch(getOrderDetails(orderID));
        setOrderID(orderID);
        setPercent(0);
        var orderObj = ListOrder.filter(x => x.orderID === orderID);
        if(orderObj[0].percent !== null){
            setPercent(orderObj[0].percent);
        }
    }

    const GetInfoOrder = (orderID, name, dateCreate) => {
        var result = "";

        if (ListOrder.length > 0) {
            var filter = ListOrder.filter(values => values.orderID === orderID);
            result = name !== null ? filter[0].name : filter[0].dateCreate
        }

        return result;
    }

    const editOrder = (item) => {
        setEditItem(item);
        selectedOption.dateDelivery = item.dateDelivery;
        selectedOption.status = item.status;
        var el = document.getElementById('status-select');
        if (el) {
            document.getElementById('status-select').value = item.status;
        }
        toggleEdit()
    }

    const toggleEdit = () => {
        setModalEdit(!modalEdit);
    }

    const orderChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        setSelectedOption(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const cofirmUpdateOrder = () => {

        var orderDTO = {
            dateDelivery: selectedOption.dateDelivery,
            status: selectedOption.status === "Pending" ? 0 : (selectedOption.status === "Delivered" ? 1 : 2)
        }

        dispatch(updateOrder(editItem.orderID, orderDTO))

        setModalEdit(!modalEdit)
    }

    const deleteOrder = (orderID) => {
        dispatch(onDeleteOrder(orderID));
    }

    const Total = (ListDetail) => {
        var result = 0;

        if (ListDetail.length > 0) {
            for (let i = 0; i < ListDetail.length; i++) {
                result += ListDetail[i].price;
            }
        }

        return result;
    }

    const items = []

    if (ListOrder.length > 0) {
        for (var i = 0; i < ListOrder.length; i++) {
            items.push({
                orderID: ListOrder[i].orderID,
                name: ListOrder[i].name,
                date: ListOrder[i].dateCreate,
                total: ListOrder[i].total,
                payment: ListOrder[i].payment,
                status: ListOrder[i].status === 0 ? "Pending" : (ListOrder[i].status === 1 ? "Delivered" : "Cancle"),
                phone: ListOrder[i].phone,
                zip: ListOrder[i].zip,
                dateCreate: ListOrder[i].dateCreate,
                email: ListOrder[i].email,
                city: ListOrder[i].city,
                address: ListOrder[i].address,
                dateDelivery: ListOrder[i].dateDelivery,
                state: ListOrder[i].state
            })
        }
    }

    const fields = [
        { key: 'name', label: 'Customer', _classes: 'font-weight-bold' },
        'date', { key: 'total', _classes: 'font-weight-bold' },
        { key: 'payment', _classes: 'font-weight-bold' },
        'status',
        { key: 'action', filter: false, _style: { width: '15%' } }
    ]

    const itemDetails = []

    if (ListOrderDetails.length > 0) {
        for (let i = 0; i < ListOrderDetails.length; i++) {
            itemDetails.push({
                name: ListOrderDetails[i].name,
                quantity: ListOrderDetails[i].quantity,
                price: ListOrderDetails[i].price
            })
        }
    }

    const fieldsItemDetails = [
        { key: 'name', _classes: 'font-weight-bold' },
        'quantity',
        'price'
    ]

    return (
        <>
            <div className="card">
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>
                                All Order
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
                                                    <CBadge color={getBadge(item.status)}>
                                                        {item.status}
                                                    </CBadge>
                                                </td>
                                            ),
                                        'action':
                                            (item, index) => {
                                                return (
                                                    <>
                                                        <td className="py-2">
                                                            <CButton size="sm" color="primary" onClick={() => GetOrderDetailsDispatch(item.orderID)}>
                                                                <CIcon name="cil-find-in-page"></CIcon>
                                                            </CButton>

                                                            {item.status === "Pending" ? <CButton size="sm" color="info" className="ml-1" onClick={() => editOrder(item)}>
                                                                <CIcon name="cil-pencil"></CIcon>
                                                            </CButton> : null}
                                                            
                                                            <CButton size="sm" color="danger" className="ml-1" onClick={() => deleteOrder(item.orderID)}>
                                                                <CIcon name="cil-trash"></CIcon>
                                                            </CButton>
                                                        </td>
                                                    </>
                                                )
                                            }
                                    }}
                                />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
                <CModal
                    show={modalEdit}
                    onClose={toggleEdit}
                >
                    <b><CModalHeader>Order Information</CModalHeader></b>
                    <CModalBody>
                        <CForm>
                            <CFormGroup row>
                                <CCol md="3">
                                    <b><CLabel>Name : </CLabel></b>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput value={editItem.name || ""} disabled name="text-input" />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <b><CLabel>Address : </CLabel></b>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput value={editItem.address || ""} disabled name="text-input" />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <b><CLabel>City : </CLabel></b>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput value={editItem.city || ""} disabled name="text-input" />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <b><CLabel>State : </CLabel></b>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput value={editItem.state || ""} disabled name="text-input" />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <b><CLabel>Total : </CLabel></b>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput value={editItem.total || ""} disabled name="text-input" />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <b><CLabel>Payment : </CLabel></b>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput value={editItem.payment || ""} disabled name="text-input" />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <b><CLabel>Date Order : </CLabel></b>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="date" value={editItem.dateCreate || ""} disabled />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <b><CLabel>Date Delivery </CLabel></b>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="date"
                                        disabled={editItem.status === "Cancle" ? true : false}
                                        onChange={orderChange} name="dateDelivery" />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <b><CLabel>Status : </CLabel></b>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CSelect onChange={orderChange} id="status-select" name="status">
                                        <option value="Pending"> Pending </option>
                                        <option value="Delivered"> Delivered </option>
                                        <option value="Cancle"> Cancle </option>
                                    </CSelect>
                                </CCol>
                            </CFormGroup>
                        </CForm>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="primary" onClick={cofirmUpdateOrder}>Save Changes</CButton>{' '}
                        <CButton color="secondary" onClick={toggleEdit}>Cancle</CButton>{' '}
                    </CModalFooter>
                </CModal>

                <CModal
                    show={modal}
                    onClose={toggle}
                >
                    <b><CModalHeader>Order Details {orderID} </CModalHeader></b>
                    <CModalBody>
                        <CForm>
                            <CFormGroup row>
                                <CCol>
                                    <CLabel><b>Customer</b> : {orderID ? GetInfoOrder(orderID, 1, null) : ""}</CLabel>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol>
                                    <CLabel> <b>Date Create</b> : {orderID ? GetInfoOrder(orderID, null, 1) : ""}</CLabel>
                                </CCol>
                            </CFormGroup>
                        </CForm>
                        <CCard>
                            <CDataTable
                                items={itemDetails}
                                fields={fieldsItemDetails}
                            />
                        </CCard>
                        <CForm className="float-right">
                            {percent > 0 ? <>
                                <CFormGroup row>
                                    <CCol>
                                        <CLabel><b>Subtotal : ${Total(ListOrderDetails)} </b></CLabel>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol>
                                        <CLabel><b>Discount : {percent}% </b></CLabel>
                                    </CCol>
                                </CFormGroup> </> : null}
                            <CFormGroup row>
                                <CCol>
                                    <CLabel> <b>Total : ${percent > 0 ?
                                        (Total(ListOrderDetails) - ((Total(ListOrderDetails) * percent) / 100))
                                        : Total(ListOrderDetails)}</b></CLabel>
                                </CCol>
                            </CFormGroup>
                        </CForm>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="primary" onClick={toggle}>OK</CButton>{' '}
                    </CModalFooter>
                </CModal>
            </div>
        </>
    )
}

export default Orders
