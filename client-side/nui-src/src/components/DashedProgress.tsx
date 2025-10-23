interface ProgressProps {
  height: number;
  width: number;
  color: string;
  value: number;
}

export const DashedProgress = ({
  height,
  width,
  color,
  value,
}: ProgressProps) => {
  const length = 10;
  return (
    <div
      style={{ maxWidth: `${width}px`, height: `${height}px` }}
      className="flex gap-[3px]"
    >
      {Array.from({ length: length }).map((_, index) => {
        return (
          <div key={index} className="w-full h-full rounded-full bg-white/5">
            <div
              className="w-full h-full"
              style={{
                background: color,
                width: `${
                  value > index * (100 / length)
                    ? value < (index + 1) * (100 / length)
                      ? (value - index * (100 / length)) * length
                      : 100
                    : 0
                }%`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
