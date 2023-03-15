import { forwardRef } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import classnames from 'classnames';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';
import '../app/styles/select-radix.scss';

export default function Selector({
  name,
  options,
  required,
  onValueChange,
  onOpenChange,
}) {
  return (
    <SelectPrimitive.Root
      name={name.toLowerCase()}
      required={required}
      onValueChange={onValueChange}
      onOpenChange={onOpenChange}
    >
      <SelectPrimitive.Trigger className="SelectTrigger" aria-label="Food">
        <SelectPrimitive.Value placeholder={name} />
        <SelectPrimitive.Icon className="SelectIcon">
          <ChevronDownIcon />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="SelectContent">
          <SelectPrimitive.ScrollUpButton className="SelectScrollButton">
            <ChevronUpIcon />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="SelectViewport">
            <SelectPrimitive.Group>
              <SelectPrimitive.Label className="SelectLabel">
                {name}
              </SelectPrimitive.Label>
              {options
                && Object.keys(options).map((opt) => (
                  <SelectItem key={opt} value={options[opt].value}>
                    {options[opt].label}
                  </SelectItem>
                ))}
            </SelectPrimitive.Group>
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="SelectScrollButton">
            <ChevronDownIcon />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
const SelectItem = forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <SelectPrimitive.Item
      className={classnames('SelectItem', className)}
      {...props}
      ref={forwardedRef}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="SelectItemIndicator">
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  ),
);
