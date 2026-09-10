
export interface GetDoctorsResponse {
  doctors: DoctorInfo[];
  total: number;
  limit: number;
  skip: number;
}


export const getAllDoctors = async ():Promise<GetDoctorsResponse>  => {

}