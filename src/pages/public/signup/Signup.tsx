import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSignup } from "@/services/react-query/auth";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import * as z from "zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { ModelTopicOfInterest } from "@/api";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import logo from "@/assets/logo.png";
import chevronLeft from "@/assets/left-chevron.png";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  firstName : z.string()
            .min(1,"First name must not be empty")
            .max(60,"First name can't be more than 60 characters"),

  lastName: z.string()
            .min(1,"Last name must not be empty")
            .max(60,"Last name can't be more than 60 characters"),

  password: z.string()
            .min(6,"Password must be at least 6 characters long"),
  
  confirmPassword: z.string(),

  email: z.email("Email is not valid!")
}).refine(data => data.password === data.confirmPassword, {
  error:"Passwords must match!",
  path:["confirmPassword"]
})

const formSchema2 = z.object({
  username : z.string()
            .min(1,"Username must not be empty")
            .max(60,"Username can't be more than 60 characters"),

  topics: z.array(z.string())
})

export default function Signup() {
  const [shownForm, setShownForm] = useState(1);
  const navigate = useNavigate();

  const form1 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      email: ''
    },
  })

  const form2 = useForm<z.infer<typeof formSchema2>>({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      username: '',
      topics: [],
    }
  })

  const topicList = Object.values(ModelTopicOfInterest);

  const { mutateAsync : signupAsync } = useSignup(); // mutate : signup is basically saying use mutate as acronym signup 

  const handleFirstStep = () => {
    setShownForm(2);
  }

  const handleSecondStep = async () => {
    const form1Values = form1.getValues();
    const form2Values = form2.getValues();

    await toast.promise(
      signupAsync({
        firstname: form1Values.firstName,
        lastname: form1Values.lastName,
        password: form1Values.password,
        email: form1Values.email,
        topicsOfInterest: form2Values.topics as ModelTopicOfInterest[],
        username: form2Values.username,
      }),
      {
        loading: "Creating account...",
        success: () => {
          navigate('/login');
          return "Account created successfully!";

        },
        error: (err: Error) => {
          return err.message || "Account could not be created";
        },
      }
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="relative flex flex-row p-6 mx-5 shadow-md min-h-fit min-w-fit">
        <CardContent>
          <div className="flex flex-row">
          { shownForm == 2 && (
            <Button
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-transparent hover:bg-transparent border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-xl font-medium h-90"
              variant={"ghost"}
              aria-label="Go back"
              onClick={() => setShownForm(1)}
            >
              <img
                src={chevronLeft}
                alt=""
                aria-hidden
                className="h-5 w-5 object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <span className="sr-only">Back</span>
            </Button>
          )}
          <CardHeader className="text-center mb-3 w-full mx-10">
            <CardTitle className="mb-1">Create your StudyFlow Account!</CardTitle>
            <CardDescription>Sign up to get started</CardDescription>
          </CardHeader>
          </div>
          { shownForm == 1 && 
            <CardContent className="flex flex-col mt-4 justify-center w-100">
              <form onSubmit={form1.handleSubmit(handleFirstStep)} className="flex flex-col">
                <FieldGroup className="">
                  <div className="flex flex-row gap-x-4">
                      <Controller
                        name="firstName"
                        control={form1.control}
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
                        control={form1.control}
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

                  <Controller
                        name="email"
                        control={form1.control}
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

                  <div className="flex flex-row gap-x-4">
                    <Controller
                        name="password"
                        control={form1.control}
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
                        name="confirmPassword"
                        control={form1.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Confirm password</FieldLabel>
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

                  <Button type="submit" className="w-1/2 self-center hover:cursor-pointer">
                    Continue
                  </Button>
                  <div className="flex items-center justify-center gap-1 text-sm mt-4">
                  <span className="text-muted-foreground">Already have an account?</span>
                  <Button 
                    type="button" 
                    variant="link"
                    className="p-0 h-auto font-normal hover:cursor-pointer"
                    onClick={() => window.location.href = '/login'}
                  >
                    Log in
                  </Button>
                </div>
                </FieldGroup>
              </form>
            </CardContent>
          }
          {shownForm == 2 &&
            <CardContent>
              <form className="flex flex-col justify-center"
                onSubmit={form2.handleSubmit(handleSecondStep)}>
                <Controller
                  name="username"
                  control={form2.control}
                  render={({ field, fieldState }) => (
                    <Field className="my-4" 
                      data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Smitty500"
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                <Field className="m-6 mb-10">
                  <FieldLabel className="mb-2">Choose some topics of interest</FieldLabel>
                    <div className="grid grid-cols-3 gap-2">
                      {topicList.map((topic) => {
                        const selected = form2.watch("topics").includes(topic);
                        return (
                          <div key={topic} className="flex flex-col justify-center w-10 align-middle text-center items-center">
                            <Button
                              className="rounded-full border"
                              key={topic}
                              type="button"
                              variant={selected ? "default" : "outline"}
                              onClick={() => {
                                const topics = form2.getValues("topics");
                                form2.setValue(
                                  "topics",
                                  selected ? topics.filter((t) => t !== topic) : [...topics, topic]
                                );
                              }}
                            >
                            </Button>
                            <Label>
                              {topic}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                </Field>
                <Button type="submit" className="w-1/2 self-center hover:cursor-pointer">
                  Sign Up
                </Button>

                <div className="flex items-center justify-center gap-1 text-sm mt-4">
                  <span className="text-muted-foreground">Already have an account?</span>
                  <Button 
                    type="button" 
                    variant="link" 
                    className="p-0 h-auto font-normal hover:cursor-pointer"
                    onClick={() => window.location.href = '/login'}
                  >
                    Log in
                  </Button>
                </div>
              </form>
            </CardContent>
          }


        </CardContent>

        <div className="hidden md:flex w-px bg-gray-300 mx-4"/>

        <CardContent className="hidden md:flex flex-col justify-center min-w-fit w-xs">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="StudyFlow Logo" className="w-24 h-24" />
          </div>
          <CardHeader className="text-center mb-3">
            <CardTitle>Create your StudyFlow Account!</CardTitle>
            <CardDescription>Sign up to get started</CardDescription>
          </CardHeader>
        </CardContent>
      </Card>
    </div>
  );
}
