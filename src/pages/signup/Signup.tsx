import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSignup } from "@/services/react-query/auth";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import * as z from "zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import type { DtoSignUpUserResponse } from "@/api";

const formSchema = z.object({
  firstName : z.string()
            .min(1,"First name must not be empty")
            .max(60,"First name can't be more than 60 characters"),

  lastName: z.string()
            .min(1,"Last name must not be empty")
            .max(60,"Last name can't be more than 60 characters"),

  password: z.string()
            .min(6,"Password must be at least 6 characters long"),
  
  checkPassword: z.string(),

  email: z.email("Email is not valid!")
}).refine(data => data.password === data.checkPassword, {
  error:"Passwords must match!",
  path:["checkPassword"]
})

export default function Signup() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      password: '',
      checkPassword: '',
      email: ''
    },
  })

  const { mutateAsync : signupAsync } = useSignup(); // mutate : signup is basically saying use mutate as acronym signup 

  const handleSignup = async (data: z.infer<typeof formSchema>) => {

    await toast.promise<DtoSignUpUserResponse>(
      signupAsync({
        firstname: data.firstName,
        lastname: data.lastName,
        password: data.password,
        email: data.email,
        topicsOfInterest: [],
        username: "TestUsername",
      }),
      {
        loading: "Creating account...",
        success: "Account created successfully!",
        error: (err: Error) => {
          return err.message || "Account could not be created";
        },
      }
    );

  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="flex flex-row p-6 mx-5 shadow-md min-h-fit min-w-fit">
        <CardContent>
          <CardHeader className="text-center mb-3">
            <CardTitle className="mb-1">Create your StudyFlow Account!</CardTitle>
            <CardDescription>Sign up to get started</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col mt-4 justify-center w-100">
            <form onSubmit={form.handleSubmit(handleSignup)} className="flex flex-col">
              <FieldGroup className="">
                <div className="flex flex-row gap-x-4">
                    <Controller
                      name="firstName"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>First name</FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="John"
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                    <Controller
                      name="lastName"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Last name</FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Smith"
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                </div>

                <div className="flex flex-row gap-x-4">
                  <Controller
                      name="password"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            type="password"
                            placeholder="********"
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  <Controller
                      name="checkPassword"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Check password</FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="********"
                            type="password"
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                </div>

                <Controller
                      name="email"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>E-mail</FieldLabel>
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

                <Button type="submit" className="w-1/2 self-center">
                  Sign Up
                </Button>
              </FieldGroup>
            </form>
          </CardContent>
        </CardContent>

        <div className="hidden md:flex w-px bg-gray-300 mx-4"/>

        <CardContent className="hidden md:flex flex-col justify-center min-w-fit w-xs">
          <CardHeader className="text-center mb-3">
            <CardTitle>Create your StudyFlow Account!</CardTitle>
            <CardDescription>Sign up to get started</CardDescription>
          </CardHeader>
        </CardContent>
      </Card>
    </div>
  );
}
