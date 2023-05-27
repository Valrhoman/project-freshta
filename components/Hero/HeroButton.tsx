import Link from "next/link";

export default function HeroButton({
  children,
  route = "/",
}: {
  children: React.ReactNode;
  route: string;
}) {
  return (
    <Link
      href={route}
      className="py-4 px-8  w-fit rounded-full text-white bg-gradient-to-r  to-[#659d0b] from-greeny-500 shadow-lg hover:bg-gradient-to-r hover:from-greeny-400 hover:to-[#79b41aea] active:bg-gradient-to-r active:from-greeny-600 active:to-[#56820f] transition-all"
    >
      {children}
    </Link>
  );
}

// #659d0b
// #56820f
