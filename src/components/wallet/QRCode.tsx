'use client';

interface QRCodeProps {
  value?: string;
  size?: number;
  label?: string;
}

export default function QRCode({ value = '0x7a3F...9C2d', size = 200, label }: QRCodeProps) {
  // Generate a deterministic QR-like pattern from the value string
  const cells = 21;
  const cellSize = size / cells;

  const generatePattern = (val: string) => {
    const pattern: boolean[][] = [];
    let seed = 0;
    for (let i = 0; i < val.length; i++) {
      seed += val.charCodeAt(i);
    }

    for (let row = 0; row < cells; row++) {
      pattern[row] = [];
      for (let col = 0; col < cells; col++) {
        // Finder patterns (top-left, top-right, bottom-left)
        const isFinderTL = row < 7 && col < 7;
        const isFinderTR = row < 7 && col >= cells - 7;
        const isFinderBL = row >= cells - 7 && col < 7;

        if (isFinderTL || isFinderTR || isFinderBL) {
          const localR = isFinderTL ? row : isFinderTR ? row : row - (cells - 7);
          const localC = isFinderTL ? col : isFinderTR ? col - (cells - 7) : col;
          // Outer border or center
          const isEdge = localR === 0 || localR === 6 || localC === 0 || localC === 6;
          const isCenter = localR >= 2 && localR <= 4 && localC >= 2 && localC <= 4;
          const isInner = localR === 1 || localR === 5 || localC === 1 || localC === 5;
          pattern[row][col] = (isEdge || isCenter) && !isInner;
        } else {
          // Pseudorandom data cells
          const hash = ((row * 31 + col * 17 + seed) * 2654435761) >>> 0;
          pattern[row][col] = (hash % 3) !== 0;
        }
      }
    }
    return pattern;
  };

  const pattern = generatePattern(value);

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="bg-white rounded-2xl p-4 shadow-lg"
        style={{ width: size + 32, height: size + 32 }}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {pattern.map((row, rowIndex) =>
            row.map((cell, colIndex) =>
              cell ? (
                <rect
                  key={`${rowIndex}-${colIndex}`}
                  x={colIndex * cellSize}
                  y={rowIndex * cellSize}
                  width={cellSize}
                  height={cellSize}
                  rx={cellSize * 0.15}
                  fill="#1E1B4B"
                />
              ) : null
            )
          )}
        </svg>
      </div>
      {label && <p className="text-sm text-slate-400 font-medium">{label}</p>}
    </div>
  );
}
