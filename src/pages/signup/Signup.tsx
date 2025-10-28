import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Signup() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="flex flex-row w-full max-w-fit p-6 shadow-md h-96">
        <CardContent>
          <CardHeader className="text-center mb-3">
            <CardTitle>Create your StudyFlow Account!</CardTitle>
            <CardDescription>Sign up to get started</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 mt-4">

            <div className="mb-5">
              <Label className="mb-1" htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>

            <div>
              <Label className="mb-1" htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="********" />
            </div>

            <Button className="w-full mt-2">Sign Up</Button>
          </CardContent>
        </CardContent>

        <div className="w-px bg-gray-300 mx-4"/>

        <CardContent className="flex flex-1 flex-col justify-center">
          <CardHeader className="text-center mb-3 min-w-60">
            <CardTitle>Create your StudyFlow Account!</CardTitle>
            <CardDescription>Sign up to get started</CardDescription>
          </CardHeader>
        </CardContent>
      </Card>
    </div>
  );
}
