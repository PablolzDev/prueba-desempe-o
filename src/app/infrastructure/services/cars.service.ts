import { PProjects } from "../../core/port/cars.port";
import { HttpClient } from "../utils/client-http";

export class CarsServices implements PProjects {
  private clientHttp: HttpClient;

  constructor() {
    this.clientHttp = new HttpClient();
  }

  async getAllCars({size, page}: GetCarsRequest): Promise<GetCarsResponse> {
    try {
      const response = await this.clientHttp.get<GetCarsResponse>(`vehicles?page=${page}&size=${size}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getCar(id: string): Promise<GetCarResponse>{
    try {
      const response = await this.clientHttp.get<GetCarResponse>(`vehicles/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}