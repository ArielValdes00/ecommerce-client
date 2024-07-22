import { Radio, cn } from "@nextui-org/react";
import { ReactNode } from "react";

interface CustomRadioProps {
    children: ReactNode;
    value: string;
    description: string;
    isDisabled: boolean
}

export const CustomRadio: React.FC<CustomRadioProps> = ({ children, value, description, isDisabled }) => {

    return (
        <Radio
            value={value}
            description={description}
            isDisabled={isDisabled}
            checked={true}
            className={cn(
                "group flex items-center bg-gray-100 mx-[.5px] hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
                "w-full max-w-[31%] data-[selected=true]:border-2 cursor-pointer rounded-lg gap-4 p-4",
                "data-[selected=true]:border-primary",
            )}
        >
            {children}
        </Radio>
    );
};