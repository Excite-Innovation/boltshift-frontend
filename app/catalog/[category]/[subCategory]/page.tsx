export default function SubCategoryPage({
  params,
}: {
  params: { category: string; subCategory: string };
}) {
  const { category, subCategory } = params;

  return <div>{subCategory}</div>;
}
