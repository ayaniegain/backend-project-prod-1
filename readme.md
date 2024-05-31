---------node js init----------

1. initial a git init for new git repo
2. create a public file basically kept the image file and all 
3. .env and .env.sample for sharing the data with team.
4. sec is the main folder
5. dependency and dev dependency npm i -D nodemon

---------dB SETTING----------
1.  no special characters are not allowed in mongodb url password
2. not put and / in end of the url.
3. while connect seting up alws wrap data base to 1> try{} catch{} and 2> async await 
4. take the name as a new file like DB_NAME 
5. connctDB return promices cann handle in then catch 

---app (err,req,res,next)---

1. -diff data end point handle
app.use(cors())
app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded())
app.use(express.static('public'))
app.use(cookieParser())

---utils ---------
1. async handler common file to pass data
2. Error clsss
3. api 

------model------

1. {
        username:{
            type:String,
            required :true,
            unique: true,
            lowercase: true,
            trim: true,
            index : true //if it is most searchable field 
        }

    }

    -----mongoose-aggregate-paginate-v2----
    
1. videoSchema.plugin(mongooseAggregatePaginate)
just include before export


-------pre-------

just before execution when the save the data one kind of middleware

example:

userSchema.pre('save', async function(next){ //its should be in function 
  if(!this.isModified("password")) return next()

    this.password= bcrypt.hash(this.password,10)
    next()
})


userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

--------bcrypt---
1. hashing the password 

--------JWT token-----
1. header+ payload (user data + signature pass  )
2. its provide a Bearer token 

3.  REFRESH_TOKEN_EXPIRY= secrect key
    REFRESH_TOKEN_EXPIRY= 1d
    ACCESS_TOKEN_EXPIRY= secrect key
    ACCESS_TOKEN_EXPIRY=10d
4. also create a methode in schema 

----------file save----
1. cloudenary (seperate utils) and use for data save in 3rd party services.

2. multer (use in middleware) , also hande the file and diskstorage where save the file.


 