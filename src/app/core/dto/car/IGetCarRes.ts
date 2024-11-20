interface Vehicle {
    id: number;
    make: string;
    model: string;
    year: number;
    licensePlate: string;
    photo: string | null;
}


interface GetCarResponse {
    statusCode: number;
    message: string;
    data: Vehicle;
}