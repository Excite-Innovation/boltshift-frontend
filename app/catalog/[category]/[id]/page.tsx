export default function ProductDetails({
  params,
}: {
  params: { category: string; id: string };
}) {
  return (
    <div>
      Product: {params.id} <br />
      Category: {params.category}
    </div>
  );
}