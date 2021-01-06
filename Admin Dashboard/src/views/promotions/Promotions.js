import CIcon from '@coreui/icons-react'
import {
    CBadge,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CFormGroup,
    CInput,
    CLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CSelect,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTabPane,
    CTabs,
    CTextarea,
} from '@coreui/react'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select, { components } from 'react-select';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { onAddPromotion, onGetAllPromotion, onGetProductPromotion, onDeletePromotion } from '../../actions/promotion';
import { fetchProduct } from '../../actions/products'
function arrayMove(array, from, to) {
    array = array.slice();
    array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
    return array;
}

const SortableMultiValue = SortableElement(props => {
    // this prevents the menu from being opened/closed when the user clicks
    // on a value to begin dragging it. ideally, detecting a click (instead of
    // a drag) would still focus the control and toggle the menu, but that
    // requires some magic with refs that are out of scope for this example
    const onMouseDown = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    const innerProps = { onMouseDown };
    return <components.MultiValue {...props} innerProps={innerProps} />;
});

const SortableSelect = SortableContainer(Select);

const Promotions = (...props) => {

    const initialState = {
        name: '',
        for: '0',
        form: '0',
        status: 0,
        totalBill: 0,
        promotional: 0,
        dateStart: '',
        dateEnd: ''
    }

    const dispatch = useDispatch();
    const [state, setState] = React.useState({
        name: '',
        for: '0',
        form: '0',
        status: 0,
        totalBill: 0,
        promotional: 0,
        GiftProduct: [],
        dateStart: '',
        dateEnd: ''
    })

    const [selected, setSelected] = React.useState([]);
    const [modalAddPromotion, setModalPromotion] = React.useState(false);
    const [modalDelete, setModalDelete] = React.useState(false);
    const [editing, setEditing] = React.useState(false);
    const [deleteID, setDeleteID] = React.useState('');

    const resetState = () => {
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        });
    }

    useEffect(() => {
        dispatch(fetchProduct())
        dispatch(onGetAllPromotion())
        dispatch(onGetProductPromotion())
    }, [dispatch]);

    const { ListProduct } = useSelector(state => state.products);
    const { ListPromotion } = useSelector(state => state.promotion);
    const { ListProductPromotion } = useSelector(state => state.productPromotion);
    const productOptions = [];

    const onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        if (name === 'for' && value === "1") {
            state.form = "0";
        }

        setState(prev => ({
            ...prev,
            [name]: value
        }))
        
    }

    if (ListProduct.length > 0) {
        ListProduct.map((product, index) => {
            productOptions.push({
                value: product.productID,
                label: product.name
            })
        })
    }

    const onChangeSelect = selectedOptions => setSelected(selectedOptions);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        const newValue = arrayMove(selected, oldIndex, newIndex);
        setSelected(newValue);
        console.log('Values sorted:', newValue.map(i => i.value));
    };

    const toggleAddPromotion = () => {
        setModalPromotion(!modalAddPromotion);
        resetState().then(setState({ ...initialState }));
        setSelected([])
    }

    const toggleEditPromotion = (promotionID) => {

        setModalPromotion(!modalAddPromotion);

        setEditing(!editing);

        var getPromotion = {}

        ListPromotion.map((promotion, index) => {
            if (promotion.promotionID === promotionID) {
                getPromotion = promotion;
            }
        })

        var GiftProduct = [];

        ListProduct.map((product, index) => {
            ListProductPromotion.map((productPromotion, key) => {
                if (productPromotion.promotionID === promotionID &&
                    productPromotion.productID === product.productID) {
                    GiftProduct.push({
                        value: productPromotion.productID,
                        label: product.name
                    })
                }
            })
        })

        setSelected(GiftProduct);

        setState(prev => ({
            ...prev,
            name: getPromotion.name,
            for: "" + getPromotion.forPromotion,
            form: "" + getPromotion.formPromotion,
            totalBill: getPromotion.totalBill,
            promotional: getPromotion.promotionValue,
            dateStart: getPromotion.dateStart,
            dateEnd: getPromotion.dateEnd,
            status: getPromotion.status
        }))
    }

    const toggleDelete = (promotionID) => {
        setDeleteID(promotionID);
        setModalDelete(!modalDelete);
    }

    const onConfirmDelete = () => {
        dispatch(onDeletePromotion(deleteID));
        setModalDelete(!modalDelete);
    }

    const onDispatchAddPromotion = () => {

        var promotionDTO = {
            name : state.name,
            forPromotion: parseInt(state.for, 10),
            formPromotion: parseInt(state.form, 10),
            dateStart: state.dateStart,
            dateEnd: state.dateEnd,
            status: parseInt(state.status, 10)
        }

        if (parseInt(state.for, 10) === 0 && parseInt(state.form, 10) === 0) {
            promotionDTO["totalBill"] = parseInt(state.totalBill, 10);
            promotionDTO["promotionValue"] = parseInt(state.promotional, 10);
        }

        if (parseInt(state.for, 10) === 1 && parseInt(state.form, 10) === 0) {
            promotionDTO["productID"] = [];
            for (let i = 0; i < selected.length; i++) {
                promotionDTO["productID"].push(selected[i].value);
            }
            promotionDTO["promotionValue"] = parseInt(state.promotional, 10);
        }

        setModalPromotion(!modalAddPromotion);

        dispatch(onAddPromotion(promotionDTO));
    }

    const getBadge = status => {
        switch (status) {
            case 'Active': return 'success'
            case 'Inactive': return 'warning'
            case 'Expired': return 'danger'
            default: return 'primary'
        }
    }

    var items = [];

    if (ListPromotion.length > 0) {
        for (var i = 0; i < ListPromotion.length; i++) {
            items.push({
                promotionID: ListPromotion[i].promotionID,
                name: ListPromotion[i].name,
                for: ListPromotion[i].forPromotion === 0 ? "Bill" : "Product",
                form: ListPromotion[i].forPromotion === 0 ?
                    (ListPromotion[i].formPromotion === 0 ? "Bill Discount" : "Gift For Customer") : "Items Discount",
                start: ListPromotion[i].dateStart,
                end: ListPromotion[i].dateEnd,
                status: ListPromotion[i].status === 0 ? "InActive" : (ListPromotion[i].status === 1 ? "Active" : "Expired"),
                totalBill: ListPromotion[i].totalBill
            })
        }
    }

    const fields = [
        { key: 'name', _classes: 'font-weight-bold ' },
        { key: 'for', _classes: 'font-weight-bold' },
        { key: 'form', _classes: 'font-weight-bold' },
        { key: 'start', _classes: 'font-weight-bold' },
        { key: 'end', _classes: 'font-weight-bold' },
        { key: 'status', _classes: 'font-weight-bold' },
        { key: 'action', filter: false, _style: { width: '15%' } }
    ];

    return (
        <>
            <div className="card">
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>
                                All Promotions
                            </CCardHeader>
                            <CCardHeader>
                                <CButton shape="pill" color="primary" onClick={toggleAddPromotion} >
                                    <CIcon name="cil-library-add" /> Add Promotion
                                </CButton>
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
                                                            <CButton size="sm" color="info" onClick={() => toggleEditPromotion(item.promotionID)}>
                                                                Edit
                                                            </CButton>
                                                            <CButton size="sm" color="danger" className="ml-1" onClick={() => toggleDelete(item.promotionID)}>
                                                                Delete
                                                            </CButton>
                                                        </td>
                                                    </>
                                                )
                                            }
                                    }}
                                />
                            </CCardBody>
                            <CModal
                                show={modalAddPromotion}
                                onClose={() => toggleAddPromotion(false)}>
                                <CModalHeader closeButton>Add Promotions</CModalHeader>
                                <CModalBody>
                                    <CTabs>
                                        <CNav variant="tabs">
                                            <CNavItem>
                                                <CNavLink>
                                                    Promotion Information
                                                </CNavLink>
                                            </CNavItem>
                                            <CNavItem>
                                                <CNavLink>
                                                    Time
                                                </CNavLink>
                                            </CNavItem>
                                        </CNav>
                                        <CTabContent>
                                            <CTabPane>
                                                <br />
                                                <CFormGroup row>
                                                    <CCol md="3">
                                                        <CLabel htmlFor="select">Name</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput name="name" value={state.name} onChange={onChange} placeholder="Enter your name of promotion" />
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="3">
                                                        <CLabel>For</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CSelect custom value={state.for} onChange={onChange} name="for" >
                                                            <option value={0}> Bill </option>
                                                            <option value={1}> Product </option>
                                                        </CSelect>
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="3">
                                                        <CLabel >Form</CLabel>
                                                    </CCol>
                                                    {state.for === "0" ? <>
                                                        <CCol xs="12" md="9">
                                                            <CSelect custom value={state.form} onChange={onChange} name="form">
                                                                <option value={0}> Bill Discount </option>
                                                            </CSelect>
                                                        </CCol></> : <>
                                                            <CCol xs="12" md="9">
                                                                <CSelect custom value={state.form} onChange={onChange} name="form">
                                                                    <option value={0}> Items Discount </option>
                                                                </CSelect>
                                                            </CCol></>}
                                                </CFormGroup>
                                                {state.for === "1" && state.form === "0" ? <><CFormGroup row>
                                                    <CCol md="3">
                                                        <CLabel htmlFor="select">Products</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <SortableSelect
                                                            // react-sortable-hoc props:
                                                            axis="xy"
                                                            onSortEnd={onSortEnd}
                                                            distance={4}
                                                            // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
                                                            getHelperDimensions={({ node }) => node.getBoundingClientRect()}
                                                            // react-select props:
                                                            isMulti
                                                            options={productOptions}
                                                            value={selected}
                                                            onChange={onChangeSelect}
                                                            components={{
                                                                MultiValue: SortableMultiValue,
                                                            }}
                                                            closeMenuOnSelect={false} />
                                                    </CCol>
                                                </CFormGroup>
                                                    <CFormGroup row>
                                                        <CCol md="3">
                                                            <CLabel htmlFor="select">Promotional Value</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="9">
                                                            <CInput name="promotional" name="promotional" value={state.promotional} onChange={onChange} placeholder="Enter Promotional Value" />
                                                        </CCol>
                                                    </CFormGroup></> : null}

                                                {state.form === "0" && state.for === "0" ? <>
                                                    <CFormGroup row>
                                                        <CCol md="3">
                                                            <CLabel >Total Bill</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="9">
                                                            <CInput name="totalBill" value={state.totalBill} onChange={onChange} placeholder="Enter Total Bill" />
                                                        </CCol>
                                                    </CFormGroup>
                                                    <CFormGroup row>
                                                        <CCol md="3">
                                                            <CLabel htmlFor="select">Promotional Value</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="9">
                                                            <CInput name="promotional" name="promotional" value={state.promotional} onChange={onChange} placeholder="Enter Promotional Value" />
                                                        </CCol>
                                                    </CFormGroup></> : null}
                                                <CFormGroup row>
                                                    <CCol md="3">
                                                        <CLabel htmlFor="select">Status</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CSelect custom value={state.status} name="status" onChange={onChange} >
                                                            <option value={0}> Not Active </option>
                                                            <option value={1}> Active </option>
                                                        </CSelect>
                                                    </CCol>
                                                </CFormGroup>
                                            </CTabPane>
                                            <CTabPane>
                                                <br />
                                                <CFormGroup row>
                                                    <CCol md="3">
                                                        <CLabel htmlFor="select">Start</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput type="date" name="dateStart" value={state.dateStart} onChange={onChange} />
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="3">
                                                        <CLabel htmlFor="select">End</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput type="date" name="dateEnd" value={state.dateEnd} onChange={onChange} />
                                                    </CCol>
                                                </CFormGroup>
                                            </CTabPane>
                                        </CTabContent>
                                    </CTabs>
                                </CModalBody>
                                <CModalFooter>
                                    <CButton color="primary" onClick={onDispatchAddPromotion}>OK</CButton>{' '}
                                    <CButton
                                        color="secondary"
                                        onClick={() => toggleAddPromotion(false)}
                                    >Cancel</CButton>
                                </CModalFooter>
                            </CModal>
                            <CModal
                                show={modalDelete}
                                onClose={toggleDelete}
                            >
                                <CModalHeader closeButton>Delete Promotion ? </CModalHeader>
                                <CModalBody>
                                    Do you want to Delete Promotion ?
                                    </CModalBody>
                                <CModalFooter>
                                    <CButton color="primary" onClick={onConfirmDelete}>OK</CButton>{' '}
                                    <CButton
                                        color="secondary"
                                        onClick={toggleDelete}
                                    >Cancel</CButton>
                                </CModalFooter>
                            </CModal>
                        </CCard>
                    </CCol>
                </CRow>
            </div>
        </>
    )
}

export default Promotions