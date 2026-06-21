import api from '../api/axiosClient'

const CATEGORY_PATH = '/category'

export const ProducService = {
    getAll: () => api.get(`${CATEGORY_PATH}`),
    create: () => api.create(`${CATEGORY_PATH}`),
    update: () => api.update(`${CATEGORY_PATH}/${id}`)
}
