import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  /* const getTodos = async () => {
    const response = await fetch("http://localhost:5195/todoitems", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
  }; */
  const getTodos = async () => {
    const response = await fetch("http://localhost:5221/user", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
  };
  const postUser = async () => {
    const response = await fetch("http://localhost:5195/todoitems", {
      method: "POST",
      body: JSON.stringify({
        Username: "usernameTest",
        Email: "email@email.com",
        FirstName: "José",
        LastName: "LeMalin",
        DateOfBirth: "01/01/1990",
        PictureUrl: "url.com",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };
  const postTodos = async () => {
    const response = await fetch("http://localhost:5195/todoitems", {
      method: "POST",
      body: JSON.stringify({
        Name: "Add your name in the body",
        IsComplete: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="flex flex-row gap-4 p-2">
      <h3>Welcome Home!!!</h3>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={getTodos}
      >
        Get Todos
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={postUser}
      >
        Post User
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={postTodos}
      >
        Post Todos
      </button>
    </div>
  );
}
