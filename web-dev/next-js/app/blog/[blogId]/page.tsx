const Blog = async ({ params }: { params: { blogId: string } }) => {
  const { blogId } = await params;
  const data = await fetch(
    "https://jsonplaceholder.typicode.com/posts/" + blogId
  );
  const blog = await data.json();
  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex flex-col p-4 justify-center dark:bg-zinc-100 dark:text-zinc-700 bg-zinc-700 text-zinc-200 rounded-md mx-20">
        <span className="text-xl font-bold">{blog.title}</span>
        <span className="text-lg">{blog.body}</span>
        <span>{blog.userId}</span>
      </div>
    </div>
  );
};

export default Blog;
