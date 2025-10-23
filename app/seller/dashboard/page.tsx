"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Package, TrendingUp, DollarSign, Settings, HelpCircle, AlertCircle, Phone } from "lucide-react";
import Link from "next/link";

export default function SellerDashboardPage() {
  // Mock seller data - in real app, this would come from auth/database
  const applicationStatus = "under_review"; // or "approved", "rejected"
  const applicationDate = "October 20, 2025";
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Seller Dashboard</h1>
        <p className="text-gray-600">Manage your products and track sales</p>
      </div>

      {/* Application Status Alert */}
      {applicationStatus === "under_review" && (
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Clock className="h-8 w-8 text-amber-600 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-amber-900 mb-2">
                  Application Under Review
                </h3>
                <p className="text-amber-800 mb-4">
                  Thank you for submitting your seller application on {applicationDate}. 
                  Our team is currently reviewing your business documents and information.
                </p>
                <div className="bg-white rounded-lg p-4 space-y-2 text-sm">
                  <p className="font-medium text-gray-900">Review Timeline:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Typical review time: 2-3 business days</li>
                    <li>You'll receive an email once approved</li>
                    <li>Your dashboard features will be activated upon approval</li>
                  </ul>
                </div>
                <div className="flex gap-3 mt-4">
                  <a href="https://wa.me/254700000000?text=Hi, I'd like to check the status of my seller application" target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline">
                      <Phone className="mr-2 h-4 w-4" />
                      Contact Support
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dashboard Preview (Grayed Out) */}
      <div className="opacity-50 pointer-events-none space-y-6">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-gray-500">No products listed yet</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KES 0</div>
              <p className="text-xs text-gray-500">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-gray-500">Pending fulfillment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Account Status</CardTitle>
              <AlertCircle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className="bg-amber-100 text-amber-800">
                Pending Approval
              </Badge>
              <p className="text-xs text-gray-500 mt-1">Under review</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your seller account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline" disabled>
                <Package className="mr-2 h-4 w-4" />
                Add New Product
              </Button>
              <Button className="w-full justify-start" variant="outline" disabled>
                <TrendingUp className="mr-2 h-4 w-4" />
                View Orders
              </Button>
              <Button className="w-full justify-start" variant="outline" disabled>
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>What you'll be able to do once approved</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-600" />
                  <span>List unlimited products with photos and descriptions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-600" />
                  <span>Manage inventory and stock levels</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-600" />
                  <span>Receive orders directly to your dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-600" />
                  <span>Track sales and analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-600" />
                  <span>Get paid directly to your M-Pesa or bank account</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity (Empty State) */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest sales and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-500 mb-2">No activity yet</p>
              <p className="text-sm text-gray-400">
                Once approved, you'll see your orders and sales here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Help Section */}
      <Card className="mt-6">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <HelpCircle className="h-6 w-6 text-blue-600 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-3">
                Have questions about selling on PartsPOA? Our team is here to help!
              </p>
              <div className="flex gap-3">
                <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer">
                  <Button size="sm">
                    <Phone className="mr-2 h-4 w-4" />
                    WhatsApp Support
                  </Button>
                </a>
                <Link href="/seller/faq">
                  <Button size="sm" variant="outline">
                    View FAQ
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
