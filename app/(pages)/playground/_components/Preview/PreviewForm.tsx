import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form as FormRoot, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FormProps } from "@/types/flowJSON";
import RadioButtonsGroupField from "./RadioButtonsGroup";
import CheckboxGroupField from "./CheckboxGroup";
import OptIn from "./OptIn";

const Form: React.FC<FormProps> = ({ formData, screenData, onComplete }) => {
  const initialValues = formData["init-values"] || {};

  const form = useForm({
    defaultValues: initialValues
  });

  const onSubmit = (values: any) => {
    console.log("Form submitted with values:", values);
    onComplete();
  };

  return (
    <FormRoot {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        {(formData.children || []).map((child: any, index: number) => {
          if (child.type === "TextInput") {
            return (
              <FormField
                key={index}
                control={form.control}
                name={child.name || `input_${index}`}
                defaultValue=""
                rules={{ required: child.required }}
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormLabel className="text-base font-medium">{child.label}</FormLabel>
                    <FormControl>
                      <Input
                        type={child["input-type"] || "text"}
                        placeholder={child.placeholder || ""}
                        pattern={child.pattern}
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    {child["helper-text"] && (
                      <FormDescription>{child["helper-text"]}</FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          }

          if (child.type === "TextArea") {
            return (
              <FormField
                key={index}
                control={form.control}
                name={child.name || `textarea_${index}`}
                defaultValue=""
                rules={{ required: child.required }}
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormLabel className="text-base font-medium">{child.label}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={child.placeholder || ""}
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    {child["helper-text"] && (
                      <FormDescription>{child["helper-text"]}</FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          }

          if (child.type === "RadioButtonsGroup") {
            return (
              <RadioButtonsGroupField
                key={index}
                control={form.control}
                name={child.name || `radio_group_${index}`}
                label={child.label}
                description={child.description}
                // @ts-ignore
                items={Object.entries(screenData!)[0][1].__example__}
                required={child.required}
                onSelectAction={child["on-select-action"]}
              />
            );
          }

          if (child.type === "CheckboxGroup") {

            return (
              <CheckboxGroupField
                key={index}
                control={form.control}
                name={child.name || `checkbox_group_${index}`}
                label={child.label}
                description={child.description}
                items={screenData!.all_extras}
                required={child.required}
              />
            );
          }

          if (child.type === "OptIn") {
            return (
              <OptIn
                key={index}
                control={form.control}
                name={child.name || `optin_${index}`}
                label={child.label}
                required={child.required}
                onClickAction={child["on-click-action"]}
              />
            );
          }

          if (child.type === "Footer") {
            return (
              <Button
                key={index}
                type="submit"
                className="w-full py-3 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                {child.label || "Continue"}
              </Button>
            );
          }

          return null;
        })}
      </form>
    </FormRoot>
  );
};

export default Form;