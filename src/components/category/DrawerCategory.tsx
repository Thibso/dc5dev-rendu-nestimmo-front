"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import FormCategory from "./FormCategory";

type DrawerPropsType = {
  open: boolean;
  setOpen: () => void;
  handleFunction: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  isPending: boolean;
};

const DrawerCategory = ({
  open,
  setOpen,
  handleFunction,
  title,
  isPending,
}: DrawerPropsType) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="default">{title}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center">Create new category</DrawerTitle>
          <FormCategory handleFunction={handleFunction} isPending={isPending} />
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerCategory;
