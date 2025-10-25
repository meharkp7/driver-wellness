import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageTransition } from "@/components/ui/page-transition";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard");
  }, [navigate]);

  return (
    <PageTransition>
      <div />
    </PageTransition>
  );
};

export default Index;
