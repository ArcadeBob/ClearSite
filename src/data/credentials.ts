/**
 * Single source of truth for all CGI credential constants.
 *
 * Consumers (update here when values change):
 *   - src/components/CertificationsBadges.tsx
 *   - src/components/StatsSection.tsx
 *   - src/components/GCResourcesSection.tsx
 *   - src/components/SafetySection.tsx
 *   - src/components/Footer.tsx
 *   - src/pages/ContactPage.tsx
 *   - src/pages/CaseStudyPage.tsx
 *   - src/pages/AboutPage.tsx
 *   - src/pages/HomePage.tsx
 */

// CSLB License
export const CSLB_LICENSE_CLASS = 'C-17' as const;
export const CSLB_LICENSE_NUMBER = '965590' as const;
export const CSLB_LICENSE_DISPLAY = 'C-17 License #965590' as const;
export const CSLB_LOOKUP_URL =
  'https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx' as const;

// SBE Certification
export const SBE_CERT_NUMBER = '2034373' as const;

// EMR (Experience Modification Rate)
export const EMR_VALUE = 0.87 as const;
export const EMR_DISPLAY = '0.87' as const;
export const EMR_INDUSTRY_AVERAGE = 1.0 as const;
export const EMR_INDUSTRY_AVERAGE_DISPLAY = '1.0' as const;
/** For StatsSection count-up animation: animateTo uses integer, formatted as (n/100).toFixed(2) */
export const EMR_ANIMATE_INTEGER = 87 as const;

// Bonding Capacity
export const BONDING_CAPACITY_DISPLAY = '$1M' as const;
export const BONDING_CAPACITY_FULL = '$1,000,000' as const;

// OSHA Safety Record
export const OSHA_INCIDENTS_DISPLAY = 'Zero' as const;
export const OSHA_RECORD_DISPLAY = 'Zero OSHA Incidents' as const;

// DIR / Prevailing Wage
export const DIR_STATUS = 'DIR Registered' as const;
export const PREVAILING_WAGE_STATUS = 'Prevailing Wage Certified' as const;
