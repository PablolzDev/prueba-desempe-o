interface FormLabelProps {
    htmlFor: string
    children: React.ReactNode
}

export function FormLabel({ htmlFor, children }: FormLabelProps) {
    return (
        <label className="text-sm text-gray-600 font-bold" htmlFor={htmlFor}>
            {children}
        </label>
    )
}