import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { TextArea } from './ui/TextArea';
import { Send, CheckCircle } from 'lucide-react';
export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
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
      </div>);

  }
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="First Name" placeholder="John" required />
        <Input label="Last Name" placeholder="Doe" required />
      </div>

      <Input
        label="Email Address"
        type="email"
        placeholder="john@company.com"
        required />


      <Input label="Company Name" placeholder="Construction Co." />

      <Input label="Phone Number" type="tel" placeholder="(555) 123-4567" />

      <TextArea
        label="Project Details / Message"
        placeholder="Tell us about your project requirements..."
        rows={4}
        required />


      <Button type="submit" fullWidth disabled={isSubmitting} className="h-12">
        {isSubmitting ? 'Sending...' : 'Send Message'}
        {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
      </Button>

      <p className="text-xs text-slate-500 text-center mt-4">
        By submitting this form, you agree to our privacy policy. We typically
        respond within one business day.
      </p>
    </form>);

}