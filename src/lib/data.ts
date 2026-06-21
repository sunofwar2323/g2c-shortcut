import type { CategoryInfo, ScenarioPrompt, SearchSuggestion, Service } from "@/types";

export const CATEGORIES = [
  "Identity & Citizenship",
  "Security & Verification",
  "Marriage & Family",
  "Business & Licensing",
  "Tax & Finance",
  "Transport & Vehicle",
  "Passport & Immigration",
  "Land & Property",
  "Education",
  "Health",
  "Employment",
  "Pension & Social Security",
  "Housing & Construction",
  "Agriculture & Livestock",
  "Justice & Legal",
  "Tourism & Culture",
] as const;

export const TOP_20_IDS = [
  9, 16, 17, 12, 3, 27, 28, 32, 24, 25, 26, 5, 11, 40, 1, 46, 48, 50, 44, 4,
];

const RAW_SERVICES: Omit<Service, "topRank">[] = [
  { id: 1, name: "CID Card Issuance", category: "Identity & Citizenship", agency: "DCRC, MoHA", url: "https://www.citizenservices.gov.bt", description: "Apply for or renew Citizen Identity Card. Required for most government services.", estimatedTime: "3-5 days" },
  { id: 2, name: "Nationality Certificate", category: "Identity & Citizenship", agency: "DCRC, MoHA", url: "https://www.citizenservices.gov.bt", description: "Certificate confirming Bhutanese citizenship.", estimatedTime: "5-7 days" },
  { id: 3, name: "Birth Registration", category: "Identity & Citizenship", agency: "DCRC, MoHA", url: "https://www.citizenservices.gov.bt", description: "Register births digitally via NDI App or ICS portal.", estimatedTime: "1-2 days" },
  { id: 4, name: "Death Registration", category: "Identity & Citizenship", agency: "DCRC, MoHA", url: "https://www.citizenservices.gov.bt", description: "Register a death and obtain official death certificate.", estimatedTime: "2-3 days" },
  { id: 5, name: "Household Information (Family Tree)", category: "Identity & Citizenship", agency: "DCRC, MoHA", url: "https://www.citizenservices.gov.bt", description: "Generate household/family tree using NDI App under the Family tab.", estimatedTime: "Instant" },
  { id: 6, name: "Relationship Certificate", category: "Identity & Citizenship", agency: "DCRC, MoHA", url: "https://www.citizenservices.gov.bt", description: "Certifies family relationships for legal or official use.", estimatedTime: "3-5 days" },
  { id: 7, name: "One and Same Person Certificate", category: "Identity & Citizenship", agency: "DCRC, MoHA", url: "https://www.citizenservices.gov.bt", description: "Certifies two or more names refer to the same individual.", estimatedTime: "3-5 days" },
  { id: 8, name: "Lost Citizenship Document Reporting", category: "Identity & Citizenship", agency: "DCRC, MoHA", url: "https://dcrc.moha.gov.bt", description: "Report lost/found citizenship documents; track recovery.", estimatedTime: "1-2 days" },
  { id: 9, name: "Security Clearance Certificate (NOC)", category: "Security & Verification", agency: "Royal Bhutan Police", url: "https://scs.rbp.gov.bt", description: "Apply for NOC via Bhutan NDI App for employment, travel, or business.", estimatedTime: "5-10 days" },
  { id: 10, name: "Police Verification", category: "Security & Verification", agency: "Royal Bhutan Police", url: "https://scs.rbp.gov.bt", description: "Background check by RBP for employment or legal requirements.", estimatedTime: "5-7 days" },
  { id: 11, name: "Audit Clearance", category: "Security & Verification", agency: "Royal Audit Authority", url: "https://www.citizenservices.gov.bt", description: "Required for civil service appointments and promotions.", estimatedTime: "7-14 days" },
  { id: 12, name: "Marriage Registration", category: "Marriage & Family", agency: "DCRC, MoHA", url: "https://www.citizenservices.gov.bt", description: "Register marriage and obtain official marriage certificate.", estimatedTime: "3-5 days" },
  { id: 13, name: "Divorce Services", category: "Marriage & Family", agency: "DCRC / Judiciary", url: "https://www.citizenservices.gov.bt", description: "Process divorce registration and related civil documentation.", estimatedTime: "7-14 days" },
  { id: 14, name: "Child Registration", category: "Marriage & Family", agency: "DCRC, MoHA", url: "https://www.citizenservices.gov.bt", description: "Register a child in the civil registry following birth.", estimatedTime: "1-2 days" },
  { id: 15, name: "Census Transfer", category: "Marriage & Family", agency: "DCRC, MoHA", url: "https://www.citizenservices.gov.bt", description: "Transfer census/household registration for resettlement or relocation.", estimatedTime: "5-7 days" },
  { id: 16, name: "Business License — New", category: "Business & Licensing", agency: "MoEA / IBLS", url: "https://ibls.systems.gov.bt", description: "Apply for a new business license. Sole Proprietorship, Partnership, Company, or Other.", estimatedTime: "7-14 days" },
  { id: 17, name: "Business License — Renewal", category: "Business & Licensing", agency: "MoEA / IBLS", url: "https://ibls.systems.gov.bt", description: "Renew existing business license annually.", estimatedTime: "3-5 days" },
  { id: 18, name: "Business License — Amendment", category: "Business & Licensing", agency: "MoEA / IBLS", url: "https://ibls.systems.gov.bt", description: "Apply for changes/amendments to an existing license.", estimatedTime: "5-7 days" },
  { id: 19, name: "Branch Opening / Business Extension", category: "Business & Licensing", agency: "MoEA / MoENR", url: "https://www.moenr.gov.bt", description: "Apply to open a branch office or extend business operations.", estimatedTime: "10-14 days" },
  { id: 20, name: "Environment Clearance", category: "Business & Licensing", agency: "MoENR", url: "https://www.moenr.gov.bt", description: "Required for business or industrial projects with environmental impact.", estimatedTime: "14-30 days" },
  { id: 21, name: "Import/Export Registration", category: "Business & Licensing", agency: "MoEA", url: "https://www.citizenservices.gov.bt", description: "Register as importer/exporter; cancel or update import house registration.", estimatedTime: "5-7 days" },
  { id: 22, name: "Personal Income Tax Filing", category: "Tax & Finance", agency: "Dept. of Revenue & Customs", url: "https://www.citizenservices.gov.bt", description: "File personal income tax returns.", estimatedTime: "1-2 days" },
  { id: 23, name: "Business Tax / CIT Filing", category: "Tax & Finance", agency: "Dept. of Revenue & Customs", url: "https://www.citizenservices.gov.bt", description: "File corporate income tax and business tax returns.", estimatedTime: "1-3 days" },
  { id: 24, name: "Tax Clearance Certificate", category: "Tax & Finance", agency: "Dept. of Revenue & Customs", url: "https://www.citizenservices.gov.bt", description: "Required for tenders, travel, or employment.", estimatedTime: "3-5 days" },
  { id: 25, name: "Land Tax Payment", category: "Tax & Finance", agency: "Dept. of Revenue & Customs", url: "https://www.citizenservices.gov.bt", description: "Pay land tax online.", estimatedTime: "Instant" },
  { id: 26, name: "Property Tax Payment", category: "Tax & Finance", agency: "Dept. of Revenue & Customs", url: "https://www.citizenservices.gov.bt", description: "Pay property/municipal tax online.", estimatedTime: "Instant" },
  { id: 27, name: "Driving License — New / Renewal", category: "Transport & Vehicle", agency: "RSTA, MoIT", url: "https://www.citizenservices.gov.bt", description: "Apply for new driving license or renew existing one.", estimatedTime: "5-7 days" },
  { id: 28, name: "Vehicle Registration", category: "Transport & Vehicle", agency: "RSTA, MoIT", url: "https://www.citizenservices.gov.bt", description: "Register a new vehicle or update registration details.", estimatedTime: "3-5 days" },
  { id: 29, name: "Vehicle Ownership Transfer", category: "Transport & Vehicle", agency: "RSTA, MoIT", url: "https://www.citizenservices.gov.bt", description: "Transfer vehicle ownership between individuals.", estimatedTime: "3-5 days" },
  { id: 30, name: "Road Tax Payment", category: "Transport & Vehicle", agency: "RSTA, MoIT", url: "https://www.citizenservices.gov.bt", description: "Pay annual road tax for vehicles.", estimatedTime: "Instant" },
  { id: 31, name: "Vehicle Fitness Certificate", category: "Transport & Vehicle", agency: "RSTA, MoIT", url: "https://www.citizenservices.gov.bt", description: "Obtain vehicle roadworthiness/fitness certification.", estimatedTime: "1-2 days" },
  { id: 32, name: "Passport Application — New / Renewal", category: "Passport & Immigration", agency: "MFA (Passport Office)", url: "https://www.mfa.gov.bt/passport-application/", description: "Apply or renew Bhutanese passport online. Emergency in-person at Changangkha.", estimatedTime: "7-14 days" },
  { id: 33, name: "Visa Application — Tourist", category: "Passport & Immigration", agency: "Dept. of Immigration, MoHA", url: "https://permit.doi.gov.bt", description: "Apply for tourist visas electronically.", estimatedTime: "1-3 days" },
  { id: 34, name: "Non-Tourist Permit / Visa", category: "Passport & Immigration", agency: "Dept. of Immigration, MoHA", url: "https://permit.doi.gov.bt", description: "Work, study, or other non-tourist permits for foreign nationals.", estimatedTime: "5-10 days" },
  { id: 35, name: "Route Permit", category: "Passport & Immigration", agency: "Dept. of Immigration, MoHA", url: "https://permit.doi.gov.bt", description: "Permits for travel to restricted areas. Fees payable online.", estimatedTime: "2-3 days" },
  { id: 36, name: "Immigration Clearance", category: "Passport & Immigration", agency: "Dept. of Immigration, MoHA", url: "https://permit.doi.gov.bt", description: "Departure and arrival clearance through Bhutan ports of entry.", estimatedTime: "1-2 days" },
  { id: 37, name: "Land Ownership Certificate", category: "Land & Property", agency: "Dept. of Survey & Land Records", url: "https://www.citizenservices.gov.bt", description: "Obtain official land ownership (Thram) certificate.", estimatedTime: "7-14 days" },
  { id: 38, name: "Land Transfer", category: "Land & Property", agency: "Dept. of Survey & Land Records", url: "https://www.citizenservices.gov.bt", description: "Transfer land ownership between individuals.", estimatedTime: "14-21 days" },
  { id: 39, name: "Property Registration", category: "Land & Property", agency: "Dept. of Survey & Land Records", url: "https://www.citizenservices.gov.bt", description: "Register property and obtain legal documentation of ownership.", estimatedTime: "7-14 days" },
  { id: 40, name: "Scholarship Application", category: "Education", agency: "MoE / RCSC", url: "https://www.citizenservices.gov.bt", description: "Apply for government scholarships for higher education.", estimatedTime: "30-60 days" },
  { id: 41, name: "Student Records / Transcripts", category: "Education", agency: "Ministry of Education", url: "https://www.citizenservices.gov.bt", description: "Access academic records, transcripts, and educational certificates.", estimatedTime: "3-5 days" },
  { id: 42, name: "Examination Services", category: "Education", agency: "Bhutan Board of Examinations", url: "https://www.citizenservices.gov.bt", description: "Register for board exams, download admit cards, access results.", estimatedTime: "1-3 days" },
  { id: 43, name: "Medical Certificate", category: "Health", agency: "MoH / Health Dept.", url: "https://www.citizenservices.gov.bt", description: "Official medical fitness certificate for employment or travel.", estimatedTime: "1-2 days" },
  { id: 44, name: "Health Insurance Services", category: "Health", agency: "Dept. of Health / BNBL", url: "https://www.citizenservices.gov.bt", description: "Enrol in or update health insurance coverage.", estimatedTime: "3-5 days" },
  { id: 45, name: "Hospital Services — Referral", category: "Health", agency: "MoH / JDWNRH", url: "https://www.citizenservices.gov.bt", description: "Access referral letters and hospital service bookings online.", estimatedTime: "1-3 days" },
  { id: 46, name: "Employment Registration / Job Portal", category: "Employment", agency: "Dept. of Employment, MoLHR", url: "https://www.citizenservices.gov.bt", description: "Register for employment and access government job listings.", estimatedTime: "1-2 days" },
  { id: 47, name: "Labour / Work Permit", category: "Employment", agency: "Dept. of Employment, MoLHR", url: "https://www.citizenservices.gov.bt", description: "Work permits for foreign nationals employed in Bhutan.", estimatedTime: "7-14 days" },
  { id: 48, name: "Pension Claim", category: "Pension & Social Security", agency: "NPPF / DPAS", url: "https://www.citizenservices.gov.bt", description: "Submit and track pension claims upon retirement from civil service.", estimatedTime: "14-30 days" },
  { id: 49, name: "Retirement Benefits", category: "Pension & Social Security", agency: "NPPF / DPAS", url: "https://www.citizenservices.gov.bt", description: "Access and manage retirement and provident fund benefits.", estimatedTime: "7-14 days" },
  { id: 50, name: "Building Approval / Construction Permit", category: "Housing & Construction", agency: "Thromde / MoIT / CDB", url: "https://www.citizenservices.gov.bt/cdb/", description: "Apply for building plan approval and construction permits.", estimatedTime: "30-60 days" },
  { id: 51, name: "Livestock Registration", category: "Agriculture & Livestock", agency: "Dept. of Livestock, MoAF", url: "https://www.citizenservices.gov.bt", description: "Register livestock and obtain animal health certificates.", estimatedTime: "3-5 days" },
  { id: 52, name: "Agriculture / Farm Permits", category: "Agriculture & Livestock", agency: "Dept. of Agriculture, MoAF", url: "https://www.citizenservices.gov.bt", description: "Apply for farm subsidies, seeds, and agriculture-related permits.", estimatedTime: "5-10 days" },
  { id: 53, name: "Court Services / Legal Certificates", category: "Justice & Legal", agency: "Judiciary of Bhutan", url: "https://www.citizenservices.gov.bt", description: "Obtain certified court documents and legal certificates.", estimatedTime: "7-14 days" },
  { id: 54, name: "Grievance Services", category: "Justice & Legal", agency: "Anti-Corruption Commission", url: "https://www.citizenservices.gov.bt", description: "File complaints and track grievances through official channels.", estimatedTime: "14-30 days" },
  { id: 55, name: "Tourism Permits", category: "Tourism & Culture", agency: "Dept. of Tourism", url: "https://www.citizenservices.gov.bt", description: "Apply for tourism-related permits and protected area access.", estimatedTime: "3-5 days" },
  { id: 56, name: "Cultural Affairs Services", category: "Tourism & Culture", agency: "Dept. of Culture, MoHCA", url: "https://www.citizenservices.gov.bt", description: "Services related to cultural preservation, heritage, and events.", estimatedTime: "5-10 days" },
];

export const SERVICES: Service[] = RAW_SERVICES.map((service) => {
  const rankIndex = TOP_20_IDS.indexOf(service.id);
  return { ...service, topRank: rankIndex >= 0 ? rankIndex + 1 : null };
});

export const FEATURED_SERVICE_IDS = [9, 16, 12, 3, 32, 27, 28, 24, 25, 11, 5, 40];

export const CATEGORY_GRID: CategoryInfo[] = [
  { id: "business", name: "Business & Licensing", description: "Licenses, permits, and business registrations", categoryKey: "Business & Licensing" },
  { id: "tax", name: "Tax & Finance", description: "Tax filing, clearance, and online payments", categoryKey: "Tax & Finance" },
  { id: "vehicle", name: "Vehicle Services", description: "Driving licenses, registration, and road tax", categoryKey: "Transport & Vehicle" },
  { id: "passport", name: "Passport & Immigration", description: "Passports, visas, and travel permits", categoryKey: "Passport & Immigration" },
  { id: "family", name: "Family Services", description: "Marriage, birth, and household records", categoryKey: "Marriage & Family" },
  { id: "security", name: "Security & Verification", description: "Clearances, audits, and background checks", categoryKey: "Security & Verification" },
  { id: "land", name: "Land & Property", description: "Land ownership, transfer, and property records", categoryKey: "Land & Property" },
  { id: "education", name: "Education", description: "Scholarships, transcripts, and examinations", categoryKey: "Education" },
  { id: "health", name: "Health Services", description: "Medical certificates and health insurance", categoryKey: "Health" },
  { id: "legal", name: "Legal Services", description: "Court documents and grievance filing", categoryKey: "Justice & Legal" },
  { id: "agriculture", name: "Agriculture", description: "Farm permits and livestock registration", categoryKey: "Agriculture & Livestock" },
  { id: "pension", name: "Pension Services", description: "Retirement benefits and pension claims", categoryKey: "Pension & Social Security" },
];

export const SCENARIO_PROMPTS: ScenarioPrompt[] = [
  { id: "business", label: "I want to start a business", query: "I want to start a business in Bhutan", serviceIds: [16, 20, 21, 24] },
  { id: "married", label: "I got married", query: "I got married and need official documents", serviceIds: [12, 14, 3, 5] },
  { id: "passport", label: "I need a passport", query: "I need to apply for or renew my passport", serviceIds: [32, 9, 1] },
  { id: "land", label: "I want to buy land", query: "I want to buy land or transfer property", serviceIds: [37, 38, 39, 25] },
  { id: "tax", label: "I need a tax clearance", query: "I need a tax clearance certificate", serviceIds: [24, 22, 23, 11] },
];

export const SEARCH_EXAMPLES: SearchSuggestion[] = [
  { query: "How do I renew my business license?", serviceIds: [17, 16, 18] },
  { query: "I need marriage certificate", serviceIds: [12, 3, 5] },
  { query: "How to pay land tax?", serviceIds: [25, 26, 24] },
  { query: "Where can I get security clearance?", serviceIds: [9, 10, 11] },
];

export const HERO_EXAMPLES = [
  "Security Clearance",
  "Marriage Certificate",
  "Business License Renewal",
  "Passport Services",
  "Driving License",
  "Land Tax Payment",
];

export const AI_FEATURES = [
  "Explain services in simple language",
  "Guide citizens step-by-step",
  "Find the correct government portal",
  "Provide required documents",
  "Show processing fees",
  "Explain eligibility requirements",
  "Save time and avoid office visits",
];

export const STATS = [
  { label: "Government Services", value: 50, suffix: "+" },
  { label: "Most Used Services", value: 20, suffix: "" },
  { label: "Free Access", value: 100, suffix: "%" },
  { label: "Step-by-Step Guides", value: 56, suffix: "" },
  // { label: "AI Powered Search", value: 1, suffix: "", text: "Yes" },
  { label: "Citizen Friendly", value: 1, suffix: "", text: "Yes" },
];

export function getServiceById(id: number): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}

export function getServicesByIds(ids: number[]): Service[] {
  return ids.map((id) => getServiceById(id)).filter((s): s is Service => Boolean(s));
}

export function getTopServices(): Service[] {
  return SERVICES.filter((s) => s.topRank !== null).sort((a, b) => (a.topRank ?? 0) - (b.topRank ?? 0));
}

export function getFeaturedServices(): Service[] {
  return getServicesByIds(FEATURED_SERVICE_IDS);
}

export function searchServices(query: string): Service[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const keywords = q.split(/\s+/).filter(Boolean);
  return SERVICES.filter((service) => {
    const haystack = `${service.name} ${service.category} ${service.agency} ${service.description}`.toLowerCase();
    return keywords.every((kw) => haystack.includes(kw));
  }).slice(0, 8);
}

export function getServicesByCategory(categoryKey: string): Service[] {
  return SERVICES.filter((s) => s.category === categoryKey);
}

export const CATEGORY_SHORT_LABELS: Record<string, string> = {
  "Identity & Citizenship": "Identity",
  "Security & Verification": "Security",
  "Marriage & Family": "Family",
  "Business & Licensing": "Business",
  "Tax & Finance": "Tax",
  "Transport & Vehicle": "Transport",
  "Passport & Immigration": "Immigration",
  "Land & Property": "Land",
  Education: "Education",
  Health: "Health",
  Employment: "Employment",
  "Pension & Social Security": "Pension",
  "Housing & Construction": "Housing",
  "Agriculture & Livestock": "Agriculture",
  "Justice & Legal": "Legal",
  "Tourism & Culture": "Tourism",
};

export function filterServices(query: string, category: string): Service[] {
  const q = query.trim().toLowerCase();

  return SERVICES.filter((service) => {
    const matchesCategory = category === "all" || service.category === category;
    if (!matchesCategory) return false;
    if (!q) return true;

    const haystack = `${service.name} ${service.category} ${service.agency} ${service.description}`.toLowerCase();
    const keywords = q.split(/\s+/).filter(Boolean);
    return keywords.every((kw) => haystack.includes(kw));
  });
}

export function generateAIResponse(query: string): string {
  const results = searchServices(query);
  if (results.length === 0) {
    return "I could not find an exact match. Try describing what you need in plain language, such as \"passport renewal\" or \"business license\".";
  }

  const primary = results[0];
  const steps = [
    `Visit the official portal: ${primary.agency}`,
    `Select "${primary.name}" from the services list`,
    "Prepare required documents (CID, supporting forms as applicable)",
    "Submit your application and track status online",
  ];

  return `Based on your question, I recommend **${primary.name}**.\n\n${primary.description}\n\n**Follow these ${steps.length} simple steps:**\n${steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n\nEstimated processing time: ${primary.estimatedTime ?? "Varies"}.`;
}
