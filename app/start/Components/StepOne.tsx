"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { submitCreateGroupForm } from "../actions";

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

export const StepOne = () => {
  const { pending } = useFormStatus();
  const formRef = useRef<HTMLFormElement>(null);
  async function handleCancel(formData: FormData) {
    formRef.current?.reset();
  }

  return (
    <div>
      <Card className="w-auto h-auto">
        <CardHeader>
          <CardTitle>創建群組</CardTitle>
          <CardDescription>
            輸入以下資訊，創建屬於你們的分帳群組
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={submitCreateGroupForm}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">群組名稱</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="酷酷的分帳群"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">群組描述</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="這是一個酷酷的分帳群組"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="type">類型</Label>
                <Select name="type" required>
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="normal">一般</SelectItem>
                    <SelectItem value="casual">休閒</SelectItem>
                    <SelectItem value="trip">旅遊</SelectItem>
                    <SelectItem value="food">吃飯</SelectItem>
                    <SelectItem value="other">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between">
              <Button variant={"secondary"} formAction={handleCancel}>
                清除
              </Button>
              <Button type="submit" disabled={pending}>
                {pending ? (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "完成"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
