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
import { onAddCategory, onDeleteCategory, onGetAllCategory } from '../../actions/products';

const ProductCategories = () => {

    const { ListCategory } = useSelector(state => state.categories);
    const dispatch = useDispatch();
    const [modalAddCategory, setModalAddCategory] = React.useState(false);
    const [typeProduct, setTypeProduct] = React.useState('');
    const [modalDelete, setModalDelete] = React.useState(false);

    useEffect(() => {
        dispatch(onGetAllCategory());
    }, [dispatch])

    const toggleAddCategory = () => {
        setModalAddCategory(!modalAddCategory);
    }

    const toggleDeleteCategory = (typeID) => {
        setModalDelete(!modalDelete);
        setTypeProduct(typeID);
    }

    const confirmDelete = () => {
        dispatch(onDeleteCategory(typeProduct));
        setModalDelete(!modalDelete);
    }

    const items = [];
    const fields = [{ key: 'STT', _classes: 'font-weight-bold ' },
    { key: 'name', _classes: 'font-weight-bold' },
    { key: 'action', filter: false, _style: { width: '15%' } }]

    if (ListCategory.length > 0) {
        for (var i = 0; i < ListCategory.length; i++) {
            items.push({
                typeID: ListCategory[i].typeID,
                STT: i + 1,
                name: ListCategory[i].type,
            })
        }
    }

    const onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        setTypeProduct(value);
    }

    const onAddCategoryDispatch = () => {
        const formData = new FormData();

        formData.append('type', typeProduct);

        dispatch(onAddCategory(formData));

        setModalAddCategory(!modalAddCategory);
    }

    return (
        <>
            <div className="card">
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>
                                All Category
                            </CCardHeader>
                            <CCardHeader>
                                <CButton shape="pill" color="primary" onClick={toggleAddCategory}>
                                    <CIcon name="cil-library-add" /> Add Category
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
                                                            <CButton size="sm" color="danger" className="ml-1" onClick={() => toggleDeleteCategory(item.typeID)}>
                                                                Delete
                                                            </CButton>
                                                        </td>
                                                    </>
                                                )
                                            }
                                    }}
                                />

                                <CModal
                                    show={modalAddCategory}
                                    onClose={toggleAddCategory}
                                >
                                    <CModalHeader closeButton>Add Category</CModalHeader>
                                    <CModalBody>
                                        <CFormGroup>
                                            <CLabel >Category</CLabel>
                                            <CInput name="category" onChange={onChange} placeholder="Enter your category" />
                                        </CFormGroup>
                                    </CModalBody>
                                    <CModalFooter>
                                        <CButton color="primary" onClick={onAddCategoryDispatch}>OK</CButton>{' '}
                                        <CButton
                                            color="secondary"
                                            onClick={toggleAddCategory}
                                        >Cancel</CButton>
                                    </CModalFooter>
                                </CModal>
                                <CModal
                                    show={modalDelete}
                                    onClose={toggleDeleteCategory}
                                >
                                    <CModalHeader closeButton>Confirm Delete ? </CModalHeader>
                                    <CModalBody>
                                        Do you want to delete this Brand ?
                                </CModalBody>
                                    <CModalFooter>
                                        <CButton color="primary" onClick={confirmDelete}>OK</CButton>{' '}
                                        <CButton
                                            color="secondary"
                                            onClick={toggleDeleteCategory}
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

export default ProductCategories