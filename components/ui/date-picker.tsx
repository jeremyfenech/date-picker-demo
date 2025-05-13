"use client";

import { CalendarIcon } from "lucide-react";
import {
  DatePicker as AriaDatePicker,
  DatePickerProps as AriaDatePickerProps,
  DateRangePicker as AriaDateRangePicker,
  DateRangePickerProps as AriaDateRangePickerProps,
  DateValue as AriaDateValue,
  Dialog as AriaDialog,
  DialogProps as AriaDialogProps,
  PopoverProps as AriaPopoverProps,
  ValidationResult as AriaValidationResult,
  composeRenderProps,
  DateValue,
  Text,
} from "react-aria-components";

import { cn } from "@/lib/utils";

import { Button } from "./button";
import {
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarHeading,
  RangeCalendar,
} from "./calendar";
import { DateField, DateInput } from "./datefield";
import { FieldError, FieldGroup, Label } from "./field";
import { Popover } from "./popover";
import { useState } from "react";
import { RangeValue } from "@/app/demo-jolly-date-range-picker/demo-jolly-date-range-picker";

const DatePicker = AriaDatePicker;

const DateRangePicker = AriaDateRangePicker;

const DatePickerContent = ({
  className,
  popoverClassName,
  ...props
}: AriaDialogProps & { popoverClassName?: AriaPopoverProps["className"] }) => (
  <Popover
    className={composeRenderProps(popoverClassName, (className) =>
      cn("w-auto p-3", className)
    )}
  >
    <AriaDialog
      className={cn(
        "flex w-full flex-col space-y-4 outline-none sm:flex-row sm:space-x-4 sm:space-y-0",
        className
      )}
      {...props}
    />
  </Popover>
);

interface JollyDatePickerProps<T extends AriaDateValue>
  extends AriaDatePickerProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: AriaValidationResult) => string);
}

function JollyDatePicker<T extends AriaDateValue>({
  label,
  description,
  errorMessage,
  className,
  ...props
}: JollyDatePickerProps<T>) {
  return (
    <DatePicker
      className={composeRenderProps(className, (className) =>
        cn("group flex flex-col gap-2", className)
      )}
      {...props}
    >
      <Label>{label}</Label>
      <FieldGroup>
        <DateInput className="flex-1" variant="ghost" />
        <Button
          variant="ghost"
          size="icon"
          className="mr-1 size-6 data-[focus-visible]:ring-offset-0"
        >
          <CalendarIcon aria-hidden className="size-4" />
        </Button>
      </FieldGroup>
      {description && (
        <Text className="text-sm text-muted-foreground" slot="description">
          {description}
        </Text>
      )}
      <FieldError>{errorMessage}</FieldError>
      <DatePickerContent>
        <Calendar>
          <CalendarHeading />
          <CalendarGrid>
            <CalendarGridHeader>
              {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
            </CalendarGridHeader>
            <CalendarGridBody>
              {(date) => <CalendarCell date={date} />}
            </CalendarGridBody>
          </CalendarGrid>
        </Calendar>
      </DatePickerContent>
    </DatePicker>
  );
}

interface JollyDateRangePickerProps<T extends AriaDateValue>
  extends AriaDateRangePickerProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: AriaValidationResult) => string);
}

function JollyDateRangePicker<T extends AriaDateValue>({
  label,
  description,
  errorMessage,
  className,
  ...props
}: JollyDateRangePickerProps<T>) {
  // Wrap onChange to only call if valid
  const { onChange, ...restProps } = props;

  const [dateRange, setDateRange] = useState<RangeValue<DateValue> | null>({
    start: props.value?.start,
    end: props.value?.end,
  });

  return (
    <DateRangePicker
      className={composeRenderProps(className, (className) =>
        cn("group flex flex-col gap-2", className)
      )}
      {...restProps}
      value={dateRange}
    >
      {(component) => (
        <>
          <Label>{label}</Label>
          <FieldGroup>
            <DateField
              slot={"start"}
              onChange={(value) => {
                setDateRange({ start: value, end: dateRange.end });

                if (!component.state.isInvalid) {
                  onChange?.({ start: value, end: dateRange.end });
                }
              }}
              value={dateRange.start}
            >
              <DateInput variant="ghost" />
            </DateField>
            <span aria-hidden className="px-2 text-sm text-muted-foreground">
              -
            </span>
            <DateField
              slot={"end"}
              onChange={(value) => {
                setDateRange({ start: dateRange.start, end: value });

                console.log("end", value, component.state.isInvalid);

                if (!component.state.isInvalid) {
                  onChange?.({ start: dateRange.start, end: value });
                }
              }}
              value={dateRange.end}
            >
              <DateInput variant="ghost" />
            </DateField>
            <Button
              variant="ghost"
              size="icon"
              className="mr-1 size-6 data-[focus-visible]:ring-offset-0"
            >
              <CalendarIcon aria-hidden className="size-4" />
            </Button>
          </FieldGroup>
          {description && (
            <Text className="text-sm text-muted-foreground" slot="description">
              {description}
            </Text>
          )}
          <FieldError>{errorMessage}</FieldError>
          <DatePickerContent>
            <RangeCalendar
              onChange={(value) => {
                setDateRange({ start: value.start, end: value.end });

                if (!component.state.isInvalid) {
                  onChange?.(value);
                }
              }}
            >
              <CalendarHeading />
              <CalendarGrid>
                <CalendarGridHeader>
                  {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
                </CalendarGridHeader>
                <CalendarGridBody>
                  {(date) => <CalendarCell date={date} />}
                </CalendarGridBody>
              </CalendarGrid>
            </RangeCalendar>
          </DatePickerContent>
        </>
      )}
    </DateRangePicker>
  );
}

export {
  DatePicker,
  DatePickerContent,
  DateRangePicker,
  JollyDatePicker,
  JollyDateRangePicker,
};
export type { JollyDatePickerProps, JollyDateRangePickerProps };
