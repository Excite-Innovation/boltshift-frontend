import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StartRating } from "@/components/rating/rating";
import { Button } from "@/components/ui/button";
import { PenLine } from 'lucide-react';

type ReviewProp = {
    trigger: React.ReactNode,
}

export function SubmitReview({ trigger }: ReviewProp) {
    return (
        <Dialog>
            <DialogTrigger className="py-0 justify-center" asChild>{trigger}</DialogTrigger>
            <form>
                <DialogContent className="max-w-140 max-h-201 px-8 py-0 overflow-hidden rounded-2xl gap-0">
                    <DialogHeader className="py-6 flex flex-row gap-4">
                        <div className="w-10 h10 flex justify-center items-center">
                            < PenLine width={20} height={20} />
                        </div>
                        <div className="flex flex-col">
                            <DialogTitle>Share a Review</DialogTitle>
                            <DialogDescription>Mandatory field*</DialogDescription>
                        </div>
                    </DialogHeader>

                    <FieldSet>
                        <FieldGroup className="max-h-172 py-6 flex flex-col gap-8 overflow-y-auto">
                            {/* Title */}
                            <Field>
                                <FieldLabel htmlFor="review-title" className="text-sm font-medium">Review Title*</FieldLabel>
                                <Input id="review-title" type="text" placeholder="Title" className="py-1 px-3 shadow-none focus-visible:ring-0 focus-visible:ring-transparent" />
                            </Field>
                            {/* Description */}
                            <Field>
                                <FieldLabel htmlFor="description" className="text-sm font-medium">Review (690 Characters max)<span className="text-primary">*</span></FieldLabel>
                                <Textarea id="description" placeholder="Your review helps vendors improve..." rows={4} className="py-2 px-3.5 shadow-none focus-visible:ring-0 focus-visible:ring-transparent" />
                            </Field>
                            {/* Rating */}
                            <Field>
                                <FieldLabel htmlFor="star-rating" className="text-sm font-medium">Rating*</FieldLabel>
                                <StartRating id="star-rating" value={2} />
                            </Field>
                            {/* Media upload */}
                            <Field>
                                <FieldLabel htmlFor="media-upload" className="text-sm font-medium">Product Media (Max 5 Files)</FieldLabel>

                            </Field>
                        </FieldGroup>
                    </FieldSet>
                    <DialogFooter className="w-full py-6 flex flex-col">
                        <Button type="submit" className="w-full">
                            Submit Review
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}