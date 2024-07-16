"use client";

import { createCategory } from "@/services/category.service";
import { createPost } from "@/services/post.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import DrawerCategory from "../category/DrawerCategory";
import DrawerPost from "../post/DrawerPost";

const Navbar = () => {
  const [openPost, setOpenPost] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  // CREATE POST

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllPosts"],
      });
      setOpenPost(false);
    },
  });

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const createPostDTO = {
      title: e.target.title.value,
      description: e.target.description.value,
      category: e.target.category.value,
    };

    mutation.mutate(createPostDTO);
  };

  // CREATE CATEGORY

  const categoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllCategories"],
      });
      setOpenCategory(false);
    },
  });

  const handleCategoryCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const createCategoryDTO = {
      name: e.target.name.value,
    };

    categoryMutation.mutate(createCategoryDTO);
  };

  return (
    <nav className="flex justify-between p-5">
      <Link href="/">Home</Link>
      <div className="flex gap-4">
        <DrawerPost
          open={openPost}
          setOpen={setOpenPost}
          handleFunction={handleCreate}
          title="New post"
          isPending={mutation.isPending}
        />
        <DrawerCategory
          open={openCategory}
          setOpen={setOpenCategory}
          handleFunction={handleCategoryCreate}
          title="New categroy"
          isPending={mutation.isPending}
        />
      </div>
    </nav>
  );
};

export default Navbar;
