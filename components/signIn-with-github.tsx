'use client'

import { useAuthActions } from "@convex-dev/auth/react";
import { FaGithub } from "react-icons/fa6";
import { Button } from "./ui/button";

const SignInWithGitHub = () => {
    const { signIn } = useAuthActions();

    return (
        <>
            <Button size='lg' type="button" onClick={() => void signIn("github")}>
                <FaGithub className="size-5" />
                <span className="text-lg">
                    Sign in with GitHub
                </span>
            </Button>
        </>

    );
}
export default SignInWithGitHub;
