import CategoryList from "@/components/category/CategoryList";
import PostList from "@/components/post/PostList";

export default function Home() {
  return (
    <div className="px-10">
      <PostList />
      <CategoryList />
    </div>
  );
}
