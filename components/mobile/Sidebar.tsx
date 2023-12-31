"use client";

import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import Sidebar from "../Sidebar";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

interface MobileSidebarProps {
  limitCount: number;
  isPro: boolean;
}

const MobileSidebar = ({ limitCount, isPro }: MobileSidebarProps) => {
  const [isMounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger>
        <Button asChild variant="ghost" size="icon" className="md:hidden p-2">
          <Menu className="w-10 h-10" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar isPro={isPro} limitCount={limitCount} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
