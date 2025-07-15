# Event Management API

A RESTful API for managing events and user registrations built with Node.js, Express.js, and MongoDB.

## Features

- ✅ Create new events with title, date/time, location, and capacity
- ✅ View event details with registered users
- ✅ Register users for events with validation
- ✅ Cancel event registrations
- ✅ Get upcoming events sorted by date and location
- ✅ View event statistics (registrations, remaining capacity, etc.)
- ✅ Input validation and error handling
- ✅ MongoDB integration with Mongoose

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Environment**: dotenv for configuration
- **Development**: Nodemon for auto-restart

## Project Structure

```
Event Management API/
├── config/
│   └── db.js              # Database connection configuration
├── controller/
│   └── eventController.js # Event-related business logic
├── models/
│   ├── eventModel.js      # Event schema and model
│   └── userModel.js       # User schema and model
├── routes/
│   └── eventRoutes.js     # API route definitions
├── server.js              # Main application entry point
├── package.json           # Dependencies and scripts
└── README.md             # Project documentation
```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SarveshShahane/-Event-Management-API.git
   cd Event-Management-API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/event-management
   PORT=3000
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the application**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   node server.js
   ```

The API will be available at `http://localhost:3000`

## API Endpoints

### Events

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/events/create` | Create a new event |
| GET | `/api/events/upcoming` | Get all upcoming events |
| GET | `/api/events/:id` | Get event details by ID |
| POST | `/api/events/:id/register` | Register for an event |
| DELETE | `/api/events/:id/cancel` | Cancel event registration |
| GET | `/api/events/:id/stats` | Get event statistics |

### API Usage Examples

#### 1. Create Event
```http
POST /api/events/create
Content-Type: application/json

{
  "title": "Tech Conference 2025",
  "dateTime": "2025-08-15T10:00:00Z",
  "location": "San Francisco, CA",
  "capacity": 100
}
```

#### 2. Register for Event
```http
POST /api/events/60d5ecb74b24a1a1d4c5f123/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

#### 3. Get Upcoming Events
```http
GET /api/events/upcoming
```

#### 4. Get Event Details
```http
GET /api/events/60d5ecb74b24a1a1d4c5f123
```

#### 5. Cancel Registration
```http
DELETE /api/events/60d5ecb74b24a1a1d4c5f123/cancel
Content-Type: application/json

{
  "email": "john.doe@example.com"
}
```

#### 6. Get Event Statistics
```http
GET /api/events/60d5ecb74b24a1a1d4c5f123/stats
```

## Data Models

### Event Model
```javascript
{
  title: String (required),
  dateTime: Date (required),
  location: String (required),
  capacity: Number (1-1000),
  registrations: [ObjectId] (references User)
}
```

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique)
}
```

## Validation Rules

- **Event Title**: Required, trimmed
- **Date/Time**: Required, valid date format
- **Location**: Required, trimmed
- **Capacity**: Optional, between 1-1000
- **Email**: Required, valid email format
- **Name**: Required for registration

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created successfully
- `400` - Bad request (validation errors)
- `404` - Resource not found
- `409` - Conflict (duplicate registration)
- `500` - Internal server error

## Business Logic

- Events can't be registered for if they've already occurred
- Users can't register twice for the same event
- Registration is blocked when event reaches capacity
- Upcoming events are sorted by date, then by location
- Users are automatically created if they don't exist during registration

## Development

### Running in Development Mode
```bash
npm run dev
```

This uses nodemon to automatically restart the server when files change.

### Database Connection
The application connects to MongoDB using the connection string in your `.env` file. Make sure MongoDB is running before starting the application.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the ISC License.

## Author

**Sarvesh Shahane**
- GitHub: [@SarveshShahane](https://github.com/SarveshShahane)

---

**Note**: Remember to move the `/upcoming` route before the `/:id` route in `eventRoutes.js` to avoid route conflicts!