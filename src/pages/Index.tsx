
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart3, CreditCard, Lock, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "Payment Processing",
      description: "Secure and reliable payment processing for your subscription-based business."
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Client Management",
      description: "Easily manage your clients and their subscription details in one place."
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: "Advanced Analytics",
      description: "Get insights into your revenue, churn rate, and customer behavior."
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      title: "Secure Infrastructure",
      description: "Enterprise-grade security to protect sensitive payment information."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-primary/90 to-primary px-4 py-20 md:py-32">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Modern Payment Management Platform
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
                Streamline subscription billing, manage clients, and analyze payment data all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/register")}
                  className="bg-white text-primary hover:bg-white/90 font-medium text-base"
                >
                  {t('createAccount')}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate("/login")}
                  className="bg-transparent border-white text-white hover:bg-white/10 font-medium text-base"
                >
                  {t('signIn')}
                </Button>
              </div>
            </div>
            <div className="flex-1 relative max-w-md mx-auto w-full">
              <div className="w-full aspect-[4/3] bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-white/20">
                <div className="p-4 h-full">
                  <div className="w-full h-full rounded-md bg-black/20 flex items-center justify-center">
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-24 h-8 bg-white/20 rounded-md"></div>
                        <div className="w-12 h-12 rounded-full bg-white/20"></div>
                      </div>
                      <div className="space-y-3">
                        <div className="w-full h-3 bg-white/20 rounded-full"></div>
                        <div className="w-5/6 h-3 bg-white/20 rounded-full"></div>
                        <div className="w-4/6 h-3 bg-white/20 rounded-full"></div>
                      </div>
                      <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="h-20 rounded-lg bg-white/20"></div>
                        <div className="h-20 rounded-lg bg-white/20"></div>
                        <div className="h-20 rounded-lg bg-white/20"></div>
                        <div className="h-20 rounded-lg bg-white/20"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Your Business</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to manage subscriptions and payments in one platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border border-border/50 bg-card hover:shadow-md transition-all duration-200">
                <CardContent className="pt-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div 
            className="bg-card rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-lg border border-border/50"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to simplify your payment management?</h2>
                <p className="text-lg text-muted-foreground mb-6 md:mb-0 max-w-xl">
                  Join thousands of businesses using Itaja to manage their subscription payments efficiently.
                </p>
              </div>
              <Button 
                size="lg" 
                onClick={() => navigate("/register")}
                className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base"
              >
                <span className="relative z-10 flex items-center">
                  Get Started Free
                  <ArrowRight className={`ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                </span>
              </Button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl"></div>
            <div className="absolute top-1/2 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl transform -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4 mt-auto">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold">I</div>
              <span className="text-xl font-semibold">Itaja</span>
            </div>
            <div className="flex items-center gap-6">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                {t('terms')}
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                {t('privacy')}
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Contact
              </Button>
            </div>
          </div>
          <div className="border-t border-border/50 mt-8 pt-8 text-center md:text-left text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Itaja. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
