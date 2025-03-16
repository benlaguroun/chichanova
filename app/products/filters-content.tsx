"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

export default function FiltersContent() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-2">Categories</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="t-shirts" />
            <label htmlFor="t-shirts" className="text-sm">
              T-Shirts
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="hoodies" />
            <label htmlFor="hoodies" className="text-sm">
              Hoodies
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="sweatshirts" />
            <label htmlFor="sweatshirts" className="text-sm">
              Sweatshirts
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="accessories" />
            <label htmlFor="accessories" className="text-sm">
              Accessories
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Price Range</h3>
        <Slider defaultValue={[0, 100]} max={100} step={1} className="my-6" />
        <div className="flex items-center justify-between">
          <span className="text-sm">$0</span>
          <span className="text-sm">$100+</span>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Size</h3>
        <div className="grid grid-cols-4 gap-2">
          {["XS", "S", "M", "L", "XL", "2XL", "3XL"].map((size) => (
            <Button key={size} variant="outline" size="sm" className="h-8">
              {size}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Color</h3>
        <div className="flex flex-wrap gap-2">
          {["black", "white", "red", "blue", "green", "yellow"].map((color) => (
            <Button
              key={color}
              variant="outline"
              size="icon"
              className={`rounded-full h-8 w-8 p-0 border-2 bg-${color}-500`}
            />
          ))}
        </div>
      </div>

      <Button className="w-full">Apply Filters</Button>
    </div>
  );
}
