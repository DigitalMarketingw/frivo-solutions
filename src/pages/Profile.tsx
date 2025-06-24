
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User, Phone, Briefcase, FileText, Plus, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, profile, refreshProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
    skills: profile?.skills || [],
    resume_url: profile?.resume_url || '',
  });

  const handleSave = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          skills: formData.skills,
          resume_url: formData.resume_url,
        })
        .eq('id', user.id);

      if (error) throw error;

      await refreshProfile();
      setEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const calculateProfileCompletion = () => {
    let completed = 0;
    let total = 4;
    
    if (formData.full_name) completed++;
    if (formData.phone) completed++;
    if (formData.skills.length > 0) completed++;
    if (formData.resume_url) completed++;
    
    return Math.round((completed / total) * 100);
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const profileCompletion = calculateProfileCompletion();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header with Navigation */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-primary">My Profile</h1>
                <p className="text-muted-foreground mt-2">
                  Manage your professional information ({profileCompletion}% complete)
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {editing ? (
                <>
                  <Button variant="outline" onClick={() => {
                    setEditing(false);
                    setFormData({
                      full_name: profile?.full_name || '',
                      phone: profile?.phone || '',
                      skills: profile?.skills || [],
                      resume_url: profile?.resume_url || '',
                    });
                  }}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </>
              ) : (
                <Button onClick={() => setEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          <div className="grid gap-6">
            {/* Profile Completion Card */}
            {profileCompletion < 100 && (
              <Card className="border-l-4 border-l-yellow-500">
                <CardHeader>
                  <CardTitle className="text-lg">Complete Your Profile</CardTitle>
                  <CardDescription>
                    Your profile is {profileCompletion}% complete. Complete it to improve your job application success rate.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${profileCompletion}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>Your personal and contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input
                      id="full_name"
                      value={editing ? formData.full_name : profile.full_name || 'Not provided'}
                      onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                      disabled={!editing}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      value={user?.email || ''}
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={editing ? formData.phone : profile.phone || 'Not provided'}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      disabled={!editing}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <Label>Role</Label>
                    <div className="mt-2">
                      <Badge variant={profile.role === 'admin' ? 'default' : 'secondary'}>
                        {profile.role === 'admin' ? 'Administrator' : 'User'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Skills & Expertise
                </CardTitle>
                <CardDescription>Your professional skills and competencies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.length === 0 ? (
                      <p className="text-muted-foreground text-sm">No skills added yet</p>
                    ) : (
                      formData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {skill}
                          {editing && (
                            <X 
                              className="h-3 w-3 cursor-pointer hover:text-red-500" 
                              onClick={() => removeSkill(skill)}
                            />
                          )}
                        </Badge>
                      ))
                    )}
                  </div>
                  
                  {editing && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a new skill (e.g., JavaScript, Project Management)"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      />
                      <Button onClick={addSkill} size="sm" disabled={!newSkill.trim()}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Resume */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Resume
                </CardTitle>
                <CardDescription>Your resume or CV document</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="resume_url">Resume URL</Label>
                    <Input
                      id="resume_url"
                      value={editing ? formData.resume_url : profile.resume_url || ''}
                      onChange={(e) => setFormData({...formData, resume_url: e.target.value})}
                      disabled={!editing}
                      placeholder="https://example.com/your-resume.pdf"
                    />
                  </div>
                  {profile.resume_url ? (
                    <a 
                      href={profile.resume_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm flex items-center gap-1"
                    >
                      <FileText className="h-4 w-4" />
                      View Resume
                    </a>
                  ) : (
                    <p className="text-muted-foreground text-sm">No resume uploaded yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
