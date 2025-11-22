import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ChartSkeletonProps {
  title?: string;
  height?: number;
}

const ChartSkeleton = ({ title, height = 350 }: ChartSkeletonProps) => {
  return (
    <Card className="p-6 animate-fade-in">
      {title && (
        <div className="flex items-center gap-3 mb-4">
          <div className="w-5 h-5 rounded bg-muted/60 animate-pulse" />
          <div className="h-6 w-48 rounded bg-muted/60 animate-pulse" />
        </div>
      )}

      {/* SVG mock bar chart to resemble the provided design */}
      <div style={{ height }} className="w-full">
        <svg viewBox="0 0 700 300" preserveAspectRatio="xMidYMid meet" className="w-full h-full">
          <defs>
            <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ecfdf5" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>

          {/* background grid - subtle */}
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={0} y={i * 60} width="700" height={1} fill="rgba(0,0,0,0.03)" />
          ))}

          {/* Bars */}
          {([60, 80, 45, 90, 70, 55, 85] as number[]).map((val, i) => {
            const barWidth = 70;
            const gap = 20;
            const x = 40 + i * (barWidth + gap);
            const maxH = 180; // px
            const h = (val / 100) * maxH;
            const y = 200 - h;
            return (
              <g key={i}>
                <rect x={x} y={y} rx={8} ry={8} width={barWidth} height={h} fill="#ecfdf5" />
                <rect x={x} y={y} rx={8} ry={8} width={barWidth} height={h} fill="#065f46" opacity={0.08} />
              </g>
            );
          })}

          {/* Labels as small rounded pills (like in screenshot) */}
          {(["", "", "", "", "", "", ""] as string[]).map((_, i) => {
            const barWidth = 70;
            const gap = 20;
            const x = 40 + i * (barWidth + gap) + barWidth / 2 - 22;
            return (
              <rect key={i} x={x} y={220} rx={10} ry={10} width={44} height={12} fill="#f1f5f4" />
            );
          })}
        </svg>
      </div>
    </Card>
  );
};

export default ChartSkeleton;
