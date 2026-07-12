"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Database,
  FileSpreadsheet,
  BrainCircuit,
  Search,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const stages = [
  {
    number: "01",
    label: "Connect",
    title: "Ingest Data",
    description:
      "Bring scattered business information into one connected intelligence layer.",
    sources: ["CRM", "Finance", "Documents", "Product"],
    statLabel: "Sources connected",
    statValue: "14",
  },
  {
    number: "02",
    label: "Understand",
    title: "Analyze with AI",
    description:
      "Detect patterns, relationships, risks, and opportunities across thousands of signals.",
    sources: ["Clustering", "Anomalies", "Forecasting", "Context"],
    statLabel: "Signals analyzed",
    statValue: "24.8K",
  },
  {
    number: "03",
    label: "Act",
    title: "Generate Insight",
    description:
      "Convert complex analysis into a clear recommendation with measurable business impact.",
    sources: ["Opportunity", "Evidence", "Confidence", "Action"],
    statLabel: "Insight confidence",
    statValue: "94%",
  },
];

export default function InsightFlow() {
  const sectionRef = useRef(null);
  const progressRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const stageElements = gsap.utils.toArray(".flowStage");

      stageElements.forEach((element, index) => {
        ScrollTrigger.create({
          trigger: element,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => setActiveStage(index),
          onEnterBack: () => setActiveStage(index),
        });
      });

      gsap.fromTo(
        progressRef.current,
        {
          scaleY: 0,
          transformOrigin: "top center",
        },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
            end: "bottom 55%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => context.revert();
  }, []);

  const currentStage = stages[activeStage];

  return (
    <section id="flow" className="insightFlowSection" ref={sectionRef}>
      <div className="flowHeading">
        

        <h2>
          Complexity enters.
          <br />
          Clarity comes out.
        </h2>

        <p>
          Xai progressively transforms disconnected information into
          intelligence that teams can understand and act on.
        </p>
      </div>

      <div className="flowExperience">
        <div className="flowVisualColumn">
          <div className="flowVisualSticky">
            <div className="flowVisualHeader">
              <div>
                <span>Transformation engine</span>
                <strong>{currentStage.label}</strong>
              </div>

              <span className="flowStageCounter">
                {currentStage.number} / 03
              </span>
            </div>

            <div className="flowCanvas">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  className="flowAnimation"
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.04, y: -20 }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {activeStage === 0 && <IngestVisual />}

                  {activeStage === 1 && <AnalyzeVisual />}

                  {activeStage === 2 && <InsightVisual />}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flowResult">
              <div>
                <span>{currentStage.statLabel}</span>
                <strong>{currentStage.statValue}</strong>
              </div>

              <div className="flowTags">
                {currentStage.sources.map((source) => (
                  <span key={source}>{source}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flowStagesColumn">
          <div className="flowProgressTrack">
            <span ref={progressRef} />
          </div>

          {stages.map((stage, index) => (
            <article
              className={`flowStage ${
                activeStage === index ? "flowStageActive" : ""
              }`}
              key={stage.number}
            >
              <span className="flowStageNumber">{stage.number}</span>

              <div>
                <span className="flowStageLabel">{stage.label}</span>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>

                <div className="flowStageTags">
                  {stage.sources.map((source) => (
                    <span key={source}>{source}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function IngestVisual() {
  return (
    <div className="ingestVisual">
      <motion.div
        className="sourceNode sourceNodeOne"
        animate={{ x: [0, 8, 0], y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Database size={20} />
        <span>CRM</span>
      </motion.div>

      <motion.div
        className="sourceNode sourceNodeTwo"
        animate={{ x: [0, -7, 0], y: [0, 7, 0] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      >
        <FileSpreadsheet size={20} />
        <span>Finance</span>
      </motion.div>

      <motion.div
        className="sourceNode sourceNodeThree"
        animate={{ x: [0, 6, 0], y: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Search size={20} />
        <span>Research</span>
      </motion.div>

      <div className="visualConnector connectorOne" />
      <div className="visualConnector connectorTwo" />
      <div className="visualConnector connectorThree" />

      <motion.div
        className="flowCore"
        animate={{ scale: [1, 1.07, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <span>X</span>
        <small>Ingest</small>
      </motion.div>
    </div>
  );
}

function AnalyzeVisual() {
  const nodes = Array.from({ length: 12 });

  return (
    <div className="analyzeVisual">
      <div className="analysisRing analysisRingOne" />
      <div className="analysisRing analysisRingTwo" />
      <div className="analysisRing analysisRingThree" />

      {nodes.map((_, index) => (
        <motion.span
          className={`analysisPoint analysisPoint${index + 1}`}
          key={index}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.35, 1, 0.35],
          }}
          transition={{
            duration: 2,
            delay: index * 0.12,
            repeat: Infinity,
          }}
        />
      ))}

      <motion.div
        className="flowCore analyzeCore"
        animate={{ rotate: 360 }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <BrainCircuit size={28} />
        <small>Analyze</small>
      </motion.div>
    </div>
  );
}

function InsightVisual() {
  return (
    <div className="insightResultVisual">
      <motion.div
        className="insightPulse"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.55 }}
      >
        <Sparkles size={26} />
      </motion.div>

      <motion.div
        className="generatedInsightCard"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.55 }}
      >
        <div className="insightCardTop">
          <span>High-impact opportunity</span>
          <span>94% confidence</span>
        </div>

        <h4>Expansion revenue is likely to increase by 18.4%</h4>

        <p>
          Seven high-value accounts show increased product adoption and
          purchase intent.
        </p>

        <button type="button">
          View recommended action
          <ArrowUpRight size={16} />
        </button>
      </motion.div>
    </div>
  );
}