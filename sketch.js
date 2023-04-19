const shapes = [];
let shape, img, lastImg, pg, kd, colorShape, colorStroke, randomColor;
var createShape, shapeSize, val, bgCol, fsShape, fsBorder, shapeTrans, strokeTrans;
let angle = 0;
let symmetry = 6;   
let anglee = 360/ symmetry;


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
  if(createShape.value() == "draw") {
    pg = createGraphics(width, height);
      
  }else if(createShape.value() == "kaleidoscope"){
    kd = createGraphics(width, height);
    kd.angleMode(DEGREES);
    kd.translate(width / 2, height / 2);
  }
  else if(createShape.value() == "img"){
    const imgUrl = prompt("Enter an Image URL") || "https://images.unsplash.com/photo-1615789591457-74a63395c990?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9tZXN0aWMlMjBjYXR8ZW58MHx8MHx8&w=1000&q=80";
    loadImage(imgUrl, img => { lastImg = img;
       shape = new Shape(mouseX, mouseY, colorShape.color(), createShape.value(), shapeSize.value(), 50, angle, strokeSize.value(), lastImg, colorStroke.color());
    });
  }else{
     shape = new Shape(mouseX, mouseY, colorShape.color(), createShape.value(), shapeSize.value(), 50, angle, strokeSize.value(), colorStroke.color()) ;
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
  else if(kd){
    img = kd;
    angle = 0;
  }
  
  shapes.push(new Shape(mouseX, mouseY, colorShape.color(), createShape.value(), shapeSize.value(), shapeTrans.value(), angle, strokeSize.value(), img, colorStroke.color()));
  shape = null;
  pg = null;
  kd = null;
  
  const addDiv = createDiv(shapes.length + ") " +   " " + createShape.value());
  if(createShape.value() == "draw" ){
    addDiv.style('color', colorStroke.color());
  }else if(createShape.value() == "kaleidoscope"){
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

  const shapeopacityDiv = createDiv("ShapeOpacity");
  fsShape.child(shapeopacityDiv);
  
  //
  
  fsBorder = createElement("fieldset");
  fsBorder.class("strokeFs");
  fsBorder.position(width , height/2 + 65);
  const legBorder = createElement("legend","Stroke:");
  fsBorder.child(legBorder);
  
  const bordersizeDiv = createDiv("StrokeSize");
  fsBorder.child(bordersizeDiv); 
  
  const bordercolorDiv = createDiv("StrokeColor");
  fsBorder.child(bordercolorDiv);
  
  const borderopacityDiv = createDiv("Opacity");
  fsBorder.child(borderopacityDiv);
  
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
  createShape = createSelect();
  createShape.position(width + 120, height/2 - 25);
  createShape.option('square');
  createShape.option('circle');
  createShape.option('flower');
  createShape.option('heart');
  createShape.option('star');
  createShape.option('img');
  createShape.option('draw');
  createShape.option("kaleidoscope");


  shapeSize = createSlider(8, 1000, 1);
  shapeSize.position(width + 120 , height/2 - 8);
  shapeSize.style('width', '65px');


  colorShape = createColorPicker('orange');
  colorShape.position(width + 120 , height / 2 + 9);  


  shapeTrans = createSlider(10, 255, 5);
  shapeTrans.position(width + 120, height/2 + 33);
  shapeTrans.style('width', '65px');

    
  strokeSize = createSlider(0, 20, 1);
  strokeSize.position(width + 120, height/2 + 88);
  strokeSize.style('width', '65px');
    
  colorStroke = createColorPicker('white');
  colorStroke.position(width + 120, height / 2 + 105); 
    
  strokeTrans = createSlider(10, 255, 5);
  strokeTrans.position(width + 120, height/2 + 130);
  strokeTrans.style('width', '65px');
  
  randomColor = createCheckbox("rainbow", false);
  randomColor.position(width + 120, height / 2 + 147);
  randomColor.style('color', "orange");
  randomColor.size(100);
  
}

function draw(){
  background("#000000");
  for(let i = 0; i < shapes.length;i++){
    shapes[i].render();
  }
  if(shape){
    shape.x = mouseX;
    shape.y = mouseY;
    shape.angle = angle;
    shape.render();
  }
  if(pg){
    if (randomColor.checked()) {
    col = color(random(0, 255),random(0, 255),random(0, 255), strokeTrans.value());
    }else{ 
      col = color(colorStroke.color().levels[0], colorStroke.color().levels[1], colorStroke.color().levels[2], strokeTrans.value());
    }   
    pg.stroke(col);
    pg.strokeWeight(strokeSize.value());
    pg.line(pmouseX, pmouseY, mouseX, mouseY);
    image(pg, 0, 0);
  }
  if(kd){
    
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      let mx = mouseX - width / 2;
      let my = mouseY - height / 2;
      let pmx = pmouseX - width / 2;
      let pmy = pmouseY - height / 2;

      if (mouseIsPressed){
        
        if (randomColor.checked()) {
          col = color(random(0, 255),random(0, 255),random(0, 255), strokeTrans.value());
          }else{
            col = color(colorStroke.color().levels[0], colorStroke.color().levels[1], colorStroke.color().levels[2], strokeTrans.value());
          }          
        kd.stroke(col);
        kd.strokeWeight(strokeSize.value());
        
        for(let i = 0; i < symmetry; i++){
          kd.rotate(anglee);
          kd.line(mx, my, pmx, pmy);          
          kd.push();
          kd.scale(1,-1);
          kd.line(mx, my, pmx, pmy);  
          kd.pop();
          }
      }
  }
    image(kd,0, 0);   
  }
  
}