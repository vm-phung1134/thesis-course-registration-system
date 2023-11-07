import { useUserCookies } from "@/hooks/useCookies";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { INotification } from "@/interface/notification";
import { createContext, useContext, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface ISocketProviderProps {
  children: React.ReactNode;
}

interface ISocketContext {
  socket: Socket | null;
  allNotifications: INotification[]; // Thay thế any bằng kiểu dữ liệu phù hợp cho allNotifications
}
// Create the SocketContext
const SocketContext = createContext<ISocketContext | null>(null);

// Create the SocketProvider
export function SocketProvider({ children }: ISocketProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [user,] = useUserCookies();
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [allNotifications, setAllNotifications] = useState<INotification[]>([]);
  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        setIsSocketConnected(true);
        socket.emit("newUser", { ...user, socketId: socket.id });
        socket.on("getAllNotifications", (data) => {
          setAllNotifications([...data]);
        });
        socket.on("updateNotifications", (newData) => {
          setAllNotifications((prev) => [newData, ...prev]);
        });
      });
      socket.on("disconnect", () => {
        setIsSocketConnected(false);
      });
    }
  }, [socket, user]);

  return (
    <SocketContext.Provider value={{ socket, allNotifications }}>
      {isSocketConnected ? children : null}
    </SocketContext.Provider>
  );
}

// Create the useContext hook for accessing the socket
export function useSocket() {
  const socketContext = useContext(SocketContext);
  if (!socketContext) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return socketContext;
}
