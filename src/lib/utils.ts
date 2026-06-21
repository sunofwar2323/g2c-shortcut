import type { Service } from "@/types";
import {
  Building2,
  Car,
  FileText,
  GraduationCap,
  Heart,
  Landmark,
  Leaf,
  Plane,
  Scale,
  Shield,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Business & Licensing": Building2,
  "Tax & Finance": Wallet,
  "Transport & Vehicle": Car,
  "Passport & Immigration": Plane,
  "Marriage & Family": Users,
  "Security & Verification": Shield,
  "Land & Property": Landmark,
  Education: GraduationCap,
  Health: Heart,
  "Justice & Legal": Scale,
  "Agriculture & Livestock": Leaf,
  "Pension & Social Security": FileText,
};

export function getCategoryIcon(categoryKey: string): LucideIcon {
  return CATEGORY_ICONS[categoryKey] ?? FileText;
}

export function getServiceIcon(service: Service): LucideIcon {
  return getCategoryIcon(service.category);
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
