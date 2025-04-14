"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { loginWithGoogle } from "@/app/lib/actions/auth-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface GoogleLoginButtonProps {
  mode: "login" | "signup";
}

interface GoogleCredentialResponse {
  credential: string;
}

interface GoogleUserInfo {
  name: string;
  email: string;
  picture: string;
}

export default function GoogleLoginButton({ mode }: GoogleLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [apiUrl, setApiUrl] = useState<string | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    // Debug API URL
    setApiUrl(process.env.NEXT_PUBLIC_DEV_API_URL || null);
    if (!process.env.NEXT_PUBLIC_DEV_API_URL) {
      console.warn("⚠️ API URL is not configured. Check your .env.local file.");
    }
  }, []);
  
  const handleGoogleSuccess = async (credentialResponse: GoogleCredentialResponse) => {
    try {
      setIsLoading(true);
      
      // Debug credential
      console.log("Received Google credential");
      
      // Decode the JWT token from Google
      const decoded = jwtDecode(credentialResponse.credential) as GoogleUserInfo;
      console.log("Decoded Google user info:", { 
        email: decoded.email,
        name: decoded.name,
        hasPicture: !!decoded.picture
      });
      
      // Process Google sign-in
      const result = await loginWithGoogle({
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture
      });
      
      if (result.redirectUrl) {
        toast.success(`Successfully ${mode === "login" ? "logged in" : "signed up"} with Google!`);
        router.push(result.redirectUrl);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Google authentication error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to authenticate with Google");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {isLoading ? (
        <Button
          type="button"
          variant="outline"
          className="w-full py-6"
          disabled
        >
          <span>Processing...</span>
        </Button>
      ) : (
        <div className="flex flex-col gap-2 w-full">
          {!apiUrl && (
            <div className="text-sm text-red-500 text-center mb-2">
              API URL not configured. Check .env.local file.
            </div>
          )}
          <div className="flex justify-center w-full">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={(error) => {
                console.error("Google OAuth Error:", error);
                toast.error("Google authentication failed");
              }}
              useOneTap
              theme="outline"
              logo_alignment="center"
              shape="rectangular"
              text={mode === "login" ? "signin_with" : "signup_with"}
              size="large"
            />
          </div>
        </div>
      )}
    </div>
  );
}