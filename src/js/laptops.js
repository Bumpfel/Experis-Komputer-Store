export const laptops = []

laptops.push(
  new Laptop("Kompak Derperon",
    9001,
    "Slightly over-priced computer for the budget aware consumer.",
    "The price might be over 9000, but it does come with a gift certificate for a free cup of coffee and a biscuit.",
    "kompak.jpg"
  ), new Laptop(
    "IBN AWD K2",
    2311,
    "Comes with built in protection if dropped on the ground. Just make sure it's your own laptop you drop.",
    "It's a beast from every perspective, even when it comes to weight and sound!",
    "pc.jpg"
  ), new Laptop(
    "Mak & Cheese OS Y",
    27900,
    "Expensive, one button mouse. Never underestimate the benefits of dumbing down. You won't be able to afford anti-virus, but on the other hand, you probably won't need one.",
    "This brand is known for something known as vendor lock-in. Usually this means communication between multiple devices works very well if you continue buying products of the same brand, but can make the buyer suicidal in other cases.",
    "mak.png"
  ), new Laptop(
    "9000 SUX",
    18000,
    "Are you sure you're getting a good deal?",
    "Buy one for two - special price for you! Hurry hurry hurry!",
    "9000-sux.jpg"
  )
)

function Laptop(name, price, features, description, img) {
  this.name = name
  this.price = price
  this.features = features
  this.description = description
  this.img = img
}
