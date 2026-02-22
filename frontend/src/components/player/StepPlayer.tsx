import { useEffect, useMemo, useState } from "react";
import { AlgorithmRun } from "../../types/execution";
import { ArrayBars } from "../visualizer/ArrayBars";

interface StepPlayerProps {
  run: AlgorithmRun;
}

const speedOptions = [0.5, 1, 1.5, 2];

export function StepPlayer({ run }: StepPlayerProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const step = run.steps[stepIndex];

  useEffect(() => {
    if (!playing) return;
    const delay = 900 / speed;
    const timer = window.setTimeout(() => {
      setStepIndex((prev) => {
        if (prev >= run.steps.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, delay);

    return () => window.clearTimeout(timer);
  }, [playing, speed, stepIndex, run.steps.length]);

  const activePseudo = useMemo(() => {
    const idx = Math.max(step.line - 1, 0);
    return idx;
  }, [step.line]);

  return (
    <section className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div>
        <ArrayBars step={step} />

        <div className="mt-4 grid gap-3 rounded-2xl border border-[var(--line)] bg-white p-4 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">State</p>
            <p className="mt-1 text-sm text-[var(--text-soft)]">
              Step {stepIndex + 1} / {run.steps.length}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">Complexity</p>
            <p className="mt-1 text-sm text-[var(--text-soft)]">
              Best {run.complexity.best} | Avg {run.complexity.average} | Worst {run.complexity.worst}
            </p>
          </div>

          <div className="sm:col-span-2 flex flex-wrap items-center gap-2 pt-1">
            <button className="btn-ghost" type="button" onClick={() => setStepIndex(0)}>
              Reset
            </button>
            <button
              className="btn-ghost"
              type="button"
              onClick={() => setStepIndex((s) => Math.max(s - 1, 0))}
              disabled={stepIndex === 0}
            >
              Prev
            </button>
            <button className="btn-primary" type="button" onClick={() => setPlaying((p) => !p)}>
              {playing ? "Pause" : "Play"}
            </button>
            <button
              className="btn-ghost"
              type="button"
              onClick={() => setStepIndex((s) => Math.min(s + 1, run.steps.length - 1))}
              disabled={stepIndex === run.steps.length - 1}
            >
              Next
            </button>

            <div className="ml-auto flex items-center gap-2">
              <label className="text-xs text-[var(--text-muted)]" htmlFor="speed-select">
                Speed
              </label>
              <select
                id="speed-select"
                className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
              >
                {speedOptions.map((option) => (
                  <option key={option} value={option}>
                    x{option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="glass-panel rounded-2xl p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Explanation</p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-soft)]">{step.explanation}</p>
        </div>

        <div className="glass-panel rounded-2xl p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Pseudocode</p>
          <ol className="mt-3 space-y-2 text-sm">
            {run.pseudocode.map((line, index) => (
              <li
                key={`${line}-${index}`}
                className={`rounded px-2 py-1 ${index === activePseudo ? "bg-sky-100 text-sky-800" : "text-[var(--text-soft)]"}`}
              >
                {index + 1}. {line}
              </li>
            ))}
          </ol>
        </div>
      </aside>
    </section>
  );
}
