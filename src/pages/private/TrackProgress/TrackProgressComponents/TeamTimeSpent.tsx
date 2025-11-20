import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import type { ModelTimeSpentOnTeam } from '@/api/api'

interface TimeSpentOnTeamProps {
  data: Array<ModelTimeSpentOnTeam>;
  onClose: () => void;
}

export default function TimeSpentOnTeam({ onClose, data }: TimeSpentOnTeamProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useEffect(() => {
    data.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, index]);
      }, index * 200);
    });
  }, [data]);

  const milisecondsToHoursMinutes = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
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
          <div className="flex flex-col gap-4">
            {data.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No team data available</p>
            ) : (
              data.map((team, index) => (
                <div
                  key={team.teamId}
                  className={`flex justify-between items-center p-4 rounded-lg bg-muted/50 transition-all duration-500 ${
                    visibleItems.includes(index) 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground">{team.teamId}</span>
                    <span className="text-sm text-muted-foreground">Team ID</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-bold text-primary">
                      {milisecondsToHoursMinutes(team.duration ?? 0)}
                    </span>
                    <span className="text-sm text-muted-foreground">Time spent</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
      <div className='blob absolute top-0 left-0 size-20 rounded-full bg-sky-600/60 opacity-0 blur-2xl transition-all duration-300 ease-in-out dark:bg-sky-400/60' />
      <div className='fake-blob absolute top-0 left-0 size-20 rounded-full' />
    </div>
  );
}