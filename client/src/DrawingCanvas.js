import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const DrawingArea = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [socket, setSocket] = useState(null); // Store the socket instance

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 2;
    setContext(ctx);

    const newSocket = io("http://localhost:8080"); // Update with your server URL
    setSocket(newSocket);

    newSocket.on("drawing", (data) => {
      const { offsetX, offsetY, type } = data;
      if (type === "start") {
        context.beginPath();
        context.moveTo(offsetX, offsetY);
      } else if (type === "draw") {
        context.lineTo(offsetX, offsetY);
        context.stroke();
      } else if (type === "end") {
        context.closePath();
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [context]);

  const emitDrawingEvent = (data) => {
    if (socket) {
      socket.emit("drawing", data);
    }
  };

  const startDrawing = (event) => {
    setDrawing(true);
    const { offsetX, offsetY } = event.nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    emitDrawingEvent({ offsetX, offsetY, type: "start" });
  };

  const draw = (event) => {
    if (!drawing) return;
    const { offsetX, offsetY } = event.nativeEvent;
    context.lineTo(offsetX, offsetY);
    context.stroke();
    emitDrawingEvent({ offsetX, offsetY, type: "draw" });
  };

  const endDrawing = () => {
    if (drawing) {
      context.closePath();
      setDrawing(false);
      emitDrawingEvent({ type: "end" });
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={endDrawing}
      onMouseLeave={endDrawing}
      style={{ border: "1px solid black" }}
    />
  );
};

export default DrawingArea;
