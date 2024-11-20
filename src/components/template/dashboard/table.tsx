'use client'

import { signOut } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Edit, LogOut, Plus, Trash2 } from 'lucide-react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'


const Logo = () => (
  <div className="flex items-center gap-2">
    <Image src="/placeholder.svg?height=32&width=32" alt="Transport Solutions" width={32} height={32} />
    <span className="font-semibold">Transport Solutions</span>
  </div>
)

const UserAvatar = ({ name }: { name: string }) => (
  <div className="flex items-center gap-3 p-4">
    <div className="w-10 h-10 rounded-full bg-indigo-400 flex items-center justify-center">
      <span className="text-primary">{name[0]}</span>
    </div>
    <span className="font-medium">{name}</span>
  </div>
)

const SearchField = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium">{label}</label>
    <Input {...props} />
  </div>
)

const ActionButton = ({ children, variant = "default", ...props }: React.ComponentProps<typeof Button>) => (
  <Button variant={variant} {...props}>
    {children}
  </Button>
)


const SearchForm = () => {
  const schema = yup.object({
    plate: yup.string(),
    year: yup.number().positive().integer(),
    brand: yup.string(),
    model: yup.string()
  })

  const { register } = useForm({
    resolver: yupResolver(schema)
  })

  return (
    <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <SearchField label="Placa" {...register('plate')} />
      <SearchField label="Año" type="number" {...register('year')} />
      <SearchField label="Marca" {...register('brand')} />
      <SearchField label="Modelo" {...register('model')} />
    </form>
  )
}

const VehicleTable = ({ vehicles }: { vehicles: any[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Foto</TableHead>
        <TableHead>Marca</TableHead>
        <TableHead>Modelo</TableHead>
        <TableHead>Año</TableHead>
        <TableHead>Placa</TableHead>
        <TableHead>Acciones</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {vehicles.map((vehicle, index) => (
        <TableRow key={index}>
          <TableCell>
            <Image src={vehicle.image || "/placeholder.svg?height=60&width=80"} alt={vehicle.model} width={80} height={60} className="rounded" />
          </TableCell>
          <TableCell>{vehicle.brand}</TableCell>
          <TableCell>{vehicle.model}</TableCell>
          <TableCell>{vehicle.year}</TableCell>
          <TableCell>{vehicle.plate}</TableCell>
          <TableCell>
            <div className="flex gap-2">
              <ActionButton variant="ghost" size="icon">
                <Edit className="w-4 h-4" />
              </ActionButton>
              <ActionButton variant="ghost" size="icon">
                <Trash2 className="w-4 h-4" />
              </ActionButton>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

const Sidebar = ({ userName }: { userName: string }) => (
  <div className="w-64 border-r h-screen">
    <UserAvatar name={userName} />≤
    <div className="p-4">
      <Button variant="ghost" className="w-full justify-start" onClick={() => signOut()}>
        <LogOut className="w-4 h-4 mr-2" />
        Cerrar sesión
      </Button>
    </div>
  </div>
)

// Template
export default function Component() {
  const sampleVehicles = [
    { brand: 'Toyota', model: 'Corolla', year: 2020, plate: 'ABC1234', image: '/placeholder.svg?height=60&width=80' },
    { brand: 'Toyota', model: 'TXL', year: 2025, plate: 'NKA1234', image: '/placeholder.svg?height=60&width=80' },
  ]

  return (
    <div className="flex min-h-screen">
      <Sidebar userName="Kevin Mejia" />
      <div className="flex-1">
        <Card className="rounded-none border-0">
          <CardHeader className="border-b">
            <CardTitle>Gestión de vehículos</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <SearchForm />
              <div className="flex gap-2">
                <ActionButton>
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Vehículo
                </ActionButton>
                <ActionButton variant="secondary">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar reporte
                </ActionButton>
              </div>
              <VehicleTable vehicles={sampleVehicles} />
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4].map((page) => (
                  <Button
                    key={page}
                    variant={page === 1 ? "default" : "ghost"}
                    size="icon"
                    className="w-8 h-8"
                  >
                    {page}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}