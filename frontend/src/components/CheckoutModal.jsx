import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react'

export default function CheckoutModal({ isOpen, onClose, cart, onOrderSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  })
  const [status, setStatus] = useState('idle') // idle, processing, success

  if (!isOpen) return null

  const subtotal = cart.reduce((acc, item) => {
    const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, ''))
    return acc + (priceNum * item.quantity)
  }, 0)
  const shipping = subtotal > 150 ? 0 : 15.00
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleInputChange = (e) => {
    const { name, value } = e.target
    let formattedValue = value
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19)
    } else if (name === 'expiry') {
      formattedValue = value.replace(/\//g, '').replace(/(\d{2})/g, '$1/').trim().slice(0, 5)
      if (formattedValue.endsWith('/')) formattedValue = formattedValue.slice(0, -1)
    } else if (name === 'cvc') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3)
    }
    setFormData(prev => ({ ...prev, [name]: formattedValue }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('processing')
    
    // Simulate payment processing authorization lag
    setTimeout(() => {
      setStatus('success')
    }, 2500)
  }

  const handleOrderDone = () => {
    setStatus('idle')
    setFormData({
      name: '',
      email: '',
      address: '',
      city: '',
      cardNumber: '',
      expiry: '',
      cvc: ''
    })
    onOrderSuccess()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[#121212]/70 backdrop-blur-md transition-opacity duration-300">
      
      <div 
        className="relative w-full max-w-4xl bg-[#F0EDE8] text-[#1A1A1A] rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[550px] max-h-[90vh] animate-[fadeInUp_0.4s_cubic-bezier(0.25,0.1,0.25,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {status !== 'success' && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-zinc-200/50 rounded-full p-2 transition-all cursor-pointer z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <AnimatePresence mode="wait">
          {status === 'processing' && (
            <motion.div 
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#F0EDE8]/95 z-50 flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full border-4 border-zinc-200 border-t-[#B87333] animate-spin"></div>
                <Lock className="w-6 h-6 text-[#B87333] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-2">Processing Secure Payment</h3>
              <p className="text-zinc-500 font-sans text-sm max-w-xs leading-relaxed">
                Please do not close this window or refresh the page. We are securely validating your credit card details.
              </p>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#F0EDE8] z-50 flex flex-col items-center justify-center p-8 text-center"
            >
              <CheckCircle2 className="w-20 h-20 text-emerald-600 mb-6 animate-[bounce_1s_infinite_alternate]" />
              <h3 className="font-serif text-3xl font-bold mb-2">Order Confirmed!</h3>
              <p className="text-zinc-600 font-sans text-sm max-w-sm leading-relaxed mb-6">
                Thank you for your purchase, <strong>{formData.name}</strong>! Your order <strong>#ZK-{Math.floor(100000 + Math.random() * 900000)}</strong> has been successfully placed. A confirmation email has been sent to {formData.email}.
              </p>
              
              <div className="bg-[#E8E4DE] p-5 rounded-lg max-w-sm w-full mb-8 text-left text-xs font-sans flex flex-col gap-2.5">
                <div className="flex justify-between border-b border-zinc-300/50 pb-2 mb-1">
                  <span className="font-semibold text-zinc-700">Shipping Address</span>
                  <span className="text-zinc-800 text-right">{formData.address}, {formData.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-zinc-700">Total Charged</span>
                  <span className="font-bold text-[#B87333]">${total.toFixed(2)} USD</span>
                </div>
              </div>

              <button
                onClick={handleOrderDone}
                className="bg-[#1A1A1A] text-white px-8 py-3.5 font-sans text-xs uppercase tracking-widest font-semibold hover:bg-[#B87333] transition-colors duration-300 cursor-pointer shadow-md rounded-xs"
              >
                Continue Shopping
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {status === 'idle' && (
          <>
            {/* Left Panel: Checkout details form */}
            <div className="w-full md:w-3/5 p-6 md:p-8 overflow-y-auto max-h-[85vh] md:max-h-none">
              <div className="flex items-center gap-2 mb-6 select-none">
                <Lock className="w-4 h-4 text-[#B87333]" />
                <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-500 font-sans">Secure Checkout Gateway</span>
              </div>
              
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] text-left leading-tight mb-8">
                Billing & Shipping Details
              </h2>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                {/* Full name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 font-sans">Full Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name" 
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="border border-zinc-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-[#B87333] bg-white font-sans text-zinc-800"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 font-sans">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email" 
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="johndoe@example.com"
                      className="border border-zinc-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-[#B87333] bg-white font-sans text-zinc-800"
                    />
                  </div>
                </div>

                {/* Shipping address & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="address" className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 font-sans">Shipping Address</label>
                    <input 
                      type="text" 
                      id="address"
                      name="address" 
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Luxury Avenue"
                      className="border border-zinc-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-[#B87333] bg-white font-sans text-zinc-800"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="city" className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 font-sans">City</label>
                    <input 
                      type="text" 
                      id="city"
                      name="city" 
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="New York"
                      className="border border-zinc-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-[#B87333] bg-white font-sans text-zinc-800"
                    />
                  </div>
                </div>

                {/* Card Number */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cardNumber" className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 font-sans flex justify-between">
                    <span>Card Number</span>
                    <span className="text-[9px] text-zinc-400 font-medium">VISA / MASTERCARD / AMEX</span>
                  </label>
                  <input 
                    type="text" 
                    id="cardNumber"
                    name="cardNumber" 
                    required
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="xxxx xxxx xxxx xxxx"
                    className="border border-zinc-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-[#B87333] bg-white font-sans text-zinc-800"
                  />
                </div>

                {/* Expiry & CVC */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="expiry" className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 font-sans">Expiry Date</label>
                    <input 
                      type="text" 
                      id="expiry"
                      name="expiry" 
                      required
                      value={formData.expiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="border border-zinc-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-[#B87333] bg-white font-sans text-zinc-800"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cvc" className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 font-sans">CVC</label>
                    <input 
                      type="password" 
                      id="cvc"
                      name="cvc" 
                      required
                      value={formData.cvc}
                      onChange={handleInputChange}
                      placeholder="xxx"
                      className="border border-zinc-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-[#B87333] bg-white font-sans text-zinc-800"
                    />
                  </div>
                </div>

                {/* Security trust badge */}
                <div className="flex items-center gap-2 border border-zinc-300/50 rounded-lg p-3 bg-zinc-200/20 text-[11px] text-zinc-500 font-sans select-none leading-relaxed mt-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  <span>Your credentials are encrypted using AES-256 and sent over SSL. ZENkai does not store your card details.</span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-[#1A1A1A] text-white py-3.5 px-6 font-sans text-xs uppercase tracking-widest font-bold hover:bg-[#B87333] transition-all duration-300 cursor-pointer shadow-md rounded-xs flex items-center justify-center gap-2 mt-4"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Pay ${total.toFixed(2)} USD
                </button>
              </form>
            </div>

            {/* Right Panel: Order Summary */}
            <div className="w-full md:w-2/5 bg-[#E8E4DE] p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh] md:max-h-none border-t md:border-t-0 md:border-l border-zinc-300">
              <div className="text-left">
                <h3 className="font-serif text-lg font-bold mb-6 pb-2 border-b border-zinc-300">Order Summary</h3>
                
                {/* List items */}
                <div className="flex flex-col gap-4 max-h-[220px] overflow-y-auto pr-1 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-xs font-sans animate-[fadeInUp_0.3s_ease]">
                      <div className="flex gap-2.5 items-center">
                        <span className="w-5 h-5 bg-white text-zinc-700 font-bold border border-zinc-300 rounded flex items-center justify-center">{item.quantity}</span>
                        <span className="font-medium text-zinc-700 max-w-[140px] truncate">{item.name}</span>
                      </div>
                      <span className="font-semibold text-zinc-800">{item.price}</span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="flex flex-col gap-2.5 border-t border-zinc-300 pt-6 text-xs font-sans text-zinc-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-zinc-800">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-zinc-800">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax</span>
                    <span className="font-semibold text-zinc-800">${tax.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Total Charge */}
              <div className="border-t border-zinc-300 pt-6 mt-6 flex justify-between items-baseline select-none">
                <span className="font-serif text-base font-bold text-zinc-700">Total</span>
                <span className="font-serif text-2xl font-bold text-[#B87333]">${total.toFixed(2)} USD</span>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  )
}
