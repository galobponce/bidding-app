import { ColorMode } from "@chakra-ui/react";


/**
 * Changes the html background color to be the same as the color mode.\
 * This is because macOS and IOS allows user to scroll out of viewport, seeing the html background color.\
 */
export const changeHtmlBackgroundColor = (colorMode: ColorMode) => {
    if (colorMode === 'dark') {
        document.documentElement.style.backgroundColor = '#ffff';
    } else if (colorMode === 'light') {
        document.documentElement.style.backgroundColor = '#1A202C';
    }
}