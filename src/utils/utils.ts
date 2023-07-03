import { AWSCloudPractitioner } from "@/models/AWSCloudPractitionerState";

export default function findDomainBasedQuestions(
  data: AWSCloudPractitioner[],
  section: string
) {
  return data?.filter((item) => item.section === section);
}
