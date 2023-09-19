import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1>Login</h1>
      <Link href="/auth/register">Register</Link>
    </>
  );
}
