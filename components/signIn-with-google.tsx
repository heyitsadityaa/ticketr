'use client'

import { useAuthActions } from "@convex-dev/auth/react";
import { FaGoogle } from "react-icons/fa6";
import { Button } from "./ui/button";

const SignInWithGoogle = () => {
    const { signIn } = useAuthActions();

    return (
        <Button size='lg' type="button" onClick={() => void signIn("google")}>
            <FaGoogle className="size-5" />
            <span className="text-lg">
                Sign in with Google
            </span>
        </Button>

    );
}
export default SignInWithGoogle;
