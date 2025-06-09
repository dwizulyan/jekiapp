import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import type { ChangeEvent, MouseEvent } from "react";
import { useUsers } from "@/contexts/userContext";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setId, setError } = useUsers();
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    console.log(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  };
  return (
    <div className="flex w-full  items-center justify-center p-5">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link to="/register">
              <Button variant="link">Sign Up</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="username"
                  required
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleUsernameChange(e);
                  }}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handlePasswordChange(e);
                  }}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            onClick={async (e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              const startLogin = await login(username, password, setId);
              if (!startLogin.success) {
                setError(startLogin.message || "");
              } else {
                window.location.href = "/";
              }
            }}
            className="w-full"
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const login = async (
  username: string,
  password: string,
  setId: (id: number) => void
) => {
  try {
    const url = `http://${import.meta.env.VITE_IP_SERVER}:3000/users/login`;
    const cred = {
      username: username,
      password: password,
    };
    const res = await fetch(url, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(cred),
    });
    if (!res.ok) {
      throw new Error("Error While fetching data");
    }
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    setId(data.id);
    return {
      success: true,
      message: "Success Login",
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown Error",
    };
  }
};

export default Login;
