"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UpdateInterface } from "@/lib/AllInterface";
import React, { useState } from "react";
import { toast } from "sonner";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, JsonHeader, Methods } from "@/lib/config";
import { useRouter } from "next/navigation";

const page = () => {
  const [input, setInput] = useState<UpdateInterface>({
    fullName: "",
    email: "",
    phoneNumber: "",
    bio: "",
    skill: "",
  });
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

  const UpdateUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await apiCall(
        Methods.PATCH,
        EndPoint.UPDATE_USER,
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
      <div className="flex items-center justify-center lg:max-w-7xl mx-auto">
        <form
          action=""
          className="w-full sm:w-[80%] lg:w-1/2 border border-gray-200  rounded-md p-4 my-10">
          <h1 className="font-bold text-xl mb-5 text-center">Update User</h1>
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
            <Label>Bio</Label>
            <Input
              type="text"
              placeholder="Enter Your Bio"
              className="outline-none border rounded-[4px] mt-1"
              onChange={changeEventhandler}
              value={input?.bio}
              name="bio"
              required
            />
          </div>
          <div className="my-3">
            <Label>Skill</Label>
            <Input
              type="text"
              placeholder="Enter Your Skill"
              className="outline-none border rounded-[4px] mt-1"
              onChange={changeEventhandler}
              value={input?.skill}
              name="skill"
              required
            />
          </div>

          <Button
            onClick={UpdateUser}
            className="w-full my-4 cursor-pointer"
            type="submit">
            {loading ? "Loading..." : "Update user"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default page;
