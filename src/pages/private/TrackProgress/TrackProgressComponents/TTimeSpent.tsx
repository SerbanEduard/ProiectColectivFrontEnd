import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface TotalTimeSpentProps {
  onClose: () => void;
  time: number;
}

export default function TotalTimeSpent({ onClose, time }: TotalTimeSpentProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [displayTime, setDisplayTime] = useState(0);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useEffect(() => {
    const duration = 4000;
    const steps = 60;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      
      const progress = currentStep / steps;
      let easeValue;
      
      if (progress < 0.1) {
        easeValue = (progress / 0.1) * (progress / 0.1) * 0.01;
      } else if (progress > 0.9) {
        const endProgress = (progress - 0.9) / 0.1;
        easeValue = 0.99 + (1 - Math.pow(1 - endProgress, 3)) * 0.01;
      } else {
        const middleProgress = (progress - 0.1) / 0.8;
        const acceleratedMiddle = middleProgress * middleProgress;
        easeValue = 0.01 + acceleratedMiddle * 0.98;
      }
      
      const newValue = Math.floor(time * easeValue);
      setDisplayTime(newValue);

      if (currentStep >= steps) {
        setDisplayTime(time);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const all = document.querySelectorAll('.spotlight-card')

    const handleMouseMove = (ev: MouseEvent) => {
      all.forEach(e => {
        const blob = e.querySelector('.blob') as HTMLElement
        const fblob = e.querySelector('.fake-blob') as HTMLElement

        if (!blob || !fblob) return

        const rec = fblob.getBoundingClientRect()

        blob.style.opacity = '1'

        blob.animate(
          [
            {
              transform: `translate(${
                ev.clientX - rec.left - rec.width / 2
              }px, ${ev.clientY - rec.top - rec.height / 2}px)`
            }
          ],
          {
            duration: 300,
            fill: 'forwards'
          }
        )
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className={`spotlight-card group bg-border relative overflow-hidden rounded-xl p-px transition-all duration-300 ease-in-out w-full max-w-4xl ${
      isExiting ? 'animate-out zoom-out-95 fade-out duration-300' : 'animate-in zoom-in-95 fade-in duration-500'
    }`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleClose}
        className="absolute top-3 right-3 h-8 w-8 rounded-full hover:bg-destructive/10 z-50"
      >
        <X className="h-4 w-4" />
      </Button>
      <Card className='group-hover:bg-card/90 w-full border-none transition-all duration-300 ease-in-out group-hover:backdrop-blur-[20px]'>
        <CardHeader>
          <CardTitle>Total time spent  in StudyFlow</CardTitle>
        </CardHeader>
        <CardContent className="max-h-96 overflow-y-auto">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="text-6xl font-bold text-primary mb-4">
              {Math.floor(displayTime / 60)}h {displayTime % 60}m
            </div>
            <p className="text-muted-foreground text-center">
              Total time spent studying across all activities
            </p>
          </div>
        </CardContent>
      </Card>
      <div className='blob absolute top-0 left-0 size-20 rounded-full bg-sky-600/60 opacity-0 blur-2xl transition-all duration-300 ease-in-out dark:bg-sky-400/60' />
      <div className='fake-blob absolute top-0 left-0 size-20 rounded-full' />
    </div>
  )
}
