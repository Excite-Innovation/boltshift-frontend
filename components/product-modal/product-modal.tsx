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
import { Star } from "lucide-react";

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
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent className="w-[calc(100vw-2rem)] max-w-3xl max-h-[calc(100dvh-2rem)] p-0 overflow-hidden rounded-2xl sm:max-w-3xl">
                <DialogHeader className="p-4 border-b flex justify-between">
                    <div className="min-w-0 flex gap-4">
                        {/* Start Item */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-muted">
                            <Star className="h-5 w-5 fill-orange-500 text-orange-500" />
                        </div>

                        <div className="min-w-0 flex flex-col items-start">
                            <DialogTitle className="text-lg text-start font-semibold line-clamp-1">
                                {productTitle}
                            </DialogTitle>

                            <div className="min-w-0 flex gap-1 justify-center items-center">
                                <DialogDescription className="truncate text-xs font-medium text-center">
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
