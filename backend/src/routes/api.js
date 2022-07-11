import { Router } from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { upload } from './storage.js'
const router = Router()
const TOKEN_SECRET = 'valami'

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, index: true, required: true, trim: true },
  email: { type: String },
  password: { type: String, select: false },
  registeredAt: { type: Date, default: Date.now, select: false },
  admin: { type: Boolean, default: false } // true = admin
})
const User = mongoose.model('User', userSchema)

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String },
  cost:{ type: Number },
  img: { type: String }
})
const Product = mongoose.model('Product', productSchema)

const orderSchema = new mongoose.Schema({
  product: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  }],
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
})
const Order = mongoose.model('Order', orderSchema)

router.get('/products', async (req, res) => {
  const products = await Product.find()
  res.json(products)
})
router.get('/orders', async (req, res) => {
  const orders = await Order.find()
  res.json(orders)
})

router.post('/register', async (req, res, next) => {
    const { username, email, password } = req.body
    const user = await User.findOne({ username })
    if(user) {
      res.send("Létező felhasználó!")
    }
    else {
      const hashed = await bcrypt.hash(password, 10)
      const newUser = await User.create({ username, email, password: hashed })
      res.json({ id: newUser.id })
    }
})

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  const user = await User.findOne({ username }).select('+password')
  const match = await bcrypt.compare(password, user.password)

  if(!user || !match) {
    next("No such user! / Wrong password!")
  } else {
    const token = await jwt.sign({ userId: user.id }, TOKEN_SECRET, {
      expiresIn: '1h',
    })
    res.cookie('auth', token, { httpOnly: true })
    res.send(user.id)
  }
})
const authMW = async (req, res, next) => {
  const token = req.cookies.auth
  try {
    const { userId } = await jwt.verify(token, TOKEN_SECRET)
    req.user = userId
    next()
  } catch (error) {
    res.send("You are not authorized");
  }
}

router.get('/currentUser', authMW, async (req, res) => {
  const user = await User.findOne({ _id: req.user }).exec()
  res.send(user)
})

router.post('/upload', upload.single('example'), async (req, res) => {
  const { name, desc, cost } = req.body
  const location = '/api/files/' + req.file.filename
  // res.json(location)
  const isProduct = await Product.findOne({ name })
  if(isProduct) {
    next("Product exists!")
  }
  else {
    const newProduct = await Product.create({ name, desc, cost, img: location })
    res.json({ id: newProduct.id })
  }
})

router.put('/update/:id', upload.single('example'), async (req, res) => {
  const { name, desc, cost } = req.body
  const location = '/api/files/' + req.file.filename
  const updatedProduct = await Product.findByIdAndUpdate( req.params.id, { name, desc, cost, img: location })
  res.json(updatedProduct)
})
router.delete('/delete/:id', async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id)
  res.send(deleted)
}); 

router.get("/getLogged", async (req, res) => {
  const token = req.cookies.auth
  try {   
    const { userId } = await jwt.verify(token, TOKEN_SECRET)
    req.user = userId
    res.send(true)
  } catch (error) {
    res.send(false)
  }
});

router.post('/makeorder', authMW, async (req, res) => {
  const { productlist } = req.body
})

router.put('/update/:id', upload.single('example'), async (req, res) => {
  const { name, desc, cost } = req.body
  const location = '/api/files/' + req.file.filename
  const updatedProduct = await Product.findByIdAndUpdate( req.params.id, { name, desc, cost, img: location })
  res.json(updatedProduct)
})

router.get("/logout", authMW, (req, res) => {
  res.cookie("auth", " ", { httpOnly: true, secure: true, expires: new Date(0) }).send()
});
export default router
