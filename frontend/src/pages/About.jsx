import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart, Users, TargetIcon } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "We love books and believe in the power of reading.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We foster a welcoming and inclusive community.",
  },
  {
    icon: Target,
    title: "Focus",
    description: "We are dedicated to providing the best experience.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "We are open and honest in all our actions.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-pink-50 to-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-pink-600 mb-10 text-center">
            Our Story
          </h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                Connecting Readers with
                <span className="text-pink-500 block">
                  Their Next Great Adventure
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Founded in 2020 by book lovers for book lovers, BookShop has
                grown from a small startup to a trusted platform serving
                thousands of readers worldwide. Our mission is simple: make
                great books accessible to everyone.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600">1M+</div>
                  <div className="text-sm text-gray-600">Books Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600">50K+</div>
                  <div className="text-sm text-gray-600">Happy Readers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600">500+</div>
                  <div className="text-sm text-gray-600">
                    Publisher Partners
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/pic_store.jpg?height=500&width=600"
                alt="BookShop team"
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-pink-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <TargetIcon className="h-6 w-6 text-pink-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Our Mission
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To democratize access to knowledge and stories by providing an
                  exceptional online book shopping experience. We believe that
                  everyone should have access to the books they love, at prices
                  they can afford, with the convenience they deserve.
                </p>
              </CardContent>
            </Card>

            <Card className="border-pink-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <Eye className="h-6 w-6 text-pink-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Our Vision
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To become the world's most trusted and beloved online
                  bookstore, where readers discover their next favorite book,
                  authors connect with their audience, and the love of reading
                  continues to flourish in the digital age.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and every decision we
              make.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-pink-100 bg-white hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6 text-center">
                  <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
