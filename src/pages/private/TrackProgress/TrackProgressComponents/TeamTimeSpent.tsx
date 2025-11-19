import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface TimeSpentOnTeamProps {
  onClose: () => void;
}

export default function TimeSpentOnTeam({ onClose }: TimeSpentOnTeamProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

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
          <CardTitle>Time Spent on Teams</CardTitle>
        </CardHeader>
        <CardContent className="max-h-96 overflow-y-auto">
          <p>Your time spent on each team will appear here. (in progress)</p>
          <p className="mt-2">See detailed breakdown of your time allocation across different teams.</p>
        </CardContent>
      </Card>
      <div className='blob absolute top-0 left-0 size-20 rounded-full bg-sky-600/60 opacity-0 blur-2xl transition-all duration-300 ease-in-out dark:bg-sky-400/60' />
      <div className='fake-blob absolute top-0 left-0 size-20 rounded-full' />
    </div>
  );
}