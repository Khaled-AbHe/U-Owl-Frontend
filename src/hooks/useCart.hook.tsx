import { useLoaderData, useFetcher } from "react-router-dom";
import type { Cart, OrderItem } from "../constants/types/cart.types";

export function useCart() {
  const cart = useLoaderData() as Cart | null;

  const payFetcher = useFetcher();
  const removeFetcher = useFetcher();

  const isPaying = payFetcher.state !== "idle";
  const isRemoving = removeFetcher.state !== "idle";
  const removingId = isRemoving ? Number(removeFetcher.formData?.get("orderItemId")) : null;

  const payResult = payFetcher.data as { type: string; message: string } | undefined;
  const removeResult = removeFetcher.data as { type: string; message: string } | undefined;

  const payError = payResult?.type === "error" ? payResult.message : null;
  const removeError = removeResult?.type === "error" ? removeResult.message : null;
  const paySuccess = payResult?.type === "success";

  const visibleItems: OrderItem[] =
    cart?.orderItems.filter((item: OrderItem) => item.orderItemId !== removingId) ?? [];
  const visibleTotal = visibleItems.reduce((sum, item) => sum + item.itemPrice, 0);

  const isEmpty = visibleItems.length === 0;

  return {
    payFetcher,
    removeFetcher,
    isPaying,
    isRemoving,
    removingId,
    payError,
    removeError,
    paySuccess,
    visibleItems,
    visibleTotal,
    isEmpty,
  };
}
