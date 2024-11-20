// "use client"

// import { useState } from "react"
// import { Eye, EyeOff } from 'lucide-react'
// import { Input } from "@/components/ui/input"
// import { FormLabel } from "../atoms/form-label"
// import style from './sign.module.scss'

// interface PasswordInputProps {
//   id?: string
//   label?: string
// }

// export function PasswordInput({ id, label }: PasswordInputProps) {
//   const [showPassword, setShowPassword] = useState(false)

//   return (
//     <div className="space-y-2 	">
//       <FormLabel htmlFor={id}>{label}</FormLabel>
//       <div className="relative">
//         <Input
//           id={id}
//           type={showPassword ? "text" : "password"}
//           className={`w-full border-zinc-400 pr-10 ${style.boxInput}`}        />
//         <button
//           type="button"
//           onClick={() => setShowPassword(!showPassword)}
//           className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
//         >
//           {showPassword ? (
//             <EyeOff className="h-4 w-4" />
//           ) : (
//             <Eye className="h-4 w-4" />
//           )}
//         </button>
//       </div>
//     </div>
//   )
// }