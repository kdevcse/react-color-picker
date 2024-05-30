# Color Picker Widget

This project provides a color picker widget built with React and TypeScript. The widget allows users to select primary and secondary colors from a predefined list and generates the desired amount of shades for the dropdown.

## Prerequisites

- Node.js
- npm

## Installation

1. Clone the repository:

```bash
git clone https://github.com/kdevcse/react-color-picker.git
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
- `numOfShades`: The number of shades to generate for the base color
- `primaryColors`: Array of primary base colors to use for the color picker
- `secondaryColors`: Array of secondary base colors to use for the color picker

```TypeScript
import { ColorPicker } from './path-to-color-picker';

function App() {
  return (
    <div>
    <ColorPicker 
      numOfShades={5} 
      primaryColors={[new Color(255, 0, 0), new Color(0, 0, 255), new Color(255, 255, 0)]}
      secondaryColors={[new Color(0, 255, 0), new Color(255, 165, 0), new Color(255, 0, 255)]}/>
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