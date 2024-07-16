"use client";

import DrawerCategory from "@/components/category/DrawerCategory";
import DialogConfirmDelete from "@/components/globals/DialogConfirmDelete";
import { useToast } from "@/components/ui/use-toast";
import {
  deleteCategory,
  fetchCategoryById,
  updateCategory,
} from "@/services/category.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

type CategoryDetailParams = {
  id: string;
};

const CategoryDetail = () => {
  const { id } = useParams<CategoryDetailParams>();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const { isPending, error, data } = useQuery({
    queryKey: ["getCategoryById"],
    queryFn: () => fetchCategoryById(id),
  });

  // UPDATE

  const queryClient = useQueryClient();

  const updtateMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCategoryById"],
      });
      setOpen(false);
    },
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updateCategoryDTO = {
      id: id,
      name: e.target.name.value,
    };

    updtateMutation.mutate(updateCategoryDTO);
  };

  // DELETE

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast({
        title: "Category deleted",
      });
      router.push("/");
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(id);
  };

  if (isPending)
    return (
      <div className="h-full flex justify-center items-center">Loading...</div>
    );

  return (
    <div className="max-w-screen-lg m-auto my-8">
      <h1 className="text-xl font-bold mb-8">{data.name}</h1>

      <div className="flex gap-8">
        <DrawerCategory
          open={open}
          setOpen={setOpen}
          handleFunction={handleUpdate}
          title="Edit"
          isPending={updtateMutation.isPending}
        />
        <DialogConfirmDelete
          handleDelete={handleDelete}
          isPending={deleteMutation.isPending}
        />
      </div>
    </div>
  );
};

export default CategoryDetail;
