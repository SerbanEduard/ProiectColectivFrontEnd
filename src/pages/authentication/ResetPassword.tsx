import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const formSchema = z.object({
    password: z.string()
        .min(6, "* Password must be at least 6 characters long")
        .regex(/[0-9]/, "* Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "* Password must contain at least one special character"),
    confirmPassword: z.string().min(1, "* Confirm Password is required")
}).refine(data => data.password === data.confirmPassword, {
  error:"Passwords must match!",
  path:["confirmPassword"]
})


export default function ResetPassword() {
   const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {    
                password: "", 
                confirmPassword: ""
            }
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleConfirmReset = (data: z.infer<typeof formSchema>) => {
        toast.info("Reset confirm not yet implemented");

        //TODO handle confirm reset password logic here

        console.log("Reset password data:", data.password, data.confirmPassword);
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="relative flex flex-row shadow-md min-h-fit min-w-fit">
                <CardContent className="text-center mx-8 md:ml-8 md:mr-0">
                    <CardHeader className="w-full">
                        <CardTitle className="mb-2">Reset Password</CardTitle>
                        <CardDescription>Enter a new password</CardDescription>
                    </CardHeader>
                    <form onSubmit={form.handleSubmit(handleConfirmReset)} className="flex flex-col mt-4 justify-center">
                        <FieldGroup>
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field className="mt-8" data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                id={field.name}
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Enter new password"
                                                type={showPassword ? "text" : "password"}
                                                className="pr-10"
                                            />
                                            <button
                                                type="button"
                                                aria-label={showPassword ? "Hide password" : "Show password"}
                                                onClick={() => setShowPassword((s) => !s)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded"
                                            >
                                                {showPassword ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-11-7 1.08-2.22 2.99-4.07 5.3-5.32"/>
                                                        <path d="M1 1l22 22"/>
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                                        <circle cx="12" cy="12" r="3"/>
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="confirmPassword"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field className="mb-0" data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                id={field.name}
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Confirm new password"
                                                type={showConfirmPassword ? "text" : "password"}
                                                className="pr-10"
                                            />
                                            <button
                                                type="button"
                                                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                                onClick={() => setShowConfirmPassword((s) => !s)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded"
                                            >
                                                {showConfirmPassword ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-11-7 1.08-2.22 2.99-4.07 5.3-5.32"/>
                                                        <path d="M1 1l22 22"/>
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                                        <circle cx="12" cy="12" r="3"/>
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Button type="submit" className="w-1/2 self-center mb-8">
                                Submit
                            </Button>
                        </FieldGroup>
                    </form>
                    <Card className="bg-accent">
                        <CardContent className="text-start">
                            Password requirements:
                            <ul className="list-disc list-inside text-sm">
                                <li>At least 6 characters long</li>
                                <li>At least 1 number</li>
                                <li>At least 1 special character</li>
                            </ul>
                            
                            Password recomandations:
                            <ul className="list-disc list-inside text-sm">
                                <li>Use a mix of uppercase and lowercase letters</li>
                            </ul>

                        </CardContent>
                    </Card>
                </CardContent>

                <div className="hidden md:flex w-px bg-gray-300 mx-4"/>

                <CardContent className="hidden md:flex flex-col justify-center min-w-fit w-xs mx-4">
                    <CardHeader className="text-center mb-3">
                        <CardTitle>StudyFlow</CardTitle>
                        <CardDescription>Collaborate, learn and grow together with your study group</CardDescription>
                    </CardHeader>
                </CardContent>
            </Card>
        </div>
    );
}