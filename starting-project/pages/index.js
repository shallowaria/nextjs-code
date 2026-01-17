import { useRouter } from "next/router";
import Link from "next/link";

function HomePage() {
  const router = useRouter();
  return (
    <div>
      <h1>The Home Page</h1>
      <Link href="events">To Events</Link>
    </div>
  );
}

export default HomePage;
