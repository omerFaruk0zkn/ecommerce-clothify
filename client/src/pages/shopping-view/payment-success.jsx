import { useNavigate } from "react-router";
import { LaptopMinimalCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[90vh] flex items-center justify-center w-full px-4">
      <Card className="max-w-2xl mx-auto w-full p-10">
        <CardHeader className="p-0">
          <CardTitle className="text-2xl md:text-4xl text-center">
            Payment is successfully
          </CardTitle>
        </CardHeader>

        <div className="flex items-center justify-center animate-bounce">
          <LaptopMinimalCheck className="size-20 md:size-28" />
        </div>

        <Button onClick={() => navigate("/shop/account")}>View Orders</Button>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
