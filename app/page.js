'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import {
  Download, Eye, Edit3, User, GraduationCap, Users, Heart, Phone,
  Camera, Trash2, RotateCcw, FileText, Printer, Share2, ImagePlus,
  Sparkles, Save, Plus, X
} from 'lucide-react';

// ============================================================
// CONSTANTS
// ============================================================

const BIODATA_THEMES = {
  classic: {
    name: 'Classic Gold',
    preview: 'linear-gradient(135deg, #C9A96E, #6B2D3A)',
    bg: '#FDFBF7',
    border: '#C9A96E',
    borderInner: '#E8D5B0',
    corner: '#6B2D3A',
    accent: '#C9A96E',
    heading: '#6B2D3A',
    name: '#6B2D3A',
    label: '#7A6B5A',
    value: '#1F1A14',
    colon: '#C9A96E',
    subtext: '#5A4E40',
    dividerSymbol: '◆',
  },
  royal: {
    name: 'Royal Navy',
    preview: 'linear-gradient(135deg, #1E3A5F, #B8860B)',
    bg: '#F8FAFC',
    border: '#1E3A5F',
    borderInner: '#CBD5E1',
    corner: '#B8860B',
    accent: '#B8860B',
    heading: '#1E3A5F',
    name: '#1E3A5F',
    label: '#64748B',
    value: '#0F172A',
    colon: '#B8860B',
    subtext: '#475569',
    dividerSymbol: '❖',
  },
  rose: {
    name: 'Rose Elegance',
    preview: 'linear-gradient(135deg, #BE185D, #4A7C59)',
    bg: '#FFF9FB',
    border: '#E8A0BF',
    borderInner: '#F5D5E0',
    corner: '#BE185D',
    accent: '#BE185D',
    heading: '#831843',
    name: '#831843',
    label: '#9D7A8A',
    value: '#1C1017',
    colon: '#BE185D',
    subtext: '#6B4555',
    dividerSymbol: '✿',
  },
  midnight: {
    name: 'Midnight Purple',
    preview: 'linear-gradient(135deg, #312E81, #A78BFA)',
    bg: '#FAFAFF',
    border: '#6366F1',
    borderInner: '#C7D2FE',
    corner: '#4F46E5',
    accent: '#6366F1',
    heading: '#312E81',
    name: '#312E81',
    label: '#6B7280',
    value: '#111827',
    colon: '#6366F1',
    subtext: '#4B5563',
    dividerSymbol: '◈',
  },
  emerald: {
    name: 'Emerald Charm',
    preview: 'linear-gradient(135deg, #065F46, #D97706)',
    bg: '#F7FDFA',
    border: '#059669',
    borderInner: '#A7F3D0',
    corner: '#D97706',
    accent: '#059669',
    heading: '#065F46',
    name: '#065F46',
    label: '#6B7280',
    value: '#111827',
    colon: '#059669',
    subtext: '#4B5563',
    dividerSymbol: '❧',
  },
  sunset: {
    name: 'Sunset Warm',
    preview: 'linear-gradient(135deg, #9A3412, #D97706)',
    bg: '#FFFBF5',
    border: '#D97706',
    borderInner: '#FDE68A',
    corner: '#9A3412',
    accent: '#D97706',
    heading: '#9A3412',
    name: '#9A3412',
    label: '#78716C',
    value: '#1C1917',
    colon: '#D97706',
    subtext: '#57534E',
    dividerSymbol: '✦',
  },
};

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

const DIVIDER_ICONS = [
  { id: 'flower', symbol: '✿', label: 'Flower' },
  { id: 'star', symbol: '✦', label: 'Star' },
  { id: 'diamond', symbol: '◆', label: 'Diamond' },
  { id: 'sparkle', symbol: '❖', label: 'Sparkle' },
  { id: 'leaf', symbol: '❧', label: 'Leaf' },
  { id: 'dot', symbol: '●', label: 'Dot' },
  { id: 'none', symbol: '', label: 'None' },
];

const DEFAULT_FORM_DATA = {
  fullName: '',
  gender: '',
  dateOfBirth: '',
  placeOfBirth: '',
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
  totalEXP: '',
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

const resizeImage = (file, maxDim = 1600) => {
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
        resolve(canvas.toDataURL('image/jpeg', 0.97));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};

// ============================================================
// SCALED PREVIEW WRAPPER (responsive scaling for mobile)
// ============================================================

const ScaledPreview = ({ children }) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const templateWidth = 595;
      const viewportWidth = window.innerWidth;
      // On mobile/small screens, scale to fit viewport minus padding
      if (viewportWidth < 660) {
        const available = viewportWidth - 48; // 16px padding each side + 8px card padding each side
        setScale(Math.max(available / templateWidth, 0.3));
      } else {
        setScale(1);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const scaledHeight = Math.ceil(842 * scale);

  return (
    <div
      style={{
        width: `${Math.ceil(595 * scale)}px`,
        height: `${scaledHeight}px`,
        overflow: 'hidden',
        position: 'relative',
        margin: '0 auto',
      }}
    >
      <div style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: '595px',
        position: 'absolute',
        top: 0,
        left: 0,
      }}>
        {children}
      </div>
    </div>
  );
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
      className="h-10 bg-white border-border focus:border-purple-400 focus:ring-purple-200"
      {...props}
    />
  </div>
);

const FormSelectField = ({ label, field, options, placeholder, value, onChange }) => (
  <div className="space-y-1.5">
    <Label className="text-sm font-medium text-foreground">{label}</Label>
    <Select value={value || ''} onValueChange={(v) => onChange(field, v === '__clear__' ? '' : v)}>
      <SelectTrigger className="h-10 bg-white border-border focus:border-purple-400 focus:ring-purple-200">
        <SelectValue placeholder={placeholder || `Select ${label}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="__clear__" className="text-muted-foreground">Select</SelectItem>
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
      className="bg-white border-border focus:border-purple-400 focus:ring-purple-200 resize-none"
    />
  </div>
);

// ============================================================
// TEMPLATE COMPONENTS
// ============================================================

const OrnamentalDivider = ({ theme, symbol }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '8px 0' }}>
    <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, transparent, ${theme.accent}, transparent)` }} />
    {symbol && <div style={{ margin: '0 12px', color: theme.accent, fontSize: '12px', lineHeight: 1, position: 'relative', top: '-1.5px' }}>{symbol}</div>}
    <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, transparent, ${theme.accent}, transparent)` }} />
  </div>
);

const SectionTitle = ({ title, theme }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '12px 0 8px' }}>
    <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, transparent, ${theme.accent})` }} />
    <span style={{
      fontSize: '9.5px',
      fontWeight: 700,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: theme.heading,
      whiteSpace: 'nowrap',
      fontFamily: 'var(--font-jakarta), "Segoe UI", sans-serif',
      position: 'relative',
      top: '-1.5px',
    }}>{title}</span>
    <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, transparent, ${theme.accent})` }} />
  </div>
);

const DetailRow = ({ label, value, theme }) => {
  if (!value) return null;
  return (
    <tr>
      <td style={{
        padding: '3px 0',
        fontSize: '11px',
        fontWeight: 500,
        color: theme.label,
        whiteSpace: 'nowrap',
        verticalAlign: 'top',
        fontFamily: 'var(--font-jakarta), "Segoe UI", sans-serif',
      }}>{label}</td>
      <td style={{
        padding: '3px 8px',
        fontSize: '11px',
        color: theme.colon,
        verticalAlign: 'top',
        width: '10px',
      }}>:</td>
      <td style={{
        padding: '3px 0',
        fontSize: '11px',
        fontWeight: 600,
        color: theme.value,
        verticalAlign: 'top',
        wordBreak: 'break-word',
        fontFamily: 'var(--font-jakarta), "Segoe UI", sans-serif',
      }}>{value}</td>
    </tr>
  );
};

// ============================================================
// PAGE 1: INFORMATION TEMPLATE
// ============================================================

const BiodataPage1 = ({ formData, theme, dividerSymbol }) => {
  const hasPersonalDetails = formData.height || formData.weight || formData.complexion ||
    formData.bloodGroup || formData.religion || formData.caste ||
    formData.motherTongue || formData.gotra || formData.subCaste || formData.placeOfBirth || formData.dateOfBirth || formData.age;

  const hasCareerDetails = formData.education || formData.college || formData.occupation ||
    formData.company || formData.totalEXP || formData.workLocation;

  const hasFamilyDetails = formData.fatherName || formData.motherName ||
    formData.brothers || formData.sisters || formData.familyType;

  const hasContact = formData.contactNumber || formData.email || formData.address;

  return (
    <div
      id="biodata-page1"
      style={{
        width: '595px',
        height: '842px',
        backgroundColor: theme.bg,
        fontFamily: 'var(--font-jakarta), "Segoe UI", sans-serif',
        padding: '12px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <div style={{
        border: `1.5px solid ${theme.border}`,
        padding: '4px',
        height: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        borderRadius: '4px',
      }}>
        <div style={{
          border: `0.5px solid ${theme.borderInner}`,
          padding: '20px 24px',
          height: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '2px',
        }}>
          {/* Corner decorations */}
          <div style={{ position: 'absolute', top: '8px', left: '8px', width: '14px', height: '14px', borderTop: `2px solid ${theme.corner}`, borderLeft: `2px solid ${theme.corner}`, borderTopLeftRadius: '2px' }} />
          <div style={{ position: 'absolute', top: '8px', right: '8px', width: '14px', height: '14px', borderTop: `2px solid ${theme.corner}`, borderRight: `2px solid ${theme.corner}`, borderTopRightRadius: '2px' }} />
          <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '14px', height: '14px', borderBottom: `2px solid ${theme.corner}`, borderLeft: `2px solid ${theme.corner}`, borderBottomLeftRadius: '2px' }} />
          <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '14px', height: '14px', borderBottom: `2px solid ${theme.corner}`, borderRight: `2px solid ${theme.corner}`, borderBottomRightRadius: '2px' }} />

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <p style={{ fontSize: '11px', marginBottom: '4px', color: theme.accent, fontFamily: 'Georgia, serif', letterSpacing: '0.05em' }}>
              || &#2358;&#2381;&#2352;&#2368; &#2327;&#2339;&#2375;&#2358;&#2366;&#2351; &#2344;&#2350;&#2307; ||
            </p>
            <OrnamentalDivider theme={theme} symbol={dividerSymbol} />
            <h1 style={{
              fontSize: '24px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              margin: '8px 0 4px',
              color: theme.name,
              fontFamily: 'var(--font-cormorant), Georgia, serif',
            }}>
              {formData.fullName || 'Your Full Name'}
            </h1>
            {formData.aboutMe && (
              <p style={{
                fontSize: '10.5px',
                lineHeight: 1.7,
                color: theme.subtext,
                fontStyle: 'italic',
                maxWidth: '440px',
                margin: '6px auto 2px',
                padding: '0 8px',
              }}>
                {formData.aboutMe}
              </p>
            )}
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
                      <SectionTitle title="Personal Details" theme={theme} />
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <tbody>
                          <DetailRow label="Date of Birth" value={formData.dateOfBirth} theme={theme} />
                          <DetailRow label="Place of Birth" value={formData.placeOfBirth} theme={theme} />
                          <DetailRow label="Age" value={formData.age ? `${formData.age} years` : ''} theme={theme} />
                          <DetailRow label="Gender" value={formData.gender} theme={theme} />
                          <DetailRow label="Height" value={formData.height} theme={theme} />
                          <DetailRow label="Weight" value={formData.weight ? `${formData.weight} kg` : ''} theme={theme} />
                          <DetailRow label="Complexion" value={formData.complexion} theme={theme} />
                          <DetailRow label="Blood Group" value={formData.bloodGroup} theme={theme} />
                          <DetailRow label="Marital Status" value={formData.maritalStatus} theme={theme} />
                          <DetailRow label="Religion" value={formData.religion} theme={theme} />
                          <DetailRow label="Caste" value={formData.caste} theme={theme} />
                          <DetailRow label="Sub-Caste" value={formData.subCaste} theme={theme} />
                          <DetailRow label="Gotra" value={formData.gotra} theme={theme} />
                          <DetailRow label="Mother Tongue" value={formData.motherTongue} theme={theme} />
                        </tbody>
                      </table>
                    </>
                  )}
                </div>

                {/* Right: Education & Career */}
                <div style={{ flex: 1 }}>
                  {hasCareerDetails && (
                    <>
                      <SectionTitle title="Education & Career" theme={theme} />
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <tbody>
                          <DetailRow label="Education" value={formData.education} theme={theme} />
                          <DetailRow label="College" value={formData.college} theme={theme} />
                          <DetailRow label="Occupation" value={formData.occupation} theme={theme} />
                          <DetailRow label="Company" value={formData.company} theme={theme} />
                          <DetailRow label="Work Location" value={formData.workLocation} theme={theme} />
                          <DetailRow label="Total Work Experience" value={formData.totalEXP} theme={theme} />
                        </tbody>
                      </table>
                    </>
                  )}

                  {/* Interests */}
                  {formData.hobbies && (
                    <div style={{ marginTop: '10px' }}>
                      <p style={{
                        fontSize: '9.5px',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: theme.heading,
                        marginBottom: '5px',
                        fontFamily: 'var(--font-jakarta), "Segoe UI", sans-serif',
                      }}>Interests</p>
                      <p style={{
                        fontSize: '10.5px',
                        color: theme.value,
                        lineHeight: 1.7,
                        fontFamily: 'var(--font-jakarta), "Segoe UI", sans-serif',
                      }}>
                        {formData.hobbies.split(',').map(h => h.trim()).filter(Boolean).join('  |  ')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Family Details - full width */}
            {hasFamilyDetails && (
              <div>
                <SectionTitle title="Family Details" theme={theme} />
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr>
                      <td style={{ verticalAlign: 'top', width: '50%', paddingRight: '16px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <tbody>
                            <DetailRow label="Father's Name" value={formData.fatherName} theme={theme} />
                            <DetailRow label="Father's Occupation" value={formData.fatherOccupation} theme={theme} />
                            <DetailRow label="Mother's Name" value={formData.motherName} theme={theme} />
                            <DetailRow label="Mother's Occupation" value={formData.motherOccupation} theme={theme} />
                            <DetailRow label="Brothers" value={formData.brothers} theme={theme} />
                            <DetailRow label="Sisters" value={formData.sisters} theme={theme} />
                            <DetailRow label="Family Type" value={formData.familyType} theme={theme} />
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
             {hasContact && (
              <div style={{ paddingTop: '4px' }}>
                <SectionTitle title="Contact Information" theme={theme} />
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr>
                      <td style={{ verticalAlign: 'top', width: '50%', paddingRight: '16px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <tbody>
                            <DetailRow label="Contact No." value={formData.contactNumber} theme={theme} />
                            <DetailRow label="Email" value={formData.email} theme={theme} />
                            <DetailRow label="Address" value={formData.address} theme={theme} />
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

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
  const [selectedTheme, setSelectedTheme] = useState('classic');
  const [selectedIcon, setSelectedIcon] = useState('flower');
  const fileInputRef = useRef(null);

  const currentTheme = BIODATA_THEMES[selectedTheme];
  const currentDividerSymbol = DIVIDER_ICONS.find(i => i.id === selectedIcon)?.symbol || '';

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

  // Handle photo upload - directly use full image (no crop modal)
  const handlePhotoUpload = async (e) => {
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

    try {
      const fullImage = await resizeImage(file, 1600);
      setFormData((prev) => ({
        ...prev,
        photos: [...(prev.photos || []), fullImage],
      }));
      toast.success('Photo added!');
    } catch (err) {
      toast.error('Failed to process image');
    }

    e.target.value = '';
  };

  // Remove a photo
  const removePhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: (prev.photos || []).filter((_, i) => i !== index),
    }));
    toast.success('Photo removed');
  };

  // Helper: clone element to body for clean html2canvas capture (no parent transforms)
  const captureElement = async (html2canvas, element, options) => {
    const clone = element.cloneNode(true);
    clone.style.position = 'fixed';
    clone.style.left = '0';
    clone.style.top = '0';
    clone.style.zIndex = '-9999';
    clone.style.pointerEvents = 'none';
    document.body.appendChild(clone);

    // Allow a frame for the browser to render the clone
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    const canvas = await html2canvas(clone, options);
    document.body.removeChild(clone);
    return canvas;
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

      // Page 1 - Information (clone outside ScaledPreview transform)
      const page1 = document.getElementById('biodata-page1');
      if (page1) {
        const canvas1 = await captureElement(html2canvas, page1, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: currentTheme.bg,
          allowTaint: true,
          width: 595,
          height: 842,
        });
        const img1 = canvas1.toDataURL('image/jpeg', 0.95);
        pdf.addImage(img1, 'JPEG', 0, 0, pageWidth, pageHeight);
      }

      // Page 2 - Photos (only if photos exist)
      const page2 = document.getElementById('biodata-page2');
      if (page2 && (formData.photos || []).length > 0) {
        pdf.addPage();
        const canvas2 = await captureElement(html2canvas, page2, {
          scale: 3,
          useCORS: true,
          logging: false,
          backgroundColor: '#FFFFFF',
          allowTaint: true,
          width: 595,
          height: 842,
        });
        const img2 = canvas2.toDataURL('image/png');
        pdf.addImage(img2, 'PNG', 0, 0, pageWidth, pageHeight);
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
    <div className="min-h-screen gradient-bg">
      <Toaster richColors position="top-center" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center gradient-primary">
              <FileText size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold font-playfair gradient-text">FreeShaadiBiodata</h1>
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
              className="text-muted-foreground hover:bg-red-50 hover:text-red-600 hover:border-red-200 border-border"
            >
              <RotateCcw size={14} className="mr-1" /> Reset
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Toggle */}
      <div className="lg:hidden sticky top-[57px] z-40 bg-white/80 backdrop-blur-md border-b px-4 py-2 flex gap-2">
        <Button
          variant={!showMobilePreview ? 'default' : 'outline'}
          size="sm"
          className={!showMobilePreview ? 'flex-1 text-white gradient-primary' : 'flex-1'}
          onClick={() => setShowMobilePreview(false)}
        >
          <Edit3 size={14} className="mr-1" /> Edit
        </Button>
        <Button
          variant={showMobilePreview ? 'default' : 'outline'}
          size="sm"
          className={showMobilePreview ? 'flex-1 text-white gradient-primary' : 'flex-1'}
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
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden border-border/60">
              <div className="p-5 border-b border-border/40 gradient-primary">
                <h2 className="text-lg font-bold font-playfair text-white">Create Your Biodata</h2>
                <p className="text-xs text-white/70 mt-0.5">Fill in your details. Preview updates instantly.</p>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="px-3 pt-3">
                  <TabsList className="w-full h-auto flex-wrap gap-1 bg-secondary/50 p-1">
                    {tabItems.map(({ value, label, icon: Icon }) => (
                      <TabsTrigger
                        key={value}
                        value={value}
                        className="flex-1 min-w-0 text-xs gap-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        style={{ color: activeTab === value ? '#7C3AED' : undefined }}
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
                    <div>
                      <FormField label="Place of Birth" field="placeOfBirth" placeholder="New Delhi" value={formData.placeOfBirth} onChange={updateField} />
                    </div>
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
                    <Separator className="bg-purple-100" />
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
                    <FormField label="Work Work Experience" field="totalEXP" placeholder="e.g., 4" value={formData.totalEXP} onChange={updateField} />
                    <Separator className="bg-purple-100" />
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
                    <Separator className="bg-purple-100" />
                    <p className="text-sm font-semibold text-purple-700">Contact Information</p>
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
                            style={{ borderColor: '#7C3AED33', color: '#7C3AED' }}
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
                          <div key={i} className="relative group rounded-lg overflow-hidden border border-border" style={{ aspectRatio: '3/4' }}>
                            <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-contain bg-gray-50" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
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
                            className="rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:opacity-70 transition-opacity border-purple-300 bg-purple-50/50"
                            style={{ aspectRatio: '3/4' }}
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <ImagePlus size={28} className="text-purple-400" />
                            <span className="text-xs mt-1 text-purple-500">Add Photo</span>
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
              <div className="p-4 border-t border-border/40 space-y-2 bg-muted/30">
                <Button
                  className="w-full font-semibold h-11 text-white gradient-primary hover:opacity-90 transition-opacity"
                  onClick={downloadPDF}
                  disabled={isGeneratingPDF}
                >
                  <Download size={16} className="mr-2" />
                  {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}
                </Button>
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
                <Badge variant="secondary" className="text-[10px] bg-purple-50 text-purple-700 border-purple-200">
                  <Sparkles size={10} className="mr-1" /> Updates Instantly
                </Badge>
              </div>

              {/* Theme Selector */}
              <div className="mb-3 flex flex-col items-center gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">Choose Theme</span>
                <div className="flex gap-2">
                  {Object.entries(BIODATA_THEMES).map(([key, t]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedTheme(key)}
                      title={t.name}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${selectedTheme === key ? 'border-purple-500 scale-110 shadow-lg ring-2 ring-purple-200' : 'border-gray-200 hover:scale-105 hover:border-gray-300'}`}
                      style={{ background: t.preview }}
                    />
                  ))}
                </div>
              </div>

              {/* Icon Selector */}
              <div className="mb-3 flex flex-col items-center gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">Divider Icon</span>
                <div className="flex gap-2">
                  {DIVIDER_ICONS.map((icon) => (
                    <button
                      key={icon.id}
                      onClick={() => setSelectedIcon(icon.id)}
                      title={icon.label}
                      className={`w-7 h-7 rounded-md border-2 flex items-center justify-center text-sm transition-all ${selectedIcon === icon.id ? 'border-purple-500 scale-110 shadow-md bg-purple-50' : 'border-gray-200 hover:scale-105 hover:border-gray-300 bg-white'}`}
                    >
                      {icon.symbol || '—'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-xl p-2 sm:p-4 border border-border/40 bg-slate-50/80">
                <div
                  className="overflow-auto rounded-lg shadow-lg space-y-4"
                  style={{ maxHeight: 'calc(100vh - 150px)' }}
                >
                  {/* Page 1: Information - scales to fit container on mobile */}
                  <div>
                    <p className="text-[10px] text-muted-foreground mb-1 font-medium">Page 1 — Information</p>
                    <ScaledPreview>
                      <BiodataPage1 formData={formData} theme={currentTheme} dividerSymbol={currentDividerSymbol} />
                    </ScaledPreview>
                  </div>

                  {/* Page 2: Photos */}
                  {(formData.photos || []).length > 0 && (
                    <div>
                      <p className="text-[10px] text-muted-foreground mb-1 font-medium">Page 2 — Photos</p>
                      <ScaledPreview>
                        <BiodataPage2 formData={formData} />
                      </ScaledPreview>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Action Buttons */}
              {showMobilePreview && (
                <div className="lg:hidden mt-4 space-y-2">
                  <Button
                    className="w-full font-semibold h-11 text-white gradient-primary hover:opacity-90"
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
      <footer className="border-t mt-12 py-10 px-4 bg-white/60">
        <div className="max-w-5xl mx-auto">
          {/* Main SEO content */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold font-playfair mb-3 gradient-text">Free Shaadi Biodata Maker Online</h2>
            <p className="text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Create beautiful bio data for marriage in minutes. FreeShaadiBiodata is the best free online biodata maker 
              with modern templates, photo upload, live preview, and instant PDF download. Perfect for Hindu, 
              Marathi, and all Indian marriage biodata formats. No signup or registration required — your data stays private in your browser.
            </p>
          </div>

          {/* Internal links grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 max-w-3xl mx-auto">
            {[
              { href: '/marriage-biodata-format', label: 'Marriage Biodata Format' },
              { href: '/hindu-biodata-format', label: 'Hindu Biodata Format' },
              { href: '/biodata-for-boy', label: 'Biodata for Boy' },
              { href: '/biodata-for-girl', label: 'Biodata for Girl' },
              { href: '/simple-biodata-format', label: 'Simple Biodata Format' },
              { href: '/modern-biodata-design', label: 'Modern Biodata Design' },
              { href: '/marathi-biodata-format', label: 'Marathi Biodata Format' },
            ].map((link) => (
              <a key={link.href} href={link.href} className="text-xs text-muted-foreground hover:underline hover:text-foreground py-1">
                {link.label}
              </a>
            ))}
          </div>

          {/* Keyword badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {[
              'Free Biodata Maker', 'Marriage Biodata PDF', 'Biodata for Marriage',
              'Online Biodata Maker', 'Indian Marriage Biodata', 'Shaadi Biodata',
              'Matrimonial Biodata', 'Biodata Download Free',
            ].map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs bg-white/80 text-muted-foreground">
                {tag}
              </Badge>
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Made with &#10084; | FreeShaadiBiodata &copy; {new Date().getFullYear()} | Free Shaadi Biodata Maker Online
          </p>
        </div>
      </footer>

    </div>
  );
}
