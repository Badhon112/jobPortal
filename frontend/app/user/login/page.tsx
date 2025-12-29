"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { login } from "@/lib/AllInterface";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, JsonHeader, Methods } from "@/lib/config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const page = () => {
  const [input, setInput] = useState<login>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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
  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await apiCall(
        Methods.POST,
        EndPoint.LOGIN_USER,
        input,
        JsonHeader,
        true
      );
      if (response.success) {
        toast(response.message);
        router.push("/");
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
            onClick={handleLogin}
            className="w-full my-4 cursor-pointer"
            disabled={loading}
            type="submit">
            {loading ? "Loading..." : "Login"}
          </Button>
          <span className="text-sm">
            Don't have an account?{" "}
            <Link href={"/user/signup"} className="text-blue-600">
              SignUp
            </Link>{" "}
          </span>
        </form>
      </div>
    </section>
  );
};

export default page;
