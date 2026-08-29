import * as yup from 'yup'

export const patientCreateSchema = yup.object().shape({});
export const patientUpdateSchema = yup.object().shape({});
export const patientQuerySchema = yup.object().shape({});

export const doctorCreateSchema = yup.object().shape({});
export const doctorUpdateSchema = yup.object().shape({});
export const doctorQuerySchema = yup.object().shape({});

export const appointmentCreateSchema = yup.object().shape({});
export const appointmentUpdateSchema = yup.object().shape({});
export const appointmentQuerySchema = yup.object().shape({});

export const historyCreateSchema = yup.object().shape({});
export const historyUpdateSchema = yup.object().shape({});
export const historyQuerySchema = yup.object().shape({});
