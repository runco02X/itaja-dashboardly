
import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/theme-provider";
import { AuthPageSettings } from "@/components/auth/AuthPageSettings";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ForgotPassword = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { theme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Password reset requested for:", data.email);
      setIsSuccess(true);
      
      toast({
        title: t("passwordResetEmailSent"),
        description: t("passwordResetInstructions"),
      });
    } catch (error) {
      console.error("Error requesting password reset:", error);
      toast({
        title: t("error"),
        description: t("passwordResetError"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn(
      "flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/5 via-background to-background/80",
      theme === "dark" && "from-primary/10 via-background to-background/90"
    )}>
      <AuthPageSettings />
      <Card className="w-full max-w-md relative z-10 border-border/60 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{t("forgotPassword")}</CardTitle>
          <CardDescription>
            {isSuccess ? t("passwordResetEmailSentDescription") : t("enterEmailForPasswordReset")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSuccess && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("email")}</FormLabel>
                      <FormControl>
                        <Input placeholder="name@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? t("sending") : t("sendResetLink")}
                </Button>
              </form>
            </Form>
          )}
          {isSuccess && (
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-muted-foreground">{t("checkEmailForInstructions")}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-muted-foreground">
            <Link to="/login" className="text-primary hover:underline">
              {t("backToLogin")}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
