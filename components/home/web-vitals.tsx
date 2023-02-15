import { motion } from "framer-motion";
import CountingNumbers from "@/components/shared/counting-numbers";
import { WebVitalsProps } from "@/types/WebVitals";

export default function WebVitals({
  width = 140,
  height = 140,
  value,
  animationDuration = 2500,
}: WebVitalsProps) {
  return (
    <div className="relative h-full w-full">
      <motion.svg
        className="absolute inset-0 m-auto"
        viewBox="0 0 100 100"
        width={width}
        height={height}
      >
        <motion.circle
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 2, ease: "easeOut" }}
          strokeWidth={7}
          strokeDasharray="0 1"
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          cx="50"
          cy="50"
          r="45"
          fill="#f5e9f7"
          stroke="#9C27B0"
        />
      </motion.svg>
      <CountingNumbers
        value={value}
        duration={animationDuration}
        className="absolute inset-0 mx-auto flex items-center justify-center font-display text-5xl text-[#9C27B0]"
      />
    </div>
  );
}
