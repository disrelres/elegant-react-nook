
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";

type DiceType = {
  name: string;
  sides: number;
};

const DICE: DiceType[] = [
  { name: "d2", sides: 2 },
  { name: "d4", sides: 4 },
  { name: "d6", sides: 6 },
  { name: "d8", sides: 8 },
  { name: "d10", sides: 10 },
  { name: "d12", sides: 12 },
  { name: "d20", sides: 20 },
  { name: "d30", sides: 30 },
];

const DiceRoller = () => {
  const [currentDiceIndex, setCurrentDiceIndex] = useState(0);
  const [rollResult, setRollResult] = useState<number | null>(null);
  const [diceColor, setDiceColor] = useState<string>("black");
  const [textColor, setTextColor] = useState<string>("white");
  const [useWanderingBubbles, setUseWanderingBubbles] = useState(false);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize speech synthesis
    speechSynthesisRef.current = window.speechSynthesis;
    
    // Speak the current dice name when it changes
    speakText(DICE[currentDiceIndex].name);
    
    return () => {
      // Cancel any ongoing speech when component unmounts
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
      }
    };
  }, [currentDiceIndex]);

  const speakText = (text: string) => {
    if (speechSynthesisRef.current) {
      // Cancel any ongoing speech
      speechSynthesisRef.current.cancel();
      
      // Create a new utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      
      // Speak the text
      speechSynthesisRef.current.speak(utterance);
    }
  };

  const rollDice = () => {
    const currentDice = DICE[currentDiceIndex];
    const result = Math.floor(Math.random() * currentDice.sides) + 1;
    setRollResult(result);
    speakText(result.toString());
  };

  const handleNext = () => {
    setCurrentDiceIndex((prev) => (prev === DICE.length - 1 ? 0 : prev + 1));
    setRollResult(null);
  };

  const handlePrevious = () => {
    setCurrentDiceIndex((prev) => (prev === 0 ? DICE.length - 1 : prev - 1));
    setRollResult(null);
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-8 dark:bg-gray-900">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-green-600 dark:text-green-400 font-['Verdana'] text-center">
          Dice Roller
        </h1>
        
        <div className="relative flex items-center justify-center mb-8">
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute left-0 z-10"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDiceIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Card 
                className="p-8 relative overflow-hidden" 
                style={{
                  backgroundColor: useWanderingBubbles ? 'transparent' : diceColor,
                  color: textColor,
                  height: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                {useWanderingBubbles && (
                  <div className="absolute inset-0 overflow-hidden">
                    <WanderingBubbles />
                  </div>
                )}
                
                <div className="z-10 text-center">
                  <h2 className="text-2xl font-bold mb-4 font-['Verdana']">
                    {DICE[currentDiceIndex].name.toUpperCase()}
                  </h2>
                  
                  {rollResult !== null ? (
                    <div className="text-7xl font-bold animate-bounce font-['Verdana']">
                      {rollResult}
                    </div>
                  ) : (
                    <div className="text-7xl font-bold text-gray-400 opacity-25 font-['Verdana']">
                      ?
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute right-0 z-10"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex justify-center mb-8">
          <Button 
            onClick={rollDice}
            size="lg" 
            className="px-8 py-6 text-xl font-['Verdana'] bg-[#044bab] hover:bg-[#033a8a]"
          >
            Roll {DICE[currentDiceIndex].name}
          </Button>
        </div>
        
        <div className="flex justify-between mb-4">
          <Button 
            variant="outline" 
            asChild
          >
            <Link to="/">Back to Home</Link>
          </Button>
          
          <Button 
            variant="outline" 
            asChild
          >
            <Link to="/dice-settings">Customize</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

// Wandering Bubbles Component
const WanderingBubbles = () => {
  useEffect(() => {
    const canvas = document.getElementById('bubbleCanvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Bubble class
    class Bubble {
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
      
      constructor(x: number, y: number, radius: number, color: string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );
        
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      update(width: number, height: number, bubbles: Bubble[]) {
        // Move
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off walls
        if (this.x - this.radius < 0 || this.x + this.radius > width) {
          this.vx = -this.vx;
        }
        
        if (this.y - this.radius < 0 || this.y + this.radius > height) {
          this.vy = -this.vy;
        }
        
        // Interact with other bubbles
        bubbles.forEach(bubble => {
          if (bubble === this) return;
          
          const dx = bubble.x - this.x;
          const dy = bubble.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < this.radius + bubble.radius) {
            // Simple collision response
            this.vx = -this.vx;
            this.vy = -this.vy;
          }
        });
      }
    }
    
    // Create bubbles
    const bubbles: Bubble[] = [];
    const colors = ['rgba(139, 92, 246, 0.5)', 'rgba(249, 115, 22, 0.5)', 'rgba(34, 197, 94, 0.5)'];
    
    for (let i = 0; i < 15; i++) {
      const radius = Math.random() * 40 + 20;
      const x = Math.random() * (canvas.width - radius * 2) + radius;
      const y = Math.random() * (canvas.height - radius * 2) + radius;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      bubbles.push(new Bubble(x, y, radius, color));
    }
    
    // Animation loop
    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw bubbles
      bubbles.forEach(bubble => {
        bubble.update(canvas.width, canvas.height, bubbles);
        bubble.draw(ctx);
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      id="bubbleCanvas" 
      className="absolute inset-0 w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
};

export default DiceRoller;
