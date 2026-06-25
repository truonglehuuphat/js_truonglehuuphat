import api from '../api/axiosClient'

const PRODUCT_PATH = '/products'

export const ProductService = {
    getAll: () => api.get(`${PRODUCT_PATH}`),
    getById: (id) => api.get(`${PRODUCT_PATH}/${id}`),
    create: (newProduct) => api.post(`${PRODUCT_PATH}`, newProduct),
    update: (updateProduct) => api.put(`${PRODUCT_PATH}/${updateProduct.id}`, updateProduct),
    delete: (id) => api.delete(`${PRODUCT_PATH}/${id}`)
}

export const getProducts = (search, category, minPrice, maxPrice, sortBy, order) => {
   return ProductService.getAll();
}

export const  getProductById = (id) => {
    return ProductService.getById(id);
}