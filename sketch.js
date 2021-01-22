var dog,sadDog,happyDog;
var feedDog,addFood;
var database;
var foodObj;
var foodS;
function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  database.ref('Food').on("value",function(d){
    foodS= d.val();
    foodObj.updateFoodStock(foodS);
  })
  foodObj = new Food();
  feedDog = createButton("Feed Dog")
  feedDog.position(700,95);

  feedDog.mousePressed(function feed(){
    if(foodS>0){
      dog.addImage(happyDog);
    }
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock()
    })
  })

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(function addFoods(){
    dog.addImage(sadDog);
    foodObj.updateFoodStock(foodObj.getFoodStock()+1);
    database.ref('/').update({
      Food:foodObj.getFoodStock()
    })
  })
}

function draw() {
  background(46,139,87);
  drawSprites();
  foodObj.display();
}





