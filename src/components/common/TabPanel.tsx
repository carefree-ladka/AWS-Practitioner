import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import React from "react";
import { useAWSCloudPractitionerContext } from "@/context/AWSCloudPractitioner";

interface TabProps {}

const domains = [
  "Cloud Concepts",
  "Security and Compliance",
  "Technology",
  "Billing and Pricing",
];

export default function TabPanel(props: TabProps) {
  const { AWSCloudPractitionerState, setAWSCloudPractitionerState } =
    useAWSCloudPractitionerContext();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setAWSCloudPractitionerState((prev) => ({
      ...prev,
      selectedTab: newValue,
    }));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={AWSCloudPractitionerState.selectedTab}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="AWS Tabs"
      >
        {domains.map((domain, idx) => (
          <Tab
            key={domain + idx}
            value={domain}
            label={domain}
            tabIndex={idx}
            defaultValue="Cloud Concepts"
          />
        ))}
      </Tabs>
    </Box>
  );
}
