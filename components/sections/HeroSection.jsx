"use client";

import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const nodes = [
  { className: "nodeOne", delay: 0 },
  { className: "nodeTwo", delay: 0.4 },
  { className: "nodeThree", delay: 0.8 },
  { className: "nodeFour", delay: 1.2 },
  { className: "nodeFive", delay: 1.6 },
];

export default function HeroSection() {
  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);

  const rotateX = useSpring(rotateXValue, {
    stiffness: 150,
    damping: 22,
  });

  const rotateY = useSpring(rotateYValue, {
    stiffness: 150,
    damping: 22,
  });

  function handlePointerMove(event) {
    const bounds = event.currentTarget.getBoundingClientRect();

    const pointerX =
      (event.clientX - bounds.left) / bounds.width - 0.5;

    const pointerY =
      (event.clientY - bounds.top) / bounds.height - 0.5;

    rotateYValue.set(pointerX * 8);
    rotateXValue.set(pointerY * -8);
  }

  function resetRotation() {
    rotateXValue.set(0);
    rotateYValue.set(0);
  }

  return (
    <section id="hero" className="heroSection">
      <div className="backgroundGrid" />

      <motion.div
        className="heroContent"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="eyebrow" variants={itemVariants}>
          <span className="statusDot" />
          Intelligence Workspace
        </motion.div>

        <motion.h1 variants={itemVariants}>
          Turn fragmented data into
          <span> operational intelligence.</span>
        </motion.h1>

        <motion.p variants={itemVariants}>
          Xai connects business signals, discovers meaningful
          patterns, and transforms insight into coordinated action.
        </motion.p>

        <motion.div
          className="heroActions"
          variants={itemVariants}
        >
          <a href="#flow" className="primaryButton">
            See how it works
            <span aria-hidden="true">↘</span>
          </a>

          <a href="#workspace" className="secondaryButton">
            View product
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="heroVisual"
        initial={{
          opacity: 0,
          x: 45,
          scale: 0.96,
        }}

       
        animate={{
          opacity: 1,
          x: 0,
          scale: 1,
          y: [0, -8, 0],
        }}
        transition={{
          duration: 1,
          delay: 0.3,
          ease: [0.22, 1, 0.36, 1],
          y: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetRotation}
        aria-label="Interactive intelligence network"
      >
        <motion.div
          className="visualGlow"
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.65, 1, 0.65],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="visualPanel"
          style={{
            rotateX,
            rotateY,
          }}
        >
          <div className="panelHeader">
            <div>
              <span className="panelLabel">
                Live intelligence
              </span>

              <strong>Signal network</strong>
            </div>

            <span className="liveBadge">Active</span>
          </div>

          <div className="networkArea">
            <motion.div
              className="orbit orbitOne"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <span className="orbitDot" />
            </motion.div>

            <motion.div
              className="orbit orbitTwo"
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <span className="orbitDot" />
            </motion.div>

            <motion.div
              className="orbit orbitThree"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <span className="orbitDot" />
            </motion.div>

            {nodes.map((node) => (
              <motion.div
                key={node.className}
                className={`dataNode ${node.className}`}
                animate={{
                  scale: [1, 1.45, 1],
                  opacity: [0.65, 1, 0.65],
                }}
                transition={{
                  duration: 2.4,
                  delay: node.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

            <motion.div
              className="intelligenceCore"
              animate={{
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span>XAI</span>
              <small>Processing</small>
            </motion.div>
          </div>

          <div className="signalStats">
            <div>
              <span>Connected sources</span>
              <strong>14</strong>
            </div>

            <div>
              <span>Signals analyzed</span>
              <strong>24.8K</strong>
            </div>

            <div>
              <span>Confidence</span>
              <strong>94%</strong>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}