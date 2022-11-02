 let gridSize = 16;

 // GRID SIZE SLIDER
 let slider = document.getElementById("myRange");
 let output = document.getElementById("value");
 output.innerHTML = slider.value + ' x ' + slider.value;

 slider.oninput = function () {
   output.innerHTML = this.value + ' x ' + this.value;
   gridSize = this.value;
   createGrid();
   showGrid();
   drawingClick();
   drawingDrag();
 }

 // GRID SETUP
 createGrid();

 function createGrid() {
   const resetGrid = document.getElementById('grid');
   resetGrid.innerHTML = '';

   for (let i = 0; i < gridSize; i++) {
     let column = document.createElement('div');
     column.classList.add('column');
     column.id = "column-" + (i + 1);
     document.getElementById('grid').appendChild(column);
   }
   for (let i = 0; i < gridSize; i++) {
     for (let i = 0; i < gridSize; i++) {
       let pixel = document.createElement('div');
       pixel.classList.add('pixel');
       document.getElementById('column-' + (i + 1)).appendChild(pixel);
     }
   }
 }

 // SHOW GRID ON SLIDER HOVER
 showGrid() 

 function showGrid() {
   let slider = document.querySelector('#myRange');
   let items = document.querySelectorAll('.pixel');
   items.forEach(item => {
    slider.addEventListener('mouseover', () => {
      item.classList.remove('gridOff');
      item.classList.add('gridOn');
    });
     slider.addEventListener('mouseleave', () => {
      item.classList.remove('gridOn');
      item.classList.add('gridOff');
     });
   });
 }


 // BUTTONS
 let selectedColor = 'red';

 const red = document.querySelector('.red');
 const green = document.querySelector('.green');
 const blue = document.querySelector('.blue');
 const yellow = document.querySelector('.yellow');
 const black = document.querySelector('.black');
 const eraser = document.querySelector('.eraser');
 const rainbow = document.querySelector('.rainbow');

 // BACK TO ORIGINAL SIZE AFTER MOUSEDOWN
 const buttons = document.querySelectorAll('button');

 buttons.forEach((button) => {
   button.addEventListener('mousedown', () => {
     button.classList.add('buttonPushed');
     button.addEventListener('mouseleave', function () {
       button.classList.remove('buttonPushed');
     });
   });
 });

 // MARK ACTIVE BUTTON
 container.addEventListener('mousedown', handleClick, false);

 function handleClick(e) {
   const {
     target
   } = e;
   if (target.classList.contains('btn')) {
     buttons.forEach(button => button.classList.remove('active'));
     target.classList.add('active');
   }
 }

 // SELECT DRAWING COLOR
 red.onclick = () => selectedColor = ('red');
 green.onclick = () => selectedColor = ('green');
 blue.onclick = () => selectedColor = ('blue');
 yellow.onclick = () => selectedColor = ('yellow');
 black.onclick = () => selectedColor = ('black');
 eraser.onclick = () => selectedColor = ('eraser');
 rainbow.onclick = () => selectedColor = ('rainbow');

 // RANDOM COLOR GENERATOR
 let r = '',
   g = '',
   b = '';

 function rgb() {
   r = Math.floor(Math.random() * 255);
   g = Math.floor(Math.random() * 255);
   b = Math.floor(Math.random() * 255);
   return "rgb(" + r + "," + g + "," + b + ")";
 }

 // CHECK IF MOUSE BUTTON IS DOWN
 let down = false;
 let grid = document.querySelector('#grid');

 grid.addEventListener('mousedown', (e) => {
   down = true;
   console.log(down);
   e.preventDefault(); // prevents "block cursor" from appearing
 });

 document.addEventListener('mouseup', () => {
   down = false;
   console.log(down);
 });

 // DRAWING
 drawingClick();
 drawingDrag();

 function drawingClick() {
   let items = document.querySelectorAll('.pixel');
   items.forEach(item => {
     item.addEventListener('mousedown', () => {
       item.className = 'pixel';
       if (selectedColor == 'rainbow') {
         item.classList.remove(selectedColor);
         item.style.backgroundColor = rgb();
         item.style.outline = '1px solid';
         item.style.outlineColor = item.style.backgroundColor;
       } else {
         item.classList.add(selectedColor);
         item.style.backgroundColor = "";
         item.style.outlineColor = "";
       }
     });
   });
 }

 function drawingDrag() {
   let items = document.querySelectorAll('.pixel');
   items.forEach(item => {
     item.addEventListener('mouseover', () => {
       if (down) {
         item.className = 'pixel';
         if (selectedColor == 'rainbow') {
           item.classList.remove(selectedColor);
           item.style.backgroundColor = rgb();
           item.style.outline = '1px solid';
           item.style.outlineColor = item.style.backgroundColor;
         } else {
           item.classList.add(selectedColor);
           item.style.backgroundColor = "";
           item.style.outlineColor = "";
         }
       }
     });
   });
 }

 // CLEAR GRID
 const clear = document.querySelector('.clear');
 let items = document.querySelectorAll('.pixel');
 clear.onclick = () => {
   let items = document.querySelectorAll('.pixel');
   items.forEach(item => item.className = 'pixel');
   items.forEach(item => item.style.backgroundColor = "");
   items.forEach(item => item.style.outlineColor = "");
 }