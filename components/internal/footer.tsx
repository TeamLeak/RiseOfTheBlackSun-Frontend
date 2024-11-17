import { Link } from "@nextui-org/link";

export const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center py-3">
      <Link
        isExternal
        className="flex items-center gap-1 text-current"
        href="https://t.me/+48888448428"
        title="Author"
      >
        <span className="text-default-600">Made with</span>
        <p className="text-primary">💖 by saintedlittle</p>
      </Link>
    </footer>
  );
};
