class Shape {
  constructor(x1, y1, col, shape, size, alpha, angle, strokesize, img, strokecolor) {
    this.x = x1;
    this.y = y1;
    this.col = col;
    this.alpha = alpha;
    this.shapeName = shape;
    this.size = size;
    this.img = img
    this.angle = angle || 0;
    this.strokeSize = strokesize || 0 ;
    this.strokeColor = strokecolor || 0 ;

  }

  heart(x, y, size){
    beginShape();
    vertex(x, y);
    bezierVertex(
      x - size / 2,
      y - size / 2,
      x - size,
      y + size / 3,
      x,
      y + size
    );
    bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    endShape(CLOSE);
  }
  
  star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}  
  
 flower(x, y){
  translate(x, y);
  
  for (let i = 0; i < 10; i ++) {
    ellipse(0, 50, 50, 80);
    rotate(PI / 4);
  }
  fill(this.strokeColor);
  strokeWeight(this.strokeSize);
  ellipse(0, 0, 40, 40);
 }
  
  render() {
    push();
    const c = color(this.col.levels[0], this.col.levels[1], this.col.levels[2], this.alpha);
    fill(c);
    translate(this.x, this.y);
    rotate(this.angle);
    strokeWeight(this.strokeSize);
    stroke(this.strokeColor);
    
    if(this.shapeName == "square") {
      square(- this.size / 2, - this.size / 2, this.size);
    } else if(this.shapeName == "circle") {
      circle(0, 0, this.size);
    } else if(this.shapeName == "heart") {
      this.heart(0, 0, this.size);
    } else if(this.shapeName == "star"){
      this.star(0, 0, 30, 70, 5);      
    } else if(this.shapeName == "img"){
      image(this.img, - this.size / 2, - this.size / 2, this.size, this.size);
    } else if(this.shapeName == "draw"){
      image(this.img, -this.x, -this.y, width, height);
    } else if(this.shapeName == "flower"){
      this.flower(- this.size + 8 , - this.size + 8 , this.size);
    } else if(this.shapeName == "kaleidoscope"){
      image(this.img, -this.x, -this.y, width, height);
    } 
    pop();
  }
}
