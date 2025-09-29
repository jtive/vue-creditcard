# Personal Information Management System - Vue.js

A modern Vue.js TypeScript application for managing personal information, including persons, addresses, and credit cards. This application connects to a .NET WebAPI backend deployed on AWS App Runner.

## Features

- **Dashboard**: Overview of system statistics and recent persons
- **Person Management**: Create, read, update, and delete persons
- **Address Management**: Add and manage addresses for persons
- **Credit Card Management**: Add and manage credit cards for persons
- **Real-time Validation**: Client-side form validation with immediate feedback
- **Responsive Design**: Bootstrap-based UI that works on all devices
- **TypeScript**: Full type safety throughout the application

## Technology Stack

- **Frontend**: Vue.js 3 with TypeScript
- **Build Tool**: Vite
- **UI Framework**: Bootstrap 5
- **Icons**: Bootstrap Icons
- **HTTP Client**: Axios
- **Routing**: Vue Router
- **Backend API**: .NET WebAPI (deployed on AWS App Runner)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vue-creditcard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## API Integration

The application connects to the .NET WebAPI at:
`https://mhadxupkmr.us-east-2.awsapprunner.com/api`

### Available Endpoints

- **Persons**: `/api/person`
- **Addresses**: `/api/address`
- **Credit Cards**: `/api/creditcard`
- **Health Check**: `/api/health`

## Project Structure

```
src/
├── components/          # Vue components
│   ├── Dashboard.vue   # Main dashboard
│   ├── PersonsList.vue # List of all persons
│   ├── PersonCard.vue  # Individual person card
│   ├── AddPerson.vue   # Add new person form
│   ├── EditPerson.vue  # Edit person form
│   └── ViewPerson.vue  # View person details
├── services/           # API service layer
│   └── api.ts         # Axios-based API client
├── types/             # TypeScript type definitions
│   └── index.ts       # DTOs and interfaces
├── assets/            # Static assets
├── App.vue            # Root component
└── main.ts            # Application entry point
```

## Features Overview

### Dashboard
- System statistics (total persons, addresses, credit cards)
- System health status
- Quick action buttons
- Recent persons list

### Person Management
- Create new persons with personal information
- Edit existing person details
- View detailed person information
- Delete persons (with confirmation)
- Form validation for all required fields

### Address Management
- Add addresses when creating persons
- Support for different address types (Home, Work, Mailing)
- Primary address designation
- Address validation (state codes, zip codes, etc.)

### Credit Card Management
- Add credit cards when creating persons
- Support for major card types (Visa, MasterCard, American Express, Discover)
- Expiration date validation
- Active/inactive status
- Card number formatting and validation

## Form Validation

The application includes comprehensive client-side validation:

- **Required Fields**: All mandatory fields are validated
- **Format Validation**: SSN, credit card numbers, zip codes, etc.
- **Length Validation**: Field length limits as per API requirements
- **Real-time Feedback**: Validation messages appear as users type
- **Submit Prevention**: Forms cannot be submitted with validation errors

## Security Features

- **Data Masking**: Sensitive data (SSN, addresses, credit cards) is masked in the API responses
- **Input Sanitization**: All user inputs are validated and sanitized
- **HTTPS**: All API communications use HTTPS

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking

### Code Style

- TypeScript strict mode enabled
- ESLint configuration for code quality
- Consistent naming conventions
- Component-based architecture

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
