
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
  anonymous: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const MOCK_OTP = "123456";

const LoginForm: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  type OtpStage =
    | "login"
    | "otpSent"
    | "otpError"
    | "otpSecondSent"
    | "otpSecondError";

  const [otpStage, setOtpStage] = React.useState<OtpStage>("login");
  const [otpValue, setOtpValue] = React.useState("");
  const [otpValue2, setOtpValue2] = React.useState("");
  const [storedUserInfo, setStoredUserInfo] = React.useState<{ redirect: string } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
      anonymous: false,
    },
  });

  // First step: Login credentials check
  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      let role = "student";
      if (values.anonymous) {
        role = "student";
        const anonymousUser = {
          id: "anon-" + Math.random().toString(36).substring(2, 9),
          name: "Anonymous User",
          email: "anonymous@thrive.edu",
          role: "student",
          isAnonymous: true,
        };
        localStorage.setItem("thriveUser", JSON.stringify(anonymousUser));
        setStoredUserInfo({ redirect: "/dashboard" });
      } else {
        if (values.email.includes("counselor")) role = "counselor";
        else if (values.email.includes("admin")) role = "admin";
        const user = {
          id: Math.random().toString(36).substring(2, 9),
          name: values.email.split("@")[0].replace(/[^a-zA-Z]/g, " "),
          email: values.email,
          role: role,
          isAnonymous: false,
        };
        localStorage.setItem("thriveUser", JSON.stringify(user));
        if (role === "counselor") {
          setStoredUserInfo({ redirect: "/counselor" });
        } else if (role === "admin") {
          setStoredUserInfo({ redirect: "/admin" });
        } else {
          setStoredUserInfo({ redirect: "/dashboard" });
        }
      }
      setOtpStage("otpSent");
      toast({
        title: "First OTP Sent",
        description: "A one-time password has been sent to your email.",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnonymousLoginChange = (checked: boolean) => {
    if (checked) {
      form.setValue("email", "anonymous@thrive.edu");
      form.setValue("password", "anonymous");
    } else {
      form.setValue("email", "");
      form.setValue("password", "");
    }
  };

  // First OTP submit step
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValue === MOCK_OTP) {
      setOtpStage("otpSecondSent");
      setOtpValue2("");
      toast({
        title: "Second OTP Sent",
        description: "A second OTP has been sent to your device.",
      });
    } else {
      setOtpStage("otpError");
      toast({
        title: "OTP Error",
        description: "The OTP you entered is incorrect.",
        variant: "destructive",
      });
    }
  };

  // Second OTP submit step
  const handleOtpSubmit2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValue2 === MOCK_OTP) {
      toast({
        title: "OTP Verified",
        description: "You have been logged in successfully.",
      });
      if (storedUserInfo) {
        navigate(storedUserInfo.redirect);
      } else {
        navigate("/dashboard");
      }
    } else {
      setOtpStage("otpSecondError");
      toast({
        title: "Second OTP Error",
        description: "The second OTP you entered is incorrect.",
        variant: "destructive",
      });
    }
  };

  // First OTP UI
  if (otpStage === "otpSent" || otpStage === "otpError") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Enter First OTP</h2>
          <p className="text-gray-500 mb-4">
            Please enter the 6-digit OTP sent to your institutional email.
          </p>
        </div>
        <form onSubmit={handleOtpSubmit} className="space-y-4 flex flex-col items-center">
          <InputOTP
            maxLength={6}
            value={otpValue}
            onChange={setOtpValue}
            disabled={isLoading}
            autoFocus
          >
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <Button
            type="submit"
            disabled={otpValue.length < 6 || isLoading}
            className="w-full mt-4"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>
          <div className="text-center w-full">
            <button
              type="button"
              tabIndex={-1}
              className="text-sm text-primary hover:underline"
              onClick={() => {
                setOtpValue("");
                setOtpStage("otpSent");
                toast({
                  title: "OTP Resent",
                  description: "A new OTP has been sent to your email.",
                });
              }}
              disabled={isLoading}
            >
              Resend OTP
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Second OTP UI
  if (otpStage === "otpSecondSent" || otpStage === "otpSecondError") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Enter Second OTP</h2>
          <p className="text-gray-500 mb-4">
            Please enter the second 6-digit OTP (sent to your device).
          </p>
        </div>
        <form onSubmit={handleOtpSubmit2} className="space-y-4 flex flex-col items-center">
          <InputOTP
            maxLength={6}
            value={otpValue2}
            onChange={setOtpValue2}
            disabled={isLoading}
            autoFocus
          >
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <Button
            type="submit"
            disabled={otpValue2.length < 6 || isLoading}
            className="w-full mt-4"
          >
            {isLoading ? "Logging in..." : "Verify Second OTP"}
          </Button>
          <div className="text-center w-full">
            <button
              type="button"
              tabIndex={-1}
              className="text-sm text-primary hover:underline"
              onClick={() => {
                setOtpValue2("");
                setOtpStage("otpSecondSent");
                toast({
                  title: "Second OTP resent",
                  description: "A new second OTP has been sent to your device.",
                });
              }}
              disabled={isLoading}
            >
              Resend Second OTP
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Normal login form
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  {...field}
                  disabled={form.watch("anonymous") || isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...field}
                  disabled={form.watch("anonymous") || isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormLabel className="font-normal text-sm">Remember me</FormLabel>
              </FormItem>
            )}
          />

          <Link
            to="/forgot-password"
            className="text-sm font-medium text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <FormField
          control={form.control}
          name="anonymous"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    handleAnonymousLoginChange(!!checked);
                  }}
                  disabled={isLoading}
                />
              </FormControl>
              <FormLabel className="font-normal text-sm">
                Login anonymously (for private consultations)
              </FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>

        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Register
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
