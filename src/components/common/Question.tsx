import * as React from "react";
import { useAWSCloudPractitionerContext } from "@/context/AWSCloudPractitioner";
import Typography from "@mui/material/Typography";
import findDomainBasedQuestions from "@/utils/utils";
import Button from "@mui/material/Button";

interface QuestionProps {}

export default function Question(props: QuestionProps) {
  const { AWSCloudPractitionerState, setAWSCloudPractitionerState } =
    useAWSCloudPractitionerContext();
  const { data, selectedTab, selectedDomainQuestions } =
    AWSCloudPractitionerState;

  const selectedDomainQ = React.useMemo(() => {
    return findDomainBasedQuestions(data, selectedTab);
  }, [data, selectedTab]);

  React.useEffect(() => {
    setAWSCloudPractitionerState((prev) => ({
      ...prev,
      selectedDomainQuestions: selectedDomainQ,
    }));
  }, [selectedDomainQ, setAWSCloudPractitionerState]);

  const handleShowAnswer = (idx: number) => {
    const updatedList = selectedDomainQuestions?.map((item) => {
      if (item.id === idx) {
        return {
          ...item,
          showAnswer: !item.showAnswer,
        };
      } else return item;
    });
    setAWSCloudPractitionerState((prev) => ({
      ...prev,
      selectedDomainQuestions: updatedList,
    }));
  };

  return (
    <div>
      {selectedDomainQuestions?.length > 0 && (
        <div className="pt-4 font-bold italic">
          Total Questions {selectedDomainQuestions.length}:
        </div>
      )}
      {selectedDomainQuestions?.map((item, idx) => (
        <div key={item.id} className="mb-8">
          <div className="mt-4 mb-4">
            <div className="pb-2 font-semibold capitalize">
              <p>Question {idx + 1}:</p>
              <p className="italic font-light">{item.assessment_type}</p>
            </div>
            <div className="w-3/5 pb-4">
              <Typography>{item.question_plain}</Typography>
            </div>
            <ul className="">
              {item.prompt.answers.map((answer, idx) => {
                const options = `<div style="display:flex; align-items:center;">
                  <p style="padding-right:.4rem">${String.fromCharCode(
                    65 + idx
                  )})</p>
                    ${answer}</div>`;
                return (
                  <div
                    key={idx}
                    className="flex items-center  border-solid border-[1px] border-[#000] w-2/4 mb-2 p-2"
                  >
                    <ol className="flex items-center">
                      <input type="checkbox" className="mr-2 w-4 h-4" />
                    </ol>
                    <ol
                      key={answer}
                      dangerouslySetInnerHTML={{
                        __html: options,
                      }}
                      className=" font-bold"
                    />
                  </div>
                );
              })}
            </ul>
          </div>
          <div className="flex space-x-4 mb-2">
            <div>
              <Button
                color="info"
                variant="outlined"
                onClick={() => handleShowAnswer(item.id)}
              >
                Show Answer
              </Button>
            </div>
            <div>
              <Button color="info" variant="outlined">
                Check Answer
              </Button>
            </div>
          </div>
          {item.showAnswer && (
            <>
              <div className="font-bold uppercase pt-4 ">
                {item.correct_response.join(",")}
              </div>
              <div>
                <p className="text-center">
                  <strong>Explanation</strong>
                </p>
                <p
                  dangerouslySetInnerHTML={{
                    __html: item.prompt.explanation,
                  }}
                />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
