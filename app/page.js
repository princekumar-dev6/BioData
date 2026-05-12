'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import Cropper from 'react-easy-crop';
import {
  Download, Eye, Edit3, User, GraduationCap, Users, Heart, Phone,
  Camera, Trash2, RotateCcw, FileText, Printer, Share2,
  Sparkles, Save, CheckCircle2
} from 'lucide-react';

// ============================================================
// CONSTANTS
// ============================================================

const HEIGHT_OPTIONS = [
  "4'0\"", "4'1\"", "4'2\"", "4'3\"", "4'4\"", "4'5\"", "4'6\"", "4'7\"", "4'8\"", "4'9\"", "4'10\"", "4'11\"",
  "5'0\"", "5'1\"", "5'2\"", "5'3\"", "5'4\"", "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "5'11\"",
  "6'0\"", "6'1\"", "6'2\"", "6'3\"", "6'4\"", "6'5\"", "6'6\""
];

const MARITAL_STATUS_OPTIONS = ['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce'];
const COMPLEXION_OPTIONS = ['Very Fair', 'Fair', 'Wheatish', 'Wheatish Brown', 'Dark'];
const BLOOD_GROUP_OPTIONS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const FAMILY_TYPE_OPTIONS = ['Joint Family', 'Nuclear Family'];
const RELIGION_OPTIONS = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Other'];
const GENDER_OPTIONS = ['Male', 'Female'];

const DEFAULT_FORM_DATA = {
  fullName: '',
  gender: '',
  dateOfBirth: '',
  age: '',
  height: '',
  weight: '',
  complexion: '',
  bloodGroup: '',
  maritalStatus: 'Never Married',
  religion: '',
  caste: '',
  subCaste: '',
  gotra: '',
  motherTongue: '',
  education: '',
  college: '',
  occupation: '',
  company: '',
  income: '',
  workLocation: '',
  fatherName: '',
  fatherOccupation: '',
  motherName: '',
  motherOccupation: '',
  brothers: '',
  sisters: '',
  familyType: '',
  aboutMe: '',
  hobbies: '',
  partnerAge: '',
  partnerHeight: '',
  partnerEducation: '',
  partnerOccupation: '',
  partnerPreferences: '',
  contactNumber: '',
  email: '',
  address: '',
  photo: '',
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const maxSize = 400;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = maxSize;
  canvas.height = maxSize * (4 / 3);

  ctx.drawImage(
    image,
    pixelCrop.x * scaleX,
    pixelCrop.y * scaleY,
    pixelCrop.width * scaleX,
    pixelCrop.height * scaleY,
    0,
    0,
    canvas.width,
    canvas.height
  );

  return canvas.toDataURL('image/jpeg', 0.85);
};

// ============================================================
// FORM COMPONENTS (defined OUTSIDE Home to prevent re-mount)
// ============================================================

const FormField = ({ label, field, placeholder, type = 'text', value, onChange, ...props }) => (
  <div className="space-y-1.5">
    <Label htmlFor={field} className="text-sm font-medium text-foreground">{label}</Label>
    <Input
      id={field}
      type={type}
      value={value || ''}
      onChange={(e) => onChange(field, e.target.value)}
      placeholder={placeholder}
      className="h-10 bg-white border-gold/30 focus:border-gold focus:ring-gold/20"
      {...props}
    />
  </div>
);

const FormSelectField = ({ label, field, options, placeholder, value, onChange }) => (
  <div className="space-y-1.5">
    <Label className="text-sm font-medium text-foreground">{label}</Label>
    <Select value={value || ''} onValueChange={(v) => onChange(field, v)}>
      <SelectTrigger className="h-10 bg-white border-gold/30 focus:border-gold focus:ring-gold/20">
        <SelectValue placeholder={placeholder || `Select ${label}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const FormTextareaField = ({ label, field, placeholder, rows = 3, value, onChange }) => (
  <div className="space-y-1.5">
    <Label htmlFor={field} className="text-sm font-medium text-foreground">{label}</Label>
    <Textarea
      id={field}
      value={value || ''}
      onChange={(e) => onChange(field, e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="bg-white border-gold/30 focus:border-gold focus:ring-gold/20 resize-none"
    />
  </div>
);

// ============================================================
// TEMPLATE COMPONENTS (NO gradients - solid colors for PDF)
// ============================================================

const OrnamentalDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '8px 0' }}>
    <div style={{ flex: 1, height: '1px', backgroundColor: '#D4AF37' }} />
    <div style={{ margin: '0 12px', color: '#D4AF37', fontSize: '12px' }}>&#10022;</div>
    <div style={{ flex: 1, height: '1px', backgroundColor: '#D4AF37' }} />
  </div>
);

const SectionTitle = ({ title }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0 12px' }}>
    <div style={{ flex: 1, height: '1px', backgroundColor: '#D4AF37' }} />
    <span style={{
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: '#8B1A1A',
      whiteSpace: 'nowrap'
    }}>{title}</span>
    <div style={{ flex: 1, height: '1px', backgroundColor: '#D4AF37' }} />
  </div>
);

const DetailRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <tr>
      <td style={{
        padding: '5px 0',
        fontSize: '13px',
        fontWeight: 500,
        color: '#6B5B3E',
        whiteSpace: 'nowrap',
        verticalAlign: 'top',
        width: '160px'
      }}>{label}</td>
      <td style={{
        padding: '5px 8px',
        fontSize: '13px',
        color: '#D4AF37',
        verticalAlign: 'top',
        width: '12px'
      }}>:</td>
      <td style={{
        padding: '5px 0',
        fontSize: '13px',
        fontWeight: 600,
        color: '#2D2418',
        verticalAlign: 'top',
        wordBreak: 'break-word'
      }}>{value}</td>
    </tr>
  );
};

// ============================================================
// BIODATA TEMPLATE (all inline styles, no gradients)
// ============================================================

const BiodataTemplate = ({ formData }) => {
  const hasPersonalDetails = formData.height || formData.weight || formData.complexion ||
    formData.bloodGroup || formData.religion || formData.caste ||
    formData.motherTongue || formData.gotra || formData.subCaste || formData.dateOfBirth || formData.age;

  const hasCareerDetails = formData.education || formData.college || formData.occupation ||
    formData.company || formData.income || formData.workLocation;

  const hasFamilyDetails = formData.fatherName || formData.motherName ||
    formData.brothers || formData.sisters || formData.familyType;

  const hasPartnerPrefs = formData.partnerAge || formData.partnerHeight ||
    formData.partnerEducation || formData.partnerOccupation || formData.partnerPreferences;

  const hasContact = formData.contactNumber || formData.email || formData.address;

  return (
    <div
      id="biodata-preview"
      style={{
        width: '595px',
        minHeight: '842px',
        backgroundColor: '#FFFEF7',
        fontFamily: 'Georgia, "Times New Roman", serif',
        padding: '12px',
        margin: '0 auto',
      }}
    >
      {/* Outer decorative border */}
      <div
        style={{
          border: '2px solid #D4AF37',
          padding: '4px',
          minHeight: '818px',
          position: 'relative',
        }}
      >
        {/* Inner border */}
        <div
          style={{
            border: '1px solid #D4AF37',
            padding: '24px 28px',
            minHeight: '806px',
          }}
        >
          {/* Corner decorations */}
          <div style={{ position: 'absolute', top: '8px', left: '8px', width: '20px', height: '20px', borderTop: '2px solid #8B1A1A', borderLeft: '2px solid #8B1A1A' }} />
          <div style={{ position: 'absolute', top: '8px', right: '8px', width: '20px', height: '20px', borderTop: '2px solid #8B1A1A', borderRight: '2px solid #8B1A1A' }} />
          <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '20px', height: '20px', borderBottom: '2px solid #8B1A1A', borderLeft: '2px solid #8B1A1A' }} />
          <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '20px', height: '20px', borderBottom: '2px solid #8B1A1A', borderRight: '2px solid #8B1A1A' }} />

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <p style={{ fontSize: '13px', marginBottom: '4px', color: '#D4AF37', fontFamily: 'Georgia, serif' }}>
              || &#2358;&#2381;&#2352;&#2368; &#2327;&#2339;&#2375;&#2358;&#2366;&#2351; &#2344;&#2350;&#2307; ||
            </p>
            <OrnamentalDivider />
            <h1 style={{
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              margin: '12px 0',
              color: '#8B1A1A',
              fontFamily: 'var(--font-playfair), Georgia, serif',
            }}>
              Biodata
            </h1>
            <OrnamentalDivider />
          </div>

          {/* Photo + Name Section */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', marginBottom: '20px' }}>
            {/* Photo */}
            <div style={{ flexShrink: 0 }}>
              <div style={{
                width: '140px',
                height: '175px',
                border: '3px solid #D4AF37',
                padding: '3px',
                backgroundColor: '#FFF',
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  border: '1px solid #E8D48B',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: formData.photo ? 'transparent' : '#FBF5E6',
                }}>
                  {formData.photo ? (
                    <img
                      src={formData.photo}
                      alt="Profile"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <div style={{ textAlign: 'center' }}>
                      <Camera size={28} style={{ color: '#D4AF37', margin: '0 auto 4px' }} />
                      <p style={{ fontSize: '10px', color: '#B8960C' }}>Your Photo</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Name & Quick Info */}
            <div style={{ flex: 1, paddingTop: '8px' }}>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 700,
                marginBottom: '8px',
                color: '#8B1A1A',
                fontFamily: 'var(--font-playfair), Georgia, serif',
              }}>
                {formData.fullName || 'Your Full Name'}
              </h2>
              <div style={{ fontSize: '13px', color: '#4A3F2F', lineHeight: 1.8 }}>
                {formData.dateOfBirth && (
                  <p><span style={{ color: '#6B5B3E' }}>Date of Birth:</span> {formData.dateOfBirth}{formData.age ? ` (${formData.age} yrs)` : ''}</p>
                )}
                {!formData.dateOfBirth && formData.age && (
                  <p><span style={{ color: '#6B5B3E' }}>Age:</span> {formData.age} years</p>
                )}
                {formData.religion && (
                  <p><span style={{ color: '#6B5B3E' }}>Religion:</span> {formData.religion}{formData.caste ? ` - ${formData.caste}` : ''}</p>
                )}
                {formData.education && (
                  <p><span style={{ color: '#6B5B3E' }}>Education:</span> {formData.education}</p>
                )}
                {formData.occupation && (
                  <p><span style={{ color: '#6B5B3E' }}>Occupation:</span> {formData.occupation}</p>
                )}
              </div>
            </div>
          </div>

          {/* Personal Details */}
          {hasPersonalDetails && (
            <>
              <SectionTitle title="Personal Details" />
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <DetailRow label="Date of Birth" value={formData.dateOfBirth} />
                  <DetailRow label="Age" value={formData.age ? `${formData.age} years` : ''} />
                  <DetailRow label="Height" value={formData.height} />
                  <DetailRow label="Weight" value={formData.weight ? `${formData.weight} kg` : ''} />
                  <DetailRow label="Complexion" value={formData.complexion} />
                  <DetailRow label="Blood Group" value={formData.bloodGroup} />
                  <DetailRow label="Marital Status" value={formData.maritalStatus} />
                  <DetailRow label="Religion" value={formData.religion} />
                  <DetailRow label="Caste" value={formData.caste} />
                  <DetailRow label="Sub-Caste" value={formData.subCaste} />
                  <DetailRow label="Gotra" value={formData.gotra} />
                  <DetailRow label="Mother Tongue" value={formData.motherTongue} />
                </tbody>
              </table>
            </>
          )}

          {/* Education & Career */}
          {hasCareerDetails && (
            <>
              <SectionTitle title="Education & Career" />
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <DetailRow label="Education" value={formData.education} />
                  <DetailRow label="College / University" value={formData.college} />
                  <DetailRow label="Occupation" value={formData.occupation} />
                  <DetailRow label="Company" value={formData.company} />
                  <DetailRow label="Annual Income" value={formData.income} />
                  <DetailRow label="Work Location" value={formData.workLocation} />
                </tbody>
              </table>
            </>
          )}

          {/* Family Details */}
          {hasFamilyDetails && (
            <>
              <SectionTitle title="Family Details" />
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <DetailRow label="Father's Name" value={formData.fatherName} />
                  <DetailRow label="Father's Occupation" value={formData.fatherOccupation} />
                  <DetailRow label="Mother's Name" value={formData.motherName} />
                  <DetailRow label="Mother's Occupation" value={formData.motherOccupation} />
                  <DetailRow label="Brothers" value={formData.brothers} />
                  <DetailRow label="Sisters" value={formData.sisters} />
                  <DetailRow label="Family Type" value={formData.familyType} />
                </tbody>
              </table>
            </>
          )}

          {/* About Me */}
          {formData.aboutMe && (
            <>
              <SectionTitle title="About Me" />
              <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#2D2418' }}>
                {formData.aboutMe}
              </p>
            </>
          )}

          {/* Hobbies */}
          {formData.hobbies && (
            <>
              <SectionTitle title="Hobbies & Interests" />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {formData.hobbies.split(',').map((hobby, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '12px',
                      padding: '4px 14px',
                      borderRadius: '20px',
                      backgroundColor: '#FBF5E6',
                      color: '#6B5B3E',
                      border: '1px solid #E8D48B',
                    }}
                  >
                    {hobby.trim()}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* Partner Preferences */}
          {hasPartnerPrefs && (
            <>
              <SectionTitle title="Partner Preferences" />
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <DetailRow label="Preferred Age" value={formData.partnerAge} />
                  <DetailRow label="Preferred Height" value={formData.partnerHeight} />
                  <DetailRow label="Preferred Education" value={formData.partnerEducation} />
                  <DetailRow label="Preferred Occupation" value={formData.partnerOccupation} />
                </tbody>
              </table>
              {formData.partnerPreferences && (
                <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#2D2418', marginTop: '8px' }}>
                  {formData.partnerPreferences}
                </p>
              )}
            </>
          )}

          {/* Contact Information */}
          {hasContact && (
            <>
              <SectionTitle title="Contact Information" />
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <DetailRow label="Contact No." value={formData.contactNumber} />
                  <DetailRow label="Email" value={formData.email} />
                  <DetailRow label="Address" value={formData.address} />
                </tbody>
              </table>
            </>
          )}

          {/* Footer */}
          <div style={{ marginTop: '24px' }}>
            <OrnamentalDivider />
            <p style={{ textAlign: 'center', fontSize: '12px', marginTop: '8px', color: '#D4AF37' }}>
              &#10022; &#10022; &#10022;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// IMAGE CROP MODAL
// ============================================================

const ImageCropModal = ({ imageSrc, open, onClose, onComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPx) => {
    setCroppedAreaPixels(croppedAreaPx);
  }, []);

  const handleSave = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      onComplete(croppedImage);
    } catch (e) {
      console.error('Crop failed:', e);
      toast.error('Failed to crop image');
    }
  };

  if (!imageSrc) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="font-playfair text-maroon">Crop Your Photo</DialogTitle>
        </DialogHeader>
        <div className="relative h-[350px] bg-black">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={3 / 4}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="px-6 py-2">
          <Label className="text-sm text-muted-foreground mb-1 block">Zoom</Label>
          <Slider
            value={[zoom]}
            min={1}
            max={3}
            step={0.1}
            onValueChange={(v) => setZoom(v[0])}
            className="my-2"
          />
        </div>
        <div className="flex justify-end gap-3 px-6 pb-6">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} className="bg-maroon hover:bg-maroon-dark text-white">
            <CheckCircle2 size={16} className="mr-2" /> Apply Crop
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================

export default function Home() {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [activeTab, setActiveTab] = useState('personal');
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [autoSaved, setAutoSaved] = useState(false);
  const fileInputRef = useRef(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('biodataFormData');
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData({ ...DEFAULT_FORM_DATA, ...parsed });
      }
    } catch (e) {
      console.error('Failed to load saved data:', e);
    }
  }, []);

  // Auto-save to localStorage (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem('biodataFormData', JSON.stringify(formData));
        setAutoSaved(true);
        setTimeout(() => setAutoSaved(false), 2000);
      } catch (e) {
        console.error('Failed to save:', e);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData]);

  // Update form data
  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image size should be less than 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
      setShowCropModal(true);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Handle crop complete
  const handleCropComplete = (croppedImage) => {
    updateField('photo', croppedImage);
    setShowCropModal(false);
    setImageSrc(null);
    toast.success('Photo updated successfully!');
  };

  // Remove photo
  const removePhoto = () => {
    updateField('photo', '');
    toast.success('Photo removed');
  };

  // Download PDF
  const downloadPDF = async () => {
    setIsGeneratingPDF(true);
    toast.loading('Generating PDF...');

    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const element = document.getElementById('biodata-preview');
      if (!element) throw new Error('Preview element not found');

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#FFFEF7',
        allowTaint: true,
        imageTimeout: 15000,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const name = formData.fullName || 'biodata';
      pdf.save(`${name.replace(/\s+/g, '_')}_Biodata.pdf`);

      toast.dismiss();
      toast.success('PDF downloaded successfully!');
    } catch (err) {
      console.error('PDF generation failed:', err);
      toast.dismiss();
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Print biodata
  const handlePrint = () => {
    window.print();
  };

  // Share on WhatsApp
  const shareWhatsApp = () => {
    const text = `Marriage Biodata - ${formData.fullName || 'Biodata'}\n\nCreate your own biodata at: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Reset form
  const resetForm = () => {
    if (window.confirm('Are you sure you want to reset all fields? This cannot be undone.')) {
      setFormData(DEFAULT_FORM_DATA);
      localStorage.removeItem('biodataFormData');
      toast.success('Form has been reset');
    }
  };

  const tabItems = [
    { value: 'personal', label: 'Personal', icon: User },
    { value: 'career', label: 'Career', icon: GraduationCap },
    { value: 'family', label: 'Family', icon: Users },
    { value: 'about', label: 'About', icon: Heart },
    { value: 'contact', label: 'Contact', icon: Phone },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#FFF9EC' }}>
      <Toaster richColors position="top-center" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#8B1A1A' }}>
              <FileText size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold font-playfair" style={{ color: '#8B1A1A' }}>BiodataMaker</h1>
              <p className="text-[10px] text-muted-foreground -mt-0.5">Free Marriage Biodata Creator</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {autoSaved && (
              <span className="text-xs text-green-600 flex items-center gap-1 animate-fade-in">
                <Save size={12} /> Saved
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={resetForm}
              className="text-muted-foreground border-gold/30 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            >
              <RotateCcw size={14} className="mr-1" /> Reset
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Toggle */}
      <div className="lg:hidden sticky top-[57px] z-40 bg-white/90 backdrop-blur-md border-b px-4 py-2 flex gap-2">
        <Button
          variant={!showMobilePreview ? 'default' : 'outline'}
          size="sm"
          className={!showMobilePreview ? 'flex-1 bg-maroon hover:bg-maroon-dark text-white' : 'flex-1'}
          onClick={() => setShowMobilePreview(false)}
        >
          <Edit3 size={14} className="mr-1" /> Edit
        </Button>
        <Button
          variant={showMobilePreview ? 'default' : 'outline'}
          size="sm"
          className={showMobilePreview ? 'flex-1 bg-maroon hover:bg-maroon-dark text-white' : 'flex-1'}
          onClick={() => setShowMobilePreview(true)}
        >
          <Eye size={14} className="mr-1" /> Preview
        </Button>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6 items-start">
          {/* Form Panel */}
          <div className={`w-full lg:w-[420px] xl:w-[460px] shrink-0 ${showMobilePreview ? 'hidden lg:block' : ''}`}>
            <div className="bg-white rounded-xl shadow-sm border border-gold/20 overflow-hidden">
              <div className="p-5 border-b" style={{ borderColor: '#E8D48B33', background: '#FBF5E6' }}>
                <h2 className="text-lg font-bold font-playfair" style={{ color: '#8B1A1A' }}>Create Your Biodata</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Fill in your details below. Preview updates instantly.</p>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="px-3 pt-3">
                  <TabsList className="w-full h-auto flex-wrap gap-1 bg-secondary/50 p-1">
                    {tabItems.map(({ value, label, icon: Icon }) => (
                      <TabsTrigger
                        key={value}
                        value={value}
                        className="flex-1 min-w-0 text-xs gap-1 data-[state=active]:bg-white data-[state=active]:text-maroon data-[state=active]:shadow-sm"
                      >
                        <Icon size={13} />
                        <span className="hidden sm:inline">{label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                <div className="p-4 max-h-[calc(100vh-280px)] overflow-y-auto scrollbar-thin">
                  {/* Personal Tab */}
                  <TabsContent value="personal" className="mt-0 space-y-4">
                    <FormField label="Full Name" field="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={updateField} />
                    <div className="grid grid-cols-2 gap-3">
                      <FormSelectField label="Gender" field="gender" options={GENDER_OPTIONS} placeholder="Select" value={formData.gender} onChange={updateField} />
                      <FormField label="Date of Birth" field="dateOfBirth" placeholder="DD/MM/YYYY" value={formData.dateOfBirth} onChange={updateField} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <FormField label="Age" field="age" placeholder="e.g., 26" value={formData.age} onChange={updateField} />
                      <FormSelectField label="Height" field="height" options={HEIGHT_OPTIONS} placeholder="Select" value={formData.height} onChange={updateField} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <FormField label="Weight (kg)" field="weight" placeholder="e.g., 65" value={formData.weight} onChange={updateField} />
                      <FormSelectField label="Complexion" field="complexion" options={COMPLEXION_OPTIONS} placeholder="Select" value={formData.complexion} onChange={updateField} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <FormSelectField label="Blood Group" field="bloodGroup" options={BLOOD_GROUP_OPTIONS} placeholder="Select" value={formData.bloodGroup} onChange={updateField} />
                      <FormSelectField label="Marital Status" field="maritalStatus" options={MARITAL_STATUS_OPTIONS} placeholder="Select" value={formData.maritalStatus} onChange={updateField} />
                    </div>
                    <Separator className="bg-gold/10" />
                    <FormSelectField label="Religion" field="religion" options={RELIGION_OPTIONS} placeholder="Select religion" value={formData.religion} onChange={updateField} />
                    <div className="grid grid-cols-2 gap-3">
                      <FormField label="Caste / Community" field="caste" placeholder="e.g., Brahmin" value={formData.caste} onChange={updateField} />
                      <FormField label="Sub-Caste" field="subCaste" placeholder="Optional" value={formData.subCaste} onChange={updateField} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <FormField label="Gotra" field="gotra" placeholder="Optional" value={formData.gotra} onChange={updateField} />
                      <FormField label="Mother Tongue" field="motherTongue" placeholder="e.g., Hindi" value={formData.motherTongue} onChange={updateField} />
                    </div>
                  </TabsContent>

                  {/* Career Tab */}
                  <TabsContent value="career" className="mt-0 space-y-4">
                    <FormField label="Highest Education" field="education" placeholder="e.g., B.Tech, MBA" value={formData.education} onChange={updateField} />
                    <FormField label="College / University" field="college" placeholder="e.g., IIT Delhi" value={formData.college} onChange={updateField} />
                    <FormField label="Occupation" field="occupation" placeholder="e.g., Software Engineer" value={formData.occupation} onChange={updateField} />
                    <FormField label="Company / Organization" field="company" placeholder="e.g., Google India" value={formData.company} onChange={updateField} />
                    <FormField label="Annual Income" field="income" placeholder="e.g., 12 LPA" value={formData.income} onChange={updateField} />
                    <FormField label="Work Location" field="workLocation" placeholder="e.g., Bengaluru" value={formData.workLocation} onChange={updateField} />
                  </TabsContent>

                  {/* Family Tab */}
                  <TabsContent value="family" className="mt-0 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <FormField label="Father's Name" field="fatherName" placeholder="Full name" value={formData.fatherName} onChange={updateField} />
                      <FormField label="Father's Occupation" field="fatherOccupation" placeholder="e.g., Businessman" value={formData.fatherOccupation} onChange={updateField} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <FormField label="Mother's Name" field="motherName" placeholder="Full name" value={formData.motherName} onChange={updateField} />
                      <FormField label="Mother's Occupation" field="motherOccupation" placeholder="e.g., Homemaker" value={formData.motherOccupation} onChange={updateField} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <FormField label="Brothers" field="brothers" placeholder="e.g., 1 (Married)" value={formData.brothers} onChange={updateField} />
                      <FormField label="Sisters" field="sisters" placeholder="e.g., 2 (1 Married)" value={formData.sisters} onChange={updateField} />
                    </div>
                    <FormSelectField label="Family Type" field="familyType" options={FAMILY_TYPE_OPTIONS} placeholder="Select" value={formData.familyType} onChange={updateField} />
                  </TabsContent>

                  {/* About Tab */}
                  <TabsContent value="about" className="mt-0 space-y-4">
                    <FormTextareaField
                      label="About Me"
                      field="aboutMe"
                      placeholder="Write a brief description about yourself, your values, and what makes you unique..."
                      rows={4}
                      value={formData.aboutMe}
                      onChange={updateField}
                    />
                    <FormField label="Hobbies & Interests" field="hobbies" placeholder="e.g., Reading, Traveling, Cooking (comma separated)" value={formData.hobbies} onChange={updateField} />
                    <Separator className="bg-gold/10" />
                    <p className="text-sm font-semibold" style={{ color: '#8B1A1A' }}>Partner Preferences</p>
                    <div className="grid grid-cols-2 gap-3">
                      <FormField label="Preferred Age" field="partnerAge" placeholder="e.g., 23-27" value={formData.partnerAge} onChange={updateField} />
                      <FormField label="Preferred Height" field="partnerHeight" placeholder="e.g., 5ft 2in - 5ft 6in" value={formData.partnerHeight} onChange={updateField} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <FormField label="Preferred Education" field="partnerEducation" placeholder="e.g., Graduate" value={formData.partnerEducation} onChange={updateField} />
                      <FormField label="Preferred Occupation" field="partnerOccupation" placeholder="e.g., Any" value={formData.partnerOccupation} onChange={updateField} />
                    </div>
                    <FormTextareaField
                      label="Other Preferences"
                      field="partnerPreferences"
                      placeholder="Any other preferences or expectations..."
                      rows={3}
                      value={formData.partnerPreferences}
                      onChange={updateField}
                    />
                  </TabsContent>

                  {/* Contact Tab */}
                  <TabsContent value="contact" className="mt-0 space-y-4">
                    {/* Photo Upload */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">Profile Photo</Label>
                      <div className="flex items-center gap-4">
                        <div
                          className="w-24 h-32 rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                          style={{ borderColor: '#D4AF3766', background: '#FBF5E6' }}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          {formData.photo ? (
                            <img src={formData.photo} alt="Preview" className="w-full h-full object-cover rounded-md" />
                          ) : (
                            <div className="text-center p-2">
                              <Camera size={24} className="mx-auto mb-1" style={{ color: '#D4AF37' }} />
                              <span className="text-[10px]" style={{ color: '#B8960C' }}>Upload Photo</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 space-y-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            style={{ borderColor: '#D4AF3744', color: '#8B1A1A' }}
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Camera size={14} className="mr-2" />
                            {formData.photo ? 'Change Photo' : 'Upload Photo'}
                          </Button>
                          {formData.photo && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full text-red-500 hover:bg-red-50 hover:text-red-600"
                              onClick={removePhoto}
                            >
                              <Trash2 size={14} className="mr-2" /> Remove
                            </Button>
                          )}
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </div>
                    </div>

                    <Separator className="bg-gold/10" />

                    <FormField label="Contact Number" field="contactNumber" placeholder="e.g., +91 98765 43210" value={formData.contactNumber} onChange={updateField} />
                    <FormField label="Email Address" field="email" placeholder="e.g., name@email.com" type="email" value={formData.email} onChange={updateField} />
                    <FormTextareaField
                      label="Address"
                      field="address"
                      placeholder="Your residential address..."
                      rows={3}
                      value={formData.address}
                      onChange={updateField}
                    />
                  </TabsContent>
                </div>
              </Tabs>

              {/* Action Buttons */}
              <div className="p-4 border-t space-y-2" style={{ borderColor: '#E8D48B33', background: '#FDFAF0' }}>
                <Button
                  className="w-full font-semibold h-11 text-white"
                  style={{ backgroundColor: '#8B1A1A' }}
                  onClick={downloadPDF}
                  disabled={isGeneratingPDF}
                >
                  <Download size={16} className="mr-2" />
                  {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    style={{ borderColor: '#D4AF3744', color: '#8B1A1A' }}
                    onClick={handlePrint}
                  >
                    <Printer size={14} className="mr-1" /> Print
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 text-green-700 hover:bg-green-50"
                    onClick={shareWhatsApp}
                  >
                    <Share2 size={14} className="mr-1" /> WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className={`flex-1 min-w-0 ${showMobilePreview ? '' : 'hidden lg:block'}`}>
            <div className="sticky top-[70px]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                  <Eye size={14} /> Live Preview
                </h3>
                <Badge variant="secondary" className="text-[10px] bg-green-50 text-green-700 border-green-200">
                  <Sparkles size={10} className="mr-1" /> Updates Instantly
                </Badge>
              </div>
              <div className="rounded-xl p-4 border" style={{ borderColor: '#D4AF3722', background: '#F5F0E6' }}>
                <div
                  className="overflow-auto rounded-lg shadow-lg"
                  style={{ maxHeight: 'calc(100vh - 150px)' }}
                >
                  <BiodataTemplate formData={formData} />
                </div>
              </div>

              {/* Mobile Action Buttons */}
              {showMobilePreview && (
                <div className="lg:hidden mt-4 space-y-2">
                  <Button
                    className="w-full font-semibold h-11 text-white"
                    style={{ backgroundColor: '#8B1A1A' }}
                    onClick={downloadPDF}
                    disabled={isGeneratingPDF}
                  >
                    <Download size={16} className="mr-2" />
                    {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={handlePrint}>
                      <Printer size={14} className="mr-1" /> Print
                    </Button>
                    <Button variant="outline" className="flex-1 text-green-700" onClick={shareWhatsApp}>
                      <Share2 size={14} className="mr-1" /> WhatsApp
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* SEO Footer */}
      <footer className="border-t mt-12 py-8 px-4" style={{ background: '#FBF5E6' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-lg font-bold font-playfair mb-2" style={{ color: '#8B1A1A' }}>Free Marriage Biodata Maker</h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-4">
            Create beautiful matrimonial biodata for marriage in minutes. Our free online biodata maker provides
            a premium template with photo upload, live preview, and instant PDF download. No signup required.
            Perfect for sharing with families via WhatsApp, email, or print.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {['Biodata for Marriage', 'Marriage Biodata Format', 'Free Biodata Maker', 'Indian Marriage Biodata', 'Shaadi Biodata Template'].map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs bg-white/80 text-muted-foreground">
                {tag}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Made with &#10084; | BiodataMaker &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>

      {/* Image Crop Modal */}
      <ImageCropModal
        imageSrc={imageSrc}
        open={showCropModal}
        onClose={() => {
          setShowCropModal(false);
          setImageSrc(null);
        }}
        onComplete={handleCropComplete}
      />
    </div>
  );
}
