                Project  Outcome ✅
###  List of Content :
1. create node js app
2. setup the server
3. tried some router like get
4. Handle the cors error
5. setting up the Proxy
6. some bad practices of deploy the frontend in server.⚔️

7. mongoose  Schema Types.
    -type: String/Number/Boolean
    -required: true,
    -unique: true / [true, "password irequired"],
    -lowercase: true,
    -default: 0,
    - enum: ["DELIVERED", "PENDING","CANCELLED"],
//when refer from other schema
    -type: mongoose.Schema.Types.ObjectId,
    -ref: "Category",
//can add time stamp
    -{timestamps: true};
// can crete seperated schema for small requrement
    --
const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
});
 orderItems: {
      type: [orderItemSchema],
    },

