export default async function Teste() {
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const response = await fetch(apiUrl);
  const posts: [] = await response.json();

  return (
    <>
      <h1>Posts from JSONPlaceholder API</h1>
      <ul>
        {posts && posts.map((post: any) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </>
  )
}