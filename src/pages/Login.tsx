
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { AuthPageSettings } from "@/components/auth/AuthPageSettings";
import { Github, Mail, ArrowRight } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const Login = () => {
  const { t } = useTranslation();
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(email, password);

      // Get the redirect path from location state or default to dashboard
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });

      toast({
        title: t('signIn'),
        description: "You have successfully logged in.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn(
      "flex min-h-screen bg-gradient-to-br from-primary/5 via-background to-background/80",
      theme === "dark" && "from-primary/10 via-background to-background/90"
    )}>
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <AuthPageSettings />

          <div className="flex flex-col items-center">
            <div className={cn(
              "h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6",
              "shadow-lg transition-all duration-300 hover:scale-105"
            )}>
              <svg
                className="h-8 w-8 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
              {t('signIn')}
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {t('dontHaveAccount')}{' '}
              <Link
                to="/register"
                className="font-medium text-primary hover:text-primary/90 transition-colors"
              >
                {t('signUp')}
              </Link>
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full transition-all duration-300 hover:shadow-md">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="w-full transition-all duration-300 hover:shadow-md">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    {t('orContinueWith')}
                  </span>
                </div>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">{t('email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background border-input focus:border-primary focus:ring-primary transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-foreground">{t('password')}</Label>
                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-primary hover:text-primary/90 transition-colors"
                    >
                      {t('forgotPassword')}
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-background border-input focus:border-primary focus:ring-primary transition-all duration-300"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
                  >
                    {t('rememberMe')}
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full group transition-all duration-300 hover:shadow-lg"
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-b-2 border-white rounded-full"></div>
                      Loading...
                    </div>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      {t('signIn')}
                      <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className={cn(
          "absolute inset-0 h-full w-full bg-gradient-to-tr from-primary to-primary-foreground/5",
          theme === "dark" ? "from-primary/80 to-background" : "from-primary to-primary-foreground/10",
          "transition-colors duration-500"
        )}>
          <div className="flex h-full items-center justify-center p-12">
            <div className={cn(
              "max-w-2xl",
              theme === "dark" ? "text-white" : "text-white",
              "rounded-xl p-8 backdrop-blur-sm bg-background/5 border border-white/10"
            )}>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Itaja Dashboard
              </h1>
              <p className="mt-6 text-xl">
                {t('loginPageDescription')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
