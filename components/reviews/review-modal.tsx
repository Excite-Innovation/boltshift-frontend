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
            <DialogTrigger className="py-0 h-fit justify-end">{trigger}</DialogTrigger>
            <form>
                <DialogContent className="max-w-140 max-h-201 px-8 overflow-hidden rounded-2xl">
                    <DialogHeader className="py-6 flex flex-row gap-4">
                        < PenLine width={40} height={40}/>
                        <div className="flex flex-col">
                            <DialogTitle>Share a Review</DialogTitle>
                            <DialogDescription>Mandatory field*</DialogDescription>
                        </div>
                    </DialogHeader>

                    <FieldSet>
                        <FieldGroup className="py-6 flex flex-col gap-8 overflow-y-auto">
                            {/* Title */}
                            <Field>
                                <FieldLabel htmlFor="review-title">Review Title*</FieldLabel>
                                <Input id="review-title" type="text" placeholder="Title" />
                            </Field>
                            {/* Description */}
                            <Field>
                                <FieldLabel htmlFor="description">Review (690 Characters max)<span className="text-primary">*</span></FieldLabel>
                                <Textarea id="description" placeholder="Your review helps vendors improve..." rows={4} />
                            </Field>
                            {/* Rating */}
                            <Field>
                                <FieldLabel htmlFor="star-rating">Rating*</FieldLabel>
                                <StartRating id="star-rating" value={2} />
                            </Field>
                            {/* Media upload */}
                            <Field>
                                <FieldLabel htmlFor="media-upload">Product Media (Max 5 Files)</FieldLabel>

                            </Field>
                        </FieldGroup>
                    </FieldSet>
                    <DialogFooter className="w-full py-6 grow">
                        <Button type="submit" >Submit Review</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}