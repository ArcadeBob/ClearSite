import React, { useState, useRef } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { TextArea } from './ui/TextArea';
import { Select } from './ui/Select';
import { Send, CheckCircle, Upload, X, FileText } from 'lucide-react';

const FORMSPREE_URL = 'https://formspree.io/f/mreayoqq';

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_FILE_TYPES = '.pdf,.dwg,.dxf,.zip,.png,.jpg,.jpeg';

const projectTypeOptions = [
  { value: 'new-construction', label: 'New Construction' },
  { value: 'tenant-improvement', label: 'Tenant Improvement' },
  { value: 'renovation', label: 'Renovation / Retrofit' },
  { value: 'public-works', label: 'Public Works / Prevailing Wage' },
  { value: 'multi-site', label: 'Multi-Site Rollout' },
  { value: 'other', label: 'Other' },
];

const scopeValueOptions = [
  { value: 'under-100k', label: 'Under $100K' },
  { value: '100k-500k', label: '$100K \u2013 $500K' },
  { value: '500k-1m', label: '$500K \u2013 $1M' },
  { value: 'over-1m', label: '$1M+' },
  { value: 'unsure', label: 'Not sure yet' },
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) {
      setFileName(null);
      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFileError(`File must be under ${MAX_FILE_SIZE_MB}MB. Your file is ${(file.size / 1024 / 1024).toFixed(1)}MB.`);
      e.target.value = '';
      setFileName(null);
      return;
    }
    setFileName(file.name);
  };

  const clearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setFileName(null);
    setFileError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        setIsSuccess(true);
      } else {
        setError('Something went wrong. Please try again or contact us directly.');
      }
    } catch {
      setError('Unable to send message. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-green-800 mb-2">
          Message Sent Successfully
        </h3>
        <p className="text-green-700 mb-6">
          Thank you for contacting Clean Glass Installation. Our team will
          review your inquiry and get back to you within 24 hours.
        </p>
        <Button variant="outline" onClick={() => setIsSuccess(false)}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="First Name" name="firstName" placeholder="John" required />
        <Input label="Last Name" name="lastName" placeholder="Doe" required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="john@company.com"
          required
        />
        <Input label="Phone Number" name="phone" type="tel" placeholder="(555) 123-4567" />
      </div>

      <Input label="Company Name" name="company" placeholder="ABC Construction Inc." />

      {/* Project Details */}
      <div className="border-t border-slate-200 pt-6">
        <p className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide">
          Project Details
        </p>

        <div className="space-y-6">
          <Input label="Project Name" name="projectName" placeholder="e.g. 123 Main St Mixed-Use" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Project Type"
              name="projectType"
              options={projectTypeOptions}
              placeholder="Select project type"
              defaultValue=""
            />
            <Select
              label="Estimated Glazing Scope"
              name="scopeValue"
              options={scopeValueOptions}
              placeholder="Select estimated value"
              defaultValue=""
            />
          </div>

          <Input
            label="Bid Date / Deadline"
            name="bidDate"
            type="date"
            className="text-slate-900"
          />

          {/* File Upload */}
          <div className="w-full">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Upload Plans / Specs
            </label>
            <div className="relative">
              {!fileName ? (
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center gap-3 w-full h-24 rounded-md border-2 border-dashed border-slate-300 bg-slate-50 cursor-pointer hover:border-accent hover:bg-blue-50/50 transition-colors"
                >
                  <Upload className="h-5 w-5 text-slate-400" />
                  <div className="text-sm">
                    <span className="font-medium text-accent">Click to upload</span>
                    <span className="text-slate-500"> or drag and drop</span>
                    <p className="text-xs text-slate-400 mt-0.5">
                      PDF, DWG, DXF, ZIP, PNG, JPG (max {MAX_FILE_SIZE_MB}MB)
                    </p>
                  </div>
                </label>
              ) : (
                <div className="flex items-center gap-3 w-full rounded-md border border-slate-300 bg-white px-4 py-3">
                  <FileText className="h-5 w-5 text-accent shrink-0" />
                  <span className="text-sm text-slate-700 truncate flex-1">{fileName}</span>
                  <button
                    type="button"
                    onClick={clearFile}
                    className="text-slate-400 hover:text-red-500 transition-colors shrink-0"
                    aria-label="Remove file"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              <input
                ref={fileInputRef}
                id="file-upload"
                name="plans"
                type="file"
                accept={ACCEPTED_FILE_TYPES}
                onChange={handleFileChange}
                className="sr-only"
              />
            </div>
            {fileError && (
              <p className="mt-1 text-sm text-red-500">{fileError}</p>
            )}
          </div>
        </div>
      </div>

      <TextArea
        label="Additional Details / Message"
        name="message"
        placeholder="Tell us about your project scope, timeline, or any specific requirements..."
        rows={4}
        required
      />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <Button type="submit" fullWidth disabled={isSubmitting} className="h-12">
        {isSubmitting ? 'Sending...' : 'Send Message'}
        {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
      </Button>

      <p className="text-xs text-slate-500 text-center mt-4">
        By submitting this form, you agree to our privacy policy. We typically
        respond within one business day.
      </p>
    </form>
  );
}
