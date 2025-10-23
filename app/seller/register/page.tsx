"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Store, Upload, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SellerRegisterPage() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    kraPin: "",
    registrationNumber: "",
    businessAddress: "",
    city: "",
    description: "",
    categories: [] as string[],
    agreeToTerms: false
  });

  const availableCategories = [
    "Engine Parts",
    "Body Parts",
    "Electrical",
    "Suspension & Steering",
    "Brakes",
    "Interior",
    "Exterior",
    "Maintenance"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    if (formData.categories.length === 0) {
      alert("Please select at least one product category");
      return;
    }

    // In a real app, this would save to database
    // For now, just show success modal
    setShowSuccessModal(true);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="text-center mb-8">
          <Store className="mx-auto h-12 w-12 text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold mb-2">Start Selling on PartsPOA</h1>
          <p className="text-gray-600">
            Join Kenya's leading auto parts marketplace and reach thousands of customers
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Information */}
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Tell us about your business</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  required
                  placeholder="AutoParts Kenya Ltd"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner's Full Name *</Label>
                  <Input
                    id="ownerName"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    required
                    placeholder="John Kamau"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+254 700 000 000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Business Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="info@autoparts.co.ke"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="kraPin">KRA PIN</Label>
                  <Input
                    id="kraPin"
                    name="kraPin"
                    value={formData.kraPin}
                    onChange={handleInputChange}
                    placeholder="A000000000A"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Business Registration Number</Label>
                  <Input
                    id="registrationNumber"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    placeholder="BN/123456"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessAddress">Business Address *</Label>
                <Input
                  id="businessAddress"
                  name="businessAddress"
                  value={formData.businessAddress}
                  onChange={handleInputChange}
                  required
                  placeholder="Industrial Area, Nairobi"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City/Town *</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  placeholder="Nairobi"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Business Description *</Label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                  placeholder="Describe your business, years of experience, and what makes you stand out..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Product Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Product Categories</CardTitle>
              <CardDescription>Select the categories of parts you'll sell</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {availableCategories.map((category) => (
                  <div key={category} className="flex items-center space-x-2 border rounded-lg p-3">
                    <Checkbox
                      id={`category-${category}`}
                      checked={formData.categories.includes(category)}
                      onCheckedChange={() => handleCategoryToggle(category)}
                    />
                    <Label htmlFor={`category-${category}`} className="cursor-pointer flex-1">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Select all categories that apply to your inventory
              </p>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Business Documents</CardTitle>
              <CardDescription>Upload your business verification documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Upload business registration certificate, KRA PIN certificate, and ID copy
                </p>
                <p className="text-xs text-gray-500">
                  Accepted formats: PDF, JPG, PNG (Max 5MB per file)
                </p>
                <Input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="mt-4 cursor-pointer"
                />
              </div>
              <p className="text-xs text-amber-600">
                Note: Document verification is required before you can start selling
              </p>
            </CardContent>
          </Card>

          {/* Terms & Submit */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                  }
                />
                <Label htmlFor="agreeToTerms" className="cursor-pointer text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/seller/terms" className="text-blue-600 hover:underline">
                    Seller Agreement
                  </Link>
                </Label>
              </div>

              <Button type="submit" size="lg" className="w-full">
                <Store className="mr-2 h-5 w-5" />
                Submit Seller Application
              </Button>

              <p className="text-xs text-center text-gray-500">
                Already have a seller account?{" "}
                <Link href="/seller/login" className="text-blue-600 hover:underline">
                  Log in here
                </Link>
              </p>
            </CardContent>
          </Card>
        </form>
      </div>

      {/* Success Modal */}
      <AlertDialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              Application Submitted Successfully!
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3 pt-2">
              <p>
                Thank you for your interest in selling on PartsPOA! Your seller application 
                has been received.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2 text-sm">
                <p><strong>What happens next?</strong></p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Our team will review your application within 2-3 business days</li>
                  <li>We'll verify your business documents</li>
                  <li>You'll receive an email with next steps</li>
                  <li>Once approved, you can start listing products</li>
                </ul>
              </div>
              <p className="text-sm">
                <strong>Contact us:</strong> For questions, WhatsApp us at +254 700 000 000
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Link href="/seller/dashboard">
                View Application Status
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
