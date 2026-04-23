export default function ProductDetails({
  params,
}: {
  params: { category: string; subCategory: string; id: string };
}) {
  return (
    <div>
      Product: {params.id} <br />
      Category: {params.category}
      subCategory: {params.subCategory}
    </div>
  );
}