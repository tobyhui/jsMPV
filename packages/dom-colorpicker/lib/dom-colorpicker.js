import html2canvas from 'html2canvas';
html2canvas(document.body).then(function(canvas) {
    document.body.appendChild(canvas);
});


// window.getComputedStyle( document.body ,null).getPropertyValue('background-color'); 