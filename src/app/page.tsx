"use client";
import Question from "@/components/common/Question";
import TabPanel from "@/components/common/TabPanel";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useAWSCloudPractitionerContext } from "@/context/AWSCloudPractitioner";
import React from "react";
import { AWSCloudPractitioner } from "@/models/AWSCloudPractitionerState";

export default function Home() {
  const [] = React.useState([]);
  const { AWSCloudPractitionerState, setAWSCloudPractitionerState } =
    useAWSCloudPractitionerContext();

  React.useEffect(() => {
    fetch("./data.json")
      .then((res) => res.json())
      .then((data: AWSCloudPractitioner[]) => {
        setAWSCloudPractitionerState((prev) => ({
          ...prev,
          data: data?.map((item) => ({
            ...item,
            showAnswer: false,
          })),
        }));
      });
  }, [setAWSCloudPractitionerState]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <TabPanel />
          <Question />
          {AWSCloudPractitionerState?.data?.length > 0 && (
            <div className="relative">
              <Button
                color="success"
                variant="outlined"
                onClick={() => window.scrollTo(0, 0)}
                className="absolute right-2 -top-10"
              >
                Scroll To Top
              </Button>
            </div>
          )}
        </main>
      </Container>
    </React.Fragment>
  );
}
