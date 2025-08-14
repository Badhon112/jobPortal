"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const Navbar = () => {
  const [user, setuser] = useState(false);
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <p className="text-2xl font-bold">
            Job <span className="textbase">Portal</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ul className="flex font-medium items-center gap-5">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/jobs"}>Jobs</Link>
            </li>
            <li>
              <Link href={"/browser"}>Browser</Link>
            </li>
          </ul>
          {!user ? (
            <div className="flex space-x-1">
              <Link href={"/login"}>
                <Button variant={"outline"} className="cursor-pointer">
                  Login
                </Button>
              </Link>
              <Link href={"/signup"}>
                <Button className="bg-[#6A38c2] hover:bg-[#5b30a6] cursor-pointer">
                  SignUp
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Patel Mern Stack</h4>
                    <p className="text-sm text-muted-foreground">
                      Lorem, ipsum.
                    </p>
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  {/* <Button variant="link" className="cursor-pointer">
                  View Profile
                </Button> */}
                  <Button variant={"link"} className="cursor-pointer">
                    Profile
                  </Button>
                  <Button variant="link" className="cursor-pointer">
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
