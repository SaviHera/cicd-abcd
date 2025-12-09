import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as cors from "cors";
import * as express from "express";

// Initialize Firebase Admin
admin.initializeApp();

// Initialize Express app
const app = express();

// Configure CORS to allow requests from any origin
const corsHandler = cors({origin: true});
app.use(corsHandler);

// Parse JSON bodies
app.use(express.json());

/**
 * Hello World endpoint - Basic greeting
 * GET /hello
 */
app.get("/hello", (req, res) => {
  const response = {
    message: "Hello from Firebase Cloud Functions!",
    timestamp: new Date().toISOString(),
    environment: "production",
    version: "1.0.0",
  };
  res.status(200).json(response);
});

/**
 * Get User endpoint - Fetch user information
 * GET /getUser?id=123
 */
app.get("/getUser", (req, res) => {
  const userId = req.query.id as string;

  if (!userId) {
    res.status(400).json({
      error: "User ID is required",
      message: "Please provide a user ID in the query parameter",
    });
    return;
  }

  // Mock user data
  const mockUser = {
    id: userId,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Developer",
    joinedDate: "2024-01-15",
    isActive: true,
  };

  res.status(200).json({
    message: "User fetched successfully",
    data: mockUser,
    timestamp: new Date().toISOString(),
  });
});

/**
 * Get Data endpoint - Returns sample data array
 * GET /getData
 */
app.get("/getData", (req, res) => {
  const sampleData = [
    {
      id: 1,
      title: "First Item",
      description: "This is the first sample item",
      status: "active",
      createdAt: "2024-01-10",
    },
    {
      id: 2,
      title: "Second Item",
      description: "This is the second sample item",
      status: "active",
      createdAt: "2024-01-11",
    },
    {
      id: 3,
      title: "Third Item",
      description: "This is the third sample item",
      status: "inactive",
      createdAt: "2024-01-12",
    },
    {
      id: 4,
      title: "Fourth Item",
      description: "This is the fourth sample item",
      status: "active",
      createdAt: "2024-01-13",
    },
  ];

  res.status(200).json({
    message: "Data fetched successfully",
    data: sampleData,
    count: sampleData.length,
    timestamp: new Date().toISOString(),
  });
});

/**
 * Submit Data endpoint - Handle POST requests
 * POST /submitData
 * Body: { name: string, email: string, message: string }
 */
app.post("/submitData", (req, res) => {
  const {name, email, message} = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    res.status(400).json({
      error: "Missing required fields",
      message: "Please provide name, email, and message",
      requiredFields: ["name", "email", "message"],
    });
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({
      error: "Invalid email format",
      message: "Please provide a valid email address",
    });
    return;
  }

  // Mock successful submission
  const submissionId = Math.random().toString(36).substring(2, 15);

  res.status(201).json({
    message: "Data submitted successfully",
    data: {
      id: submissionId,
      name,
      email,
      message,
      status: "received",
      submittedAt: new Date().toISOString(),
    },
    timestamp: new Date().toISOString(),
  });
});

/**
 * Health Check endpoint
 * GET /health
 */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: "Firebase Cloud Functions",
  });
});

/**
 * 404 handler for undefined routes
 */
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    message: `The endpoint ${req.method} ${req.path} does not exist`,
    availableEndpoints: [
      "GET /hello",
      "GET /getUser?id=123",
      "GET /getData",
      "POST /submitData",
      "GET /health",
    ],
  });
});

/**
 * Error handling middleware
 */
app.use((err: Error, req: express.Request, res: express.Response,
  next: express.NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
    timestamp: new Date().toISOString(),
  });
});

// Export the Express app as a Firebase Cloud Function
export const api = functions.https.onRequest(app);

// Individual function exports for direct calling
export const hello = functions.https.onRequest((req, res) => {
  corsHandler(req, res, () => {
    res.json({
      message: "Hello from Firebase!",
      timestamp: new Date().toISOString(),
    });
  });
});

