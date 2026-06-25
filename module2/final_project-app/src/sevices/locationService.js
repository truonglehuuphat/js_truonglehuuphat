import axios from "axios"

const PATH = 'https://provinces.open-api.vn/api/v2'

export const getProvinces = async () => {
    const response = await axios.get(`${PATH}/p/?depth=2`);
    return Array.isArray(response.data) ? response.data : [];
}

export const getProvincesWard = async () => {
    const response = await axios.get(`${PATH}/w/`);
    return response;
}