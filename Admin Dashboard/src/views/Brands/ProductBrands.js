import CIcon from '@coreui/icons-react';
import {
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
    CRow
} from '@coreui/react'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { onAddBrand, onDeleteBrand, onGetAllBrand } from '../../actions/products';

const ProductBrands = () => {

    const { ListBrand } = useSelector(state => state.brands);
    const dispatch = useDispatch();
    const [modalAddBrand, setModalAddBrand] = React.useState(false);
    const [brandName, setBrandName] = React.useState('');
    const [modalDelete, setModalDelete] = React.useState(false);

    useEffect(() => {
        dispatch(onGetAllBrand());
    }, [dispatch])

    const toggleAddBrand = () => {
        setModalAddBrand(!modalAddBrand)
    }

    const toggleDeleteBrand = (brandID) => {
        setModalDelete(!modalDelete);
        setBrandName(brandID);
    }

    const confirmDelete = () => {
        dispatch(onDeleteBrand(brandName));
        setModalDelete(!modalDelete);
    }

    const items = [];
    const fields = [{ key: 'STT', _classes: 'font-weight-bold ' },
    { key: 'name', _classes: 'font-weight-bold' },
    { key: 'action', filter: false, _style: { width: '15%' } }]

    if (ListBrand.length > 0) {
        for (var i = 0; i < ListBrand.length; i++) {
            items.push({
                brandID : ListBrand[i].brandID,
                STT: i + 1,
                name: ListBrand[i].name,
            })
        }
    }

    const onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        setBrandName(value);
    }

    const onAddBrandDispatch = () => {
        const formData = new FormData();

        formData.append('name', brandName);

        dispatch(onAddBrand(formData));

        setModalAddBrand(!modalAddBrand);
    }

    return (
        <>
            <div className="card">
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>
                                All Brands
                            </CCardHeader>
                            <CCardHeader>
                                <CButton shape="pill" color="primary" onClick={toggleAddBrand}>
                                    <CIcon name="cil-library-add" /> Add Brands
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
                                    pagination
                                    columnFilter
                                    scopedSlots={{
                                        'action':
                                            (item, index) => {
                                                return (
                                                    <>
                                                        <td className="py-2">
                                                            <CButton size="sm" color="danger" className="ml-1" onClick={() => toggleDeleteBrand(item.brandID)}>
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
                                show={modalAddBrand}
                                onClose={toggleAddBrand}
                            >
                                <CModalHeader closeButton>Add Brand</CModalHeader>
                                <CModalBody>
                                    <CFormGroup>
                                        <CLabel>Brand</CLabel>
                                        <CInput name="brand" onChange={onChange} placeholder="Enter your brand" />
                                    </CFormGroup>
                                </CModalBody>
                                <CModalFooter>
                                    <CButton color="primary" onClick={onAddBrandDispatch}>OK</CButton>{' '}
                                    <CButton
                                        color="secondary"
                                        onClick={toggleAddBrand}
                                    >Cancel</CButton>
                                </CModalFooter>
                            </CModal>
                            <CModal
                                show={modalDelete}
                                onClose={toggleDeleteBrand}
                            >
                                <CModalHeader closeButton>Confirm Delete ? </CModalHeader>
                                <CModalBody>
                                    Do you want to delete this Brand ?
                                </CModalBody>
                                <CModalFooter>
                                    <CButton color="primary" onClick={confirmDelete}>OK</CButton>{' '}
                                    <CButton
                                        color="secondary"
                                        onClick={toggleDeleteBrand}
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

export default ProductBrands