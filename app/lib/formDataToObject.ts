export function formDataToObject(formData: FormData) {
    const obj: Record<string, unknown> = {};

    for (const [key, value] of formData.entries()) {
        if (key === "profileImg") continue;
        obj[key] = value;
    }

    if (formData.has("roles")) {
        obj.roles = formData.getAll("roles");
    }

    return obj;
}