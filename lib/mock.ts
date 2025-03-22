import type { PrintifyProduct } from "./printify"

export function getMockPrintifyProducts(): PrintifyProduct[] {
  return [
    {
      id: "mock-1",
      title: "Classic Cotton Tee",
      description: "Our signature classic tee is made from 100% organic cotton for ultimate comfort and durability.",
      images: [
        {
          src: "/placeholder.svg?height=600&width=480",
          variant_ids: ["1"],
          position: "front",
          is_default: true,
        },
      ],
      variants: [
        {
          id: "1",
          title: "S / Black",
          price: 29.99,
          sku: "CT-BLK-S",
          is_enabled: true,
          options: { size: "S", color: "Black" },
        },
      ],
      tags: ["t-shirt", "cotton", "classic"],
      options: [
        {
          name: "Size",
          type: "dropdown",
          values: ["S", "M", "L", "XL", "2XL"],
        },
        {
          name: "Color",
          type: "dropdown",
          values: ["Black", "White", "Navy", "Gray", "Red"],
        },
      ],
    },
    {
      id: "mock-2",
      title: "Vintage Hoodie",
      description: "A comfortable hoodie with a vintage feel, perfect for cooler days.",
      images: [
        {
          src: "/placeholder.svg?height=600&width=480",
          variant_ids: ["2"],
          position: "front",
          is_default: true,
        },
      ],
      variants: [
        {
          id: "2",
          title: "M / Navy",
          price: 59.99,
          sku: "VH-NVY-M",
          is_enabled: true,
          options: { size: "M", color: "Navy" },
        },
      ],
      tags: ["hoodie", "vintage", "comfortable"],
      options: [
        {
          name: "Size",
          type: "dropdown",
          values: ["S", "M", "L", "XL"],
        },
        {
          name: "Color",
          type: "dropdown",
          values: ["Navy", "Black", "Gray"],
        },
      ],
    },
    {
      id: "mock-3",
      title: "Statement Sweatshirt",
      description: "Make a statement with this comfortable and stylish sweatshirt.",
      images: [
        {
          src: "/placeholder.svg?height=600&width=480",
          variant_ids: ["3"],
          position: "front",
          is_default: true,
        },
      ],
      variants: [
        {
          id: "3",
          title: "L / Gray",
          price: 49.99,
          sku: "SS-GRY-L",
          is_enabled: true,
          options: { size: "L", color: "Gray" },
        },
      ],
      tags: ["sweatshirt", "statement", "stylish"],
      options: [
        {
          name: "Size",
          type: "dropdown",
          values: ["S", "M", "L", "XL"],
        },
        {
          name: "Color",
          type: "dropdown",
          values: ["Gray", "Black", "White"],
        },
      ],
    },
    {
      id: "mock-4",
      title: "Graphic Tee",
      description: "Express yourself with our unique graphic tee designs.",
      images: [
        {
          src: "/placeholder.svg?height=600&width=480",
          variant_ids: ["4"],
          position: "front",
          is_default: true,
        },
      ],
      variants: [
        {
          id: "4",
          title: "M / White",
          price: 34.99,
          sku: "GT-WHT-M",
          is_enabled: true,
          options: { size: "M", color: "White" },
        },
      ],
      tags: ["t-shirt", "graphic", "unique"],
      options: [
        {
          name: "Size",
          type: "dropdown",
          values: ["S", "M", "L", "XL"],
        },
        {
          name: "Color",
          type: "dropdown",
          values: ["White", "Black", "Gray"],
        },
      ],
    },
  ]
}

