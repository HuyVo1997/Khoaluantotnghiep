import {
    CBadge,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable, CForm, CFormGroup,
    CInput,
    CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CRow, CSelect
} from "@coreui/react";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { onCreateCode, onGetAllDiscount } from "../../actions/events";


const getBadge = status => {
    switch (status) {
        case 'Inactive' : return 'warning'
        case 'Expire': return 'danger'
        case 'Validate': return 'success'
        default: return 'primary'
    }
}

const Discount = () => {

    const [state, setState] = React.useState({
        code: '',
        percent: 0,
        limitCode: 0,
        usesCode : 0,
        dateStart: '',
        dateEnd: '',
        status : 1
    })

    const dispatch = useDispatch();
    const [modalConfirm, setModalConfirm] = React.useState(false);
    const {ListDiscount} = useSelector(state => state.discount);
    const toggleModalConfirm = () => {
        setModalConfirm(!modalConfirm);
    }

    useEffect(() => {
        dispatch(onGetAllDiscount())
    }, [dispatch])


    const onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        setState(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const confirmCreateCode = () => {
        const code = {
            code: state.code,
            percent: parseInt(state.percent, 10),
            limitCode: parseInt(state.limitCode, 10),
            usesCode : 0,
            dateStart: state.dateStart,
            dateEnd: state.dateEnd,
            status: 0
        }

        dispatch(onCreateCode(code));

        setModalConfirm(!modalConfirm);
    }

    
    var items = [];

    if(ListDiscount.length > 0){
        items = ListDiscount.map((discount,index) => {
            return {
                ID : discount.discountID,
                STT : index + 1,
                code : discount.code,
                percent : discount.percent,
                uses : discount.usesCode + "/" + discount.limitCode,
                starts : discount.dateStart,
                ends : discount.dateEnd,
                status : discount.status
            }
        })
    }

    const fields = [{ key: 'STT', _classes: 'font-weight-bold ' },
    { key: 'code', _classes: 'font-weight-bold' },
    { key: 'percent', _classes: 'font-weight-bold' },
    { key: 'uses', _classes: 'font-weight-bold' },
    { key: 'starts', _classes: 'font-weight-bold' },
    { key: 'ends', _classes: 'font-weight-bold' },
    { key: 'status', _classes: 'font-weight-bold' }]
    return (
        <>
            <CRow>
                <CCol xs="12" sm="4">
                    <CCard>
                        <CCardHeader>
                            Create Discount Code
                        </CCardHeader>
                        <CCardBody>
                            <CForm>
                                <CRow>
                                    <CCol xs="12">
                                        <CFormGroup>
                                            <CLabel >Code</CLabel>
                                            <CInput name="code" onChange={onChange} placeholder="Enter your code" required />
                                        </CFormGroup>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs="6">
                                        <CFormGroup>
                                            <CLabel>Discount Amount</CLabel>
                                            <CInput name="percent" onChange={onChange} required />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="6">
                                        <CFormGroup>
                                            <CLabel>Limit</CLabel>
                                            <CInput name="limitCode" onChange={onChange} required />
                                        </CFormGroup>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs="12">
                                        <CFormGroup>
                                            <CLabel >Starts</CLabel>
                                            <CInput name="dateStart" onChange={onChange} type="date" required />
                                        </CFormGroup>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs="12">
                                        <CFormGroup>
                                            <CLabel >Ends</CLabel>
                                            <CInput name="dateEnd" onChange={onChange} type="date" required />
                                        </CFormGroup>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs="3">
                                        <CButton variant="outline" color="primary" onClick={toggleModalConfirm}> Create </CButton>
                                    </CCol>
                                    <CCol xs="3">
                                        <CButton type="reset" variant="outline" color="warning" > Reset </CButton>
                                    </CCol>
                                </CRow>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xs="12" sm="8">
                    <CCard>
                        <CCardHeader>
                            Event Code
                            </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={items}
                                fields={fields}
                                hover
                                tableFilter
                                striped
                                bordered
                                itemsPerPage={5}
                                pagination
                                scopedSlots={{
                                    'status':
                                        (item) => (
                                            <td>
                                                <CBadge color={getBadge(item.status === 0 ? "InActive" : (item.status === 1 ? "Validate" : "Expire"))}>
                                                    {item.status === 0 ? "InActive" : (item.status === 1 ? "Validate" : "Expire")}
                                                </CBadge>
                                            </td>
                                        )
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
                <CModal
                    show={modalConfirm}
                    onClose={toggleModalConfirm}
                >
                    <CModalHeader closeButton>Confirm Create Code ? </CModalHeader>
                    <CModalBody>
                        Do you want to create this code ?
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="primary" onClick={confirmCreateCode}>OK</CButton>{' '}
                        <CButton
                            color="secondary"
                            onClick={toggleModalConfirm}
                        >Cancel</CButton>
                    </CModalFooter>
                </CModal>
            </CRow>
        </>
    )
}

export default Discount;