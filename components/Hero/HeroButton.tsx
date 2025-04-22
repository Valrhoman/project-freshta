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
      // className="py-4 px-8  w-fit rounded-full text-white bg-gradient-to-r  to-[#659d0b] from-greeny-500 shadow-lg hover:bg-gradient-to-r hover:from-greeny-400 hover:to-[#79b41aea] active:bg-gradient-to-r active:from-greeny-600 active:to-[#56820f]"
      className="relative py-4 px-8 w-fit rounded-full text-white shadow-lg overflow-hidden"
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-greeny-500 to-[#659d0b] transition-opacity duration-300 opacity-100 hover:opacity-0"></span>
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-greeny-400 to-[#79b41aea] opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
      <span className="relative z-10 pointer-events-none">{children}</span>
    </Link>
  );
}

// #659d0b
// #56820f
