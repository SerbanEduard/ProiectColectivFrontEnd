import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field.tsx";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form"
import * as z from "zod";
import { ModelTopicOfInterest, type DtoUserUpdateRequestDTO } from "@/api";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "@/assets/logo.png";
import { useAuthStore } from "@/services/stores/useAuthStore";
import { useUpdateUserData, useUpdateUserPassword } from "@/services/react-query/user";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";

const FAILED_UPDATE_PASSWORD = "Password update failed";
const FAILED_UPDATE_ACCOUNT_INFO = "Account update failed";

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

  email: z.email("Email is not valid!"),

  favoriteTopic: z.array(z.string()),
});

const passwordFormSchema = z.object({
  oldPassword: z.string()
            .min(1,"Old password is required"),

  newPassword: z.string()
            .min(6,"Password must be at least 6 characters long"),

  checkNewPassword: z.string(),
}).refine(data => data.newPassword === data.checkNewPassword, {
  message: "Passwords must match!",
  path: ["checkNewPassword"],
});

export default function EditAccountInfo() {
  const loggedUser = useAuthStore((state) => state.user);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    firstName: loggedUser?.firstname ?? "",
    lastName: loggedUser?.lastname ?? "",
    username: loggedUser?.username ?? "",
    email: loggedUser?.email ?? "",
    favoriteTopic: loggedUser?.topicsOfInterest ?? [],
    }
  });

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      checkNewPassword: "",
    }
  });

  const topicList = Object.values(ModelTopicOfInterest);

  const { mutateAsync: updateUserAsync, isPending } = useUpdateUserData();
  const { mutateAsync: updatePasswordAsync, isPending: isPasswordPending } = useUpdateUserPassword();

  const handleUpdate = async (data : z.infer<typeof formSchema>) => {
    const { firstName, lastName, username, email, favoriteTopic } = data;
    const id = loggedUser?.id;

    const modifiedUserData : DtoUserUpdateRequestDTO = {
      'email': email,
      'firstname': firstName,
      'lastname': lastName,
      'topicsOfInterest': favoriteTopic.map(topic => topic as ModelTopicOfInterest),
      'username': username,
    }

    await toast.promise(
      updateUserAsync({ id: id as string, user: modifiedUserData }),
      {
        loading: "Updating account...",
        success: () => "Account updated successfully!",
        error: (err: unknown) => {
          if (axios.isAxiosError(err)) {
            const status = err.response?.status;
            if (status === 400) return "Bad request";
            if (status === 404) return "User not found";
            if (status === 500) return "Server error";
            return err.response?.data?.message || err.message || FAILED_UPDATE_ACCOUNT_INFO;
          }
          if (err instanceof Error) return err.message || FAILED_UPDATE_ACCOUNT_INFO;
          return FAILED_UPDATE_ACCOUNT_INFO;
        },
      }
    );
  }

  const handlePasswordUpdate = async (data : z.infer<typeof passwordFormSchema>) => {
    const { oldPassword, newPassword } = data;
    const id = loggedUser?.id;

    const passwordUpdateDTO = {
      'id': id,
      'oldPassword': oldPassword,
      'newPassword': newPassword,
    }

    await toast.promise(
      updatePasswordAsync({ id: id as string, request: passwordUpdateDTO }),
      {
        loading: "Updating password...",
        success: () => {
          passwordForm.reset();
          setShowPasswordForm(false);
          return "Password updated successfully!";
        },
        error: (err: unknown) => {
          if (axios.isAxiosError(err)) {
            const status = err.response?.status;
            if (status === 400) return "Invalid old password";
            if (status === 500) return "Server error";
            return err.response?.data?.message || err.message || FAILED_UPDATE_PASSWORD;
          }
          if (err instanceof Error) return err.message || FAILED_UPDATE_PASSWORD;
          return FAILED_UPDATE_PASSWORD;
        },
      }
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="relative w-full max-w-2xl p-6 shadow-md">
        {/* Logo in top-left corner */}
        <div className="absolute top-4 left-4">
          <img src={logo} alt="StudyFlow Logo" className="w-12 h-12" />
        </div>
         
        <CardContent className="pt-8">
          <CardHeader className="text-center mb-6">
            <CardTitle className="text-2xl mb-2">Update your StudyFlow Account</CardTitle>
            <CardDescription>Edit your data below</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-center">
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
                    <div className="grid grid-cols-4 gap-2">
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

                <Button type="submit" disabled={isPending} className="w-1/2 self-center mt-6">
                  {isPending ? 'Updating...' : 'Save Changes'}
                </Button>

                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowPasswordForm(!showPasswordForm)} 
                  className="w-1/2 self-center mt-2"
                >
                  {showPasswordForm ? 'Cancel Password Change' : 'Change Password'}
                </Button>
              </FieldGroup>
            </form>

            {showPasswordForm && (
              <form className="flex flex-col gap-y-4 mt-6 pt-6 border-t" onSubmit={passwordForm.handleSubmit(handlePasswordUpdate)}>
                <FieldGroup>
                  <Controller
                    name="oldPassword"
                    control={passwordForm.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Old Password</FieldLabel>
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
                    name="newPassword"
                    control={passwordForm.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
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
                    name="checkNewPassword"
                    control={passwordForm.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Confirm New Password</FieldLabel>
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

                  <Button type="submit" disabled={isPasswordPending} className="w-1/2 self-center mt-4">
                    {isPasswordPending ? 'Updating Password...' : 'Update Password'}
                  </Button>
                </FieldGroup>
              </form>
            )}
          </CardContent>
        </CardContent>
      </Card>
    </div>
  );
}