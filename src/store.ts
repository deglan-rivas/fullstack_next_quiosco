import { Product } from "@prisma/client";
import { create } from "zustand";
import { OrderItem } from "./types";

interface Store {
  order: OrderItem[]
  addToOrder: (product: Product) => void
  incrementByOne: (id: Product['id']) => void
  decreseByOne: (id: Product['id']) => void
  removeItem: (id: Product['id']) => void
}

const MAX_ITEMS = 5
const MIN_ITEMS = 1

export const useStore = create<Store>((set, get) => ({
  order: [],
  addToOrder: (product: Product) => {
    // console.log(product)
    // const { order } = get();
    const { image, categoryId, ...data } = product

    const item = get().order.find((item) => item.id === product.id);
    let order = []

    if (item) {
      order = get().order.map((item) => {
        if (item.id === product.id) {
          if (item.quantity === MAX_ITEMS) return item

          return {
            ...item,
            quantity: item.quantity + 1,
            subtotal: item.subtotal + product.price
          }
        } else {
          return item
        }
      })
    } else {
      order = [...get().order, {
        ...data,
        quantity: 1,
        subtotal: product.price
      }]
    }

    set((state) => ({
      order
    }));
  },

  incrementByOne(id) {
    set((state) => ({
      order: state.order.map((item) => {
        if (item.id === id) {
          if (item.quantity === MAX_ITEMS) return item

          return {
            ...item,
            quantity: item.quantity + 1,
            subtotal: item.subtotal + item.price
          }
        } else {
          return item
        }
      })
    }))
  },

  decreseByOne(id) {
    const order = get().order.map((item) => {
      if (item.id === id) {
        if (item.quantity === MIN_ITEMS) return item

        return {
          ...item,
          quantity: item.quantity - 1,
          subtotal: item.subtotal - item.price
        }
      } else {
        return item
      }
    })

    set(() => ({
      order
    }));
  },

  removeItem(id) {
    set((state) => ({
      order: state.order.filter((item) => item.id !== id)
    }))
  },
}));