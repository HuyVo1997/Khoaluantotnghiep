import * as types from '../constants/products'

export const fetchProduct = () => {
    return {
        type: types.GET_ALL_PRODUCT
    }
}

export const fetchProductSuccess = (data) => {
    return {
        type: types.GET_ALL_PRODUCT_SUCCESS,
        payload: {
            data
        }
    }
}

export const addPhoneLaptop = (phoneData) => {
    return {
        type: types.ADD_PHONE_LAPTOP,
        payload: {
            phoneData
        }
    }
}

export const addPhoneLaptopSuccess = (data) => {
    return {
        type : types.ADD_PHONE_LAPTOP_SUCCESS,
        payload : {
            data
        }
    }
}

export const onGetAllBrand = () => {
    return {
        type: types.GET_ALL_BRAND
    }
}

export const onGetAllBrandSuccess = (data) => {
    return {
        type: types.GET_ALL_BRAND_SUCCESS,
        payload: {
            data
        }
    }
}

export const onGetAllCategory = () => {
    return {
        type: types.GET_ALL_CATEGORY
    }
}

export const onGetAllCategorySuccess = (data) => {
    return {
        type: types.GET_ALL_CATEGORY_SUCCESS,
        payload: {
            data
        }
    }
}

export const onAddBrand = (name) => {
    return {
        type: types.ADD_BRAND,
        payload: {
            name
        }
    }
}

export const onAddBrandSuccess = (brandID, brandName) => {
    return {
        type: types.ADD_BRAND_SUCCESS,
        payload: {
            brandID,
            brandName
        }
    }
}

export const onDeleteBrand = (brandID) => {
    return {
        type: types.DELETE_BRAND,
        payload: {
            brandID
        }
    }
}

export const onDeleteBrandSuccess = (brandID) => {
    return {
        type: types.DELETE_BRAND_SUCCESS,
        payload: {
            brandID
        }
    }
}

export const onDeleteBrandFailed = () => {
    return {
        type: types.DELETE_BRAND_FAILED
    }
}


export const onAddCategory = (type) => {
    return {
        type: types.ADD_CATEGORY,
        payload: {
            type
        }
    }
}

export const onAddCategorySuccess = (typeID, type) => {
    return {
        type: types.ADD_CATEGORY_SUCCESS,
        payload: {
            typeID,
            type
        }
    }
}

export const onDeleteCategory = (typeID) => {
    return {
        type: types.DELETE_CATEGORY,
        payload: {
            typeID
        }
    }
}

export const onDeleteCategorySuccess = (data, typeID) => {
    return {
        type: types.DELETE_CATEGORY_SUCCESS,
        payload: {
            data,
            typeID
        }
    }
}

export const onDeleteCategoryFailed = () => {
    return {
        type: types.DELETE_CATEGORY_FAILED
    }
}

export const onUpdateProduct = (productID , productDTO) => {
    return {
        type : types.UPDATE_PRODUCT,
        payload : {
            productID,
            productDTO
        }
    }
}

export const onUpdateProductSuccess = (data) => {
    return {
        type : types.UPDATE_PRODUCT_SUCCESS,
        payload : {
            data
        }
    }
}

export const onDeleteProduct = (productID) => {
    return {
        type : types.DELETE_PRODUCT,
        payload : {
            productID
        }
    }
}

export const onDeleteProductSuccess = (productID) => {
    return {
        type : types.DELETE_PRODUCT_SUCCESS,
        payload : {
            productID
        }
    }
}

export const onDeleteProductFail = () => {
    return {
        type : types.DELETE_PRODUCT_FAIL
    }
}