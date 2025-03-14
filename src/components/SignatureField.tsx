
import React, { useRef, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { FormLabel } from '@/components/ui/form';
import { Eraser, Pen } from "lucide-react";

interface SignatureFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function SignatureField({ value, onChange }: SignatureFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  // Initialize canvas context on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    setCtx(context);
    
    // Set canvas size to match container
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // If value exists, load it
    if (value) {
      const img = new Image();
      img.onload = () => {
        context?.drawImage(img, 0, 0);
      };
      img.src = value;
    }
    
    // Set up drawing styles
    if (context) {
      context.lineWidth = 2;
      context.lineCap = 'round';
      context.strokeStyle = '#000';
    }
  }, []);

  // Handle drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    
    // Get correct position
    const canvas = canvasRef.current;
    if (!canvas || !ctx) return;
    
    let x, y;
    if ('touches' in e) {
      const rect = canvas.getBoundingClientRect();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.nativeEvent.offsetX;
      y = e.nativeEvent.offsetY;
    }
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx || !canvasRef.current) return;
    
    let x, y;
    const canvas = canvasRef.current;
    
    if ('touches' in e) {
      e.preventDefault(); // Prevent scrolling on touch devices
      const rect = canvas.getBoundingClientRect();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.nativeEvent.offsetX;
      y = e.nativeEvent.offsetY;
    }
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  
  const endDrawing = () => {
    if (isDrawing && ctx) {
      ctx.closePath();
      setIsDrawing(false);
      
      // Save signature as data URL
      const canvas = canvasRef.current;
      if (canvas) {
        const dataUrl = canvas.toDataURL('image/png');
        onChange(dataUrl);
      }
    }
  };
  
  const clearSignature = () => {
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      onChange('');
    }
  };

  return (
    <div className="space-y-2">
      <FormLabel>Your Signature</FormLabel>
      <div className="border border-gray-300 rounded-md p-2 bg-white">
        <canvas
          ref={canvasRef}
          className="w-full h-32 cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={endDrawing}
        />
      </div>
      <div className="flex gap-2">
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={clearSignature}
        >
          <Eraser className="mr-1 h-4 w-4" />
          Clear
        </Button>
        <span className="text-xs text-gray-500 flex items-center">
          <Pen className="mr-1 h-3 w-3" />
          Sign using your mouse or touch screen
        </span>
      </div>
    </div>
  );
}
