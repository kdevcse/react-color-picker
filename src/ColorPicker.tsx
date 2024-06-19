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
 * @param primaryColors The list of primary colors
 * @param secondaryColors The list of secondary colors
 */
export function ColorPicker({ numOfShades = 5, primaryColors, secondaryColors}: ColorPickerProps) {
    const [alertTxt, setAlertTxt] = useState(''); // Set the initial copied to clipboard text to null
    const [clearAlert, setClearAlert] = useState(true); // State used to keep track of the alert message
    const [selectedPrimaryColor, setSelectedPrimaryColor] = useState(primaryColors[0].toHexStr()); // Set the initial primary color to red
    const [selectedSecondaryColor, setSelectedSecondaryColor] = useState(secondaryColors[0].toHexStr()); // Set the initial secondary color to green
    const [selectedPrimaryFgColor, setSelectedPrimaryFgColor] = useState('white'); // Set the initial primary color text color to black
    const [selectedSecondaryFgColor, setSelectedSecondaryFgColor] = useState('black'); // Set the initial secondary color text color to black

    /**
     * Display an alert message for 3 seconds
     * @param msg The message to display
     */
    function alert(msg: string) {
        setAlertTxt(msg); // Set the alert message
        setClearAlert(false); // Show the alert message

        // Clear the alert message after 3 seconds
        setTimeout(() => {
            setClearAlert(true); // Clear the alert message
        }, 3000);
    }

    /**
     * Get the contrast color based on the brightness of the input color
     * @param color The hex color to contrast against
     * @returns 
     */
    function getContrastColorFromHex(color: string): string {
        const rgb = parseInt(color.replace('#', ''), 16);   // convert rrggbb to decimal
        const r = (rgb >> 16) & 0xff;  // extract red
        const g = (rgb >>  8) & 0xff;  // extract green
        const b = (rgb >>  0) & 0xff;  // extract blue
    
        // Calculate brightness according to the YIQ formula: (299*R + 587*G + 114*B) / 1000
        // https://gomakethings.com/dynamically-changing-the-text-color-based-on-background-color-contrast-with-vanilla-js/
        const brightness = (299 * r + 587 * g + 114 * b) / 1000;
        return brightness < 128 ? 'white' : 'black';
    }

    /**
     * Handle the color change event and copy the selected color to the clipboard
     * @param event The change event
     * @param setSelectedBgColor The function to set the selected color
     */
    function handleColorChange(event: React.ChangeEvent<HTMLSelectElement>, setSelectedBgColor: React.Dispatch<React.SetStateAction<string>>, setSelectedFgColor: React.Dispatch<React.SetStateAction<string>>) {
        const colorStr = event.target.value; // Get the selected color
        setSelectedBgColor(colorStr); // Set the selected color

        setSelectedFgColor(getContrastColorFromHex(colorStr)); // Set the text color based on the brightness of the selected color for contrast
        navigator.clipboard.writeText(colorStr); // Copy the color to the clipboard

        // Alert the copied text);
        alert(`Copied ${colorStr} to clipboard`);
    }

    /**
     * Generate the color options for A select element
     * @param colors The base colors to generate options for
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
                        key={(index * numOfShades) + i} 
                        style={{ backgroundColor: colorStr, color: getContrastColorFromHex(colorStr)}} 
                        aria-label={`Color Option: ${colorStr}`} 
                        role='option'
                        aria-selected={colorStr === selectedPrimaryColor || colorStr === selectedSecondaryColor}
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
                style={{ backgroundColor: selectedPrimaryColor, color: selectedPrimaryFgColor}}
                onChange={(e) => handleColorChange(e, setSelectedPrimaryColor, setSelectedPrimaryFgColor)}
                className='color-picker'
                id='primary-color-picker'
                role="listbox"
                aria-label="Primary color picker"
            >
                {generateColors(primaryColors)}
            </select>
            <label htmlFor='secondary-color-picker'>Secondary</label>
            <select
                style={{ backgroundColor: selectedSecondaryColor, color: selectedSecondaryFgColor}}
                onChange={(e) => handleColorChange(e, setSelectedSecondaryColor, setSelectedSecondaryFgColor)}
                className='color-picker'
                id='secondary-color-picker'
                role="listbox"
                aria-label="Secondary color picker"
            >
                {generateColors(secondaryColors)}
            </select>
            <div aria-label='Color picker alert' className={`color-picker-alert ${!clearAlert ? 'active-alert' : ''}`}>
                {alertTxt}
            </div>
        </div>
    );
}

export default ColorPicker;