'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Separator } from '@/src/components/ui/separator';
import { ThemeToggle } from '@/src/components/theme-toggle';
import { Quote, Mail, Clock, Sparkles, CheckCircle } from 'lucide-react';

import { send_email_init } from '../lib/mailing';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (email.trim() == '') return;
    
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
        }),
      });

      const data = await res.json();

      if (data?.success == false){
        if (data?.error == "Full"){
          alert(
            "Oops ur late :( .Our mailing service is only for 100 users since we have mailing restrictions... try again next time."
          );
        } else if (data?.error == "Already subscribed"){
           alert(
             "Hey looks like u have already subscribed to QuoteFlow."
           );
        } else {
          alert("Sorry could not subscribe :( .Hey looks there is a problem with our mailing service since we have a max of 100 mails daily.");
        }
      } else {  
        alert(
          "Congrats!! U have now subscribed to QuoteFlow... check ur mails for confirmation.."
        );
      }

      
    } catch (err) {
      console.error("Error:", err);
    }

    setIsSubmitted(false);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full filter blur-3xl"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary rounded-lg">
              <Quote className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent">
              QuoteFlow | Develups
            </span>
          </div>
          <ThemeToggle />
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Daily Motivation Delivered</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-violet-600 bg-clip-text text-transparent leading-tight">
              Transform Your Day<br />
              <span className="text-muted-foreground">One Quote at a Time</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Receive carefully curated motivational quotes delivered to your inbox exactly when you need them most. 
              Customize your inspiration schedule to match your lifestyle.
            </p>
          </div>

          {/* Main Form Card */}
          <Card className="backdrop-blur-sm bg-card/50 border-border/50 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl flex items-center justify-center space-x-2">
                <Mail className="h-6 w-6 text-primary" />
                <span>Get Started</span>
              </CardTitle>
              <CardDescription className="text-base">
                Set up your personalized motivation now!! to get motivated!
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Email Section */}
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-base font-medium">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 text-base"
                    required
                  />
                </div>

                <Separator />

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-600/90 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50"
                  disabled={!email || isSubmitted}
                >
                  {isSubmitted ? (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5" />
                      <span>Successfully Subscribed!</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Sparkles className="h-5 w-5" />
                      <span>Start My Daily Motivation</span>
                    </div>
                  )}
                </Button>
              </form>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-border/30">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Quote className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium">Curated Content</h4>
                  <p className="text-xs text-muted-foreground">
                    Hand-picked quotes from thought leaders
                  </p>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium">Perfect Timing</h4>
                  <p className="text-xs text-muted-foreground">
                    Delivered when you need motivation most
                  </p>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium">Always Fresh</h4>
                  <p className="text-xs text-muted-foreground">
                    New inspiring content every delivery
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <footer className="text-center pt-12 text-sm text-muted-foreground">
            <p>© 2025 QuoteFlow. Inspiring minds, one quote at a time.</p>
            <p>Made by Nafees and Harish for Develup Labs @ IITJ</p>
          </footer>
        </main>
      </div>

      <style>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}