"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { SignUpInterface } from "@/lib/AllInterface";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/lib/config";

const page = () => {
  const [input, setInput] = useState<SignUpInterface>({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);

  const changeEventhandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeRole = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      setLoading(true);
      e.preventDefault();
      const response = await apiCall(
        Methods.POST,
        EndPoint.REGISTER_USER,
        input
      );
      if (response.success) {
        toast(response.message);
      } else {
        toast(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="xl:container xl:mx-auto">
      <div className="flex items-center justify-center lg:max-w-7xl mx-auto">
        <form
          action=""
          className="w-full sm:w-[80%] lg:w-1/2 border border-gray-200  rounded-md p-4 my-10">
          <h1 className="font-bold text-xl mb-5 text-center">Sign Up</h1>
          <div className="my-3">
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Enter Your Name"
              className="outline-none border rounded-[4px] mt-1"
              onChange={changeEventhandler}
              value={input?.fullName}
              name="fullName"
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
                <input
                  type="radio"
                  value="student"
                  id="r1"
                  onChange={changeRole}
                  checked={input?.role === "student"}
                  name="role"
                />
                <Label htmlFor="r1" className=" cursor-pointer">
                  Student
                </Label>
              </div>
              <div className="flex items-center justify-center gap-2  cursor-pointer">
                <input
                  value="recruiter"
                  id="r2"
                  type="radio"
                  onChange={changeRole}
                  checked={input?.role === "recruiter"}
                  name="role"
                />
                <Label htmlFor="r2" className=" cursor-pointer">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>
          <Button
            onClick={handleSignUp}
            className="w-full my-4 cursor-pointer"
            type="submit">
            {loading ? "Loading..." : "  Sign Up"}
          </Button>
          <span className="text-sm">
            Already have an account?{" "}
            <Link href={"/user/login"} className="text-blue-600">
              Login
            </Link>{" "}
          </span>
        </form>
      </div>
    </section>
  );
};

export default page;
