"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import { AuthSchema } from "@/schemas/form";
import { SignUp } from "../_actions/auth.action";

const RegisterPage = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof AuthSchema>>({
    resolver: zodResolver(AuthSchema),
  });

  async function onSubmit(values: z.infer<typeof AuthSchema>) {
    console.log("The registration details are:", values);

    const res = await SignUp(values);

    if (res.success) {
      toast({
        title: "Account Created Successfully 🧑‍💻",
      });
      router.push("/auth/login");
      return;
    } else {
      toast({
        title: "Something went wrong 🧑‍💻",
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Register</CardTitle>
            <CardDescription>
              Enter your email below to register an account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@example.com" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="m@example.com"
            required
          /> */}
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="********" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          /> */}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <LoadingButton
              loading={
                form.formState.isSubmitting ||
                form.formState.isLoading ||
                form.formState.isValidating
              }
              className="w-full"
            >
              Sign up
            </LoadingButton>
            <p>
              Already have an account? &nbsp;
              <Link href="/auth/login" className="underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default RegisterPage;
