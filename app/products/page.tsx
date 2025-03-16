"use client";

import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/product-card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FiltersContent from "./filters-content";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/printify/products");
        const data = await response.json();
        if (data.products) {
          setProducts(data.products);
        } else {
          console.error("No products found in response:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return <div className="text-center py-12">Loading products...</div>;

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile Filters */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="flex md:hidden mb-4">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="space-y-6 py-4">
              <FiltersContent />
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Filters Sidebar */}
        <div className="hidden md:block w-64 space-y-6">
          <h2 className="font-semibold text-lg">Filters</h2>
          <FiltersContent />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold">All Products</h1>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select defaultValue="newest">
                <SelectTrigger className="w-full sm:w-[180px] bg-secondary">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="hidden sm:flex">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.title}
                price={product.variants[0]?.price / 100 || 0}
                image={product.images[0]?.src || "/placeholder.svg"}
                category={product.tags?.join(", ") || "Unknown"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
