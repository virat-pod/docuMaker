import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Signup",
  description:
    "Signup to DocuMaker",
};

export default function Signup() {
  return <div className="py-10 pb-20 flex items-center justify-center bg-[#0a0a0f]">
        <SignUp />
      </div>
}


