import { useEffect } from "react";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { Hand } from "lucide-react";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";

const StripeReturnPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sessionId = params.get("session_id");

  useEffect(() => {
    if (sessionId) {
      dispatch(capturePayment(sessionId)).then((data) => {
        if (data?.payload?.success) {
          toast.success(data.payload.message);
          window.location.href = "/shop/payment-success";
        } else {
          toast.error(data.payload);
        }
      });
    }
  }, [dispatch, sessionId]);

  return (
    <div className="h-[90vh] flex items-center justify-center w-full px-4">
      <Card className="max-w-2xl mx-auto w-full p-10">
        <CardHeader className="p-0">
          <CardTitle className="text-2xl md:text-4xl text-center">
            Processing Payment...Please wait!
          </CardTitle>
        </CardHeader>

        <div className="flex items-center justify-center animate-ping mt-2">
          <Hand className="size-20 md:size-28" />
        </div>
      </Card>
    </div>
  );
};

export default StripeReturnPage;
