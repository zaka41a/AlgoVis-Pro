import { useCallback, useEffect, useMemo, useState } from "react";
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

  const goNext = useCallback(() => setStepIndex((s) => Math.min(s + 1, run.steps.length - 1)), [run.steps.length]);
  const goPrev = useCallback(() => setStepIndex((s) => Math.max(s - 1, 0)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;
      if (e.key === " ") { e.preventDefault(); setPlaying((p) => !p); }
      else if (e.key === "ArrowRight") { e.preventDefault(); goNext(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

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

  const activePseudo = useMemo(
    () => Math.min(step.line, run.pseudocode.length - 1),
    [step.line, run.pseudocode.length]
  );

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

          <div className="sm:col-span-2 space-y-3 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <button className="btn-ghost" type="button" onClick={() => setStepIndex(0)}>
                Reset
              </button>
              <button className="btn-ghost" type="button" onClick={goPrev} disabled={stepIndex === 0}>
                Prev
              </button>
              <button className="btn-primary" type="button" onClick={() => setPlaying((p) => !p)}>
                {playing ? "Pause" : "Play"}
              </button>
              <button className="btn-ghost" type="button" onClick={goNext} disabled={stepIndex === run.steps.length - 1}>
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

            <input
              type="range"
              className="step-slider"
              min={0}
              max={run.steps.length - 1}
              value={stepIndex}
              onChange={(e) => { setStepIndex(Number(e.target.value)); setPlaying(false); }}
            />

            <p className="text-center text-[10px] text-[var(--text-muted)]">
              Space · Play/Pause &nbsp;·&nbsp; ← → Navigate
            </p>
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
          <ol className="mt-3 space-y-1 text-sm font-mono">
            {run.pseudocode.map((line, index) => (
              <li
                key={`${line}-${index}`}
                className={`rounded py-1 transition-colors ${index === activePseudo ? "pseudo-active" : "pseudo-inactive"}`}
              >
                <span className="mr-2 text-[10px] text-[var(--text-muted)]">{String(index + 1).padStart(2, "0")}</span>
                {line}
              </li>
            ))}
          </ol>
        </div>
      </aside>
    </section>
  );
}
