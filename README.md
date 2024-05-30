# Color Picker Widget

This project provides a color picker widget built with React and TypeScript. The widget allows users to select primary and secondary colors from a predefined list.

## Prerequisites

- Node.js
- npm

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-repo/color-picker-widget.git
```

2. Install the dependencies:
```bash
cd color-picker-widget
```

3. Install the dependencies
```bash
npm i
```

## Usage

```TypeScript
import { ColorPicker } from './path-to-color-picker';

function App() {
  return (
    <div>
      <ColorPicker />
    </div>
  );
}

export default App;
```

## Build

```Bash
npm run build
```

## Run in Development mode
```Bash
npm run dev
```

## Accessibility

The color picker widget follows WAI-ARIA guidelines to ensure accessibility. It's navigable through keyboard and compatible with screen readers.