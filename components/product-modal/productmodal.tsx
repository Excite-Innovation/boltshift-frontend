import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { StartRating } from "@/components/rating/rating";
import { Star } from "lucide-react";

type ModalProp = {
    productTitle: string;
    vendorName: string;
    rating: number;
    productItems: string[];
}

export function ModalItem({ productTitle, vendorName, rating, productItems }: ModalProp) {
    return (
        <Dialog>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
                <DialogHeader className="p-4 border-b flex justify-between">
                    <div className="flex gap-4">
                        {/* Start Item */}
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border bg-muted">
                            <Star className="h-5 w-5 fill-orange-500 text-orange-500" />
                        </div>
                        <div className="flex flex-col">
                            <DialogTitle className="text-lg font-semibold line-clamp-1">{productTitle}</DialogTitle>
                            <div className="flex gap-1">
                                <DialogDescription className="text-xs font-medium">{vendorName}</DialogDescription>
                                <p>:</p>
                                <StartRating value={rating} readonly />
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                {/* Focused image and slider */}
                <div className="px-4 pb-4 flex flex-col gap-4">
                    <div className="border-spacing-0.5 rounded-xl"></div>
                    <div className="flex gap-4 overflow-x-auto"></div>
                </div>
            </DialogContent>
        </Dialog>
    )
}