const convertObjectToFormData = (obj, form = new FormData(), namespace = '') => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            const formKey = namespace ? `${namespace}[${key}]` : key;
            if (value instanceof Date) {
                form.append(formKey, value.toISOString());
            } else if (value instanceof Array) {
                value.forEach((item, index) => {
                    objectToFormData({ [index]: item }, form, formKey);
                });
            } else if (typeof value === 'object' && value !== null) {
                objectToFormData(value, form, formKey);
            } else {
                form.append(formKey, value);
            }
        }
    }
    return form;
}
function objectToFormData(obj, form = new FormData(), namespace = '') {

}

export default convertObjectToFormData;