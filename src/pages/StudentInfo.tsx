import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import StudentProfile from "@/components/StudentProfile";
import DocumentUpload from "@/components/DocumentUpload";
import { User, Upload, FileText } from "lucide-react";

const StudentInfo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container py-8">
        <Tabs defaultValue="profile" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Documents</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="profile">
            <StudentProfile />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentUpload />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentInfo;