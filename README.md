</head>
<body>
  <header>
    <h1>Chatify Backend</h1>
    <p>Powering seamless communication through robust backend technology</p>
  </header>

  <div class="container">
    <h2>Overview</h2>
    <p>The Chatify backend is a feature-rich backend server for managing real-time communication, user authentication, and chat storage for the <b>Chatify</b> application.</p>
<h2>Features</h2>
    <ul>
      <li>User authentication and authorization</li>
      <li>Real-time messaging powered by WebSocket</li>
      <li>Chat history saved for up to a week</li>
      <li>Profile picture integration for personalized chats</li>
      <li>Scalable and efficient architecture</li>
    </ul>

  <h2>Technologies Used</h2>
    <ul>
      <li><b>Node.js</b>: For server-side JavaScript runtime</li>
      <li><b>Express.js</b>: Web framework for building APIs</li>
      <li><b>MongoDB</b>: Database for storing user and chat data</li>
      <li><b>Socket.IO</b>: Real-time bidirectional communication</li>
      <li><b>JWT</b>: For secure user authentication</li>
    </ul>

  <h2>Getting Started</h2>
    <p>To set up and run the backend locally, follow these steps:</p>

  <h3>Prerequisites</h3>
    <ul>
     <li>Node.js installed (<code>v16+</code>)</li>
      <li>MongoDB instance running</li>
      <li>Git installed</li>
    </ul>

   <h3>Installation</h3>
# Clone the repository
git clone https://github.com/your-username/chatify-backend.git

# Navigate into the project directory
cd chatify-backend

# Install dependencies
npm install
      </code>
    </pre>

  <h3>Environment Variables</h3>
    <p>Create a <code>.env</code> file in the project root and add the following:</p>
    <pre>
      <code>
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
      </code>
    </pre>

  <h3>Running the Server</h3>
    <pre>
      <code>
# Start the development server
npm run dev
      </code>
    </pre>

  <h2>API Endpoints</h2>
    <table border="1" style="width:100%; border-collapse:collapse;">
      <thead>
        <tr style="background-color:#f4f4f4;">
          <th>Method</th>
          <th>Endpoint</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>POST</td>
          <td>/api/auth/register</td>
          <td>Register a new user</td>
        </tr>
        <tr>
          <td>POST</td>
          <td>/api/auth/login</td>
          <td>Log in an existing user</td>
        </tr>
        <tr>
          <td>GET</td>
          <td>/api/messages</td>
          <td>Retrieve chat messages</td>
        </tr>
        <tr>
          <td>POST</td>
          <td>/api/messages</td>
          <td>Send a new message</td>
        </tr>
      </tbody>
    </table>

  <h2>Contributing</h2>
    <p>Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.</p>

  <h2>License</h2>
    <p>This project is licensed under the MIT License. See the <code>LICENSE</code> file for more details.</p>
  </div>

  <div class="footer">
    <p>&copy; 2025 Keshav Raj | Chatify Backend</p>
  </div>
</body>
</html>
