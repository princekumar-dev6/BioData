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
  Camera, Trash2, RotateCcw, FileText, Printer, Share2, ImagePlus,
  Sparkles, Save, Plus, X, Pencil, CheckCircle2, Maximize
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
  contactNumber: '',
  email: '',
  address: '',
  photos: [],
};

// ============================================================
// HELPER: Resize image maintaining quality
// ============================================================

const resizeImage = (file, maxDim = 1200) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = (height / width) * maxDim;
            width = maxDim;
          } else {
            width = (width / height) * maxDim;
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.92));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};

// ============================================================
// HELPER: Create image from src (no crossOrigin for data URLs)
// ============================================================

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    if (url && !url.startsWith('data:')) {
      image.setAttribute('crossOrigin', 'anonymous');
    }
    image.src = url;
  });

// ============================================================
// HELPER: Get cropped image from canvas
// ============================================================

const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return canvas.toDataURL('image/jpeg', 0.92);
};


// ============================================================
// FORM COMPONENTS (outside Home to prevent re-mount on state change)
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
// TEMPLATE COMPONENTS
// ============================================================

const OrnamentalDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '6px 0' }}>
    <div style={{ flex: 1, height: '1px', backgroundColor: '#D4AF37' }} />
    <div style={{ margin: '0 10px', color: '#D4AF37', fontSize: '10px' }}>&#10022;</div>
    <div style={{ flex: 1, height: '1px', backgroundColor: '#D4AF37' }} />
  </div>
);

const SectionTitle = ({ title }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '10px 0 6px' }}>
    <div style={{ flex: 1, height: '1px', backgroundColor: '#D4AF37' }} />
    <span style={{
      fontSize: '9px',
      fontWeight: 700,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: '#8B1A1A',
      whiteSpace: 'nowrap',
    }}>{title}</span>
    <div style={{ flex: 1, height: '1px', backgroundColor: '#D4AF37' }} />
  </div>
);

const DetailRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <tr>
      <td style={{
        padding: '2px 0',
        fontSize: '11px',
        fontWeight: 500,
        color: '#6B5B3E',
        whiteSpace: 'nowrap',
        verticalAlign: 'top',
      }}>{label}</td>
      <td style={{
        padding: '2px 6px',
        fontSize: '11px',
        color: '#D4AF37',
        verticalAlign: 'top',
        width: '10px',
      }}>:</td>
      <td style={{
        padding: '2px 0',
        fontSize: '11px',
        fontWeight: 600,
        color: '#2D2418',
        verticalAlign: 'top',
        wordBreak: 'break-word',
      }}>{value}</td>
    </tr>
  );
};

// ============================================================
// PAGE 1: INFORMATION TEMPLATE
// ============================================================

const BiodataPage1 = ({ formData }) => {
  const hasPersonalDetails = formData.height || formData.weight || formData.complexion ||
    formData.bloodGroup || formData.religion || formData.caste ||
    formData.motherTongue || formData.gotra || formData.subCaste || formData.dateOfBirth || formData.age;

  const hasCareerDetails = formData.education || formData.college || formData.occupation ||
    formData.company || formData.workLocation;

  const hasFamilyDetails = formData.fatherName || formData.motherName ||
    formData.brothers || formData.sisters || formData.familyType;

  const hasContact = formData.contactNumber || formData.email || formData.address;

  return (
    <div
      id="biodata-page1"
      style={{
        width: '595px',
        height: '842px',
        backgroundColor: '#FFFEF7',
        fontFamily: 'Georgia, "Times New Roman", serif',
        padding: '10px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <div style={{
        border: '2px solid #D4AF37',
        padding: '3px',
        height: '100%',
        boxSizing: 'border-box',
        position: 'relative',
      }}>
        <div style={{
          border: '1px solid #D4AF37',
          padding: '16px 20px',
          height: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Corner decorations */}
          <div style={{ position: 'absolute', top: '6px', left: '6px', width: '16px', height: '16px', borderTop: '2px solid #8B1A1A', borderLeft: '2px solid #8B1A1A' }} />
          <div style={{ position: 'absolute', top: '6px', right: '6px', width: '16px', height: '16px', borderTop: '2px solid #8B1A1A', borderRight: '2px solid #8B1A1A' }} />
          <div style={{ position: 'absolute', bottom: '6px', left: '6px', width: '16px', height: '16px', borderBottom: '2px solid #8B1A1A', borderLeft: '2px solid #8B1A1A' }} />
          <div style={{ position: 'absolute', bottom: '6px', right: '6px', width: '16px', height: '16px', borderBottom: '2px solid #8B1A1A', borderRight: '2px solid #8B1A1A' }} />

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '6px' }}>
            <p style={{ fontSize: '12px', marginBottom: '2px', color: '#D4AF37', fontFamily: 'Georgia, serif' }}>
              || &#2358;&#2381;&#2352;&#2368; &#2327;&#2339;&#2375;&#2358;&#2366;&#2351; &#2344;&#2350;&#2307; ||
            </p>
            <OrnamentalDivider />
            <h1 style={{
              fontSize: '22px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              margin: '6px 0 2px',
              color: '#8B1A1A',
              fontFamily: 'var(--font-playfair), Georgia, serif',
            }}>
              {formData.fullName || 'Your Full Name'}
            </h1>
            {formData.aboutMe && (
              <p style={{
                fontSize: '11px',
                lineHeight: 1.6,
                color: '#4A3F2F',
                fontStyle: 'italic',
                maxWidth: '460px',
                margin: '6px auto 2px',
                padding: '0 8px',
              }}>
                {formData.aboutMe}
              </p>
            )}
            <OrnamentalDivider />
          </div>

          {/* Content area - flex grow */}
          <div style={{ flex: 1 }}>

            {/* Two Column: Personal Details + Education & Career */}
            {(hasPersonalDetails || hasCareerDetails) && (
              <div style={{ display: 'flex', gap: '16px' }}>
                {/* Left: Personal Details */}
                <div style={{ flex: 1 }}>
                  {hasPersonalDetails && (
                    <>
                      <SectionTitle title="Personal Details" />
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <tbody>
                          <DetailRow label="Date of Birth" value={formData.dateOfBirth} />
                          <DetailRow label="Age" value={formData.age ? `${formData.age} years` : ''} />
                          <DetailRow label="Gender" value={formData.gender} />
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
                </div>

                {/* Right: Education & Career */}
                <div style={{ flex: 1 }}>
                  {hasCareerDetails && (
                    <>
                      <SectionTitle title="Education & Career" />
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <tbody>
                          <DetailRow label="Education" value={formData.education} />
                          <DetailRow label="College" value={formData.college} />
                          <DetailRow label="Occupation" value={formData.occupation} />
                          <DetailRow label="Company" value={formData.company} />
                          <DetailRow label="Work Location" value={formData.workLocation} />
                        </tbody>
                      </table>
                    </>
                  )}

                  {/* Interests */}
                  {formData.hobbies && (
                    <div style={{ marginTop: '8px' }}>
                      <p style={{
                        fontSize: '9px',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#8B1A1A',
                        marginBottom: '4px',
                      }}>Interests</p>
                      <p style={{
                        fontSize: '10px',
                        color: '#2D2418',
                        lineHeight: 1.6,
                        fontStyle: 'italic',
                      }}>
                        {formData.hobbies.split(',').map(h => h.trim()).filter(Boolean).join('  |  ')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Two Column: Family Details + Contact */}
            {(hasFamilyDetails || hasContact) && (
              <div style={{ display: 'flex', gap: '16px' }}>
                {/* Left: Family Details */}
                <div style={{ flex: 1 }}>
                  {hasFamilyDetails && (
                    <>
                      <SectionTitle title="Family Details" />
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <tbody>
                          <DetailRow label="Father's Name" value={formData.fatherName} />
                          <DetailRow label="Father's Occ." value={formData.fatherOccupation} />
                          <DetailRow label="Mother's Name" value={formData.motherName} />
                          <DetailRow label="Mother's Occ." value={formData.motherOccupation} />
                          <DetailRow label="Brothers" value={formData.brothers} />
                          <DetailRow label="Sisters" value={formData.sisters} />
                          <DetailRow label="Family Type" value={formData.familyType} />
                        </tbody>
                      </table>
                    </>
                  )}
                </div>

                {/* Right: Contact */}
                <div style={{ flex: 1 }}>
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
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
            <OrnamentalDivider />
            <p style={{ textAlign: 'center', fontSize: '10px', marginTop: '4px', color: '#D4AF37' }}>
              &#10022; &#10022; &#10022;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// PAGE 2: PHOTO GALLERY TEMPLATE
// ============================================================

const BiodataPage2 = ({ formData }) => {
  const photos = formData.photos || [];
  if (photos.length === 0) return null;

  return (
    <div
      id="biodata-page2"
      style={{
        width: '595px',
        height: '842px',
        backgroundColor: '#FFFFFF',
        fontFamily: 'Georgia, "Times New Roman", serif',
        padding: '40px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Photo Grid: 2x2 with generous spacing */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: '24px',
        width: '100%',
        height: '100%',
        maxHeight: '762px',
      }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
            {photos[i] ? (
              <img
                src={photos[i]}
                alt={`Photo ${i + 1}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================

export default function Home() {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [activeTab, setActiveTab] = useState('personal');
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [autoSaved, setAutoSaved] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [cropState, setCropState] = useState({ x: 0, y: 0 });
  const [cropZoom, setCropZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [editingPhotoIndex, setEditingPhotoIndex] = useState(null);
  const fileInputRef = useRef(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('biodataFormData_v2');
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
        localStorage.setItem('biodataFormData_v2', JSON.stringify(formData));
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

  // Handle photo upload - opens crop modal
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const currentCount = (formData.photos || []).length;
    if (currentCount >= 4) {
      toast.error('Maximum 4 photos allowed');
      e.target.value = '';
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      toast.error('Image size should be less than 15MB');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setCropImageSrc(reader.result);
      setEditingPhotoIndex(null);
      setCropState({ x: 0, y: 0 });
      setCropZoom(1);
      setShowCropModal(true);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Edit existing photo
  const editPhoto = (index) => {
    const photo = formData.photos[index];
    setCropImageSrc(photo);
    setEditingPhotoIndex(index);
    setCropState({ x: 0, y: 0 });
    setCropZoom(1);
    setShowCropModal(true);
  };

  // Handle crop complete callback
  const onCropComplete = useCallback((croppedArea, croppedAreaPx) => {
    setCroppedAreaPixels(croppedAreaPx);
  }, []);

  // Save cropped image
  const saveCroppedPhoto = async () => {
    try {
      const croppedImage = await getCroppedImg(cropImageSrc, croppedAreaPixels);
      if (editingPhotoIndex !== null) {
        // Editing existing photo
        setFormData((prev) => {
          const newPhotos = [...(prev.photos || [])];
          newPhotos[editingPhotoIndex] = croppedImage;
          return { ...prev, photos: newPhotos };
        });
        toast.success('Photo updated!');
      } else {
        // Adding new photo
        setFormData((prev) => ({
          ...prev,
          photos: [...(prev.photos || []), croppedImage],
        }));
        toast.success('Photo added!');
      }
      setShowCropModal(false);
      setCropImageSrc(null);
    } catch (err) {
      toast.error('Failed to process image');
    }
  };

  // Use full image without cropping
  const useFullImage = async () => {
    try {
      // Resize the full image
      const img = await createImage(cropImageSrc);
      const maxDim = 1200;
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = (height / width) * maxDim;
          width = maxDim;
        } else {
          width = (width / height) * maxDim;
          height = maxDim;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      const fullImage = canvas.toDataURL('image/jpeg', 0.92);

      if (editingPhotoIndex !== null) {
        setFormData((prev) => {
          const newPhotos = [...(prev.photos || [])];
          newPhotos[editingPhotoIndex] = fullImage;
          return { ...prev, photos: newPhotos };
        });
        toast.success('Photo updated!');
      } else {
        setFormData((prev) => ({
          ...prev,
          photos: [...(prev.photos || []), fullImage],
        }));
        toast.success('Photo added!');
      }
      setShowCropModal(false);
      setCropImageSrc(null);
    } catch (err) {
      toast.error('Failed to process image');
    }
  };

  // Remove a photo
  const removePhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: (prev.photos || []).filter((_, i) => i !== index),
    }));
    toast.success('Photo removed');
  };

  // Download PDF (2 pages)
  const downloadPDF = async () => {
    setIsGeneratingPDF(true);
    toast.loading('Generating PDF...');

    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Page 1 - Information
      const page1 = document.getElementById('biodata-page1');
      if (page1) {
        const canvas1 = await html2canvas(page1, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#FFFEF7',
          allowTaint: true,
        });
        const img1 = canvas1.toDataURL('image/jpeg', 0.95);
        pdf.addImage(img1, 'JPEG', 0, 0, pageWidth, pageHeight);
      }

      // Page 2 - Photos (only if photos exist)
      const page2 = document.getElementById('biodata-page2');
      if (page2 && (formData.photos || []).length > 0) {
        pdf.addPage();
        const canvas2 = await html2canvas(page2, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#FFFEF7',
          allowTaint: true,
        });
        const img2 = canvas2.toDataURL('image/jpeg', 0.95);
        pdf.addImage(img2, 'JPEG', 0, 0, pageWidth, pageHeight);
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

  const handlePrint = () => window.print();

  const shareWhatsApp = () => {
    const text = `Marriage Biodata - ${formData.fullName || 'Biodata'}\n\nCreate your own biodata at: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const resetForm = () => {
    if (window.confirm('Are you sure you want to reset all fields? This cannot be undone.')) {
      setFormData(DEFAULT_FORM_DATA);
      localStorage.removeItem('biodataFormData_v2');
      toast.success('Form has been reset');
    }
  };

  const tabItems = [
    { value: 'personal', label: 'Personal', icon: User },
    { value: 'career', label: 'Career', icon: GraduationCap },
    { value: 'family', label: 'Family', icon: Users },
    { value: 'about', label: 'About', icon: Heart },
    { value: 'photos', label: 'Photos', icon: Camera },
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
              className="text-muted-foreground hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              style={{ borderColor: '#D4AF3744' }}
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
          className={!showMobilePreview ? 'flex-1 text-white' : 'flex-1'}
          style={!showMobilePreview ? { backgroundColor: '#8B1A1A' } : {}}
          onClick={() => setShowMobilePreview(false)}
        >
          <Edit3 size={14} className="mr-1" /> Edit
        </Button>
        <Button
          variant={showMobilePreview ? 'default' : 'outline'}
          size="sm"
          className={showMobilePreview ? 'flex-1 text-white' : 'flex-1'}
          style={showMobilePreview ? { backgroundColor: '#8B1A1A' } : {}}
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
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden" style={{ borderColor: '#D4AF3733' }}>
              <div className="p-5 border-b" style={{ borderColor: '#E8D48B33', background: '#FBF5E6' }}>
                <h2 className="text-lg font-bold font-playfair" style={{ color: '#8B1A1A' }}>Create Your Biodata</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Fill in your details. Preview updates instantly.</p>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="px-3 pt-3">
                  <TabsList className="w-full h-auto flex-wrap gap-1 bg-secondary/50 p-1">
                    {tabItems.map(({ value, label, icon: Icon }) => (
                      <TabsTrigger
                        key={value}
                        value={value}
                        className="flex-1 min-w-0 text-xs gap-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        style={{ color: activeTab === value ? '#8B1A1A' : undefined }}
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
                    <FormField label="Work Location" field="workLocation" placeholder="e.g., Bengaluru" value={formData.workLocation} onChange={updateField} />
                    <Separator className="bg-gold/10" />
                    <FormField label="Interests / Hobbies" field="hobbies" placeholder="e.g., Reading, Traveling, Photography (comma separated)" value={formData.hobbies} onChange={updateField} />
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

                  {/* About & Contact Tab */}
                  <TabsContent value="about" className="mt-0 space-y-4">
                    <FormTextareaField
                      label="About Me"
                      field="aboutMe"
                      placeholder="Write a brief description about yourself, your values, and what makes you unique..."
                      rows={4}
                      value={formData.aboutMe}
                      onChange={updateField}
                    />
                    <Separator className="bg-gold/10" />
                    <p className="text-sm font-semibold" style={{ color: '#8B1A1A' }}>Contact Information</p>
                    <FormField label="Contact Number" field="contactNumber" placeholder="e.g., +91 98765 43210" value={formData.contactNumber} onChange={updateField} />
                    <FormField label="Email Address" field="email" placeholder="e.g., name@email.com" type="email" value={formData.email} onChange={updateField} />
                    <FormTextareaField
                      label="Address"
                      field="address"
                      placeholder="Your residential address..."
                      rows={2}
                      value={formData.address}
                      onChange={updateField}
                    />
                  </TabsContent>

                  {/* Photos Tab */}
                  <TabsContent value="photos" className="mt-0 space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Photos ({(formData.photos || []).length}/4)</Label>
                        {(formData.photos || []).length < 4 && (
                          <Button
                            variant="outline"
                            size="sm"
                            style={{ borderColor: '#D4AF3744', color: '#8B1A1A' }}
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Plus size={14} className="mr-1" /> Add Photo
                          </Button>
                        )}
                      </div>

                      <p className="text-xs text-muted-foreground">
                        Upload up to 4 photos. You can adjust each photo&apos;s crop and zoom before adding.
                      </p>

                      {/* Photo Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {(formData.photos || []).map((photo, i) => (
                          <div key={i} className="relative group rounded-lg overflow-hidden border" style={{ borderColor: '#D4AF3744', aspectRatio: '3/4' }}>
                            <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-contain bg-gray-50" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                              <button
                                onClick={() => editPhoto(i)}
                                className="w-8 h-8 rounded-full bg-white text-gray-700 flex items-center justify-center shadow-lg hover:bg-blue-50"
                              >
                                <Pencil size={14} />
                              </button>
                              <button
                                onClick={() => removePhoto(i)}
                                className="w-8 h-8 rounded-full bg-white text-red-500 flex items-center justify-center shadow-lg hover:bg-red-50"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-[10px] text-center py-1">
                              Photo {i + 1}
                            </div>
                          </div>
                        ))}

                        {/* Add Photo Placeholder */}
                        {(formData.photos || []).length < 4 && (
                          <div
                            className="rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:opacity-70 transition-opacity"
                            style={{ borderColor: '#D4AF3766', background: '#FBF5E6', aspectRatio: '3/4' }}
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <ImagePlus size={28} style={{ color: '#D4AF37' }} />
                            <span className="text-xs mt-1" style={{ color: '#B8960C' }}>Add Photo</span>
                          </div>
                        )}
                      </div>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                    </div>
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
                  className="overflow-auto rounded-lg shadow-lg space-y-4"
                  style={{ maxHeight: 'calc(100vh - 150px)' }}
                >
                  {/* Page 1: Information */}
                  <div>
                    <p className="text-[10px] text-muted-foreground mb-1 font-medium">Page 1 — Information</p>
                    <BiodataPage1 formData={formData} />
                  </div>

                  {/* Page 2: Photos */}
                  {(formData.photos || []).length > 0 && (
                    <div>
                      <p className="text-[10px] text-muted-foreground mb-1 font-medium">Page 2 — Photos</p>
                      <BiodataPage2 formData={formData} />
                    </div>
                  )}
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
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {['Biodata for Marriage', 'Marriage Biodata Format', 'Free Biodata Maker', 'Indian Marriage Biodata'].map((tag) => (
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

      {/* Photo Crop/Adjust Modal */}
      <Dialog open={showCropModal} onOpenChange={(open) => {
        if (!open) {
          setShowCropModal(false);
          setCropImageSrc(null);
        }
      }}>
        <DialogContent className="sm:max-w-[540px] p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-5 pb-2">
            <DialogTitle className="font-playfair" style={{ color: '#8B1A1A' }}>
              {editingPhotoIndex !== null ? 'Adjust Photo' : 'Adjust Your Photo'}
            </DialogTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Drag to reposition, use slider to zoom. Choose &quot;Use Full Image&quot; to keep the original.
            </p>
          </DialogHeader>
          {cropImageSrc && (
            <>
              <div className="relative h-[380px] bg-gray-900">
                <Cropper
                  image={cropImageSrc}
                  crop={cropState}
                  zoom={cropZoom}
                  aspect={3 / 4}
                  onCropChange={setCropState}
                  onZoomChange={setCropZoom}
                  onCropComplete={onCropComplete}
                  objectFit="contain"
                />
              </div>
              <div className="px-6 py-3">
                <Label className="text-xs text-muted-foreground mb-1 block">Zoom</Label>
                <Slider
                  value={[cropZoom]}
                  min={0.5}
                  max={3}
                  step={0.05}
                  onValueChange={(v) => setCropZoom(v[0])}
                  className="my-2"
                />
              </div>
              <div className="flex justify-between gap-3 px-6 pb-5">
                <Button
                  variant="outline"
                  onClick={useFullImage}
                  className="text-xs"
                >
                  <Maximize size={14} className="mr-1.5" /> Use Full Image
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => { setShowCropModal(false); setCropImageSrc(null); }}>
                    Cancel
                  </Button>
                  <Button onClick={saveCroppedPhoto} className="text-white" style={{ backgroundColor: '#8B1A1A' }}>
                    <CheckCircle2 size={14} className="mr-1.5" /> Apply
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
