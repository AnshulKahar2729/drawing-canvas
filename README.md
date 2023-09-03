# Collaborative Drawing Canvas

Collaborative Drawing Canvas is a real-time web application that allows users to draw together collaboratively in different rooms using a shared canvas. This project is built with React, Express, and Socket.IO.

## Features

- Create and join rooms for collaborative drawing.
- Real-time drawing updates synced across all room participants.
- Unique canvas for each room, ensuring privacy and separation of drawings.
- Easy-to-use interface for drawing and interacting with other users.

## Getting Started

Follow these steps to set up and run the Collaborative Drawing Canvas locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/AnshulKahar2729/drawing-canvas.git
   ```

2. Navigate to the project directory:

   ```bash
   cd client
   ```

3. Install the dependencies for both the server and the client:

   ```bash
   npm install
   ```

### Running the Application

1. Start the server:

   ```bash
   npm run start
   ```

   The server will run on `http://localhost:3000`.

2. Start the React client:

   ```bash
   cd api
   npm install
   node index.js
   ```

   The React development server will run on `http://localhost:8080`.

3. Open your web browser and navigate to `http://localhost:3000` to access the Collaborative Drawing Canvas.

## Usage

1. Enter a room name or ID to join or create a room.

2. Start drawing on the canvas. Your drawings will be synchronized with other users in the same room in real-time.

3. Collaborate, have fun, and create amazing artwork together!

## Technologies Used

- React
- Express.js
- Socket.IO

## Contributing

Contributions are welcome!

## Acknowledgments

- Thanks to the [Socket.IO](https://socket.io/) and [React](https://reactjs.org/) communities for their excellent documentation and resources.
