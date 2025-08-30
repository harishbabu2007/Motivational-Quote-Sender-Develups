'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import { Switch } from '@/src/components/ui/switch';
import { Badge } from '@/src/components/ui/badge';
import { Separator } from '@/src/components/ui/separator';
import { ThemeToggle } from '@/src/components/theme-toggle';
import { Quote, Mail, Clock, Calendar, Sparkles, CheckCircle } from 'lucide-react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [customDays, setCustomDays] = useState('7');
  const [timeOfDay, setTimeOfDay] = useState('09:00');
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [weekendsOnly, setWeekendsOnly] = useState(false);
  const [specificDays, setSpecificDays] = useState<string[]>([]);
  const [timeSlot, setTimeSlot] = useState('morning');
  const [deliveryWindow, setDeliveryWindow] = useState('immediate');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const daysOfWeek = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' },
  ];

  const timeSlots = [
    { value: 'early-morning', label: 'Early Morning (5:00 - 7:00 AM)', time: '06:00' },
    { value: 'morning', label: 'Morning (7:00 - 11:00 AM)', time: '07:30' },
    { value: 'midday', label: 'Midday (11:00 AM - 2:00 PM)', time: '12:30' },
    { value: 'afternoon', label: 'Afternoon (2:00 - 6:00 PM)', time: '15:00' },
    { value: 'evening', label: 'Evening (6:00 - 9:00 PM)', time: '19:00' },
    { value: 'night', label: 'Night (9:00 - 11:00 PM)', time: '22:00' },
    { value: 'custom', label: 'Custom Time', time: timeOfDay },
  ];

  const timezones = [
    { value: 'Asia/Kolkata', label: 'India Standard Time (IST)', offset: '+05:30' },
    { value: 'UTC', label: 'Coordinated Universal Time (UTC)', offset: '+00:00' },
    { value: 'America/New_York', label: 'Eastern Time (ET)', offset: '-05:00' },
    { value: 'America/Chicago', label: 'Central Time (CT)', offset: '-06:00' },
    { value: 'America/Denver', label: 'Mountain Time (MT)', offset: '-07:00' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)', offset: '-08:00' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)', offset: '+00:00' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)', offset: '+01:00' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)', offset: '+09:00' },
    { value: 'Asia/Shanghai', label: 'China Standard Time (CST)', offset: '+08:00' },
    { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)', offset: '+11:00' },
    { value: 'Asia/Dubai', label: 'Gulf Standard Time (GST)', offset: '+04:00' },
    { value: 'Asia/Singapore', label: 'Singapore Standard Time (SGT)', offset: '+08:00' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const toggleDay = (day: string) => {
    setSpecificDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleTimeSlotChange = (slot: string) => {
    setTimeSlot(slot);
    const selectedSlot = timeSlots.find(s => s.value === slot);
    if (selectedSlot && slot !== 'custom') {
      setTimeOfDay(selectedSlot.time);
    }
  };

  const getFrequencyText = () => {
    if (frequency === 'daily') return 'Every day';
    if (frequency === 'weekly') return 'Once a week';
    if (frequency === 'specific-days') return `${specificDays.length} days per week`;
    if (frequency === 'custom') return `Every ${customDays} days`;
    return frequency;
  };

  const getSelectedTimezone = () => {
    return timezones.find(tz => tz.value === timezone);
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
              QuoteFlow
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
                Set up your personalized motivation schedule in just a few steps
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

                {/* Frequency Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <Label className="text-base font-medium">Delivery Frequency</Label>
                  </div>
                  
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily - Every day</SelectItem>
                      <SelectItem value="weekly">Weekly - Once a week</SelectItem>
                      <SelectItem value="specific-days">Specific Days - Choose days</SelectItem>
                      <SelectItem value="custom">Custom - Choose interval</SelectItem>
                    </SelectContent>
                  </Select>

                  {frequency === 'specific-days' && (
                    <div className="space-y-3 pt-4">
                      <Label className="text-sm font-medium">Select Days of the Week</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {daysOfWeek.map((day) => (
                          <Button
                            key={day.value}
                            type="button"
                            variant={specificDays.includes(day.value) ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleDay(day.value)}
                            className="h-10 text-xs transition-all duration-200"
                          >
                            {day.label.slice(0, 3)}
                          </Button>
                        ))}
                      </div>
                      {specificDays.length === 0 && (
                        <p className="text-xs text-muted-foreground">Please select at least one day</p>
                      )}
                    </div>
                  )}

                  {frequency === 'custom' && (
                    <div className="flex items-center space-x-2 pt-2">
                      <Label htmlFor="customDays" className="text-sm">Every</Label>
                      <Input
                        id="customDays"
                        type="number"
                        min="1"
                        max="30"
                        value={customDays}
                        onChange={(e) => setCustomDays(e.target.value)}
                        className="w-20 h-10"
                      />
                      <Label className="text-sm">days</Label>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Advanced Timing Options */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/30">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Weekends Only</Label>
                      <p className="text-xs text-muted-foreground">
                        Receive quotes only on Saturday and Sunday
                      </p>
                    </div>
                    <Switch
                      checked={weekendsOnly}
                      onCheckedChange={setWeekendsOnly}
                    />
                  </div>
                </div>

                <Separator />

                {/* Schedule Preview */}
                <div className="bg-gradient-to-r from-primary/5 to-violet-500/5 rounded-lg p-6 space-y-3">
                  <h3 className="font-semibold text-base flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Your Schedule Preview</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {getFrequencyText()}
                    </Badge>
                    {frequency === 'specific-days' && specificDays.length > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {specificDays.map(day => day.charAt(0).toUpperCase() + day.slice(1, 3)).join(', ')}
                      </Badge>
                    )}
                    <Badge variant="secondary" className="text-xs">
                      {timeSlot === 'custom' ? timeOfDay : timeSlots.find(s => s.value === timeSlot)?.time} IST
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {deliveryWindow === 'immediate' ? 'Exact time' : 
                       deliveryWindow === 'flexible-30' ? '±30 min' :
                       deliveryWindow === 'flexible-60' ? '±1 hour' : '±2 hours'}
                    </Badge>
                    {weekendsOnly && (
                      <Badge variant="secondary" className="text-xs">
                        Weekends Only
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You'll receive inspiring quotes {getFrequencyText().toLowerCase()} at{' '}
                    {timeSlot === 'custom' ? timeOfDay : timeSlots.find(s => s.value === timeSlot)?.time} IST
                    {weekendsOnly ? ', but only on weekends' : ''}
                    {frequency === 'specific-days' && specificDays.length > 0 ? 
                      ` on ${specificDays.map(day => day.charAt(0).toUpperCase() + day.slice(1)).join(', ')}` : ''}.
                    {deliveryWindow !== 'immediate' && (
                      <span className="block mt-1 text-xs">
                        Delivery window: {deliveryWindow === 'flexible-30' ? 'Within 30 minutes' :
                                         deliveryWindow === 'flexible-60' ? 'Within 1 hour' : 'Within 2 hours'} of scheduled time.
                      </span>
                    )}
                  </p>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-600/90 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50"
                  disabled={!email || isSubmitted || (frequency === 'specific-days' && specificDays.length === 0)}
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
            <p>Made by Nafees and Harish | IITJ</p>
          </footer>
        </main>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}