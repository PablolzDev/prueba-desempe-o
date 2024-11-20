import { CarsServices } from "@/app/infrastructure/services/cars.service";
import TableC from "@/components/template/dashboard/table";

interface IProps {
    searchParams: GetCarsRequest;
}

const useCarsService = new CarsServices();
export default async function DashboardPage({ searchParams }: IProps) {
    const page = searchParams.page ? parseInt(searchParams.page.toString()) : 1;
    const data = await useCarsService.getAllCars({ page, size: 4 });
    return (
        <>
            <TableC data={data} />
        </>
    );
}