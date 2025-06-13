import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

const UserCartWrapper = ({ cartItems, setOpenCartSheet }) => {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
        <SheetDescription>
          Check your cart items and complete your shopping
        </SheetDescription>
      </SheetHeader>

      <div className="px-4">
        <div className="space-y-4">
          {cartItems && cartItems.length > 0
            ? cartItems.map((item) => (
                <UserCartItemsContent key={item.productId} cartItem={item} />
              ))
            : null}
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">${totalCartAmount}</span>
          </div>
        </div>

        <Button
          onClick={() => {
            setOpenCartSheet(false);
            navigate("/shop/checkout");
          }}
          className="w-full mt-6"
        >
          Checkout
        </Button>
      </div>
    </SheetContent>
  );
};

export default UserCartWrapper;
