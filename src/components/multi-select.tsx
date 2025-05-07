import { X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { useRef, useState } from "react";

type Option = {
  value: string;
  label: string;
};

type MultiSelectProps = {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  onUnselect?: (value: string) => void; // Yeni prop
  placeholder?: string;
};

export function MultiSelect({
  options,
  selected,
  onChange,
  onUnselect, // Yeni prop destructure edildi
  placeholder = "Select options...",
}: MultiSelectProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleUnselect = (value: string) => {
    onUnselect?.(value); // Eğer onUnselect varsa çağır
    onChange(selected.filter((s) => s !== value));
  };

  const selectables = options.filter(
    (option) => !selected.includes(option.value)
  );

  return (
    <Command className="overflow-visible bg-transparent col-span-3">
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <CommandInput
          ref={inputRef}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="bg-transparent outline-none placeholder:text-muted-foreground flex-1"
        />
      </div>
      <div className="mt-2 flex gap-1 flex-wrap">
        {selected.map((value) => {
          const option = options.find((o) => o.value === value);
          return (
            <Badge key={value} variant="secondary">
              {option?.label}
              <button
                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUnselect(value);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(value)}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          );
        })}
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((option) => {
                  return (
                    <CommandItem
                      key={option.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setInputValue("");
                        onChange([...selected, option.value]);
                      }}
                      className={"cursor-pointer"}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          onChange([...selected, option.value]);
                          setInputValue("");
                        }
                      }}
                    >
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </div>
        ) : null}
      </div>
    </Command>
  );
}
