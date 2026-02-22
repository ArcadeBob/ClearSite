import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { TextArea } from './ui/TextArea';
import { Send, CheckCircle } from 'lucide-react';

const FORMSPREE_URL = 'https://formspree.io/f/mreayoqq';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
      </div>);

  }
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="First Name" name="firstName" placeholder="John" required />
        <Input label="Last Name" name="lastName" placeholder="Doe" required />
      </div>

      <Input
        label="Email Address"
        name="email"
        type="email"
        placeholder="john@company.com"
        required />

      <Input label="Company Name" name="company" placeholder="Construction Co." />

      <Input label="Phone Number" name="phone" type="tel" placeholder="(555) 123-4567" />

      <TextArea
        label="Project Details / Message"
        name="message"
        placeholder="Tell us about your project requirements..."
        rows={4}
        required />

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
    </form>);

}