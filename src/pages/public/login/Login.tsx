import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@/services/react-query/auth";
import { toast } from "sonner";
import axios from "axios";

const formSchema = z.object({
  usernameOrEmail: z.string().min(1, "Username or email is required"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      usernameOrEmail: '',
      password: '',
    },
  });

  const { mutateAsync: loginAsync, isPending } = useLogin();

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const { usernameOrEmail, password } = values;
    const isEmail = usernameOrEmail.includes("@");
    await toast.promise(
      loginAsync({
        password,
        ...(isEmail ? { email: usernameOrEmail } : { username: usernameOrEmail })
      }),
      {
        loading: "Logging in...",
        success: () => {
          setTimeout(() => navigate('/home'), 300);
          return "Logged in successfully!";
        },
        error: (err: unknown) => {
          if (axios.isAxiosError(err)) {
            const status = err.response?.status;
            if (status === 401) return "Invalid credentials";
            if (status === 400) return "Bad request";
            return err.response?.data?.message || err.message || "Login failed";
          }
          if (err instanceof Error) return err.message || "Login failed";
          return "Login failed";
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="relative flex flex-row p-6 mx-5 shadow-md min-h-fit min-w-fit">
        <CardContent>
          <div className="flex flex-row">
            <CardHeader className="text-center mb-3 w-full mx-10">
              <CardTitle className="mb-1">Welcome Back!</CardTitle>
              <CardDescription>Log in to your StudyFlow account</CardDescription>
            </CardHeader>
          </div>
          
          <CardContent className="flex flex-col mt-4 justify-center w-100">
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col">
              <FieldGroup className="">
                <Controller
                  name="usernameOrEmail"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Username or Email</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="john@example.com or john123"
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                        aria-invalid={fieldState.invalid}
                        type="password"
                        placeholder="********"
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                <Button type="submit" disabled={isPending} className="w-1/2 self-center mt-4">
                  {isPending ? 'Logging in...' : 'Log In'}
                </Button>

                <div className="flex flex-col items-center gap-2 mt-4">
                  <Button 
                    type="button" 
                    variant="link" 
                    className="text-sm text-muted-foreground hover:cursor-pointer"
                    onClick={() => {
                      // TODO: Implement forgot password logic
                    }}
                  >
                    Forgot password?
                  </Button>
                  
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-muted-foreground">Don't have an account?</span>
                    <Button 
                      type="button" 
                      variant="link" 
                      className="p-0 h-auto font-normal hover:cursor-pointer"
                      onClick={() => navigate('/signup')}
                    >
                      Sign up
                    </Button>
                  </div>
                </div>
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
            <CardTitle>Welcome Back!</CardTitle>
            <CardDescription>Log in to your StudyFlow account</CardDescription>
          </CardHeader>
        </CardContent>
      </Card>
    </div>
  );
}