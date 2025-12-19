"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/AllInterface";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const [input, setInput] = useState<login>();
  const changeEventhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <section className="xl:container xl:mx-auto">
      <div className="flex items-center justify-center min-h-[80vh] max-w-7xl mx-auto">
        <form
          action=""
          className="w-1/2 border border-gray-200  rounded-md p-4 my-10">
          <h1 className="font-bold text-xl mb-5 text-center">Login</h1>

          <div className="my-3">
            <Label>Email</Label>
            <Input
              type="text"
              placeholder="Enter Your Email"
              className="outline-none border rounded-[4px] mt-1"
              onChange={changeEventhandler}
              value={input?.email}
              name="email"
              required
            />
          </div>

          <div className="my-3">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter Your Password"
              className="outline-none border rounded-[4px] mt-1"
              onChange={changeEventhandler}
              value={input?.password}
              name="password"
              required
            />
          </div>

          <Button
            onClick={handleLogin}
            className="w-full my-4 cursor-pointer"
            type="submit">
            Login
          </Button>
          <span className="text-sm">
            Don't have an account?{" "}
            <Link href={"/signup"} className="text-blue-600">
              SignUp
            </Link>{" "}
          </span>
        </form>
      </div>
    </section>
  );
};

export default page;
