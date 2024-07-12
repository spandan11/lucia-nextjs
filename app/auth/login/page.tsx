"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AuthSchema } from "@/schemas/form";
import { useToast } from "@/components/ui/use-toast";
import { SignIn } from "../_actions/auth.action";

const LoginPage = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof AuthSchema>>({
    resolver: zodResolver(AuthSchema),
  });

  async function onSubmit(values: z.infer<typeof AuthSchema>) {
    console.log(values);
    const res = await SignIn(values);
    if (res.success) {
      router.push("/dashboard");
      toast({
        title: "Login Successful 🧑‍💻",
      });
    } else {
      toast({
        title: res.error,
      });
    }
    // try {
    //   const res = await fetch("/api/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(values),
    //   });

    //   const data = await res.json();
    //   console.log(data);

    //   if (data.error || data?.idToken === undefined) {
    //     const errorMessage = data?.error;
    //     if (errorMessage.includes("Firebase:")) {
    //       const parsedMessage = errorMessage.split("auth/")[1].split(")")[0];
    //       toast({
    //         title: parsedMessage,
    //         description: "Please enter correct email and password",
    //       });
    //     } else {
    //       toast({
    //         title: "Something went wrong 🧑‍💻",
    //       });
    //     }
    //     // toast({
    //     //   title: errorMessage,
    //     // });
    //     return;
    //   }
    //   if (data?.idToken) {
    //     sessionStorage.setItem("user", data.idToken);
    //     router.push("/");
    //   }
    // } catch (error) {
    //   console.error(error);
    //   toast({
    //     title: "Something went wrong 🧑‍💻",
    //   });
    // }
  }

  //   setLoading(true);
  //   // try {
  //   //   const res = await signInWithEmailAndPassword(email, password);
  //   //   console.log({ res });
  //   //   sessionStorage.setItem("user", "");
  //   //   res?.user.email ? router.push("/") : setError("Something went wrong");
  //   // } catch (e) {
  //   //   console.error(e);
  //   // }
  //   try {
  //     const res = await fetch("/api/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email,
  //         password,
  //       }),
  //     });
  //     console.log(res);
  //     const data = await res.json();
  //     console.log(data);
  //     sessionStorage.setItem("user", data.idToken);
  //     router.push("/");
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
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
              Log in
            </LoadingButton>
            <p>
              Already have an account? &nbsp;
              <Link href="/auth/register" className="underline">
                Register
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
export default LoginPage;
