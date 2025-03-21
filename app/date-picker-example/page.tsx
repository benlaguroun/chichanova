"use client"

import { useState } from "react"
import { DatePicker } from "@/components/date-picker"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DatePickerExample() {
  const [date, setDate] = useState<Date>()

  return (
    <div className="container py-12">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Date Picker Example</CardTitle>
          <CardDescription>
            This example demonstrates the date picker component using react-day-picker and date-fns v3.6.0
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select a date</label>
            <DatePicker date={date} onDateChange={setDate} />
          </div>

          {date && (
            <div className="p-4 bg-secondary rounded-md">
              <p className="font-medium">Selected date:</p>
              <p>{date.toDateString()}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

