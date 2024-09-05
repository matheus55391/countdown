"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { permanentRedirect, useRouter } from "next/navigation";

const FormSchema = z.object({
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  hours: z.string(),
  minutes: z.string(),
});

function createDateFromComponents(
  date: Date,
  hours: string,
  minutes: string
): Date {
  // Verifica se as horas e minutos são números válidos
  const hoursNumber = parseInt(hours, 10);
  const minutesNumber = parseInt(minutes, 10);

  if (
    isNaN(hoursNumber) ||
    isNaN(minutesNumber) ||
    hoursNumber < 0 ||
    hoursNumber > 23 ||
    minutesNumber < 0 ||
    minutesNumber > 59
  ) {
    throw new Error("Horas ou minutos inválidos.");
  }

  // Cria um novo objeto Date com a data, hora e minutos fornecidos
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hoursNumber,
    minutesNumber
  );
}

export function GenerateLinkForm() {
    const router = useRouter();
  const yesterdayDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  const tomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      date: tomorrowDate,
      hours: "00",
      minutes: "00",
    },
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(formDate: z.infer<typeof FormSchema>) {
    const date = createDateFromComponents(
      formDate.date,
      formDate.hours,
      formDate.minutes
    );
    router.push('/countdown?date=' + date.toISOString());
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < yesterdayDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="hours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hours</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Hours" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({ length: 24 }).map((_, i) => (
                      <SelectItem key={i} value={`${i}`.padStart(2, "0")}>
                        {i.toString().padStart(2, "0")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="minutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minutes</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Minutes" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({ length: 60 }).map((_, i) => (
                      <SelectItem key={i} value={`${i}`.padStart(2, "0")}>
                        {i.toString().padStart(2, "0")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Generate Link
        </Button>
      </form>
    </Form>
  );
}
