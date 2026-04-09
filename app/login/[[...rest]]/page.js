import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Login",
  description:
    "Login to DocuMaker",
};

export default function Login() {
  return (
    <div className="py-10 pb-20 flex items-center justify-center bg-[#0a0a0f]">
      <SignIn />
    </div>
  );
}
