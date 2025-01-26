"use client";

import React, { useState, useEffect } from "react";
import { Clock, Sun, Thermometer, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGeneral } from "@/context/generalContext";

export default function Navigation() {
  const [time, setTime] = useState(getTime());
  const { position, setPosition } = useGeneral();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function getTime() {
    const date = new Date();
    return date.getHours() + ":" + date.getMinutes().toString().padStart(2, "0") + ":" + date.getSeconds().toString().padStart(2, "0");
  }

  return (
    <nav className="w-[100%] flex justify-between items-center border-b-4 bg-gray-900 text-gray-200 py-4 px-6">
      <a href="/" className="flex gap-2 p-2 items-center">
        <h1 className="text-2xl font-bold tracking-wide text-white">SAFE GROUNDS</h1>
      </a>
      <section className="flex gap-6 items-center">
        <div className="flex gap-2 items-center">
          <Bell className="w-5 h-5 text-white" />
          <span>7</span>
        </div>
        <div className="flex gap-2 items-center">
          <Clock className="w-5 h-5 text-white" />
          <span>{time}</span>
        </div>
        <div className="flex gap-2 items-center">
          <Sun className="w-5 h-5 text-white" />
          <span>Sunny</span>
        </div>
        <div className="flex gap-2 items-center">
          <Thermometer className="w-5 h-5 text-white" />
          <span>19°C</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-black text-white border-gray-600 hover:bg-gray-800 hover:border-white transition-all duration-200">
              Logged in as {position}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-gray-800 border border-gray-700 text-gray-300 shadow-lg animate-none"
          >
            <DropdownMenuLabel className="text-gray-400">Choose the Users to Login</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <DropdownMenuRadioItem value="Community 👨‍👩‍👧‍👦">
                Community 👨‍👩‍👧‍👦
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Government 🧑‍⚖️">
                Government 🧑‍⚖️
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Mining Site Representative 🏭">
                Mining Site Representative 🏭
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </nav>
  );
}
