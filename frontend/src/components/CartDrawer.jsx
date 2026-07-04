import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Trash2, CreditCard } from 'lucide-react'

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveFromCart, onCheckout }) {
  const subtotal = cart.reduce((acc, item) => {
    const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, ''))
    return acc + (priceNum * item.quantity)
  }, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 cursor-pointer"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[440px] bg-[#F0EDE8] text-[#1A1A1A] shadow-2xl z-50 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-zinc-300 flex justify-between items-center bg-[#E8E4DE]">
              <h2 className="font-serif text-xl font-bold tracking-wide">Shopping Bag</h2>
              <button 
                onClick={onClose}
                className="text-zinc-500 hover:text-zinc-800 p-1.5 rounded-full hover:bg-zinc-200/50 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-20">
                  <p className="text-zinc-500 font-light text-sm font-sans">Your shopping bag is empty.</p>
                  <button 
                    onClick={onClose}
                    className="border border-[#1A1A1A] text-[#1A1A1A] px-6 py-2.5 text-xs font-sans font-semibold uppercase tracking-wider hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map(item => {
                  return (
                    <div key={item.id} className="flex gap-4 items-start border-b border-zinc-200 pb-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-[#E8E4DE] rounded-md flex items-center justify-center overflow-hidden flex-shrink-0 shadow-inner">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-[75%] h-[75%] object-contain mix-blend-multiply"
                        />
                      </div>
                      
                      {/* Item Details */}
                      <div className="flex-grow flex flex-col text-left">
                        <h3 className="font-serif text-sm font-medium text-[#1A1A1A] leading-tight mb-1">{item.name}</h3>
                        <span className="text-zinc-500 text-xs font-sans mb-3">{item.price}</span>
                        
                        {/* Quantity and controls */}
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center border border-zinc-300 bg-white rounded-sm">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-xs font-sans font-medium text-zinc-800">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => onRemoveFromCart(item.id)}
                            className="text-zinc-400 hover:text-red-600 p-1.5 transition-colors cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-zinc-200 bg-[#E8E4DE] flex flex-col gap-4">
                <div className="flex justify-between items-center font-serif text-base font-semibold">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)} USD</span>
                </div>
                <p className="text-zinc-500 text-xs font-sans text-left leading-relaxed">
                  Taxes and shipping are calculated at checkout. Secure checkout guaranteed.
                </p>
                <button
                  onClick={onCheckout}
                  className="w-full bg-[#1A1A1A] text-white py-3.5 px-6 font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-[#B87333] transition-colors duration-300 cursor-pointer shadow-md rounded-xs"
                >
                  <CreditCard className="w-4 h-4 stroke-[1.8]" />
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
