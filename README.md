# Cheryx Core

Cheryx Core is a library of reusable React components and utilities designed to streamline the development of web applications. It includes components for layouts, UI elements, and utilities for managing content and interactions.

---

## Installation

To install the library, use one of the following commands:

### Using Yarn
```bash
yarn add @cheryx2020/core
```

### Using npm
```bash
npm install @cheryx2020/core
```

After installation, make sure to include the library's CSS file in your application. Add the following line to your `app.js` or equivalent entry file:
```js
import "/node_modules/@cheryx2020/core/dist/index.css";
```

---

## Usage

### Importing Components
You can import components and utilities from the library as follows:
```js
import { AdminMenu, PatternList, TipDetail, Footer } from "@cheryx2020/core";
```

### Example Usage
Here is an example of how to use the `AdminMenu` component:
```js
import React from "react";
import { AdminMenu } from "@cheryx2020/core";

const Example = () => {
    return (
        <AdminMenu
            text="Admin Options"
            onSaveClick={() => alert('Saved!')}
            onEditClick={() => alert('Editing...')}
            onCancelClick={() => alert('Cancelled!')}
            onPreviewClick={() => alert('Previewing...')}
        />
    );
};

export default Example;
```

---

## Development

### Running the Example Application
To explore and test the components in a live environment, follow these steps:

1. Clone this repository to your local machine:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the `example` folder:
   ```bash
   cd example
   ```

3. Install dependencies and start the development server:
   ```bash
   yarn install && yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the example application.

---

## Components Overview

### Layouts
- **MainLayout**: A layout component for the main structure of the application.
- **DetailLayout**: A layout component for detailed views.

### UI Components
- **AdminMenu**: A menu for admin actions like save, edit, cancel, and preview.
- **PatternList**: A list of patterns with optional editing capabilities.
- **TipDetail**: A detailed view for tips or articles.
- **Footer**: A footer component with social links and additional information.

### Utilities
- **PostContent**: A utility for rendering and managing post content.
- **PageItem**: A utility for rendering different page components based on data.

---

## Example Pages

The `example/pages` directory contains several example pages demonstrating the usage of components:

- **AdminMenu.js**: Demonstrates the `AdminMenu` component.
- **BestSeller.js**: Demonstrates the `BestSeller` component.
- **PatternItem.js**: Demonstrates the `PatternItem` component.
- **ImageUploadable.js**: Demonstrates the `ImageUploadable` component.

To explore these examples, navigate to the corresponding routes in the example application.

---

## Contributing

We welcome contributions to improve Cheryx Core. To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear messages.
4. Submit a pull request to the main repository.

---

## License

Cheryx Core is licensed under the MIT License. See the `LICENSE` file for more details.

---

## Support

If you encounter any issues or have questions, feel free to open an issue in the repository or contact the maintainers.

---

## Additional Notes

- The library is built with React and uses modern JavaScript features. Ensure your project is set up to support ES6+ syntax.
- Some components may require additional dependencies, such as `next/link` for routing or `react-share` for social sharing. Refer to the component documentation for details.

Happy coding!