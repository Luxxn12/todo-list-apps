import TodoApp from "@/components/todo-app";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <TodoApp />
    </main>
  );
}
