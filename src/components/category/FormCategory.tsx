"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormCategoryProps = {
  handleFunction: (e: React.FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
};

const FormCategory = ({ handleFunction, isPending }: FormCategoryProps) => {
  return (
    <form onSubmit={handleFunction}>
      <div className="mb-2">
        <Input type="text" placeholder="Category name" name="name" />
      </div>
      <div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && (
            <span className="mr-4 h-4 w-4 rounded-full bg-white animate-pulse"></span>
          )}
          Create category
        </Button>
      </div>
    </form>
  );
};

export default FormCategory;
