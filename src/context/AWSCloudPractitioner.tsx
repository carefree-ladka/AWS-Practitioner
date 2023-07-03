"use client";

import * as React from "react";
import { AWSCloudPractitioner } from "@/models/AWSCloudPractitionerState";

interface AWSCloudPractitionerState {
  data: AWSCloudPractitioner[];
  selectedTab: string;
  selectedDomainQuestions: AWSCloudPractitioner[];
}

type AWSCloudPractitionerStateSetter = (
  AWSCloudPractitionerStateSetter: (
    awsCloudPractitionerState: AWSCloudPractitionerState
  ) => AWSCloudPractitionerState
) => void;

const AWSCloudPractitionerContext = React.createContext<
  | {
      AWSCloudPractitionerState: AWSCloudPractitionerState;
      setAWSCloudPractitionerState: AWSCloudPractitionerStateSetter;
    }
  | undefined
>(undefined);

interface AWSCloudPractitionerStateProviderProps {
  children?: React.ReactNode;
  selectedTab?: string;
  data?: AWSCloudPractitioner[];
  selectedDomainQuestions?: AWSCloudPractitioner[];
}
export default function AWSCloudPractitionerStateProvider({
  selectedTab = "Cloud Concepts",
  data = [],
  selectedDomainQuestions = [],
  children,
}: AWSCloudPractitionerStateProviderProps) {
  const [AWSCloudPractitionerState, setAWSCloudPractitionerState] =
    React.useState<AWSCloudPractitionerState>({
      data: data,
      selectedTab: selectedTab,
      selectedDomainQuestions: selectedDomainQuestions,
    });

  const value = React.useMemo(
    () => ({
      AWSCloudPractitionerState,
      setAWSCloudPractitionerState,
    }),
    [AWSCloudPractitionerState]
  );

  return (
    <AWSCloudPractitionerContext.Provider value={value}>
      {children}
    </AWSCloudPractitionerContext.Provider>
  );
}

export function useAWSCloudPractitionerContext() {
  const context = React.useContext(AWSCloudPractitionerContext);
  if (!context) {
    throw new Error(
      "useAWSCloudPractitionerContext must be used within AWSCloudPractitionerStateProvider"
    );
  }
  return context;
}
