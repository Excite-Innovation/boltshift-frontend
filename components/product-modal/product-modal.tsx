"use client"

import { useState } from "react";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { StartRating } from "@/components/rating/rating";
import { ProductImageCarousel } from "@/components/product-modal/thumbnail-carousel";
import { Star, Play } from "lucide-react";

type ModalProp = {
    productTitle: string;
    vendorName: string;
    rating: number;
    productItems: string[];
    trigger: React.ReactNode;
};

export function ModalItem({
    productTitle,
    vendorName,
    rating,
    productItems,
    trigger
}: ModalProp) {
    const [selectedImage, setSelectedImage] = useState(productItems[0]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent className="w-fit! max-w-none! p-0 overflow-hidden rounded-2xl">
                <DialogHeader className="p-4 border-b flex justify-between">
                    <div className="flex gap-4">
                        {/* Start Item */}
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border bg-muted">
                            <Star className="h-5 w-5 fill-orange-500 text-orange-500" />
                        </div>

                        <div className="flex flex-col items-start">
                            <DialogTitle className="text-lg font-semibold line-clamp-1">
                                {productTitle}
                            </DialogTitle>

                            <div className="flex gap-1 justify-center items-center">
                                <DialogDescription className="text-xs font-medium text-center">
                                    {vendorName}
                                </DialogDescription>

                                <p>:</p>

                                <StartRating value={rating} readonly />
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                {/* Focused image and slider */}
                <ProductImageCarousel
                    images={productItems}
                    productTitle={productTitle}
                />
            </DialogContent>
        </Dialog>
    );
}