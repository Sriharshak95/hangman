import React, { useEffect, useRef } from "react";

const HangmanDraw = ({inCorrectGuess}) => {
  const canvasRef = useRef(null);

  const drawRope = (ctx) => {
    // Draw a line
    ctx.beginPath();
    ctx.moveTo(50, 190); // Start point
    ctx.lineTo(150, 190); // End point
    ctx.moveTo(100, 190);
    ctx.lineTo(100, 20);
    ctx.lineTo(180, 20);
    ctx.lineTo(180, 40);
    ctx.strokeStyle = "blue"; // Line color
    ctx.lineWidth = 3; // Line thickness
    ctx.stroke(); // Draw the line
  } 

  const drawHead = (ctx) => {
    ctx.beginPath();
    ctx.arc(180, 55, 15, 0, Math.PI * 2);
    ctx.stroke();
  }

  const drawBody = (ctx) => {
    ctx.beginPath();
    ctx.moveTo(180, 70);
    ctx.lineTo(180, 120);
    ctx.stroke();
  }

  const drawHands = (ctx) => {
    ctx.beginPath();
    ctx.moveTo(180, 80);
    ctx.lineTo(160, 100);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(180, 80);
    ctx.lineTo(200, 100);
    ctx.stroke();
  }

  const drawLegs = (ctx) => {
    ctx.beginPath();
    ctx.moveTo(180, 120);
    ctx.lineTo(160, 150);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(180, 120);
    ctx.lineTo(200, 150);
    ctx.stroke();
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    inCorrectGuess > 0 && drawRope(ctx);
    inCorrectGuess > 1 && drawHead(ctx);
    inCorrectGuess > 2 && drawBody(ctx);
    inCorrectGuess > 3 && drawHands(ctx);
    inCorrectGuess > 4 && drawLegs(ctx);

  }, [inCorrectGuess]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={200}
      style={{ border: "1px solid black" }}
    />
  );
};

export default HangmanDraw;