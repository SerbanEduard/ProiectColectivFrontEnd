import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field.tsx";
import * as z from "zod";
import { ModelTopicOfInterest } from "@/api";

const formSchema = z.object({
  firstName : z.string()
    .min(1,"First name must not be empty")
    .max(60,"First name can't be more than 60 characters"),
  lastName: z.string()
    .min(1,"Last name must not be empty")
    .max(60,"Last name can't be more than 60 characters"),
  username: z.string()
    .min(1,"Username must not be empty")
    .max(60,"Username can't be more than 60 characters"),
  password: z.string()
    .min(6,"Password must be at least 6 characters long"),
  checkPassword: z.string(),
  email: z.string().email("Email is not valid!"),
  favoriteTopic: z.string().min(1, "Favorite topic required!"),
}).refine(data => data.password === data.checkPassword, {
  message: "Passwords must match!",
  path: ["checkPassword"],
});

export default function EditAccountInfo() {
  // Mock user data
  const mockData = {
    firstName: "John",
    lastName: "Smith",
    "username": "johnsmith",
    email: "example@email.com",
    password: "********",
    checkPassword: "********",
    favoriteTopic: "Mathematics",
  };

  const topicList = Object.values(ModelTopicOfInterest);

  // No form logic, just filled fields
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="relative flex flex-row p-6 mx-5 shadow-md min-h-fit min-w-fit">
        <CardContent>
          <CardHeader className="text-center mb-3 w-full mx-10">
            <CardTitle className="mb-1">Update your StudyFlow Account</CardTitle>
            <CardDescription>Edit your data below</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col mt-4 justify-center w-100">
            <form className="flex flex-col gap-y-4">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="firstName">First name</FieldLabel>
                  <Input
                    id="firstName"
                    name="firstName"
                    defaultValue={mockData.firstName}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="lastName">Last name</FieldLabel>
                  <Input
                    id="lastName"
                    name="lastName"
                    defaultValue={mockData.lastName}
                  />
                </Field>
                <Field> {/* <-- NOU */}
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input
                    id="username"
                    name="username"
                    defaultValue={mockData.username}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    defaultValue={mockData.password}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="checkPassword">Check password</FieldLabel>
                  <Input
                    id="checkPassword"
                    name="checkPassword"
                    type="password"
                    defaultValue={mockData.checkPassword}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">E-mail</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={mockData.email}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="favoriteTopic">Favorite topic</FieldLabel>
                  <Input
                    id="favoriteTopic"
                    name="favoriteTopic"
                    type="text"
                    defaultValue={mockData.favoriteTopic}
                  />
                </Field>
                <Button type="submit" className="w-1/2 self-center mt-6">
                  Save changes
                </Button>
              </FieldGroup>
            </form>
          </CardContent>
        </CardContent>
        <div className="hidden md:flex w-px bg-gray-300 mx-4"/>
        <CardContent className="hidden md:flex flex-col justify-center min-w-fit w-xs">
          <CardHeader className="text-center mb-3">
            <CardTitle>Update your StudyFlow Account</CardTitle>
            <CardDescription>Edit your account data</CardDescription>
          </CardHeader>
        </CardContent>
      </Card>
    </div>
  );
}