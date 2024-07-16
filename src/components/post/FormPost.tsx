"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fetchAllCategories } from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormPostProps = {
  handleFunction: (e: React.FormEvent<HTMLFormElement>) => void;
  isFormPending: boolean;
};

const FormPost = ({ handleFunction, isFormPending }: FormPostProps) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["getAllCategories"],
    queryFn: fetchAllCategories,
  });

  return (
    <form onSubmit={(e) => handleFunction(e)}>
      <div className="mb-2">
        <Input type="text" placeholder="Post title" name="title" />
      </div>
      <div className="mb-2">
        <Textarea placeholder="Post description" name="description" />
      </div>
      <div className="mb-2">
        <Select name="category">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              {data?.map((category: any) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Button type="submit" className="w-full" disabled={isFormPending}>
          {isPending && (
            <span className="mr-4 h-4 w-4 rounded-full bg-white animate-pulse"></span>
          )}
          Create post
        </Button>
      </div>
    </form>
  );
};

export default FormPost;
