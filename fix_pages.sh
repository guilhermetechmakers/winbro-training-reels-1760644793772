#!/bin/bash

pages=(
  "CertificatesPage:Certificates"
  "CheckoutPage:Checkout"
  "CookiePolicyPage:Cookie Policy"
  "CourseBuilderPage:Course Builder"
  "HelpPage:Help"
  "ManageContentPage:Manage Content"
  "NotFoundPage:Not Found"
  "OrderHistoryPage:Order History"
  "PrivacyPolicyPage:Privacy Policy"
  "ProfilePage:Profile"
  "QuizPage:Quiz"
  "ReelPlayerPage:Reel Player"
  "SearchPage:Search"
  "ServerErrorPage:Server Error"
  "SettingsPage:Settings"
  "TermsOfServicePage:Terms of Service"
  "UploadPage:Upload"
)

for page_info in "${pages[@]}"; do
  IFS=':' read -r page_name page_title <<< "$page_info"
  cat > "src/pages/${page_name}.tsx" << EOL
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function ${page_name}() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">${page_title}</CardTitle>
          <CardDescription>
            This page is under construction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/dashboard">
            <Button className="w-full">
              Go to Dashboard
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
EOL
done
