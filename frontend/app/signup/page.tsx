"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SignUpInterface } from "@/lib/AllInterface";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const [input, setInput] = useState<SignUpInterface>();
  const changeEventhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput((prev) => ({
      ...prev,
      file: e.target.files?.[0],
    }));
  };

  return (
    <section className="xl:container xl:mx-auto">
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          action=""
          className="w-1/2 border border-gray-200  rounded-md p-4 my-10">
          <h1 className="font-bold text-xl mb-5 text-center">Sign Up</h1>
          <div className="my-3">
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Enter Your Name"
              className="outline-none border rounded-[4px] mt-1"
              onChange={changeEventhandler}
              value={input?.fullname}
              name="fullname"
              required
            />
          </div>
          <div className="my-3">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter Your Email"
              className="outline-none border rounded-[4px] mt-1"
              onChange={changeEventhandler}
              value={input?.email}
              name="email"
              required
            />
          </div>
          <div className="my-3">
            <Label>Phone Number</Label>
            <Input
              type="phoneNumber"
              placeholder="Enter Your Phone Number"
              className="outline-none border rounded-[4px] mt-1"
              onChange={changeEventhandler}
              value={input?.phoneNumber}
              name="phoneNumber"
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
          <div className="flex justify-between items-center">
            <RadioGroup defaultValue="comfortable" className="flex">
              <div className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value="student" id="r1" />
                <Label htmlFor="r1" className=" cursor-pointer">
                  Student
                </Label>
              </div>
              <div className="flex items-center gap-2  cursor-pointer">
                <RadioGroupItem value="recruiter" id="r2" />
                <Label htmlFor="r2" className=" cursor-pointer">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label htmlFor="profile">Profile</Label>
              <Input type="file" accept="image/*" className="cursor-pointer" />
            </div>
          </div>
          <Button className="w-full my-4 cursor-pointer" type="submit">
            Sign Up
          </Button>
          <span className="text-sm">
            Already have an account?{" "}
            <Link href={"/login"} className="text-blue-600">
              Login
            </Link>{" "}
          </span>
        </form>
      </div>
    </section>
  );
};

export default page;
