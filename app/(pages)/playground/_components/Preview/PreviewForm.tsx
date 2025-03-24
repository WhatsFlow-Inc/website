import { FormInput } from "lucide-react";
import CheckboxGroup from "./PreviewCheckboxGroup";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { CheckboxItem, FormProps } from "@/types/flowJSON";

const Form: React.FC<FormProps> = ({ formData, screenData, onComplete }) => {
  const initialValues = formData["init-values"] || {};
  const [formValues, setFormValues] = useState<Record<string, any>>(initialValues);
  const [debug, setDebug] = useState<any>({});

  // Helper function to parse data source for checkbox group
  const parseDataSource = (dataSource: string | CheckboxItem[] | undefined, screenData: Record<string, any> | undefined): CheckboxItem[] => {
    if (!dataSource) {
      console.log("No data source provided");
      return [];
    }

    // If dataSource is already an array of CheckboxItems, return it
    if (Array.isArray(dataSource)) {
      console.log("Data source is an array:", dataSource);
      return dataSource;
    }

    // If dataSource is a string template like "${data.all_extras}", parse it
    if (typeof dataSource === 'string' && dataSource.startsWith('${') && dataSource.endsWith('}')) {
      const pathStr = dataSource.slice(2, -1);
      const path = pathStr.split('.');

      console.log("Parsing path:", path, "from screenData:", screenData);

      let result = screenData;

      for (const key of path) {
        if (result && result[key]) {
          result = result[key];
        } else {
          console.log(`Cannot find ${key} in`, result);
          return [];
        }
      }

      console.log("Resolved data source:", result);
      // @ts-ignore
      setDebug(prev => ({ ...prev, resolvedData: result }));

      return Array.isArray(result) ? result : [];
    }

    console.log("Unrecognized data source format:", dataSource);
    return [];
  };

  // Handle text input change
  const handleInputChange = (name: string, value: string) => {
    // @ts-ignore
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle checkbox group change
  const handleCheckboxChange = (name: string, values: string[]) => {
    // @ts-ignore
    setFormValues(prev => ({
      ...prev,
      [name]: values
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with values:", formValues);
    onComplete();
  };

  // For debugging purposes, log the screen data when it changes
  useEffect(() => {
    console.log("Screen data:", screenData);
    // @ts-ignore
    setDebug(prev => ({ ...prev, screenData }));
  }, [screenData]);

  // Update this so we have a proper fallback for the checkboxes
  const mockCheckboxItems: CheckboxItem[] = [
    { id: "1", title: "Fries" },
    { id: "2", title: "Coleslaw" },
  ];

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {formData.children?.map((child:any, index:any) => {
        if (child.type === "Footer") {
          return (
            <div key={index} className="mt-6">
              <Button
                type="submit"
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-600 py-3 rounded-full"
              >
                {child.label || "Continue"}
              </Button>
            </div>
          );
        }

        if (child.type === "TextInput" || child.type === "TextArea") {
          return (
            <FormInput
              key={index}
              type={child.type}
              label={child.label}
              required={child.required}
              inputType={child["input-type"]}
              pattern={child.pattern}
              helperText={child["helper-text"]}
              initialValue={initialValues[child.name || ""] || ""}
              name={child.name || `input_${index}`}
            //   @ts-ignore
              onChange={handleInputChange}
            />
          );
        }

        if (child.type === "CheckboxGroup") {
          // First try to parse data from screenData
          let dataSource = parseDataSource(child["data-source"], screenData);

          // If parsing fails, use the mock data as fallback
          if (dataSource.length === 0) {
            console.log("Using mock checkbox items");
            dataSource = mockCheckboxItems;
          }

          return (
            <CheckboxGroup
              key={index}
              label={child.label}
              description={child.description}
              required={child.required}
              name={child.name || `checkbox_group_${index}`}
              dataSource={dataSource}
              onChange={handleCheckboxChange}
              initialValues={initialValues[child.name || ""] || []}
            />
          );
        }

        return null;
      })}

      {/* Debug display - remove in production */}
      {process.env.NODE_ENV !== 'production' && Object.keys(debug).length > 0 && (
        <div className="mt-4 p-2 border border-gray-200 rounded text-xs bg-gray-50">
          <details>
            <summary className="font-medium">Debug Info</summary>
            <pre className="mt-2 whitespace-pre-wrap">
              {JSON.stringify(debug, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </form>
  );
};

export default Form
