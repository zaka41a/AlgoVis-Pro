import { ExecutionStep } from "../../types/execution";

interface ArrayBarsProps {
  step: ExecutionStep;
}

function barClass(index: number, step: ExecutionStep): string {
  if (step.swapping && (step.swapping[0] === index || step.swapping[1] === index)) {
    return "bg-rose-400";
  }
  if (step.comparing && (step.comparing[0] === index || step.comparing[1] === index)) {
    return "bg-amber-300";
  }
  if (step.sorted.includes(index)) {
    return "bg-emerald-400";
  }
  return "bg-cyan-400";
}

export function ArrayBars({ step }: ArrayBarsProps) {
  if (step.mode === "cells") {
    return (
      <div className="glass-panel rounded-2xl p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-2 rounded-xl border border-[var(--line)] bg-slate-50 p-3 sm:grid-cols-6">
          {step.array.map((value, index) => {
            const isSwapping = step.swapping && (step.swapping[0] === index || step.swapping[1] === index);
            const isComparing = step.comparing && (step.comparing[0] === index || step.comparing[1] === index);
            const isSorted = step.sorted.includes(index);
            const cellClass = isSwapping
              ? "bg-rose-400"
              : isComparing
                ? "bg-amber-300"
                : isSorted
                  ? "bg-emerald-400"
                  : "bg-cyan-500/60";

            return (
              <div
                key={`${index}-${value}-${step.labels?.[index] ?? ""}`}
                className={`rounded-lg border border-slate-200 px-2 py-3 text-center text-sm font-semibold text-slate-900 transition-colors ${cellClass}`}
              >
                {step.labels?.[index] ?? String(value)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const max = Math.max(...step.array, 1);

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5">
      <div className="flex h-56 items-end gap-2 rounded-xl border border-[var(--line)] bg-slate-50 p-3">
        {step.array.map((value, index) => {
          const height = `${Math.max((value / max) * 100, 8)}%`;
          return (
            <div key={`${index}-${value}`} className="flex flex-1 flex-col items-center justify-end gap-1">
              <span className="text-xs text-[var(--text-soft)]">{value}</span>
              <div
                className={`w-full rounded-t-md transition-all duration-300 ${barClass(index, step)}`}
                style={{ height }}
                aria-label={`value-${value}`}
              />
              <span className="text-[10px] text-[var(--text-muted)]">{index}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
