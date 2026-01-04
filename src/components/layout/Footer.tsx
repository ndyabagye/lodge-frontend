// import { Link } from "@tanstack/react-router";
// import {
//   Facebook,
//   Instagram,
//   Twitter,
//   Mail,
//   Phone,
//   MapPin,
// } from "lucide-react";

// export function Footer() {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="border-t bg-muted/50">
//       <div className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* Brand */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-bold">Lodge</h3>
//             <p className="text-sm text-muted-foreground">
//               Your perfect getaway destination. Experience luxury and comfort in
//               nature.
//             </p>
//             <div className="flex space-x-4">
//               <a href="#" className="text-muted-foreground hover:text-primary">
//                 <Facebook className="h-5 w-5" />
//               </a>
//               <a href="#" className="text-muted-foreground hover:text-primary">
//                 <Instagram className="h-5 w-5" />
//               </a>
//               <a href="#" className="text-muted-foreground hover:text-primary">
//                 <Twitter className="h-5 w-5" />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="font-semibold mb-4">Quick Links</h4>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <Link
//                   to="/accommodations"
//                   className="text-muted-foreground hover:text-primary"
//                 >
//                   Accommodations
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/activities"
//                   className="text-muted-foreground hover:text-primary"
//                 >
//                   Activities
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/events"
//                   className="text-muted-foreground hover:text-primary"
//                 >
//                   Events
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/about"
//                   className="text-muted-foreground hover:text-primary"
//                 >
//                   About Us
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Support */}
//           <div>
//             <h4 className="font-semibold mb-4">Support</h4>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <Link
//                   to="/contact"
//                   className="text-muted-foreground hover:text-primary"
//                 >
//                   Contact Us
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/faq"
//                   className="text-muted-foreground hover:text-primary"
//                 >
//                   FAQ
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/privacy"
//                   className="text-muted-foreground hover:text-primary"
//                 >
//                   Privacy Policy
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/terms"
//                   className="text-muted-foreground hover:text-primary"
//                 >
//                   Terms & Conditions
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h4 className="font-semibold mb-4">Contact</h4>
//             <ul className="space-y-3 text-sm text-muted-foreground">
//               <li className="flex items-start space-x-2">
//                 <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
//                 <span>Plot 331 Musiniro Rd. Busika, Uganda</span>
//               </li>
//               <li className="flex items-center space-x-2">
//                 <Phone className="h-4 w-4 shrink-0" />
//                 <span>+256 755 933 006</span>
//               </li>
//               <li className="flex items-center space-x-2">
//                 <Mail className="h-4 w-4 shrink-0" />
//                 <span>info@lodge.com</span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
//           <p>&copy; {currentYear} Lodge Booking System. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// components/layout/Footer.tsx (Premium Version)
import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Sparkles,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t premium-surface premium-bg-background">
      <div className="premium-container">
        <div className="premium-section-sm">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-premium-accent/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-premium-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-light tracking-tight premium-text-primary">
                    Lodge
                    <span className="font-serif italic premium-text-accent">
                      Retreats
                    </span>
                  </h3>
                  <p className="text-xs premium-tagline mt-1">
                    Wilderness Luxury Redefined
                  </p>
                </div>
              </div>

              <p className="premium-text-muted text-sm leading-relaxed">
                Experience unparalleled luxury where pristine nature meets
                sophisticated comfort. Your exclusive sanctuary awaits.
              </p>

              <div className="flex space-x-3">
                {[
                  { icon: Facebook, label: "Facebook" },
                  { icon: Instagram, label: "Instagram" },
                  { icon: Twitter, label: "Twitter" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className="w-10 h-10 rounded-full flex items-center justify-center premium-border hover:premium-border-accent hover:bg-premium-accent/5 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4 premium-text-muted group-hover:text-premium-accent transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h4 className="font-medium mb-6 text-sm uppercase tracking-wider premium-text-muted">
                Discover
              </h4>
              <ul className="space-y-3">
                {[
                  { to: "/accommodations", label: "Accommodations" },
                  { to: "/activities", label: "Activities" },
                  { to: "/events", label: "Events" },
                  { to: "/about", label: "About Us" },
                ].map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-sm premium-text-muted hover:premium-text-accent transition-colors duration-300 py-1 inline-block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="lg:col-span-2">
              <h4 className="font-medium mb-6 text-sm uppercase tracking-wider premium-text-muted">
                Support
              </h4>
              <ul className="space-y-3">
                {[
                  { to: "/contact", label: "Contact Us" },
                  { to: "/faq", label: "FAQ" },
                  { to: "/privacy", label: "Privacy" },
                  { to: "/terms", label: "Terms" },
                ].map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-sm premium-text-muted hover:premium-text-accent transition-colors duration-300 py-1 inline-block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-4">
              <h4 className="font-medium mb-6 text-sm uppercase tracking-wider premium-text-muted">
                Get in Touch
              </h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-premium-accent/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4 text-premium-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium premium-text-primary mb-1">
                      Our Location
                    </p>
                    <p className="text-sm premium-text-muted">
                      Plot 331 Musiniro Rd. Busika, Uganda
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-premium-accent/10 flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4 text-premium-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium premium-text-primary mb-1">
                      Call Us
                    </p>
                    <p className="text-sm premium-text-muted">
                      +256 755 933 006
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-premium-accent/10 flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4 text-premium-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium premium-text-primary mb-1">
                      Email Us
                    </p>
                    <p className="text-sm premium-text-muted">info@lodge.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-12 border-t premium-border-light" />

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm premium-text-muted">
              &copy; {currentYear} Lodge Retreats. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
