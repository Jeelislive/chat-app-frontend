import React from 'react';
import { Box, keyframes, styled, alpha } from '@mui/material';

// Keyframes for the animation
const animatedGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const particleAnimation = keyframes`
  0% { transform: translateY(0px) translateX(0px) scale(1); opacity: 1; }
  50% { transform: translateY(-20px) translateX(10px) scale(1.2); opacity: 0.7; }
  100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 1; }
`;

const AnimatedBackgroundContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh',
  zIndex: -1, // Ensure it's behind other content
  overflow: 'hidden',
  background: `linear-gradient(-45deg, ${theme.palette.background.default}, ${theme.palette.secondary.main}, ${theme.palette.primary.main}, ${theme.palette.background.paper})`,
  backgroundSize: '400% 400%',
  animation: `${animatedGradient} 15s ease infinite`,
}));

const Particle = styled(Box)(({ theme, size, top, left, delay, duration }) => ({
  position: 'absolute',
  width: size,
  height: size,
  backgroundColor: alpha(theme.palette.text.secondary, 0.2), // Light particles
  borderRadius: '50%',
  top: top,
  left: left,
  animation: `${particleAnimation} ${duration}s infinite ${delay}s ease-in-out alternate`,
  opacity: 0, // Start invisible, animation handles fade-in
  boxShadow: `0 0 10px ${alpha(theme.palette.text.secondary, 0.3)}, 0 0 20px ${alpha(theme.palette.text.secondary, 0.2)}`,
}));

const AnimatedLoginBackground = () => {
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: `${Math.random() * 3 + 2}px`, // Particle size between 2px and 5px
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5, // Random delay up to 5s
    duration: Math.random() * 10 + 10, // Random duration between 10s and 20s
  }));

  return (
    <AnimatedBackgroundContainer>
      {particles.map(p => (
        <Particle
          key={p.id}
          size={p.size}
          top={p.top}
          left={p.left}
          delay={p.delay}
          duration={p.duration}
        />
      ))}
    </AnimatedBackgroundContainer>
  );
};

export default AnimatedLoginBackground;