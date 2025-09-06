import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Upload, 
  File, 
  FileText, 
  Award, 
  GraduationCap,
  Eye,
  Download,
  Trash2,
  CheckCircle,
  Clock
} from "lucide-react";

interface Document {
  id: string;
  document_type: string;
  document_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  upload_date: string;
  verified: boolean;
  description: string;
  semester: number | null;
  academic_year: string | null;
}

const DocumentUpload = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const [uploadForm, setUploadForm] = useState({
    document_type: "",
    document_name: "",
    description: "",
    semester: "",
    academic_year: ""
  });

  const documentTypes = [
    { value: "certificate", label: "Certificate", bucket: "certificates", icon: Award },
    { value: "marksheet", label: "Marksheet", bucket: "marksheets", icon: GraduationCap },
    { value: "resume", label: "Resume", bucket: "resumes", icon: FileText },
    { value: "transcript", label: "Transcript", bucket: "student-documents", icon: File },
    { value: "internship", label: "Internship Letter", bucket: "student-documents", icon: File },
    { value: "project", label: "Project Report", bucket: "student-documents", icon: FileText },
    { value: "other", label: "Other", bucket: "student-documents", icon: File }
  ];

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('student_documents')
        .select('*')
        .eq('user_id', user.id)
        .order('upload_date', { ascending: false });

      if (error) {
        console.error('Error loading documents:', error);
        return;
      }

      setDocuments(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!uploadForm.document_type || !uploadForm.document_name) {
      toast({
        title: "Missing information",
        description: "Please fill in document type and name before uploading",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to upload documents",
          variant: "destructive"
        });
        return;
      }

      const docType = documentTypes.find(t => t.value === uploadForm.document_type);
      const bucket = docType?.bucket || 'student-documents';
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

      if (uploadError) {
        toast({
          title: "Upload failed",
          description: uploadError.message,
          variant: "destructive"
        });
        return;
      }

      // Save document metadata
      const { error: dbError } = await supabase
        .from('student_documents')
        .insert({
          user_id: user.id,
          document_type: uploadForm.document_type,
          document_name: uploadForm.document_name,
          file_path: fileName,
          file_size: file.size,
          mime_type: file.type,
          description: uploadForm.description,
          semester: uploadForm.semester ? parseInt(uploadForm.semester) : null,
          academic_year: uploadForm.academic_year || null
        });

      if (dbError) {
        // If database insert fails, clean up the uploaded file
        await supabase.storage.from(bucket).remove([fileName]);
        toast({
          title: "Database error",
          description: dbError.message,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Upload successful",
        description: "Your document has been uploaded successfully"
      });

      // Reset form and reload documents
      setUploadForm({
        document_type: "",
        document_name: "",
        description: "",
        semester: "",
        academic_year: ""
      });
      event.target.value = "";
      loadDocuments();

    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload failed",
        description: "An error occurred while uploading the file",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const downloadDocument = async (document: Document) => {
    try {
      const docType = documentTypes.find(t => t.value === document.document_type);
      const bucket = docType?.bucket || 'student-documents';

      const { data, error } = await supabase.storage
        .from(bucket)
        .download(document.file_path);

      if (error) {
        toast({
          title: "Download failed",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      // Create download link
      const url = URL.createObjectURL(data);
      const link = window.document.createElement('a');
      link.href = url;
      link.download = document.document_name;
      link.click();
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        title: "Download failed",
        description: "An error occurred while downloading the file",
        variant: "destructive"
      });
    }
  };

  const deleteDocument = async (document: Document) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Delete from database
      const { error: dbError } = await supabase
        .from('student_documents')
        .delete()
        .eq('id', document.id)
        .eq('user_id', user.id);

      if (dbError) {
        toast({
          title: "Delete failed",
          description: dbError.message,
          variant: "destructive"
        });
        return;
      }

      // Delete from storage
      const docType = documentTypes.find(t => t.value === document.document_type);
      const bucket = docType?.bucket || 'student-documents';
      
      await supabase.storage
        .from(bucket)
        .remove([document.file_path]);

      toast({
        title: "Document deleted",
        description: "The document has been removed successfully"
      });

      loadDocuments();

    } catch (error) {
      console.error('Error deleting document:', error);
      toast({
        title: "Delete failed",
        description: "An error occurred while deleting the document",
        variant: "destructive"
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="outline" className="px-4 py-2">
          <Upload className="h-4 w-4 mr-2" />
          Document Management
        </Badge>
        <h1 className="text-3xl font-bold">
          Upload{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Documents
          </span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Upload and manage your academic documents, certificates, and other important files
        </p>
      </div>

      {/* Upload Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5 text-primary" />
            <span>Upload New Document</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="document_type">Document Type</Label>
                <Select value={uploadForm.document_type} onValueChange={(value) => setUploadForm(prev => ({...prev, document_type: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center space-x-2">
                          <type.icon className="h-4 w-4" />
                          <span>{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="document_name">Document Name</Label>
                <Input
                  id="document_name"
                  value={uploadForm.document_name}
                  onChange={(e) => setUploadForm(prev => ({...prev, document_name: e.target.value}))}
                  placeholder="Enter document name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm(prev => ({...prev, description: e.target.value}))}
                  placeholder="Brief description of the document"
                  rows={3}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="semester">Semester (optional)</Label>
                <Input
                  id="semester"
                  type="number"
                  min="1"
                  max="8"
                  value={uploadForm.semester}
                  onChange={(e) => setUploadForm(prev => ({...prev, semester: e.target.value}))}
                  placeholder="Semester number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="academic_year">Academic Year (optional)</Label>
                <Input
                  id="academic_year"
                  value={uploadForm.academic_year}
                  onChange={(e) => setUploadForm(prev => ({...prev, academic_year: e.target.value}))}
                  placeholder="e.g., 2023-24"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file_upload">Choose File</Label>
                <Input
                  id="file_upload"
                  type="file"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <p className="text-sm text-muted-foreground">
                  Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                </p>
              </div>
            </div>
          </div>

          {uploading && (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mr-2"></div>
              <span>Uploading document...</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>Your Documents</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <File className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No documents uploaded yet</p>
              <p className="text-sm">Upload your first document to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {documents.map((document) => {
                const docType = documentTypes.find(t => t.value === document.document_type);
                const IconComponent = docType?.icon || File;
                
                return (
                  <div key={document.id} className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
                    <div className="flex items-center space-x-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                      <div>
                        <h4 className="font-medium">{document.document_name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {docType?.label}
                          </Badge>
                          <span>•</span>
                          <span>{formatFileSize(document.file_size)}</span>
                          <span>•</span>
                          <span>{new Date(document.upload_date).toLocaleDateString()}</span>
                        </div>
                        {document.description && (
                          <p className="text-sm text-muted-foreground mt-1">{document.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={document.verified ? "default" : "secondary"} className="text-xs">
                        {document.verified ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </>
                        ) : (
                          <>
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </>
                        )}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadDocument(document)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteDocument(document)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentUpload;