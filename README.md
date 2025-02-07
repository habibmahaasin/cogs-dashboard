# Project Setup

## How to Set Up and Run the Application Locally

Follow these steps to install and run the application on your local machine.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/) (Comes with Node.js)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/your-repository.git
   ```
2. Navigate to the project directory:
   ```sh
   cd your-repository
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

### Running the Application

To start the development server, run:

```sh
npm run dev
```

The application should now be running on `http://localhost:3039/` (or another available port).

## Libraries & Tools Used

- **Material UI** – UI framework for React components
- **Minimals UI Kit** – Codebase foundation
- **Firebase** – (Testing for MagicLink authentication, but currently unused)
- **js-base64** – Encoding and decoding email & dummy token
- **[package.json](./package.json)** – Other module

## Contributing

Feel free to submit issues or pull requests to improve the project.

## License

This project is licensed under the [MIT License](LICENSE).
