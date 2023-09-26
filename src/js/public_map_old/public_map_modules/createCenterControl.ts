/**
 * Creates a control that recenters the map on Chicago.
 */
export function createCenterControl() {
    const controlButton = document.createElement('button');

    // Set CSS for the control.
    controlButton.style.backgroundColor = '#fff';
    controlButton.style.border = '2px solid #fff';
    controlButton.style.borderRadius = '3px';
    controlButton.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlButton.style.color = 'rgb(25,25,25)';
    controlButton.style.cursor = 'pointer';
    controlButton.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlButton.style.fontSize = '16px';
    controlButton.style.lineHeight = '38px';
    controlButton.style.margin = '8px 0 22px';
    controlButton.style.padding = '0 5px';
    controlButton.style.textAlign = 'center';

    controlButton.textContent = 'Barrio';
    controlButton.title = 'Apagar o encender barrios';
    controlButton.type = 'button';

    // Setup the click event listeners: simply set the map to Chicago.


    return controlButton;
}
