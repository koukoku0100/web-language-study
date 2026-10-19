export type AccountStatus = "active" | "suspended";

export type SelectOption = {
  id: string;
  label: string;
};

export type Learner = {
  id: string;
  name: string;
  email: string;
  nativeLanguage: string;
  registeredOn: string;
  progressRate: number;
  lastStudiedOn: string;
  status: AccountStatus;
};

export type LearnerAdminState = {
  screenId: "WELG0140";
  showSampleDataBadge: boolean;
  title: string;
  description: string;
  searchPlaceholder: string;
  nativeLanguageOptions: SelectOption[];
  selectedNativeLanguageId: string;
  statusOptions: SelectOption[];
  selectedStatusId: string;
  learners: Learner[];
};
