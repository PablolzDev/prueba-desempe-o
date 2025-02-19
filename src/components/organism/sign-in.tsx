"use client"
import { LockKeyhole } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { IconWrapper } from "../atoms/icon-wrapper"
import * as yup from "yup";
import { FormInput } from "../molecules/form-input"
// import { PasswordInput } from "../molecules/pass-input"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { ErrorRes } from "../../app/core/dto/common/error-res.dto";

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("El correo es inválido")
        .required("El correo el obligatorio"),
    password: yup
        .string()
        .min(8, "La contraseña debe tener  al menos 8  caracteres")
        .required("La contraseña es obligatoria"),
});





export function SignInForm() {

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<ILoginRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(loginSchema),
    });
    const router = useRouter();

    const handleLogin = async (data: ILoginRequest) => {
        //SERVICE LOGIN
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            if (result?.error) {
                console.log("Ocurrio un error", JSON.parse(result.error));
                handleError(JSON.parse(result.error));
                return;
            }

            // Si el login es exitoso, redirige
            router.push("/dashboard");
        } catch (error) {
            console.log(error);
        }
    }

    const handleError = (error: unknown) => {
        const errorData = error as ErrorRes;

        if (errorData) {

            if (errorData.message) {
                setError("email", {
                    message: errorData.message,
                });

            }
            if (errorData.error) {
                console.error(`Error type: ${errorData.error}`);
            }

            if (errorData.statusCode) {
                console.log(`HTTP Status Code: ${errorData.statusCode}`);
            }
        }
    };

    return (
        <Card className="w-full max-w-[500px] shadow-sm">
            <CardHeader className="space-y-3 text-center">
                <IconWrapper>
                    <svg width="50" height="50" viewBox="0 0 50 50" className='text-indigo-400' fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.7917 30.4688C19.7917 29.75 20.375 29.1667 21.0937 29.1667H28.9062C29.2516 29.1667 29.5828 29.3039 29.827 29.548C30.0711 29.7922 30.2083 30.1234 30.2083 30.4688C30.2083 30.8141 30.0711 31.1453 29.827 31.3895C29.5828 31.6337 29.2516 31.7708 28.9062 31.7708H21.0937C20.375 31.7708 19.7917 31.1875 19.7917 30.4688ZM16.6667 27.0833C16.6667 27.6359 16.4472 28.1658 16.0565 28.5565C15.6658 28.9472 15.1359 29.1667 14.5833 29.1667C14.0308 29.1667 13.5009 28.9472 13.1102 28.5565C12.7195 28.1658 12.5 27.6359 12.5 27.0833C12.5 26.5308 12.7195 26.0009 13.1102 25.6102C13.5009 25.2195 14.0308 25 14.5833 25C15.1359 25 15.6658 25.2195 16.0565 25.6102C16.4472 26.0009 16.6667 26.5308 16.6667 27.0833ZM35.4167 29.1667C35.9692 29.1667 36.4991 28.9472 36.8898 28.5565C37.2805 28.1658 37.5 27.6359 37.5 27.0833C37.5 26.5308 37.2805 26.0009 36.8898 25.6102C36.4991 25.2195 35.9692 25 35.4167 25C34.8641 25 34.3342 25.2195 33.9435 25.6102C33.5528 26.0009 33.3333 26.5308 33.3333 27.0833C33.3333 27.6359 33.5528 28.1658 33.9435 28.5565C34.3342 28.9472 34.8641 29.1667 35.4167 29.1667ZM9.13021 19.0281L9.58125 17.1875H7.55208C7.20675 17.1875 6.87556 17.0503 6.63137 16.8061C6.38718 16.5619 6.25 16.2308 6.25 15.8854C6.25 15.5401 6.38718 15.2089 6.63137 14.9647C6.87556 14.7205 7.20675 14.5833 7.55208 14.5833H10.2188L11.0448 11.2115C11.3915 9.79617 12.2029 8.53809 13.3493 7.63858C14.4956 6.73907 15.9106 6.25012 17.3677 6.25H32.2708C33.6855 6.25012 35.0617 6.71104 36.191 7.563C37.3204 8.41497 38.1416 9.61162 38.5302 10.9719L39.5615 14.5833H42.449C42.6199 14.5833 42.7893 14.617 42.9472 14.6824C43.1052 14.7479 43.2488 14.8438 43.3697 14.9647C43.4906 15.0856 43.5865 15.2292 43.6519 15.3871C43.7174 15.5451 43.751 15.7144 43.751 15.8854C43.751 16.0564 43.7174 16.2257 43.6519 16.3837C43.5865 16.5417 43.4906 16.6852 43.3697 16.8061C43.2488 16.927 43.1052 17.023 42.9472 17.0884C42.7893 17.1538 42.6199 17.1875 42.449 17.1875H40.3062L40.8271 19.0115C41.6836 19.3209 42.4238 19.8869 42.9469 20.6323C43.4699 21.3778 43.7504 22.2664 43.75 23.1771V41.4063C43.75 42.3041 43.3933 43.1652 42.7584 43.8001C42.1235 44.435 41.2625 44.7917 40.3646 44.7917H36.7187C35.8209 44.7917 34.9598 44.435 34.3249 43.8001C33.69 43.1652 33.3333 42.3041 33.3333 41.4063V38.0208H16.6667V41.4063C16.6667 42.3041 16.31 43.1652 15.6751 43.8001C15.0402 44.435 14.1791 44.7917 13.2812 44.7917H9.63542C8.73755 44.7917 7.87645 44.435 7.24157 43.8001C6.60668 43.1652 6.25 42.3041 6.25 41.4063V23.1771C6.24981 22.2744 6.5256 21.3931 7.04039 20.6516C7.55519 19.91 8.28438 19.3436 9.13021 19.0281ZM13.574 11.8313L11.8792 18.75H38.0427L36.025 11.6875C35.7918 10.8712 35.2991 10.1531 34.6213 9.64186C33.9436 9.13063 33.1177 8.85412 32.2687 8.85417H17.3687C16.4944 8.85425 15.6454 9.14765 14.9576 9.6874C14.2698 10.2271 13.7819 10.982 13.574 11.8313ZM10.6771 21.3542C10.1936 21.3542 9.72995 21.5462 9.38809 21.8881C9.04622 22.23 8.85417 22.6936 8.85417 23.1771V35.4167H41.1458V23.1771C41.1458 22.6936 40.9538 22.23 40.6119 21.8881C40.2701 21.5462 39.8064 21.3542 39.3229 21.3542H10.6771ZM35.9375 41.4063C35.9375 41.8375 36.2875 42.1875 36.7187 42.1875H40.3646C40.5718 42.1875 40.7705 42.1052 40.917 41.9587C41.0635 41.8122 41.1458 41.6135 41.1458 41.4063V38.0208H35.9375V41.4063ZM8.85417 38.0208V41.4063C8.85417 41.8375 9.20417 42.1875 9.63542 42.1875H13.2812C13.4885 42.1875 13.6872 42.1052 13.8337 41.9587C13.9802 41.8122 14.0625 41.6135 14.0625 41.4063V38.0208H8.85417Z" fill="#7692FF" />
                    </svg>
                </IconWrapper>
                <div className="space-y-1">
                    <h1 className="text-indigo-400 text-xl font-semibold">Transport Solutions S.A</h1>
                    <p className="text-sm text-gray-600">
                        Inicia sesión en tu cuenta y gestiona tu flota de vehículos
                    </p>
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                    <FormInput<ILoginRequest>
                        control={control}
                        type="email"
                        label="Correo Electrónico"
                        name="email"
                        error={errors.email}
                        placeholder="Ingresa tu correo"
                    />
                    <FormInput<ILoginRequest>
                        control={control}
                        type="password"
                        label="Contraseña"
                        name="password"
                        error={errors.password}
                        placeholder="Ingresa tu contraseña"
                    />

                    <div className="flex justify-center">
                        <Button
                            type="submit"
                            className="w-full bg-indigo-400 text-white max-w-52 rounded-lg "
                        >
                            <LockKeyhole />Iniciar Sesión
                        </Button>
                    </div>
                    <p className="text-center text-sm text-gray-600">
                        ¿Problemas para iniciar sesión? Contacta al administrador del sistema
                    </p>
                </form>
            </CardContent>
        </Card>
    )
}