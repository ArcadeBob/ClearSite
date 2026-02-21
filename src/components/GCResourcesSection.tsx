import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';
import {
  FileText,
  Shield,
  Award,
  Download,
  Building2,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  FileSpreadsheet,
  ShieldCheck,
  Loader2,
  ArrowRight,
  File } from
'lucide-react';
type DownloadStatus = 'idle' | 'downloading' | 'downloaded';
interface DocumentCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  fileSize: string;
  updatedDate: string;
  status: DownloadStatus;
  onDownload: (id: string) => void;
}
function DocumentCard({
  id,
  title,
  description,
  icon,
  fileSize,
  updatedDate,
  status,
  onDownload
}: DocumentCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-accent/50 hover:bg-white/[0.07] transition-all group flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="h-12 w-12 rounded-lg bg-brand flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
          {icon}
        </div>
        <div className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold text-slate-300 uppercase tracking-wider">
          PDF
        </div>
      </div>

      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors">
        {title}
      </h3>
      <p className="text-sm text-slate-400 mb-6 flex-1 leading-relaxed">
        {description}
      </p>

      <div className="mt-auto pt-4 border-t border-white/10">
        <div className="flex items-center justify-between mb-4 text-xs text-slate-500">
          <span>{fileSize}</span>
          <span>Updated: {updatedDate}</span>
        </div>

        <button
          onClick={() => onDownload(id)}
          disabled={status !== 'idle'}
          className={`
            w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300
            ${status === 'idle' ? 'bg-white/10 text-white hover:bg-accent hover:text-white' : status === 'downloading' ? 'bg-accent/20 text-accent cursor-wait' : 'bg-green-500/20 text-green-400 cursor-default'}
          `}>

          {status === 'idle' &&
          <>
              <Download className="h-4 w-4" />
              Download
            </>
          }
          {status === 'downloading' &&
          <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Downloading...
            </>
          }
          {status === 'downloaded' &&
          <>
              <CheckCircle className="h-4 w-4" />
              Downloaded
            </>
          }
        </button>
      </div>
    </div>);

}
export function GCResourcesSection() {
  const [downloadStates, setDownloadStates] = useState<
    Record<string, DownloadStatus>>(
    {});
  const handleDownload = (id: string) => {
    setDownloadStates((prev) => ({
      ...prev,
      [id]: 'downloading'
    }));
    setTimeout(() => {
      setDownloadStates((prev) => ({
        ...prev,
        [id]: 'downloaded'
      }));
      setTimeout(() => {
        setDownloadStates((prev) => ({
          ...prev,
          [id]: 'idle'
        }));
      }, 3000);
    }, 1500);
  };
  const handleDownloadAll = () => {
    const allIds = documents.map((d) => d.id);
    allIds.forEach((id) => {
      setDownloadStates((prev) => ({
        ...prev,
        [id]: 'downloading'
      }));
      setTimeout(
        () => {
          setDownloadStates((prev) => ({
            ...prev,
            [id]: 'downloaded'
          }));
          setTimeout(() => {
            setDownloadStates((prev) => ({
              ...prev,
              [id]: 'idle'
            }));
          }, 3000);
        },
        1500 + Math.random() * 1000
      );
    });
  };
  const quickFacts = [
  {
    label: 'Bonding Capacity',
    value: '$5M',
    icon: <DollarSign className="h-5 w-5" />
  },
  {
    label: 'Single Project Max',
    value: '$2M+',
    icon: <Building2 className="h-5 w-5" />
  },
  {
    label: 'EMR Rating',
    value: '0.87',
    icon: <Shield className="h-5 w-5" />
  },
  {
    label: 'OSHA Incidents',
    value: '0',
    icon: <CheckCircle className="h-5 w-5" />
  },
  {
    label: 'Crew Size',
    value: '24+',
    icon: <Users className="h-5 w-5" />
  },
  {
    label: 'Avg Response',
    value: '<24hrs',
    icon: <Clock className="h-5 w-5" />
  }];

  const documents = [
  {
    id: 'coi',
    title: 'Certificate of Insurance',
    description:
    'Current COI with $2M GL / $1M Auto / $1M Umbrella coverage limits.',
    icon: <Shield className="h-6 w-6" />,
    fileSize: '156 KB',
    updatedDate: 'Jan 2026'
  },
  {
    id: 'emr',
    title: 'EMR & Safety Docs',
    description:
    '0.87 EMR rating verification letter, IIPP, and safety protocols.',
    icon: <Award className="h-6 w-6" />,
    fileSize: '89 KB',
    updatedDate: 'Jan 2026'
  },
  {
    id: 'profile',
    title: 'Company Profile',
    description:
    'Full capabilities statement, company history, team, and equipment list.',
    icon: <Building2 className="h-6 w-6" />,
    fileSize: '2.1 MB',
    updatedDate: 'Dec 2025'
  },
  {
    id: 'references',
    title: 'Project References',
    description:
    'List of recent completed projects with GC contact info for verification.',
    icon: <FileText className="h-6 w-6" />,
    fileSize: '124 KB',
    updatedDate: 'Jan 2026'
  },
  {
    id: 'w9',
    title: 'W-9 Form',
    description: 'Current signed W-9 tax documentation for vendor setup.',
    icon: <FileSpreadsheet className="h-6 w-6" />,
    fileSize: '45 KB',
    updatedDate: '2025'
  },
  {
    id: 'license',
    title: 'License & Bonding',
    description:
    'C-17 License #965590 and $5M bonding capacity verification.',
    icon: <ShieldCheck className="h-6 w-6" />,
    fileSize: '78 KB',
    updatedDate: 'Jan 2026'
  }];

  return (
    <section className="py-24 bg-brand text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
              For General Contractors
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Instant Document Center
            </h2>
            <p className="text-lg text-slate-300">
              Don't wait for an email. Download everything you need to add CGI
              to your bid list right now.
            </p>
          </div>

          <Button
            variant="secondary"
            size="lg"
            className="gap-2 shrink-0"
            onClick={handleDownloadAll}>

            <Download className="h-5 w-5" />
            Download All (ZIP)
          </Button>
        </div>

        {/* Quick Facts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {quickFacts.map((fact) =>
          <div
            key={fact.label}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 hover:border-accent/50 transition-colors group">

              <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-accent/20 text-accent mb-3 group-hover:scale-110 transition-transform">
                {fact.icon}
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {fact.value}
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-wide">
                {fact.label}
              </div>
            </div>
          )}
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {documents.map((doc) =>
          <DocumentCard
            key={doc.id}
            {...doc}
            status={downloadStates[doc.id] || 'idle'}
            onDownload={handleDownload} />

          )}
        </div>

        {/* Bottom CTA */}
        <div className="bg-white/5 rounded-xl p-6 md:p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center text-accent shrink-0">
              <File className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                Need a Custom Document?
              </h3>
              <p className="text-slate-400 text-sm">
                Have specific insurance requirements or a custom prequal form?
                We'll prepare it within 24 hours.
              </p>
            </div>
          </div>

          <Link to="/contact">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white hover:text-brand gap-2 whitespace-nowrap">

              Request Custom Doc <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>);

}