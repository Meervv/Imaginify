"use client"

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"  

import { Input } from "@/components/ui/input"
import { aspectRatioOptions, defaultValues, transformationTypes } from '@/constants'
import { CustomField } from './CustomField'
import { useState } from 'react'
import { AspectRatioKey } from '@/lib/utils'

export const TransformationFormSchema = z.object({
    title: z.string(),
    aspectRatio: z.string().optional(),
    color: z.string().optional(),
    prompt: z.string().optional(),
    publicId: z.string()
})

const TransformationForm = ({ action, data = null, userId, type, creditBalance}: TransformationFormProps) => {
    const transformationType = transformationTypes[type]
    const [image, setImage] = useState(data)
    const [newTransformation, setNewTransformation] = useState<Transformations | null>(null)
    
    const initialValues = data && action === 'Update' ? {
        title: data?.title,
        aspectRatio: data?.aspectRatio,
        color: data?.color,
        prompt: data?.prompt,
        publicId: data?.publicId
    } : defaultValues

    const form = useForm<z.infer<typeof TransformationFormSchema>>({
        resolver: zodResolver(TransformationFormSchema),
        defaultValues: initialValues
    })

    function onSubmit(values: z.infer<typeof TransformationFormSchema>) {
        console.log(values)
    }

    const onSelectFieldHandle = (value: string, onChangeField: (value: string) => void) => {

    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CustomField
                    control={form.control}
                    name='title'
                    formLabel='Image title'
                    className='w-full'
                    render={({ field }) => <Input {...field} className='input-field'/>}
                />

                {type === 'fill' && (
                    <CustomField
                        control={form.control}
                        name='aspectRatio'
                        formLabel='Aspect Ratio'
                        className='w-full'
                        render={({ field}) => (
                        <Select
                            onValueChange={(value) => onSelectFieldHandle(value, field.onChange)}
                        >
                            <SelectTrigger className="select-field">
                                <SelectValue placeholder="Select Size" /></SelectTrigger>
                                <SelectContent>
                                    {Object.keys(aspectRatioOptions).map((key) => (
                                        <SelectItem key={key} value={key} className='select-item'>
                                            {aspectRatioOptions[key as AspectRatioKey].label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                        </Select>
                    )}
                    />
                )}
            </form>
        </Form>
    )
}

export default TransformationForm