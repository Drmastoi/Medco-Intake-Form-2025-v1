
import React from "react";
import { PrefilledDetailsSection } from "@/components/PrefilledDetailsSection";
import { PreFilledDetails } from "@/components/PreFilledDetails";
import { IntakeFormSection2 } from "@/components/IntakeFormSection2";
import { IntakeFormSection3 } from "@/components/IntakeFormSection3";
import { IntakeFormSection4 } from "@/components/IntakeFormSection4";
import { IntakeFormSection5 } from "@/components/IntakeFormSection5";
import { IntakeFormSection6 } from "@/components/IntakeFormSection6";
import { IntakeFormSection7 } from "@/components/IntakeFormSection7";
import { IntakeFormSection8 } from "@/components/IntakeFormSection8";
import { IntakeFormSection9 } from "@/components/IntakeFormSection9";
import { IntakeFormSection10 } from "@/components/IntakeFormSection10";
import { IntakeFormSection11 } from "@/components/IntakeFormSection11";
import { IntakeFormSection12 } from "@/components/IntakeFormSection12";

interface IntakeFormSectionsProps {
  currentSection: number;
  form: any;
}

export function IntakeFormSections({ currentSection, form }: IntakeFormSectionsProps) {
  switch (currentSection) {
    case 0:
      return <PrefilledDetailsSection form={form} />;
    case 1:
      return <PreFilledDetails form={form} />;
    case 2:
      return <IntakeFormSection2 form={form} />;
    case 3:
      return <IntakeFormSection3 form={form} />;
    case 4:
      return <IntakeFormSection4 form={form} />;
    case 5:
      return <IntakeFormSection5 form={form} />;
    case 6:
      return <IntakeFormSection6 form={form} />;
    case 7:
      return <IntakeFormSection7 form={form} />;
    case 8:
      return <IntakeFormSection8 form={form} />;
    case 9:
      return <IntakeFormSection9 form={form} />;
    case 10:
      return <IntakeFormSection10 form={form} />;
    case 11:
      return <IntakeFormSection11 form={form} />;
    case 12:
      return <IntakeFormSection12 form={form} />;
    default:
      return null;
  }
}
