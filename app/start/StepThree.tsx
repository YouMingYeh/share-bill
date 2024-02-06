import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { RocketIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export async function StepThree() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-10">
      <CarouselDemo />
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ShareButton } from "@/components/ShareButton";

function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        <CarouselItem>
          <CardOne />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

const CardOne = () => {
  return (
    <Card className="w-auto h-auto">
      <CardContent>
        <ShareButton label="分享群組連結" urlToShare="http://localhost:3000" />
      </CardContent>
    </Card>
  );
};
