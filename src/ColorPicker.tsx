import './ColorPicker.css';
import { Color } from './types/colorTypes';
import { useState } from 'react';

interface ColorPickerProps {
    numOfShades?: number;
    primaryColors: Color[];
    secondaryColors: Color[];
}

/**
 * Color picker component that allows the user to select a color from a list of primary and secondary colors 
 * and copy the selected color to the clipboard
 * @param numOfShades The number of shades to generate for each color
 */
export function ColorPicker({ numOfShades = 5, primaryColors, secondaryColors}: ColorPickerProps) {
    // Validate the primary and secondary colors
    if (primaryColors.length === 0 || secondaryColors.length === 0) {
        throw new Error('Primary and secondary colors must not be empty');
    }

    const [selectedPrimaryColor, setSelectedPrimaryColor] = useState(primaryColors[0].toHexStr()); // Set the initial primary color to red
    const [selectedSecondaryColor, setSelectedSecondaryColor] = useState(secondaryColors[0].toHexStr()); // Set the initial secondary color to green
    const [copiedToClipboardTxt, setCopiedToClipboardTxt] = useState(''); // Set the initial copied to clipboard text to null
    const [clearAlert, setClearAlert] = useState(true); // State used to keep track of the alert message

    /**
     * Handle the color change event and copy the selected color to the clipboard
     * @param event The change event
     * @param setSelectedColor The function to set the selected color
     */
    function handleColorChange(event: React.ChangeEvent<HTMLSelectElement>, setSelectedColor: React.Dispatch<React.SetStateAction<string>>) {
        const colorStr = event.target.value; // Get the selected color
        setSelectedColor(colorStr); // Set the selected color
        navigator.clipboard.writeText(colorStr); // Copy the color to the clipboard

        // Alert the copied text
        setCopiedToClipboardTxt(`Copied '${colorStr}' to clipboard!`);
        setClearAlert(false); // Show the alert message

        // Clear the alert message after 3 seconds
        setTimeout(() => {
            setClearAlert(true); // Clear the alert message
        }, 3000);
    }

    /**
     * Generate the color options for A select element
     * @param colors The base colors to generate options for
     * @param numOfShades The number of shades to generate for each color
     */
    function generateColors(colors: Color[]) {
        return colors.map((color, index) => {
            let options = [];
            // Generate color option elements with decreasing brightness from the base color 
            for (let i = 0; i < numOfShades; i++) {
                const brightnessVal = 100 - (i * (100 / numOfShades)); // Calculate the brightness value
                const newColor = color.toNewColor(brightnessVal); // Generate a new color with the brightness value
                const colorStr = newColor.toHexStr(); // Get the color in a hex string
                // Render a color option element
                options.push(
                    <option 
                        key={index + i} 
                        style={{ backgroundColor: colorStr }} 
                        aria-label={`Color Option: ${colorStr}`} 
                        className='color-picker-option'>
                            {colorStr}
                    </option>
                );
            }
            return options; // Return the list of color options
        }
        );
    }

    // Render the color picker component
    return (
        <div className='color-picker-container'>
            <label htmlFor='primary-color-picker'>Primary</label>
            <select
                style={{ backgroundColor: selectedPrimaryColor }}
                onChange={(e) => handleColorChange(e, setSelectedPrimaryColor)}
                className='color-picker'
                id='primary-color-picker'
                role="listbox"
                aria-label="Primary color picker"
            >
                {generateColors(primaryColors)}
            </select>
            <label htmlFor='secondary-color-picker'>Secondary</label>
            <select
                style={{ backgroundColor: selectedSecondaryColor }}
                onChange={(e) => handleColorChange(e, setSelectedSecondaryColor)}
                className='color-picker'
                id='secondary-color-picker'
                role="listbox"
                aria-label="Secondary color picker"
            >
                {generateColors(secondaryColors)}
            </select>
            <div className={`color-picker-alert ${!clearAlert ? 'active-alert' : ''}`}>
                {copiedToClipboardTxt}
            </div>
        </div>
    );
}

export default ColorPicker;