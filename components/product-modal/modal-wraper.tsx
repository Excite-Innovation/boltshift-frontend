"use client";

import { ReactNode } from "react";
import { ModalItem } from "@/components/product-modal/product-modal";

type ModalWrapperProps = {
  children: ReactNode;
  productTitle: string;
  vendorName: string;
  rating: number;
  productItems: string[];
};

export function ModalWrapper({
  children,
  productTitle,
  vendorName,
  rating,
  productItems,
}: ModalWrapperProps) {
  return (
    <ModalItem
      productTitle={productTitle}
      vendorName={vendorName}
      rating={rating}
      productItems={productItems}
      trigger={children}
    />
  );
}