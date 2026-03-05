import { ReactNode, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface AnimatedArticleLayoutProps {
  children: (onClose: () => void) => ReactNode;
  onClose: () => void;
}

export function AnimatedArticleLayout({ children, onClose }: AnimatedArticleLayoutProps) {
  // Check mobile state immediately on initialization
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  });
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Prevent body scroll when article is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to complete before actually navigating
    setTimeout(() => {
      onClose();
    }, 350); // Match animation duration
  };

  return (
    <>
      {/* Backdrop - excludes sidebar on desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isClosing ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed inset-0 md:left-[105px] bg-black/40 z-[59]"
      />

      {/* Article Container */}
      <motion.div
        initial={{
          x: isMobile ? 0 : "100%",
          y: isMobile ? "100%" : 0,
        }}
        animate={{
          x: isClosing ? (isMobile ? 0 : "100%") : 0,
          y: isClosing ? (isMobile ? "100%" : 0) : 0,
        }}
        transition={{
          duration: 0.35,
          ease: isClosing ? [0.4, 0, 0.6, 1] : [0.25, 0.1, 0.25, 1], // Different easing for entry vs exit
        }}
        className="fixed inset-y-0 right-0 left-0 md:left-[105px] z-[60] flex bg-white"
      >
        {children(handleClose)}
      </motion.div>
    </>
  );
}