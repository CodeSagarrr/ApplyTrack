export const BuildSearchParams = (filtersParams : Record<string , unknown>) => {
    const searchParams = new URLSearchParams();

    Object.entries(filtersParams).forEach(([key , value]) => {
        if(value !== undefined && value !== null && value !== ""){
            searchParams.append(key , String(value))
        }
    });

    return searchParams;
}

export const getDate = (dateFilters: string) => {
  if (dateFilters === "Any date") {
    return { from: undefined, to: undefined };
  }
  const days = Number(dateFilters.match(/\d+/)?.[0]);
    if (!days || Number.isNaN(days)) {
    return { from: undefined, to: undefined };
  }
  const start = new Date();
  const end = new Date();

  start.setDate(end.getDate() - days);

  return {
    from: start.toISOString(),
    to: end.toISOString(),
  };
};


export function isEmpty(value: any): boolean {
  if (value == null) return true;
  if (value instanceof File) return false;

  if (typeof value === "string") {
    return value.trim() === "";
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === "object") {
    return Object.values(value).every(isEmpty);
  }

  return false;
}

export function appendFormData(
  formData: FormData,
  data: Record<string, any>,
  parentKey = "",
) {
  Object.entries(data).forEach(([key, value]) => {
    if (isEmpty(value)) return;

    const fieldName = parentKey ? `${parentKey}.${key}` : key;

    if (value instanceof File) {
      formData.append(fieldName, value);
    } else if (Array.isArray(value) || typeof value === "object") {
      formData.append(fieldName, JSON.stringify(value));
    } else if (value !== "") {
      formData.append(fieldName, String(value));
    }
  });
}


export function selectedFields(obj: Object) {
  const newSelectedFields: any = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (isEmpty(value)) return;

    if (value) {
      newSelectedFields[key] = value;
    }
  });

  return newSelectedFields;
}

export function formatDate(date?: string) {
  if (!date) return "Not added";
  return new Date(date).toLocaleDateString("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

