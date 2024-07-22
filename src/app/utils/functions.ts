const MAX_PRODUCT_NAME_LENGTH = 127; 

export const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export function truncateProductName(name: string) {
    if (name.length > MAX_PRODUCT_NAME_LENGTH) {
      return name.substring(0, MAX_PRODUCT_NAME_LENGTH);
    }
    return name;
  }