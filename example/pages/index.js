import React from "react";
import Link from "next/link";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="prose prose-xl prose-slate mb-8">
          <h1 className="text-3xl font-bold text-gray-800">🧩 Component Dashboard</h1>
          <p className="text-gray-600">
            Welcome to <strong>V1.0</strong> of your UI toolkit. Below is a list of supported components you can explore and test.
          </p>
        </div>

        {/* Component List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { href: "/AdminMenu", label: "Admin Menu" },
            { href: "/BestSeller", label: "Best Seller" },
            { href: "/ImageUploadable", label: "Image Uploadable" },
            { href: "/PatternItem", label: "Pattern Item" },
            { href: "/PayPalCheckout", label: "PayPal Checkout" },
            { href: "/KnitPatternVisualizer", label: "Simulator" },
            { href: "/MenuAddComponentPost", label: "Menu Add Component Post" },
            { href: "/PageEditor", label: "Page Editor" },
            { href: "/PostEditor", label: "Post Editor" },
            { href: "/FileExplorer", label: "File Explorer" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
            >
              <a className="block p-5 rounded-lg bg-white shadow-md hover:shadow-lg border border-gray-200 cursor-pointer hover:border-blue-400 transition duration-200 hover:bg-blue-50 text-blue-500">{label}</a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
