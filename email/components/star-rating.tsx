import { Text } from "react-email";

type StarRatingProps = {
  value?: number;
};

export function StarRating({ value = 5 }: StarRatingProps) {
  return (
    <Text
      style={{
        margin: 0,
        fontSize: 14,
        lineHeight: "20px",
        color: "#f59e0b",
        letterSpacing: "0.08em",
      }}
    >
      {"★".repeat(Math.max(0, Math.min(5, value)))}
      {"☆".repeat(Math.max(0, 5 - value))}
    </Text>
  );
}
