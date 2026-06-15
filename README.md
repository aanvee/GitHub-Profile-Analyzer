# GitHub Profile Analyzer

A comprehensive web application that analyzes GitHub profiles and provides detailed insights into a user's repositories, contributions, and overall activity.

## Features

- **Profile Analysis**: Fetches and displays detailed information about a GitHub user.
- **Repository Insights**: Analyzes repositories including stars, forks, and languages.
- **Contribution Tracking**: Visualizes user contributions over time.
- **Responsive Design**: Built with modern UI/UX principles for a seamless experience.

## Tech Stack

### Frontend
- **Framework**: React
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Axios

### Backend
- **Framework**: Spring Boot
- **Language**: Java
- **Database**: PostgreSQL
- **Security**: Spring Security
- **API**: GitHub REST API

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Java (v17 or higher)
- Maven
- PostgreSQL

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd GitHub-Profile-Analyzer
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    mvn clean install
    ```
    - Configure your PostgreSQL connection in `src/main/resources/application.properties`.
    - Start the server:
      ```bash
      mvn spring-boot:run
      ```

3.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    ```
    - Start the development server:
      ```bash
      npm start
      ```

## Usage

Open your browser and navigate to `http://localhost:3000`. Enter a GitHub username to start the analysis.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
