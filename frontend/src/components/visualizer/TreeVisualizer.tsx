import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { ExecutionStep } from "../../types/execution";

interface TreeVisualizerProps {
  step: ExecutionStep;
}

interface TreeNode {
  id: number;
  label: string;
  children?: TreeNode[];
}

function buildTree(nodeCount: number): TreeNode {
  function build(i: number): TreeNode {
    const node: TreeNode = { id: i, label: `N${i}` };
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    const children: TreeNode[] = [];
    if (left < nodeCount) children.push(build(left));
    if (right < nodeCount) children.push(build(right));
    if (children.length) node.children = children;
    return node;
  }
  return build(0);
}

function nodeColor(id: number, step: ExecutionStep): string {
  if (step.comparing && step.comparing[0] === id) return "#fcd34d"; // amber — current
  if (step.sorted.includes(id)) return "#34d399";                   // green — visited
  return "#67e8f9";                                                  // cyan — unvisited
}

export function TreeVisualizer({ step }: TreeVisualizerProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    const W = el.clientWidth || 560;
    const H = 260;
    const margin = { top: 24, right: 16, bottom: 16, left: 16 };

    const svg = d3.select(el);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${W} ${H}`);

    const root = d3.hierarchy(buildTree(step.array.length));
    const treeLayout = d3.tree<TreeNode>()
      .size([W - margin.left - margin.right, H - margin.top - margin.bottom]);
    treeLayout(root);

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    // Links
    g.selectAll("line.link")
      .data(root.links())
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("x1", (d) => d.source.x!)
      .attr("y1", (d) => d.source.y!)
      .attr("x2", (d) => d.target.x!)
      .attr("y2", (d) => d.target.y!)
      .attr("stroke", "#cbd5e1")
      .attr("stroke-width", 2);

    // Nodes
    const node = g.selectAll("g.node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    node.append("circle")
      .attr("r", 18)
      .attr("fill", (d) => nodeColor(d.data.id, step))
      .attr("stroke", "#94a3b8")
      .attr("stroke-width", 1.5)
      .style("transition", "fill 0.25s ease");

    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("font-size", "11px")
      .attr("font-weight", "600")
      .attr("fill", "#0f172a")
      .text((d) => d.data.label);
  }, [step]);

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5">
      <svg ref={svgRef} width="100%" height="260" style={{ display: "block" }} />
    </div>
  );
}
