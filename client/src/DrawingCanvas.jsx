import React, { useState, useEffect, useRef } from "react";
import { useSocket } from "./context/SocketProvider";
import { useParams } from "react-router-dom";

const DrawingArea = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const { roomId } = useParams();
  const [context, setContext] = useState(null);
  const socket = useSocket();
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 2;
    setContext(ctx);
    socket.on("drawing", (data) => {
      const { offsetX, offsetY, type } = data;
      if (type === "start") {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      } else if (type === "draw") {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      } else if (type === "end") {
        ctx.closePath();
      }
    });
  }, [context, socket]);

  const emitDrawingEvent = (data) => {
    if (socket) {
      socket.emit("drawing", {
        roomId: roomId,
        data: data,
      });
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
