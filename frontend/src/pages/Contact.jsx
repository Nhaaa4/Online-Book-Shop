import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Store",
    details: ["123 Book Street", "Reading City, RC 12345", "Cambodia"],
    color: "text-pink-600",
    bgColor: "bg-pink-100",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["855-123-BOOKSHOP", "(855-123-266-5746)", "Mon-Fri: 9AM-6PM"],
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["support@bookshop.com", "orders@bookshop.com", "We reply within 24 hours"],
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: Clock,
    title: "Store Hours",
    details: ["Monday - Friday: 9AM - 8PM", "Saturday: 10AM - 6PM", "Sunday: 12PM - 5PM"],
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
];

const subjectOptions = [
  "General Inquiry",
  "Order Support",
  "Book Recommendation",
  "Technical Issue",
  "Partnership",
  "Feedback",
  "Other",
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Get in <span className="text-pink-500">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Have a question, need help with an order, or want to share feedback? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="border-pink-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div
                    className={`${info.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <info.icon className={`h-8 w-8 ${info.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="border-pink-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800">Send us a Message</CardTitle>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-gray-700">
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            className={`border-pink-200 focus:border-pink-400 `}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-gray-700">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className={`border-pink-200 focus:border-pink-400`}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-gray-700">
                          Subject *
                        </Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjectOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-gray-700">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us how we can help you..."
                          rows={6}
                          className={`border-pink-200 focus:border-pink-400 resize-none`}
                        />
                        <div className="flex justify-between items-center">
                          <p className="text-gray-500 text-sm ml-auto">0/500</p>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-pink-400 hover:bg-pink-500 text-white py-3"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>

                      <p className="text-sm text-gray-500 text-center">
                        * Required fields. We respect your privacy and will never share your information.
                      </p>
                    </form>
                
                </CardContent>
              </Card>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              {/* Google Maps Embed */}
              <Card className="border-pink-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Find Our Store</CardTitle>
                  <p className="text-gray-600">Visit us in person for a personalized book browsing experience.</p>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="aspect-video w-full">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.7312537029414!2d104.9182099!3d11.5563738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513dc76a6be3%3A0x9c010ee85ab525bb!2sPhnom%20Penh%2C%20Cambodia!5e0!3m2!1sen!2skh!4v1612314567890!5m2!1sen!2skh"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-b-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-400 to-pink-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Our customer support team is here to help you find the perfect book or resolve any issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-pink-600 hover:bg-pink-50 px-8 py-4">
              <Phone className="h-5 w-5 mr-2" />
              Call 1-800-BOOKSHOP
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-pink-600 px-8 py-4 bg-transparent"
            >
              <Mail className="h-5 w-5 mr-2" />
              Email Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}