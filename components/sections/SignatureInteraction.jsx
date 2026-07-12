"use client";

import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CircleDollarSign,
  Radar,
  ShieldAlert,
  Workflow,
} from "lucide-react";
import { useState } from "react";
import ConstellationScene from "@/components/three/ConstellationScene";

const MODES = [
  {
    id: "raw",
    label: "Raw signals",
    shortLabel: "Raw",
    title: "Unstructured signals arrive without context.",
    description:
      "Events, transactions, customer activity, and operational records enter as disconnected points.",
    metric: "24.8K",
    metricLabel: "signals received",
  },
  {
    id: "structured",
    label: "Structured intelligence",
    shortLabel: "Structure",
    title: "Xai resolves relationships across every source.",
    description:
      "Signals reorganize into connected business domains so patterns become visible and explainable.",
    metric: "4",
    metricLabel: "intelligence domains",
  },
  {
    id: "revenue",
    label: "Revenue",
    shortLabel: "Revenue",
    title: "Revenue signals converge into an expansion opportunity.",
    description:
      "Product adoption, purchase intent, and account history combine into a qualified commercial action.",
    metric: "$184K",
    metricLabel: "estimated opportunity",
  },
  {
    id: "customer",
    label: "Customer",
    shortLabel: "Customer",
    title: "Customer behavior becomes a clear retention signal.",
    description:
      "Engagement, support, and sentiment patterns identify accounts that need focused intervention.",
    metric: "91%",
    metricLabel: "confidence",
  },
  {
    id: "operations",
    label: "Operations",
    shortLabel: "Operations",
    title: "Operational friction becomes measurable.",
    description:
      "Workflow delays and process anomalies group into a prioritized operational recommendation.",
    metric: "11d",
    metricLabel: "time recovered",
  },
  {
    id: "risk",
    label: "Risk",
    shortLabel: "Risk",
    title: "Distributed risk signals form one defensible view.",
    description:
      "Exposure, behavior, and anomalies combine to reveal what requires attention before impact grows.",
    metric: "$62K",
    metricLabel: "exposure monitored",
  },
];

const PIPELINE = [
  {
    label: "Signal",
    value: "Product adoption increased",
    icon: Radar,
  },
  {
    label: "Pattern",
    value: "Expansion intent detected",
    icon: BarChart3,
  },
  {
    label: "Insight",
    value: "Seven accounts qualified",
    icon: CircleDollarSign,
  },
  {
    label: "Action",
    value: "Outreach workflow prepared",
    icon: Workflow,
  },
];

export default function SignatureInteraction() {
  const [mode, setMode] = useState("raw");
  const reduceMotion = useReducedMotion();
  const selectedMode = MODES.find((item) => item.id === mode) ?? MODES[0];

  return (
    <section id="intelligence" className="signatureSection">
      <div className="signatureHeading">
        

        <h2>Watch intelligence reorganize itself.</h2>

        <p>
          Select a state to move from scattered signals into structured
          intelligence, then isolate the business domain that matters.
        </p>
      </div>

      <motion.div
        className="signatureExperience"
        initial={{ opacity: 0, y: 55 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{
          duration: 0.85,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="constellationPanel">
          <div className="constellationTopbar">
            <div>
              <span>Live intelligence map</span>
              <strong>Signal constellation</strong>
            </div>

            <div className="constellationLive">
              <span />
              Processing
            </div>
          </div>

          <div className="constellationCanvas">
            <Canvas
              dpr={[1, 1.5]}
              camera={{
                position: [0, 0, 8.3],
                fov: 48,
                near: 0.1,
                far: 100,
              }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
              }}
            >
              <ConstellationScene
                mode={mode}
                reduceMotion={Boolean(reduceMotion)}
              />
            </Canvas>

            <div className="constellationMetric">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedMode.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24 }}
                >
                  <strong>{selectedMode.metric}</strong>
                  <span>{selectedMode.metricLabel}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="constellationLegend" aria-hidden="true">
              <span>
                <i className="legendRevenue" />
                Revenue
              </span>
              <span>
                <i className="legendCustomer" />
                Customer
              </span>
              <span>
                <i className="legendOperations" />
                Operations
              </span>
              <span>
                <i className="legendRisk" />
                Risk
              </span>
            </div>
          </div>

          <div className="constellationControls" aria-label="Constellation views">
            {MODES.map((item) => (
              <button
                type="button"
                className={mode === item.id ? "constellationControlActive" : ""}
                onClick={() => setMode(item.id)}
                aria-pressed={mode === item.id}
                key={item.id}
              >
                {item.shortLabel}
              </button>
            ))}
          </div>
        </div>

        <aside className="signatureNarrative">
          <div className="signatureNarrativeTop">
            <span>Selected state</span>
            <strong>{selectedMode.label}</strong>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMode.id}
              className="signatureNarrativeContent"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.32 }}
            >
              <h3>{selectedMode.title}</h3>
              <p>{selectedMode.description}</p>
            </motion.div>
          </AnimatePresence>

          <div className="signaturePipeline">
            {PIPELINE.map((item, index) => {
              const Icon = item.icon;

              return (
                <div className="signaturePipelineRow" key={item.label}>
                  <div className="signaturePipelineIcon">
                    <Icon size={16} />
                  </div>

                  <div>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>

                  {index < PIPELINE.length - 1 && (
                    <ArrowRight size={14} aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="signatureDecisionCard">
            <div>
              <ShieldAlert size={17} />
              <span>Human review retained</span>
            </div>

            <p>
              Xai explains the evidence before an automation is approved or
              triggered.
            </p>
          </div>
        </aside>
      </motion.div>
    </section>
  );
}