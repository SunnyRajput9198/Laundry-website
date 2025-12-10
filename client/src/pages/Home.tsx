import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Sparkles, 
  Clock, 
  Truck, 
  ShieldCheck,
  Check,
  Phone,
  Mail,
  MapPin,
  ArrowRight
} from "lucide-react";

const pricingPlans = [
  {
    name: "Wash Only",
    price: "$3",
    unit: "per kg",
    description: "Basic washing service for everyday clothes",
    features: [
      "Machine wash",
      "Fabric softener included",
      "48-hour turnaround",
      "Quality inspection",
    ],
    popular: false,
  },
  {
    name: "Wash & Iron",
    price: "$5",
    unit: "per kg",
    description: "Complete service for professional look",
    features: [
      "Machine wash",
      "Professional ironing",
      "Fabric softener included",
      "24-hour turnaround",
      "Folded & packaged",
    ],
    popular: true,
  },
  {
    name: "Dry Clean",
    price: "$8",
    unit: "per item",
    description: "Premium care for delicate garments",
    features: [
      "Eco-friendly solvents",
      "Stain treatment",
      "Professional pressing",
      "Garment covers",
      "Same-day available",
    ],
    popular: false,
  },
];

const features = [
  {
    icon: Sparkles,
    title: "Quality Care",
    description: "We treat every garment with the utmost care using premium detergents and techniques.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Get your clothes back fresh and clean within 24-48 hours, or same-day for urgent needs.",
  },
  {
    icon: Truck,
    title: "Free Pickup & Delivery",
    description: "We pick up and deliver to your doorstep at no extra cost for orders over $30.",
  },
  {
    icon: ShieldCheck,
    title: "Satisfaction Guaranteed",
    description: "Not happy with the results? We'll re-clean your items for free, no questions asked.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center text-white">
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm" data-testid="badge-hero-tagline">
            Fast &bull; Reliable &bull; Professional
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" data-testid="text-hero-title">
            Fresh Laundry,
            <br />
            <span className="text-primary-foreground drop-shadow-lg">Delivered to Your Door</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8" data-testid="text-hero-description">
            Professional laundry services with free pickup and delivery. 
            We handle your clothes with care so you can focus on what matters most.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create">
              <Button size="lg" className="gap-2" data-testid="button-hero-order">
                Place an Order
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="#pricing" data-testid="link-hero-pricing">
              <Button size="lg" variant="outline" className="text-white border-white/50 bg-white/10 backdrop-blur-sm" data-testid="button-hero-pricing">
                View Pricing
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30" data-testid="section-features">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold mb-4" data-testid="text-features-title">
              Why Choose FreshWash?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine modern technology with traditional care to deliver the best laundry experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center" data-testid={`card-feature-${index}`}>
                <CardHeader className="pb-2">
                  <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 lg:py-24" data-testid="section-pricing">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold mb-4" data-testid="text-pricing-title">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              No hidden fees. Choose the service that fits your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={plan.popular ? "border-primary relative" : ""}
                data-testid={`card-pricing-${index}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="shadow-sm" data-testid="badge-popular">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">{plan.unit}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/create">
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? "default" : "outline"}
                      data-testid={`button-order-${plan.name.toLowerCase().replace(" ", "-")}`}
                    >
                      Order Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 lg:py-24 bg-muted/30" data-testid="section-contact">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold mb-4" data-testid="text-contact-title">
              Get in Touch
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <Card data-testid="card-contact-form">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <Input id="name" placeholder="Your name" data-testid="input-contact-name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input id="email" type="email" placeholder="you@example.com" data-testid="input-contact-email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" data-testid="input-contact-phone" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea 
                      id="message" 
                      placeholder="How can we help you?" 
                      rows={4}
                      data-testid="input-contact-message"
                    />
                  </div>
                  <Button type="submit" className="w-full sm:w-auto" data-testid="button-contact-submit">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card data-testid="card-contact-info">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Phone</h3>
                        <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                        <p className="text-sm text-muted-foreground">Mon-Sat, 8am-8pm</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-sm text-muted-foreground">hello@freshwash.com</p>
                        <p className="text-sm text-muted-foreground">We reply within 24 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Location</h3>
                        <p className="text-sm text-muted-foreground">123 Clean Street</p>
                        <p className="text-sm text-muted-foreground">New York, NY 10001</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-primary text-primary-foreground" data-testid="card-cta">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">Ready to get started?</h3>
                  <p className="text-primary-foreground/80 text-sm mb-4">
                    Place your first order today and experience the FreshWash difference.
                  </p>
                  <Link href="/create">
                    <Button variant="secondary" data-testid="button-cta-order">
                      Place an Order
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground" data-testid="text-copyright">
              2024 FreshWash Laundry. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-home">
                Home
              </Link>
              <Link href="/orders" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-orders">
                Orders
              </Link>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-contact">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
