
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Check, AlertCircle, CreditCard, Mail, Phone, User } from "lucide-react";

// Form schema for customer information
const customerSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
});

// Form schema for OTP verification
const otpSchema = z.object({
  otp: z.string().length(6, { message: "Please enter the complete 6-digit code" }),
});

type CustomerFormData = z.infer<typeof customerSchema>;
type OtpFormData = z.infer<typeof otpSchema>;

const Checkout = () => {
  const { toast } = useToast();
  const [checkoutStep, setCheckoutStep] = useState<'customer-info' | 'email-verification' | 'payment'>('customer-info');
  const [customerData, setCustomerData] = useState<CustomerFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Customer information form
  const customerForm = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
    },
  });

  // OTP verification form
  const otpForm = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Handle customer information submission
  const onSubmitCustomerInfo = async (data: CustomerFormData) => {
    setIsSubmitting(true);
    
    try {
      // Save customer data
      setCustomerData(data);
      
      // Simulate API call to send verification email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Verification code sent",
        description: `We've sent a verification code to ${data.email}`,
      });
      
      // Move to email verification step
      setCheckoutStep('email-verification');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to send verification code",
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle OTP verification
  const onSubmitOtp = async (data: OtpFormData) => {
    setIsVerifying(true);
    
    try {
      // Simulate OTP verification (in a real app, you'd call an API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real application, verify the OTP with your backend
      // For demo purposes, we'll accept any 6-digit code
      if (data.otp.length === 6) {
        toast({
          title: "Email verified",
          description: "Your email has been successfully verified.",
        });
        
        // Move to payment step
        setCheckoutStep('payment');
      } else {
        toast({
          variant: "destructive",
          title: "Invalid code",
          description: "The verification code you entered is incorrect.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: "Please try again later.",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle resending OTP
  const handleResendOtp = async () => {
    if (!customerData) return;
    
    try {
      // Simulate API call to resend OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Verification code resent",
        description: `We've sent a new verification code to ${customerData.email}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to resend code",
        description: "Please try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-background/80 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <CreditCard className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Checkout</h1>
          <p className="text-muted-foreground mt-1">Complete your purchase</p>
        </div>
        
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`rounded-full p-1 ${checkoutStep === 'customer-info' ? 'bg-primary text-white' : checkoutStep === 'email-verification' || checkoutStep === 'payment' ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                  <User className="h-4 w-4" />
                </div>
                <div className="h-px w-6 bg-muted" />
                <div className={`rounded-full p-1 ${checkoutStep === 'email-verification' ? 'bg-primary text-white' : checkoutStep === 'payment' ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                  <Mail className="h-4 w-4" />
                </div>
                <div className="h-px w-6 bg-muted" />
                <div className={`rounded-full p-1 ${checkoutStep === 'payment' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                  <CreditCard className="h-4 w-4" />
                </div>
              </div>
            </div>
            <CardTitle className="mt-4">
              {checkoutStep === 'customer-info' && "Your Information"}
              {checkoutStep === 'email-verification' && "Verify Your Email"}
              {checkoutStep === 'payment' && "Payment Details"}
            </CardTitle>
            <CardDescription>
              {checkoutStep === 'customer-info' && "Please enter your contact details"}
              {checkoutStep === 'email-verification' && "Enter the code sent to your email"}
              {checkoutStep === 'payment' && "Enter your payment information"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {checkoutStep === 'customer-info' && (
              <Form {...customerForm}>
                <form onSubmit={customerForm.handleSubmit(onSubmitCustomerInfo)} className="space-y-4">
                  <FormField
                    control={customerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 bg-background">
                            <User className="ml-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="John Doe" className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={customerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 bg-background">
                            <Mail className="ml-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="email@example.com" className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={customerForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 bg-background">
                            <Phone className="ml-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="+1 (555) 000-0000" className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                        Processing...
                      </>
                    ) : (
                      "Continue to Verification"
                    )}
                  </Button>
                </form>
              </Form>
            )}
            
            {checkoutStep === 'email-verification' && customerData && (
              <Form {...otpForm}>
                <form onSubmit={otpForm.handleSubmit(onSubmitOtp)} className="space-y-4">
                  <Alert className="bg-primary/10 border-primary/20">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    <AlertDescription className="text-xs">
                      We've sent a verification code to <strong>{customerData.email}</strong>. Please check your inbox and enter the code below.
                    </AlertDescription>
                  </Alert>
                  
                  <FormField
                    control={otpForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Verification Code</FormLabel>
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex flex-col space-y-2">
                    <Button type="submit" className="w-full" disabled={isVerifying}>
                      {isVerifying ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                          Verifying...
                        </>
                      ) : (
                        "Verify Email"
                      )}
                    </Button>
                    <Button 
                      type="button" 
                      variant="link" 
                      className="text-sm" 
                      onClick={handleResendOtp}
                    >
                      Didn't receive a code? Resend
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="text-sm" 
                      onClick={() => setCheckoutStep('customer-info')}
                    >
                      Back to Information
                    </Button>
                  </div>
                </form>
              </Form>
            )}
            
            {checkoutStep === 'payment' && (
              <div className="space-y-4">
                <div className="rounded-md border border-green-200 bg-green-50 p-3 flex items-center space-x-2 dark:bg-green-900/20 dark:border-green-900/30">
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <div className="text-sm text-green-700 dark:text-green-400">Email verified successfully!</div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="0000 0000 0000 0000" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiration">Expiration Date</Label>
                      <Input id="expiration" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">Security Code</Label>
                      <Input id="cvv" placeholder="CVV" />
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Subtotal</span>
                    <span className="text-sm">25,000 FCFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Tax</span>
                    <span className="text-sm">1,250 FCFA</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>26,250 FCFA</span>
                  </div>
                </div>
                
                <Button className="w-full">Complete Payment</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setCheckoutStep('email-verification')}
                >
                  Back
                </Button>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 border-t pt-6">
            <div className="text-center text-xs text-muted-foreground">
              <p>Your payment information is encrypted and secure.</p>
              <p className="mt-1">By proceeding with this payment, you agree to our terms of service and privacy policy.</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
