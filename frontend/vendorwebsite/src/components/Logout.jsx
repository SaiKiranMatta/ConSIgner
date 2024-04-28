import { signOut } from "next-auth/react";

export default () => (
    <button
        className="px-4 py-2 mr-6 duration-300  text-[#22D3EE] border border-[#22D3EE] rounded-xl hover:bg-[#22D3EE] hover:text-white hover:bg-transparent"
        variant="outline"
        onClick={() => signOut()}
    >
        Sign out
    </button>
);
