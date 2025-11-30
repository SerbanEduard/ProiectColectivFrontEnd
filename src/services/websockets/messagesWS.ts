import type { DtoMessageDTO } from "@/api";
import { useEffect } from "react";
import { useTeamStore } from "../stores/useTeamStore";

const WSPATH = import.meta.env.VITE_WSPATH;

export function useMessageSocket(token : string, onTeam : boolean) {
  const { openTeam ,addSentMessage } = useTeamStore()

  useEffect(() => {
    if (!token) return;

    const ws = new WebSocket(`ws://${WSPATH}/messages/connect?token=${token}`,);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const messageDto = data.payload as DtoMessageDTO;
      
      if(messageDto.teamId == openTeam?.id && onTeam)
      {
        addSentMessage(messageDto)
      } 

    };

  	console.log("Connected succesfully")
  
    return () => {
		if (ws && ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
			ws.close();
		}
	}}, []);
}