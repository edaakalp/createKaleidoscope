const shapes = [];
let shape, img, lastImg, pg, kd, colorShape, colorStroke;
var button_shape, slider_size, val, bgCol, fsShape, fsBorder;
let angle = 0;


function mousePressed(){
  if(mouseX > width || mouseY > height || mouseX < 0 || mouseY < 0) {
    shape = null;
    pg = null;
    kd = null;
    return;
  }
  
  if(shape){
    return;
  }
  if(button_shape.value() == "draw") {
    pg = createGraphics(width, height);
      
  }else if(button_shape.value() == "kaleidoscope"){
    kd = createGraphics(width, height);
  }
  else if(button_shape.value() == "img"){
    const imgUrl = prompt("Enter an Image URL") || "https://images.unsplash.com/photo-1615789591457-74a63395c990?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9tZXN0aWMlMjBjYXR8ZW58MHx8MHx8&w=1000&q=80";
    loadImage(imgUrl, img => { lastImg = img;
       shape = new Shape(mouseX, mouseY, colorShape.color(), button_shape.value(), slider_size.value(), 50, angle, stroke_size.value(), lastImg, colorStroke.color());
    });
  }
  else{
     shape = new Shape(mouseX, mouseY, colorShape.color(), button_shape.value(), slider_size.value(), 50, angle, stroke_size.value(), colorStroke.color());
  }
}

function mouseReleased() {
  if(mouseX > width || mouseY > height || mouseX < 0 || mouseY < 0){
    shape = null;
    pg = null;
    kd = null;
    return;
  }

 let img = lastImg;
  if(pg) {
    img = pg;
    angle = 0;
  }
  else if(kd){// burasi
    img = kd;
    angle = 0;
  }
  
  shapes.push(new Shape(mouseX, mouseY, colorShape.color(), button_shape.value(), slider_size.value(), 255, angle, stroke_size.value(), img, colorStroke.color()));
  shape = null;
  pg = null;
  kd = null;
  
  const addDiv = createDiv(shapes.length + ") " +   " " + button_shape.value());
  if(button_shape.value() == "draw" ){
    addDiv.style('color', colorStroke.color());
  }else if(button_shape.value() == "kaleidoscope"){
    addDiv.style('color', colorStroke.color());
  }
  else{
    addDiv.style('color', colorShape.color()); 
  }
  
  addDiv.parent(generalDiv);
  
  let col = color("#000000");
  let button_clear = createButton('clear');
  button_clear.style('background-color', col);
  button_clear.style('color', 'orange');
  
  button_clear.mousePressed(e => clickedDiv(addDiv));
  button_clear.parent(addDiv);
  
  let all_clear = createButton('clearall');
  all_clear.position(width + 165, height/2 - 155);
  all_clear.style('background-color', col);
  all_clear.style('color', 'orange');
  
  all_clear.mousePressed(clearScreen);
}

function mouseWheel(event) {
  angle += event.delta/1000; 
}

function clickedDiv(parent) {
  for(let i = 0; i < generalDiv.elt.children.length; i++) {
    if(parent.elt == generalDiv.elt.children[i]) {
      generalDiv.elt.children[i].remove();
      shapes.splice(i, 1);
    }
  }
}

function clearScreen(){
  for(let i = shapes.length-1; i >= 0; i--) {
      generalDiv.elt.children[i].remove();
      shapes.splice(i, 1);
  }
}

function setup(){
  textAlign(CENTER);
  createCanvas(560, 500);

  fsShape = createElement("fieldset");
  fsShape.class("shapeFs");
  
  fsShape.position(width , height/2 - 50);
  const legShape = createElement("legend","Shape:");
  fsShape.child(legShape);
  
  const shapeDiv = createDiv("Shape");
  fsShape.child(shapeDiv);
  
  const shapesizeDiv = createDiv("ShapeSize");
  fsShape.child(shapesizeDiv);
  
  const shapecolorDiv = createDiv("ShapeColor");
  fsShape.child(shapecolorDiv);
  
  //
  
  fsBorder = createElement("fieldset");
  fsBorder.class("strokeFs");
  fsBorder.position(width , height/2 + 35);
  const legBorder = createElement("legend","Stroke:");
  fsBorder.child(legBorder);
  
  const bordersizeDiv = createDiv("StrokeSize");
  fsBorder.child(bordersizeDiv); 
  
  const bordercolorDiv = createDiv("StrokeColor");
  fsBorder.child(bordercolorDiv);
  
  //
 
  const fss = createElement("fieldset");
  fss.class('generalDiv');

  fss.position(width , 0);
  const selectedLeg = createElement("legend","Selected:");
  fss.child(selectedLeg);
  
  generalDiv = createDiv();
  generalDiv.style('color', "orange");
  generalDiv.parent(fss);
  
  button();
}

  function button(){
  button_shape = createSelect();
  button_shape.position(width + 120, height/2 - 25);
  button_shape.option('square');
  button_shape.option('circle');
  button_shape.option('flower');
  button_shape.option('heart');
  button_shape.option('star');
  button_shape.option('img');
  button_shape.option('draw');
  button_shape.option("kaleidoscope");
    
  colorShape = createColorPicker('#ed225d');
  colorShape.position(width + 120 , height / 2 + 10);  
  

  slider_size = createSlider(8, 1000, 1);
  slider_size.position(width + 120 , height/2 - 8);
  slider_size.style('width', '65px');
   
    
  stroke_size = createSlider(0, 20, 1);
  stroke_size.position(width + 120, height/2 + 58);
  stroke_size.style('width', '65px');
    
  colorStroke = createColorPicker('#ed225d');
  colorStroke.position(width + 120, height / 2 + 75);     
}

function draw(){
  background("#000000");
  for(let i = 0; i < shapes.length;i++) {
    shapes[i].render();
  }
  if(shape) {
    shape.x = mouseX;
    shape.y = mouseY;
    shape.angle = angle;
    shape.render();
  }
  if(pg) {
    pg.stroke(colorStroke.color());
    pg.strokeWeight(stroke_size.value());
    pg.line(pmouseX, pmouseY, mouseX, mouseY);
    image(pg,0,0);
  }
  if(kd){
    let symmetry = 6;   
    let angle = 360/ symmetry;
    
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      let mx = mouseX;
      let my = mouseY;
      let pmx = pmouseX;
      let pmy = pmouseY;
      if (mouseIsPressed) {
        for (let i = 0; i < symmetry; i++) {
          kd.rotate(angle);
          kd.stroke(colorStroke.color());
          kd.strokeWeight(stroke_size.value());
          kd.line(mouseX, mouseY, pmouseX, pmouseY);
          kd.push();
          kd.scale(1, -1);
          kd.line(pmouseX, pmouseY, mouseX, mouseY);
          kd.pop();
        }
      }
  }


    print("haha");
    image(kd, width , height);

    
    print(angle);
    
    
  }
}