"use client";
import { Button } from "./ui/button";
import { SignOut } from "../app/auth/_actions/auth.action";

type Props = {
  children: React.ReactNode;
};

const SignOutButton = ({ children }: Props) => {
  return <Button onClick={() => SignOut()}>{children}</Button>;
};

export default SignOutButton;
