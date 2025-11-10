import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";


const formSchema = z.object({
    email: z.email("* Email is not valid!")
});

export default function ForgotPassword() {
    const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: { email: "" }
    });

    const handleResetPassword = (data: z.infer<typeof formSchema>) => {
        toast.info("Reset not yet implemented");

        //TODO handle reset password logic here

        console.log("Reset password for email:", data.email);
    }

    const handleBackButton = () => {
        //TODO handle back button logic here
        toast.info("Back button not yet implemented");
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="relative flex flex-row shadow-md min-h-fit min-w-fit">
                <CardContent className="text-center m-10 md:ml-10 md:mr-0 md:my-6 relative">
                    <Button
                        variant={"ghost"}
                        className="absolute -left-8 top-1/2 -translate-y-1/2 h-full"
                        onClick={handleBackButton}
                        aria-label="Go back"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            width="18" 
                            height="18" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            >
                            <polyline points="15 21 9 12 15 3" />
                        </svg>
                    </Button>
                    <CardHeader className="w-full">
                        <CardTitle className="mb-2">Forgotten Password</CardTitle>
                        <CardDescription>Enter your email to reset your password</CardDescription>
                    </CardHeader>
                    <form onSubmit={form.handleSubmit(handleResetPassword)} className="flex flex-col mt-4 justify-center w-80">
                        <FieldGroup>
                            <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field className="mt-8" 
                                data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="example@email.com"
                                    type="email"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                            />
                            <Button type="submit" className="w-1/2 self-center mb-8">
                                Send Reset Link
                            </Button>
                        </FieldGroup>
                    </form>
                    <Card className="bg-accent">
                        <CardContent className="text-start">
                            <p className="text-sm text-muted-foreground">
                                After submitting your email, 
                                <p>you will receive a link to reset your password.</p>
                            </p>

                        </CardContent>
                    </Card>
                </CardContent>

                <div className="hidden md:flex w-px bg-gray-300 mx-4"/>

                <CardContent className="hidden md:flex flex-col justify-center min-w-fit w-xs">
                    <CardHeader className="text-center mb-3">
                        <CardTitle>StudyFlow</CardTitle>
                        <CardDescription>Collaborate, learn and grow together with your study group</CardDescription>
                    </CardHeader>
                </CardContent>
            </Card>
        </div>
    );
}