import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import SlideEquation from "./SlideEquation";

type EquationQuizForm = { equity: string };

const EquationSlideContainer: React.FC = () => {
  const form = useForm<EquationQuizForm>({ defaultValues: { equity: "" } });
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [animateEquation, setAnimateEquation] = useState(false);

  useEffect(() => {
    setAnimateEquation(true);
  }, []);

  const onSubmit: SubmitHandler<EquationQuizForm> = (data) => {
    const answer = parseFloat(data.equity);
    setCorrect(answer === 9000 - 4000);
    setSubmitted(true);
  };

  return (
    <SlideEquation
      form={form}
      submitted={submitted}
      correct={correct}
      animateEquation={animateEquation}
      onSubmit={onSubmit}
    />
  );
};

export default EquationSlideContainer;
