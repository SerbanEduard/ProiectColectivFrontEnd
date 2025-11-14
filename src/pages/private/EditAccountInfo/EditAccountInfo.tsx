import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field.tsx";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form"
import * as z from "zod";
import { ModelTopicOfInterest } from "@/api";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "@/assets/logo.png";
import { useAuthStore } from "@/services/stores/useAuthStore";

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

  email: z.email("Email is not valid!"),

  favoriteTopic: z.array(z.string()),
}).refine(data => data.password === data.checkPassword, {
  message: "Passwords must match!",
  path: ["checkPassword"],
});

export default function EditAccountInfo() {
  const loggedUser = useAuthStore().user;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    firstName: loggedUser?.firstname ?? "",
    lastName: loggedUser?.lastname ?? "",
    username: loggedUser?.username ?? "",
    email: loggedUser?.email ?? "",
    password: "",
    checkPassword: "",
    favoriteTopic: loggedUser?.topicsOfInterest ?? [],
    }
  });

  const topicList = Object.values(ModelTopicOfInterest);

  const handleUpdate = async () => {
    // Handle form submission logic here
  }

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
            <form className="flex flex-col gap-y-4" onSubmit={form.handleSubmit(handleUpdate)}>
              <FieldGroup>
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
                      {fieldState.invalid && <FieldError errors={[fieldState.error]}></FieldError>}
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
                      {fieldState.invalid && <FieldError errors={[fieldState.error]}></FieldError>}
                    </Field>
                  )}
                />

                <Controller
                  name="username"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="johnsmith"
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]}></FieldError>}
                    </Field>
                  )}
                />

                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="password"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]}></FieldError>}
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
                        type="password"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]}></FieldError>}
                    </Field>
                  )}
                />

                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>E-mail</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="email"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]}></FieldError>}
                    </Field>
                  )}
                />

                <Field className="m-6 mb-10">
                  <FieldLabel className="mb-2">Your favorite topics</FieldLabel>
                    <div className="grid grid-cols-3 gap-2">
                      {topicList.map((topic) => {
                        const selected = form.watch("favoriteTopic").includes(topic);
                        return (
                          <div key={topic} className="flex flex-col justify-center w-10 align-middle text-center items-center">
                            <Button
                              className="rounded-full border"
                              key={topic}
                              type="button"
                              variant={selected ? "default" : "outline"}
                              onClick={() => {
                                const topics = form.getValues("favoriteTopic");
                                form.setValue(
                                  "favoriteTopic",
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

                <Button type="submit" className="w-1/2 self-center mt-6">
                  Save changes
                </Button>
              </FieldGroup>
            </form>
          </CardContent>
        </CardContent>
        <div className="hidden md:flex w-px bg-gray-300 mx-4"/>
        <CardContent className="hidden md:flex flex-col justify-center min-w-fit w-xs">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="StudyFlow Logo" className="w-24 h-24" />
          </div>
          <CardHeader className="text-center mb-3">
            <CardTitle>Update your StudyFlow Account</CardTitle>
            <CardDescription>Edit your account data</CardDescription>
          </CardHeader>
        </CardContent>
      </Card>
    </div>
  );
}