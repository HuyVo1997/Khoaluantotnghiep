import CIcon from '@coreui/icons-react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup,
    CInput,
    CInputFile,
    CInputRadio,
    CLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CRow, CSelect, CTextarea
} from '@coreui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPhoneLaptop, onGetAllBrand, onGetAllCategory } from '../../actions/products';


const AddProduct = () => {

    const [state, setState] = React.useState({
        name: '',
        price: 0,
        quantity: 0,
        category: '',
        brand: '',
        description: '',
        images: []
    })

    const formData = new FormData();
    const [typeProduct, setTypeProduct] = React.useState("Phone");
    const [modal, setModal] = React.useState(false);
    const [images, setImages] = React.useState([]);
    const dispatch = useDispatch();
    const { ListBrand } = useSelector(state => state.brands);
    const { ListCategory } = useSelector(state => state.categories);

    useEffect(() => {
        dispatch(onGetAllBrand());
        dispatch(onGetAllCategory());
    }, [dispatch])

    const showConfigByProduct = (typeProducts) => {
        var result = null;

        if (typeProducts === "Phone") {

            result = (<CCol xs="12" sm="6">
                <CCard>
                    <CCardHeader>
                        Configure
                    </CCardHeader>
                    <CCardBody>
                        <CForm id="form1">
                            <CFormGroup>
                                <CLabel htmlFor="screen">Screen</CLabel>
                                <CInput name="screen" onChange={onChange} />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="OS">OS</CLabel>
                                <CInput name="OS" onChange={onChange} placeholder="Operator System" />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="rear-camera">Rear Camera</CLabel>
                                <CInput name="rearCamera" onChange={onChange} placeholder="Rear Camera" />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="font-camera">Font Camera</CLabel>
                                <CInput name="fontCcamera" onChange={onChange} placeholder="Font Camera" />
                            </CFormGroup>
                            <CFormGroup row className="my-0">
                                <CCol xs="6">
                                    <CFormGroup>
                                        <CLabel>RAM</CLabel>
                                        <CInput name="ram" onChange={onChange} placeholder="RAM" />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="6">
                                    <CFormGroup>
                                        <CLabel>Memory</CLabel>
                                        <CInput name="memory" onChange={onChange} placeholder="Memory" />
                                    </CFormGroup>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>CPU</CLabel>
                                <CInput name="CPU" onChange={onChange} placeholder="CPU" />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel >Sim</CLabel>
                                <CInput name="sim" onChange={onChange} />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Battery</CLabel>
                                <CInput name="battery" onChange={onChange} />
                            </CFormGroup>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>)
        }

        if (typeProducts === "Laptop") {
            result = (<CCol xs="12" sm="6">
                <CCard>
                    <CCardHeader>
                        Configure
                    </CCardHeader>
                    <CCardBody>
                        <CForm id="form1">
                            <CFormGroup>
                                <CLabel>Screen</CLabel>
                                <CInput name="screen" onChange={onChange} />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>CPU</CLabel>
                                <CInput name="cpu" onChange={onChange} />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>RAM</CLabel>
                                <CInput name="ram" placeholder="RAM" onChange={onChange} />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel >Hard Drive</CLabel>
                                <CInput name="hardDrive" placeholder="Hard Camera" onChange={onChange} />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel >Card Screen</CLabel>
                                <CInput name="cardScreen" placeholder="Card Camera" onChange={onChange} />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel >Connector</CLabel>
                                <CInput name="connector" placeholder="Connector" onChange={onChange} />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>OS</CLabel>
                                <CInput name="os" placeholder="Operator System" onChange={onChange} />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Material</CLabel>
                                <CInput name="material" onChange={onChange} />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Size</CLabel>
                                <CInput name="size" onChange={onChange} />
                            </CFormGroup>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>)
        }

        return result;
    }

    const onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        var files = target.files

        setState(prev => ({
            ...prev,
            [name]: value
        }))

        if (name === 'category') {
            setTypeProduct(target.selectedOptions[0].text)
            if(document.getElementById('form1') !== null){
                document.getElementById('form1').reset();
            }
        }

        if (files != null) {
            setImages(files);
        }

        console.log(state);

    }

    const onSubmit = () => {
        var phoneDTO = null;
        var laptopDTO = null;
        var phoneData = null;
        var laptopData = null;

        var productDTO = {
            name: state.name,
            description: state.description,
            price: state.price,
            quantity: state.quantity,
            typeProduct: { typeID: state.category },
            brand: { brandID: state.brand }
        }

        if(typeProduct === "Phone"){
            phoneDTO = {
                screen: state.screen,
                os: state.OS,
                camera1: state.rearCamera,
                camera2: state.fontCamera,
                cpu: state.cpu,
                ram: state.ram,
                memory: state.memory,
                sim: state.sim,
                battery: state.battery
            }

            phoneData = {
                phoneDTO: phoneDTO,
                productDTO: productDTO
            }
        }

        if(typeProduct === "Laptop"){
            laptopDTO = {
                cpu : state.cpu,
                ram : state.ram,
                hardDrive : state.hardDrive,
                screen : state.screen,
                cardScreen : state.cardScreen,
                connector : state.connector,
                os : state.os,
                material : state.material,
                size : state.size
            } 

            laptopData = {
                productDTO: productDTO,
                laptopDTO: laptopDTO
            }
        }

        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        if(typeProduct === "Phone"){

            const blob = new Blob([JSON.stringify(phoneData)], {
                type: 'application/json'
            });

            formData.append('phoneData', blob)
        }
        
        if(typeProduct === "Laptop"){

            const blob = new Blob([JSON.stringify(laptopData)], {
                type: 'application/json'
            });

            formData.append('laptopData', blob)
        }

        
        setModal(!modal);

        dispatch(addPhoneLaptop(formData));
    }

    const resetForm1 = () => {
        document.getElementById('form1').reset();
        document.getElementById('product-details-form').reset();
    }

    const toggle = () => {
        setModal(!modal);
    }

    return (
        <>
            <CRow>
                <CCol xs="12" md="6">
                    <CCard>
                        <CCardHeader>
                            Product Details
                        </CCardHeader>
                        <CCardBody>
                            <CForm id="product-details-form" onSubmit={onSubmit} encType="multipart/form-data" className="form-horizontal">
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="text-input">Product Name</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput id="product-name" name="name" onChange={onChange} placeholder="Product Name" />
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="text-input">Price</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput id="price" onChange={onChange} name="price" />
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="text-input">Quantity</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput id="quantity" onChange={onChange} name="quantity" />
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="select">Category</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CSelect custom name="category" id="category-product" onChange={onChange}>
                                            <option value="0">Please select</option>
                                            {
                                                ListCategory.map((category, index) => {
                                                    return (
                                                        <option key={index} value={category.typeID}>{category.type}</option>
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
                                        <CSelect custom name="brand" value={state.brand} onChange={onChange}>
                                            <option value="0">Please select</option>
                                            {
                                                typeProduct === "Phone" ? (ListBrand.map((brand, index) => {
                                                    if (brand.name === "Apple"
                                                        || brand.name === "Samsung"
                                                        || brand.name === "Xiaomi"
                                                        || brand.name === "OPPO") {
                                                        return (
                                                            <option key={index} value={brand.brandID}>{brand.name}</option>
                                                        )
                                                    }
                                                })) : (typeProduct === "Laptop" ? ListBrand.map((brand, index) => {
                                                        if (brand.name === "Asus"
                                                        || brand.name === "Dell"
                                                        || brand.name === "Apple"
                                                        || brand.name === "HP") {
                                                        return (
                                                            <option key={index} value={brand.brandID}>{brand.name}</option>
                                                        )
                                                    }
                                                }) : null)
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
                                            name="description"
                                            id="textarea-input"
                                            rows="9"
                                            placeholder="Content..."
                                        />
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel>Images Product</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInputFile
                                            id="file-multiple-input"
                                            name="images"
                                            multiple
                                            custom
                                            onChange={onChange}
                                        />
                                        <CLabel htmlFor="file-multiple-input" variant="custom-file">
                                            Choose Files...
                                        </CLabel>
                                    </CCol>
                                </CFormGroup>
                            </CForm>
                        </CCardBody>
                        <CCardFooter>
                            <CButton type="submit" size="sm" color="primary" onClick={toggle}><CIcon name="cil-scrubber" /> Submit</CButton>
                            <CButton type="reset" onClick={resetForm1} size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
                        </CCardFooter>
                    </CCard>
                </CCol>
                {showConfigByProduct(typeProduct)}
            </CRow>
            <CModal
                show={modal}
                onClose={toggle}
            >
                <CModalHeader closeButton>Create New Product ? </CModalHeader>
                <CModalBody>
                    Do you want to add new product ?
            </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={onSubmit}>OK</CButton>{' '}
                    <CButton
                        color="secondary"
                        onClick={toggle}
                    >Cancel</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default AddProduct
