import { Button } from "@/components/ui/button";
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
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTitle } from "@/components/utils/useTitle";

const Register = () => {
  const navigate = useNavigate();
  useTitle("Sign Up");

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }
  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }
  async function handleRegister(
    email: string,
    username: string,
    password: string
  ) {
    try {
      const url = `http://${import.meta.env.VITE_IP_SERVER}:3000/users/create`;
      const data = {
        username: username,
        email: email,
        password: password,
      };
      const create = await fetch(url, {
        body: JSON.stringify(data),
        credentials: "include",
        method: "POST",
      });
      if (!create.ok) {
        throw new Error("Error creating account");
      }
      const result = await create.json();
      console.log(result);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="flex w-full  items-center justify-center p-5">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign Up your account</CardTitle>
          <CardDescription>
            Enter your email below to create new account
          </CardDescription>
          <CardAction>
            <Link to="/login">
              <Button variant="link">Login</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleEmailChange(e)
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleUsernameChange(e)
                  }
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handlePasswordChange(e)
                  }
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              handleRegister(email, username, password);
            }}
          >
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
